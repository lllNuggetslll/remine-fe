import { Component } from "react";
import Proptypes from "prop-types";
import API from "./../../API";
import { buildIndex, applyFilters } from "./filterUtils";

export default class WithFilteredList extends Component {
  state = {
    properties: [],
    filteredList: [],
    index: {}
  };

  componentDidMount() {
    API.getLocations().then(data =>
      this.setState({
        properties: data.data,
        filteredList: data.data,
        index: buildIndex(data.data)
      })
    );
  }

  handleApplyFilter = filters => {
    const { properties, index } = this.state;
    const filteredList = applyFilters({ properties, index, filters });

    this.setState({ filteredList });
  };

  render() {
    const { filteredList } = this.state;
    const { render, ...props } = this.props;

    return render({
      filteredList,
      getFilters: this.handleApplyFilter,
      ...props
    });
  }
}
WithFilteredList.propTypes = {
  render: Proptypes.func.isRequired
};
