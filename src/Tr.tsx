import styled from "@emotion/styled";
import * as React from "react";
import LangContext, { LangContextValue } from "./Context";

// export default function Tr(thing: any) {
//   const { children, ...props } = thing;

//   let originalText = "";
//   // Check if it is an array
//   if (children.constructor === Array) {
//     originalText = children.join("");
//   } else {
//     originalText = children;
//   }
//   // return React.createElement(TrComponent, {}, this.tr(originalText, props));
//   return this.tr(originalText, props);
// }

type Props = any;

type State = {};

class Tr extends React.Component<Props, State> {
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
          const { children, ...props } = this.props;
          let originalText: string = "";
          if (!children) {
            originalText = "";
          } else if (children.constructor === Array) {
            originalText = (children as any).join("");
          } else {
            originalText = children as string; // TODO fix for child components
          }
          console.log("IM IN THE CONSUMER");
          console.log(value);
          return client.tr(originalText, props);
        }}
      </LangContext.Consumer>
    );
  }
}

export default Tr;
