import React, { Component } from "react";
import Proptypes from "prop-types";
import API from "../../API";

export const NONE_SELECTED = "noneSelected";
const OPTION_MAP = {
  noneSelected: "None Selected",
  multiFamily: "Multi Family",
  condo: "Condo",
  business: "Business",
  office: "Office",
  singleFamily: "Single Family"
};

export default class AsyncSelect extends Component {
  state = {
    buildingTypes: [NONE_SELECTED]
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
    const { optionMap, filterChange, value } = this.props;

    return (
      <select
        name="buildingType"
        value={value || ""}
        style={{ width: 150 }}
        onChange={filterChange}
      >
        {buildingTypes.map(type => (
          <option key={type} value={type}>
            {optionMap[type]}
          </option>
        ))}
      </select>
    );
  }
}
AsyncSelect.propTypes = {
  optionMap: Proptypes.object.isRequired,
  filterChange: Proptypes.func.isRequired,
  value: Proptypes.string
};
AsyncSelect.defaultProps = {
  optionMap: OPTION_MAP
};
