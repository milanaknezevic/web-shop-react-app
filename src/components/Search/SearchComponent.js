import React from "react";
import {Input, Space} from "antd";
import classes from './Search.module.css';

const {Search} = Input;

const SearchBar = (props) => {
    const {onSearch} = props;
    return (
        <div className={classes.center}>
            <div className={classes.centerSpace}>
                <Space direction="vertical" style={{width: "40%", margin: '2px'}}>
                    <Search
                        allowClear
                        placeholder="Search..."
                        onSearch={onSearch}
                    />
                </Space>
            </div>
        </div>
    );
};

export default SearchBar;
