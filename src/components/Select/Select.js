import React, { useEffect, useState } from "react";
import { Select } from "antd";

const SelectComponent = (props) => {
    const { onChangeValue } = props;

    const onSearch = (value) => {
        // Your search logic here
    };

    const [defaultValue, setDefaultValue] = useState("new");

    const options = [
        { value: "new", label: "New" },
        { value: "used", label: "Used" },
    ];

    const handleSelectChange = (value) => {
        setDefaultValue(value);
        const valueToSend = value === "new" ? 0 : 1;
        onChangeValue(valueToSend);
    };

    return (
        <div>
            <br />
            <div style={{ textAlign: "left", marginLeft: "5px" }}>
                <Select
                    style={{ backgroundColor: "#c5c5c5", width: "90px" }}
                    placeholder="Select an option"
                    onChange={handleSelectChange} // Use the custom handler
                    onSearch={onSearch}
                    filterOption={(input, option) =>
                        (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
                    }
                    options={options}
                />
            </div>
            <br />
        </div>
    );
};

export default SelectComponent;
