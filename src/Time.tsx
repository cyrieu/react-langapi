import * as React from "react";
import LangContext, { LangContextValue } from "./Context";
import { FormatDateOptions } from "langapi-client/dist/types";

type TimeProps = {
  value: number;
  options?: FormatDateOptions;
};

type State = {};

class FormatTime extends React.Component<TimeProps, State> {
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

          const translatedText = client.formatTime(value, options) as string;

          return translatedText;
        }}
      </LangContext.Consumer>
    );
  }
}

export default FormatTime;
