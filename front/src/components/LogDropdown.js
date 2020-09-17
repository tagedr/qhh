import React from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

export default class LogDropdown extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false,
      logsItems: this.props.logsItems ? this.props.logsItems : []
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.dropdownOpen !== this.state.dropdownOpen) {
      this.setState({
        dropdownOpen: this.state.dropdownOpen
      });
    }
  }

  shouldComponentUpdate(nextProps) {
    if (
      this.state.logsItems.length !== 0 &&
      (this.state.logsItems.length !== nextProps.logsItems.length ||
        this.state.logsItems[this.state.logsItems.length - 1] !==
          nextProps.logsItems.length[nextProps.logsItems.length - 1])
    ) {
      this.setState({
        logsItems: nextProps.logsItems
      });
      return true;
    }
    if (this.state.dropdownOpen !== nextProps.dropdownOpen) {
      return true;
    }
    return false;
  }

  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  render() {
    let listItems = [];
    if (this.state.logsItems.length > 0) {
      this.state.logsItems.array.forEach(element => {
        listItems.push(<DropdownItem>{element.BODY}</DropdownItem>);
      });
    }
    return (
      <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle caret>Dropdown</DropdownToggle>
        <DropdownMenu>{listItems}</DropdownMenu>
      </Dropdown>
    );
  }
}
