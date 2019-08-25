import * as React from "react";
import { renderNodes } from "./reactUtils";
import { TrOptions } from "./types";
import {LangTranslateClient} from "langapi-client/dist/LangTranslateClient";

type TrProps = {
    client: LangTranslateClient
    description?: string;
    variables?: any;
    options?: TrOptions;
};

type State = {};

class TrLegacy extends React.Component<TrProps, State> {
    render() {
        const {
            children,
            description,
            variables,
            options,
            client,
            ...rest
        } = this.props;
        // fallback to original elements
        const fallback = children ? <div>{children}</div> : false;

        // translated react nodes
        return renderNodes(client, children, variables, options) || fallback;
    }
}

export default TrLegacy;
