import * as React from "react";
import LangContext, { LangContextValue } from "./Context";
import * as hoistNonReactStatics_ from "hoist-non-react-statics";
const hoistNonReactStatics: typeof hoistNonReactStatics_ = require("hoist-non-react-statics");

function getDisplayName(Component: React.ComponentType<any>) {
  return Component.displayName || Component.name || "Component";
}

export type WrappedComponentProps<IntlPropName extends string = "intl"> = {
  [k in IntlPropName]: any;
};

export type WithIntlProps<P> = Omit<P, keyof WrappedComponentProps> & {
  forwardedRef?: React.Ref<any>;
};

export interface Opts<IntlPropName extends string = "intl"> {
  intlPropName?: IntlPropName;
  forwardRef?: boolean;
  enforceContext?: boolean;
}

export default function injectLang<
  IntlPropName extends string = "intl",
  P extends WrappedComponentProps<IntlPropName> = WrappedComponentProps<any>
>(
  WrappedComponent: React.ComponentType<P>,
  options?: Opts<IntlPropName>
): React.ComponentType<WithIntlProps<P>> & {
  WrappedComponent: typeof WrappedComponent;
} {
  const { intlPropName = "intl", forwardRef = false } =
    options || {};

  const WithIntl: React.FC<P & { forwardedRef?: React.Ref<any> }> & {
    WrappedComponent: typeof WrappedComponent;
  } = props => {
    return (
      <LangContext.Consumer>
        {(value?: LangContextValue) => {
          // TODO fix these typings
          if (!value) {
            return (
              <WrappedComponent
                {...props}
                ref={forwardRef ? props.forwardedRef : null}
              />
            );
          }
          const { client, currentLanguage } = value;
          return (
            <WrappedComponent
              {...props}
              {...({
                [intlPropName]: "Df",
                client,
                currentLanguage
              } as any)}
              ref={forwardRef ? props.forwardedRef : null}
            />
          );
        }}
      </LangContext.Consumer>
    );
  };

  WithIntl.displayName = `injectLang(${getDisplayName(WrappedComponent)})`;
  WithIntl.WrappedComponent = WrappedComponent;

  if (forwardRef) {
    return hoistNonReactStatics(
      React.forwardRef((props: P, ref) => (
        <WithIntl {...props} forwardedRef={ref} />
      )),
      WrappedComponent
    ) as any;
  }

  return hoistNonReactStatics(WithIntl, WrappedComponent) as any;
}
