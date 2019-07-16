import * as HTML from "html-parse-stringify2";
import * as React from "react";

function hasChildren(node: any) {
  return node && (node.children || (node.props && node.props.children));
}

function getChildren(node: any) {
  if (!node) {
    return [];
  }

  return node && node.children
    ? node.children
    : node.props && node.props.children;
}

function hasValidReactChildren(children: any) {
  if (Object.prototype.toString.call(children) !== "[object Array]") {
    return false;
  }
  return children.every(child => React.isValidElement(child));
}

export function renderNodes(children: React.ReactNode, targetPhrase: string) {
  if (!targetPhrase) {
    return [];
  }

  const ast = HTML.parse(`<0>${targetPhrase}</0>`);

  "<0>Hello <1>there!</1></0>"

  "<0><1>¡Hola!</1></0>"

  react: "<div>text</div> <b>some</b>"
  stripped: "<0>text</0> <1>some</1>"
  translated: "<1>asdf</1> <0>lol</0>"
  translatedMapping: {
    0: lol
    1: asdf
  }



  "<0>text</0> <1>"
  console.log("BEGIN");
  console.log(children);
  console.log(ast);

  const output = mapAST([{ dummy: true, children }], ast);
  console.log("DONE");
  console.log(output);

  React.createElement("div");
}

// TODO not done
function mapAST(reactNodes: any, astNodes: any) {
  return astNodes.reduce(
    (
      intermediateChildrenList: any[],
      currentNode: any,
      currentIndex: number
    ) => {
      if (currentNode.type === "tag") {
        const reactChild = reactNodes[currentIndex];
        if (typeof reactChild === "string") {
          intermediateChildrenList.push(reactChild);
        } else if (hasChildren(reactChild)) {
          const children = getChildren(reactChild);
          const mappedChildren = mapAST(children, currentNode.children);
          const inner =
            hasValidReactChildren(children) && mappedChildren.length === 0
              ? children
              : mappedChildren;

          if (reactChild.dummy) {
            reactChild.children = inner;
          }
          intermediateChildrenList.push(
            React.cloneElement(
              reactChild,
              { ...reactChild.props, key: currentIndex },
              inner
            )
          );
        }
      } else if (currentNode.type === "text") {
        intermediateChildrenList.push(currentNode.content);
      }

      return intermediateChildrenList;
    },
    []
  );
}

export function parseOriginalText(
  children: any,
  currentIndex: { index: number }
) {
  if (typeof children === "object" && children.length) {
    return children
      .map(child => {
        return parseOriginalText(child, currentIndex);
      })
      .join("");
  } else if (typeof children === "object") {
    const openingTag = `<${currentIndex.index}>`;
    const closingTag = `</${currentIndex.index}>`;
    currentIndex.index += 1;
    const grandchildren = getChildren(children);
    return `${openingTag}${parseOriginalText(
      grandchildren,
      currentIndex
    )}${closingTag}`;
  } else if (typeof children === "string") {
    return children;
  }

  return children;
}
