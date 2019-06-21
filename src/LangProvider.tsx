import * as React from "react";
import { LangContext } from "./Context";

export type LangProviderProps = {
  currentLanguage?: string;
  client: any;
  langClient: any;
};

class LangProvider extends React.Component<LangProviderProps> {
  render() {
    const { currentLanguage, client, langClient } = this.props;
    // TODO THIS DOES NOT WORK IF CHILDREN IS A NORMAL DOM NODE
    const chosenClient = client != null ? client : langClient;
    chosenClient.setForceLanguage(currentLanguage);
    return LangContext ? (
      <LangContext.Provider
        value={{
          currentLanguage,
          client: chosenClient
        }}
      >
        {this.props.children}
      </LangContext.Provider>
    ) : (
      this.props.children
    );
  }
}

export default LangProvider;
