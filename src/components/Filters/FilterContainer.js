import React, { Component } from "react";
import Proptypes from "prop-types";
import AsyncSelect from "./AsyncSelect";
import InputField from "./InputField";
import isEqual from "lodash/isEqual";
const INITIAL_State = {
  buildingType: "none selected",
  minBeds: null,
  maxBeds: null,
  minBaths: null,
  maxBaths: null
};

export default class FilterContainer extends Component {
  state = INITIAL_State;

  componentDidUpdate() {
    const { getFilters } = this.props;

    getFilters(this.state);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !isEqual(this.props, nextProps) || !isEqual(this.state, nextState);
  }

  handleFilterChange = e => {
    const { name, value } = e.target;

    this.setState({ [name]: value === "" ? null : value });
  };

  render() {
    const { minBeds, maxBeds, minBaths, maxBaths } = this.state;

    return (
      <div style={{ display: "flex" }}>
        <AsyncSelect filterChange={this.handleFilterChange} />
        <div>
          beds
          <div style={{ display: "flex" }}>
            <div>
              <div>min</div>
              <InputField
                name={"minBeds"}
                max={maxBeds}
                filterChange={this.handleFilterChange}
              />
            </div>
            <div>
              <div>max</div>
              <InputField
                name={"maxBeds"}
                min={minBeds}
                filterChange={this.handleFilterChange}
              />
            </div>
          </div>
        </div>
        <div>
          Baths
          <div style={{ display: "flex" }}>
            <div>
              <div>min</div>
              <InputField
                name={"minBaths"}
                max={maxBaths}
                filterChange={this.handleFilterChange}
              />
            </div>
            <div>
              <div>max</div>
              <InputField
                name={"maxBaths"}
                min={minBaths}
                filterChange={this.handleFilterChange}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
FilterContainer.propTypes = {
  getFilters: Proptypes.func.isRequired
};
