import * as React from "react";
import LangContext, { LangContextValue } from "./Context";
import { parseOriginalText, renderNodes } from "./reactUtils";
import { TrOptions } from "./types";

type TrProps = {
  description?: string;
  variables?: any;
  options?: TrOptions;
};

type State = {};

class Tr extends React.Component<TrProps, State> {
  render() {
    if (!LangContext) {
      return this.props.children || "";
    }
    return (
      <LangContext.Consumer>
        {(value?: LangContextValue) => {
          if (!value) {
            return this.props.children || "";
          }
          const { client } = value;
          if (!client) {
            return this.props.children || "";
          }
          const {
            children,
            description,
            variables,
            options,
            ...rest
          } = this.props;
          let originalText: string = "";
          originalText = parseOriginalText(children, {
            index: 1
          });

          const translatedText = client.tr(
            originalText,
            variables,
            options as any
          ) as string;

          return renderNodes(children, translatedText);
        }}
      </LangContext.Consumer>
    );
  }
}

export default Tr;
