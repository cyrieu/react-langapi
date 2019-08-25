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
    const {
      children,
      description,
      variables,
      options,
      ...rest
    } = this.props;

    const fallback = children || "";

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

            // translated react nodes
            return (client && renderNodes(client, children, variables, options))
                || fallback;
          }}
        </LangContext.Consumer>
    );
  }
}

export default Tr;
