import styled from "@emotion/styled";
import * as React from "react";

type Props = {
  onClickOutside: () => void;
  onClick: (event: any) => any;
};

/**
 * Component that alerts if you click outside of it
 * https://stackoverflow.com/questions/32553158/detect-click-outside-react-component
 */
export default class ClickOutside extends React.Component<Props> {
  wrapperRef: any;

  constructor(props: Props) {
    super(props);

    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  /**
   * Set the wrapper ref
   */
  setWrapperRef(node: any) {
    this.wrapperRef = node;
  }

  /**
   * Alert if clicked on outside of element
   */
  handleClickOutside(event: any) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.props.onClickOutside();
    }
  }

  render() {
    return (
      <ContextMenu onClick={this.props.onClick} ref={this.setWrapperRef}>
        {this.props.children}
      </ContextMenu>
    );
  }
}

const ContextMenu = styled.div`
  height: 50px;
  width: 50px;
  position: absolute;
  background-color: #ff0000;
`;
