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
    const fallback = this.props.children || "";

    if (!LangContext) {
      return fallback;
    }
    return (
        <LangContext.Consumer>
          {(value?: LangContextValue) => {
            if (!value) {
              return fallback;
            }
            const { client } = value;
            if (!client) {
              return fallback;
            }
            const {
              children,
              description,
              variables,
              options,
              ...rest
            } = this.props;
            // translated react nodes
            return renderNodes(client, children, variables, options) || fallback;
          }}
        </LangContext.Consumer>
    );
  }
}
