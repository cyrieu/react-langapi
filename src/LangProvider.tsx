import * as React from "react";
import { LangContext, LangContextValue } from "./Context";
import { LangTranslateClient } from "langapi-client/dist/LangTranslateClient";

export type LangProviderProps = {
  currentLanguage?: string;
  client: LangTranslateClient;
  langClient?: LangTranslateClient; // DEPRECATED
};

class LangProvider extends React.Component<LangProviderProps, {}> {
  render() {
    const { currentLanguage, client, langClient } = this.props;
    // TODO: IT DOES NOT RE-RENDER IF CHILDREN IS A NORMAL DOM NODE
    return LangContext ? (
      <LangContext.Consumer>
        {(prevContextValue?: LangContextValue) => {
          const prevContextClient = prevContextValue && prevContextValue.client;
          const passedClient = langClient != null ? langClient : client; // use langClient if provided for backwards
          // Make sure only one client us used
          const useClient = prevContextClient || passedClient;
          // Make sure all child tr use new currentLanguage
          useClient.setForceLanguage(currentLanguage);
          const newValue = {
            currentLanguage: currentLanguage,
            client: useClient
          };
          return (
            <LangContext.Provider value={newValue}>
              {this.props.children}
            </LangContext.Provider>
          );
        }}
      </LangContext.Consumer>
    ) : (
      this.props.children
    );
  }
}

export default LangProvider;
