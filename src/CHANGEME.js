import React from "react";
import RemineTable from "./components/Table/RemineTable/RemineTable";
import WithFilteredList from "./components/Filters/WithFilteredList";
import FilterContainer from "./components/Filters/FilterContainer";

const Test = () => (
  <WithFilteredList
    render={({ filteredList, getFilters }) => {
      return (
        <div className="testContainer">
          <div className="filterContainer" style={{ margin: "auto" }}>
            <FilterContainer getFilters={getFilters} />
          </div>
          <RemineTable properties={filteredList} />
        </div>
      );
    }}
  />
);

export default Test;
