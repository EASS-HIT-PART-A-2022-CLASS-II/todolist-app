import React, { useState, useEffect } from "react";

export const TaskState = ({ handleStatus, name, dbValue }) => {
  const options = [
    { value: "toDo", text: "To Do" },
    { value: "inPrograss", text: "In Prograss" },
    { value: "done", text: "Done" },
  ];

  const [selected, setSelected] = useState("");

  useEffect(() => {
    if (dbValue) {
      console.log(dbValue);
      if (dbValue != selected) {
        setSelected(dbValue);
      }
    }
  }, []);

  const handleChange = (event) => {
    setSelected(event.target.value);
    handleStatus(event.target.value, name);
  };

  return (
    <select value={selected} onChange={handleChange}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.text}
        </option>
      ))}
    </select>
  );
};
