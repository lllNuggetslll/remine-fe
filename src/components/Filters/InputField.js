import React from "react";
import Proptypes from "prop-types";

const InputField = ({ name, filterChange, min, max }) => {
  let msg = "Enter number";
  if (min) msg = `Must ${min} or more`;
  if (max) msg = `Must ${max} or less`;

  return (
    <input
      type="number"
      name={name}
      min={0}
      placeholder={msg}
      onChange={filterChange}
    />
  );
};
InputField.propTypes = {
  name: Proptypes.string.isRequired,
  filterChange: Proptypes.func.isRequired,
  min: Proptypes.string,
  max: Proptypes.string
};

export default InputField;
