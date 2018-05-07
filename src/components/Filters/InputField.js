import React from "react";

const InputField = ({ name, filterChange, min }) => (
  <input type="number" name={name} min={0} onChange={filterChange} />
);

export default InputField;
