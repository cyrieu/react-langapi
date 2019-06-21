import * as React from "react";
import { LangContext } from "./Context";

export type LangProviderProps = {
  currentLanguage?: string;
  client: any;
};

class LangProvider extends React.Component<LangProviderProps> {
  render() {
    const { currentLanguage, client } = this.props;
    // TODO THIS DOES NOT WORK IF CHILDREN IS A NORMAL DOM NODE
    client.setForceLanguage(currentLanguage);
    return LangContext ? (
      <LangContext.Provider value={{ currentLanguage, client }}>
        {this.props.children}
      </LangContext.Provider>
    ) : (
      this.props.children
    );
  }
}

export default LangProvider;
