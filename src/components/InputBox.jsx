import React, { useState } from "react";
import "../assets/styles/components/InputBox.scss";

const InputBox = ({ label, type, placeholder, name, value, onChange }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileChange = (event) => {
    const files = event.target.files;
    setSelectedFiles([...files]);
    onChange(event);
  };

  const inputProps = {
    className: type === "file" ? "input_box_container_file_input" : "input_box_container_input",
    type,
    placeholder,
    name,
    value: type === "file" ? null : value, // Set value to null for file input, otherwise use the provided value
    onChange: type === "file" ? handleFileChange : onChange, // Use handleFileChange for file input, otherwise use the provided onChange function
    required: true
  };

  return (
    <div className={`input_box_container${type === "file" ? "_file" : ""}`}>
      <label className={`input_box_container${type === "file" ? "_file" : ""}_label`}>{label}</label>
      <input {...inputProps} accept="image/*" multiple={type === "file"} />
      {selectedFiles.length > 0 && type === "file" && (
        <div className="selected_files_container">
          <strong>Selected Files:</strong>
          <div className="file_list_container">
            {selectedFiles.map((file, index) => (
              <div key={index}>{file.name}</div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default InputBox;
