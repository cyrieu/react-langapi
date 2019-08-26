import * as React from "react";
import LangContext, { LangContextValue } from "./Context";
import * as hoistNonReactStatics_ from "hoist-non-react-statics";
import {LangTranslateClient} from "langapi-client/dist/LangTranslateClient";
import Tr from "./Tr";
const hoistNonReactStatics: typeof hoistNonReactStatics_ = require("hoist-non-react-statics");

export default function withLang(WrappedComponent, client: LangTranslateClient) {
    return props => {
        return <WrappedComponent client={client} {...props} />
    }
}
