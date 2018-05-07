import React, { Component } from "react";
import Proptypes from "prop-types";
import API from "../../API";

export default class AsyncSelect extends Component {
  state = {
    buildingTypes: []
  };

  componentDidMount() {
    API.getBuildingTypes().then(data => {
      const buildingTypes = data.data.map(type => {
        return type.name;
      });

      this.setState({ buildingTypes: ["none selected", ...buildingTypes] });
    });
  }

  render() {
    const { buildingTypes } = this.state;
    const { filterChange } = this.props;

    return (
      <select
        name="buildingType"
        style={{ width: 150 }}
        onChange={filterChange}
      >
        {buildingTypes.map(type => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>
    );
  }
}
AsyncSelect.propTypes = {
  filterChange: Proptypes.func.isRequired
};
