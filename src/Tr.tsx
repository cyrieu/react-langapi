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

class Tr extends React.Component {
  render() {
    return (
      <LangContext.Consumer>
        {(value: any) => {
          const { client } = value;
          return <>{client.tr(this.props.children)}</>;
        }}
      </LangContext.Consumer>
    );
  }
}

export default Tr;
