import React, { useEffect, useState } from "react";

const RequiredField = ({
  name,
  label,
  register,
  setValue,
  errors,
  getValue,
}) => {
  const [requirement, setRequirement] = useState("");
  const [requirementList, setRequirementList] = useState([]);

  useEffect(() => {
    register(name, {
      required: true,
      validate: (value) => value.length > 0,
    });
  }, []);

  useEffect(() => {
    setValue(name, requirementList);
  }, [requirementList]);

  const handleAddRequirement = () => {
    if (requirement) {
      console.log(requirement);
      setRequirementList([...requirementList, requirement]);
      setRequirement("");
    }
  };

  const handleRemoveRequirement = (index) => {
    const updatedRequirementList = [...requirementList];
    updatedRequirementList.splice(index, 1);
    setRequirementList(updatedRequirementList);
  };
  return (
    <div>
      <label htmlFor={name}>
        {label} <sup>*</sup>
      </label>
      <div>
        <input
          type="text"
          value={requirement}
          id={name}
          onChange={(e) => setRequirement(e.target.value)}
          className="w-full"
        />
        <button
          type="button"
          className="font-semibold text-amber-400"
          onClick={handleAddRequirement}
        >
          Add
        </button>
      </div>

      {requirementList.length > 0 && (
        <ul>
          {requirementList.map((requirement, index) => (
            <li key={index} className="flex items-center text-black">
              <span>{requirement}</span>
              <button
                type="button"
                className="ml-2 text-xs text-gray-800 "
                onClick={() => handleRemoveRequirement(index)}
              >
                clear
              </button>
            </li>
          ))}
        </ul>
      )}
      {errors[name] && <span>{label} is required !</span>}
    </div>
  );
};

export default RequiredField;
