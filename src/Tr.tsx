import styled from "@emotion/styled";
import * as React from "react";
import LangContext from "./Context";

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
    return (
      <LangContext.Consumer>
        {(value: any) => {
          const { client } = value;
          const { children, ...props } = this.props;
          let originalText: any;
          if (!children) {
            originalText = "";
          } else if (children.constructor === Array) {
            originalText = (children as any).join("");
          } else {
            originalText = children;
          }
          return <Phrase>{client.tr(originalText, props)}</Phrase>;
        }}
      </LangContext.Consumer>
    );
  }
}

export default Tr;

const Phrase = styled.div`
  display: inline;
`;
