import React, { useEffect, useState } from "react";
import { Select } from "antd";

const SelectComponent = (props) => {
    const { onChangeValue } = props;

    const onSearch = (value) => {
        // Your search logic here
    };

    const [defaultValue, setDefaultValue] = useState("new");



    const handleSelectChange = (value) => {
        setDefaultValue(value);
        console.log("value jeeee " + value);
       onChangeValue(value);
    };

    return (
        <div>
            <br />
            <div style={{ textAlign: "left", marginLeft: "5px" }}>
                <Select
                    style={{ backgroundColor: "#c5c5c5", width: "90px" }}
                    placeholder="Select an option"
                    onChange={handleSelectChange}
                    onSearch={onSearch}
                    filterOption={(input, option) =>
                        (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
                    }
                    options={props.options}
                />
            </div>
            <br />
        </div>
    );
};

export default SelectComponent;
