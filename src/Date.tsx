import * as React from "react";
import LangContext, { LangContextValue } from "./Context";
import { FormatDateOptions } from "langapi-client/dist/types";

type DateProps = {
  value: number | Date;
  options?: FormatDateOptions;
};

type State = {};

class FormatDate extends React.Component<DateProps, State> {
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

          const translatedText = client.formatDate(value, options) as string;

          return translatedText;
        }}
      </LangContext.Consumer>
    );
  }
}

export default FormatDate;
