import * as React from "react";
import { LangTranslateClient } from "langapi-client/dist/LangTranslateClient";

export type LangContextValue = {
  client?: LangTranslateClient;
  currentLanguage?: string;
};

export const LangContext =
  React.createContext &&
  React.createContext<LangContextValue | undefined>(undefined);

export default LangContext;
