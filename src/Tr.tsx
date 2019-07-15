import * as React from "react";
import LangContext, { LangContextValue } from "./Context";
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
          if (!children) {
            originalText = "";
          } else if (children.constructor === Array) {
            originalText = (children as any).join("");
          } else {
            originalText = children as string; // TODO fix for child components
          }
          // For now options is any until langapi-client completely removes forceLanguage as string
          return client.tr(originalText, variables, options as any);
        }}
      </LangContext.Consumer>
    );
  }
}

export default Tr;
