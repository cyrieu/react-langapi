import * as React from "react";
import LangContext, { LangContextValue } from "./Context";
import { FormatRelativeTimeOptions, Unit } from "langapi-client/dist/types";

type RelativeTimeProps = {
  value: number;
  unit: Unit;
  options?: FormatRelativeTimeOptions;
};

type State = {};

class FormatRelativeTime extends React.Component<RelativeTimeProps, State> {
  render() {
    const { value, unit, options } = this.props;
    // Fallback formatter
    const formatter = new (Intl as any).RelativeTimeFormat("default", {
      ...options
    });

    if (!LangContext) {
      return formatter.format(value, unit);
    }
    return (
      <LangContext.Consumer>
        {(contextValue?: LangContextValue) => {
          if (!contextValue) {
            return formatter.format(value, unit);
          }
          const { client } = contextValue;
          if (!client) {
            return formatter.format(value, unit);
          }

          const translatedText = client.formatRelativeTime(
            value,
            unit,
            options
          ) as string;

          return translatedText;
        }}
      </LangContext.Consumer>
    );
  }
}

export default FormatRelativeTime;
