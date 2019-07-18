import * as React from "react";
import LangContext, { LangContextValue } from "./Context";
import { FormatNumberOptions } from "langapi-client/dist/types";

type NumberProps = {
  value: number;
  options?: FormatNumberOptions;
};

type State = {};

class FormatNumber extends React.Component<NumberProps, State> {
  render() {
    const { value, options } = this.props;

    if (!LangContext) {
      return value.toLocaleString("default");
    }
    return (
      <LangContext.Consumer>
        {(contextValue?: LangContextValue) => {
          if (!contextValue) {
            return value.toLocaleString("default");
          }
          const { client } = contextValue;
          if (!client) {
            return value.toLocaleString("default");
          }

          const translatedText = client.formatNumber(value, options) as string;

          return translatedText;
        }}
      </LangContext.Consumer>
    );
  }
}

export default FormatNumber;
