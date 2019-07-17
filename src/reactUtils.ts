import * as HTML from "html-parse-stringify2";
import * as React from "react";

const tagRe = /<(\d+)>(.*)<\/\1>|<(\d+)\/>/;
const nlRe = /(?:\r\n|\r|\n)/g;
const helpTagRe = /(<(\d+)>(.*)<(\/\2)>|<\d+\/>)/g;

const openingTagRe = /<(\d+)>/gm;
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

// Returns a mapping of div # to react node
export function collectReactReferences(
  node: any,
  reactComponentList: React.ReactNode[]
) {
  if (node && typeof node === "object" && node.length) {
    node.forEach(child => {
      if (typeof child === "string") {
        return;
      }

      reactComponentList.push(child);
      collectReactReferences(getChildren(child), reactComponentList);
    });
  }
}

export function renderNodes(children: React.ReactNode, targetPhrase: string) {
  if (!targetPhrase) {
    return [];
  }

  const reactComponentList: React.ReactNode[] = [];
  collectReactReferences(children, reactComponentList);

  const ast = HTML.parse(`<0>${targetPhrase}</0>`);
  return mapAST(ast[0].children, reactComponentList);
}

function myMapAST(children: React.ReactNode, ast: any) {
  return;
}

// TODO not done
function mapAST(astNodes: any, reactNodeReferences: React.ReactNode[]) {
  return astNodes.reduce(
    (
      intermediateChildrenList: any[],
      currentNode: any,
      currentIndex: number
    ) => {
      if (currentNode.type === "tag") {
        const reactChild: any =
          reactNodeReferences[parseInt(currentNode.name, 10) - 1];

        if (!currentNode.children || !currentNode.children.length) {
          intermediateChildrenList.push(reactChild);
        } else {
          const mappedChildren = mapAST(
            currentNode.children,
            reactNodeReferences
          );
          intermediateChildrenList.push(
            React.cloneElement(
              reactChild,
              { ...reactChild.props, key: currentNode.name },
              mappedChildren
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
