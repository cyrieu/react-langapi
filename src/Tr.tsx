import * as React from "react";
import LangContext, { LangContextValue } from "./Context";
import { parseOriginalText, renderNodes } from "./reactUtils";
import { TrOptions } from "./types";
import {LangTranslateClient} from "langapi-client/dist/LangTranslateClient";
import {ReactNode} from "react";

type TrProps = {
  client?: LangTranslateClient
  description?: string;
  variables?: any;
  options?: TrOptions;
};

type State = {};

class Tr extends React.Component<TrProps, State> {
  renderNodes(
      client: LangTranslateClient,
      children: ReactNode,
      variables: any,
      options?: TrOptions
  ) {
    const originalText: string = parseOriginalText(children, {
      index: 1
    });

    const translatedText = client.tr(originalText, variables, {
      ...options,
      preserveWhitespace: true
    }) as string;

    return renderNodes(children, translatedText);
  }

  render() {
    const {
      children,
      description,
      variables,
      options,
      client,
      ...rest
    } = this.props;

    const fallback = <div>{children}</div> || false;

    if (!LangContext && !client) {
      return fallback
    }

    return client ? (
      this.renderNodes(client, children, variables, options)
    ) : (
      <LangContext.Consumer>
        {(value?: LangContextValue) => {
          if (!value) {
            return fallback;
          }
          const { client: contextClient } = value;
          if (!contextClient) {
            return fallback;
          }

          return this.renderNodes(contextClient, children, variables, options);
        }}
      </LangContext.Consumer>
    );
  }
}

export default Tr;
