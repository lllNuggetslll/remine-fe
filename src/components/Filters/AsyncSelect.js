import React, { Component } from "react";
import Proptypes from "prop-types";
import API from "../../API";

export default class AsyncSelect extends Component {
  state = {
    buildingTypes: ["none selected"]
  };

  componentDidMount() {
    const { buildingTypes } = this.state;

    API.getBuildingTypes().then(data => {
      const newBuildingTypes = data.data.map(type => {
        return type.name;
      });

      this.setState({ buildingTypes: [...buildingTypes, ...newBuildingTypes] });
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
