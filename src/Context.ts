import * as React from "react";

export type LangContextValue = {
  client?: any; // TODO type Lang client
  currentLanguage?: string;
};

export const LangContext =
  React.createContext &&
  React.createContext<LangContextValue | undefined>(undefined);

export default LangContext;
