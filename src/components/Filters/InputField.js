import React from "react";

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

export default InputField;
