import React from "react";
import { Dropdown } from "semantic-ui-react";

// TODO: This is missing functionality for sub-menu here from SUI core examples.
// The "Publish To Web" item should contain a sub-menu.
class DropdownEx extends React.Component {
  render() {
    const { func, downloadPlaylist } = this.props;
    return (
      <Dropdown text="Opções">
        <Dropdown.Menu>
          <Dropdown.Item
            icon="trash"
            text="Deletar playlist"
            onClick={() => func()}
          />
          <Dropdown.Divider />
          <Dropdown.Item
            text="Baixar playlist"
            onClick={() => downloadPlaylist()}
          />
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}

export default DropdownEx;
