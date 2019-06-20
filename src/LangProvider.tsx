import * as React from "react";
import { LangContext } from "./Context";

type LangProviderProps = {
  currentLanguage?: string;
  langClient: any;
};

class LangProvider extends React.Component<LangProviderProps> {
  render() {
    const { currentLanguage, langClient } = this.props;
    return LangContext ? (
      <LangContext.Provider value={{ currentLanguage, client: langClient }}>
        {this.props.children}
      </LangContext.Provider>
    ) : (
      this.props.children
    );
  }
}

export default LangProvider;
