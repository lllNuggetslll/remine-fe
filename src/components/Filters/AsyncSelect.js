import React, { Component } from "react";
import Proptypes from "prop-types";
import API from "../../API";

export const NONE_SELECTED = "none selected";

export default class AsyncSelect extends Component {
  state = {
    buildingTypes: []
  };

  componentDidMount() {
    API.getBuildingTypes()
      .then(data => {
        const buildingTypes = data.data.map(type => {
          return type.name;
        });

        this.setState({ buildingTypes: [NONE_SELECTED, ...buildingTypes] });
      })
      .catch(err => console.log(new Error(err)));
  }

  render() {
    const { buildingTypes } = this.state;
    const { filterChange, value } = this.props;

    return (
      <select
        name="buildingType"
        value={value || ""}
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
  filterChange: Proptypes.func.isRequired,
  value: Proptypes.string
};
