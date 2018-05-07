import React from "react";
import Proptypes from "prop-types";

const InputField = ({ name, filterChange, value, min, max }) => {
  let msg = "Enter number";
  if (min) msg = `Must be ${min} or more`;
  if (max) msg = `Must be ${max} or less`;

  return (
    <input
      type="number"
      name={name}
      value={value || ""}
      min={0}
      placeholder={msg}
      onChange={filterChange}
    />
  );
};
InputField.propTypes = {
  name: Proptypes.string.isRequired,
  filterChange: Proptypes.func.isRequired,
  value: Proptypes.string,
  min: Proptypes.string,
  max: Proptypes.string
};

export default InputField;
