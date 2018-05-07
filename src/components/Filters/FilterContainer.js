import React, { Component } from "react";
import Proptypes from "prop-types";
import Select from "./Select";
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
    console.log(value);
    this.setState({ [name]: value });
  };

  handleResetFilters = () => {
    this.setState(INITIAL_State);
  };

  render() {
    const inputField = name => {
      return (
        <input
          type="number"
          name={name}
          min={0}
          onChange={this.handleFilterChange}
        />
      );
    };

    return (
      <div style={{ display: "flex" }}>
        <Select filterChange={this.handleFilterChange} />
        <div>
          beds
          <div style={{ display: "flex" }}>
            <div>
              <div>min</div>
              {inputField("minBeds")}
            </div>
            <div>
              <div>max</div>
              {inputField("maxBeds")}
            </div>
          </div>
        </div>
        <div>
          Baths
          <div style={{ display: "flex" }}>
            <div>
              <div>min</div>
              {inputField("minBaths")}
            </div>
            <div>
              <div />
              <div>max</div>
              {inputField("maxBaths")}
            </div>
          </div>
        </div>
        <button onClick={this.handleResetFilters}>reset</button>
      </div>
    );
  }
}
FilterContainer.propTypes = {
  getFilters: Proptypes.func.isRequired
};
