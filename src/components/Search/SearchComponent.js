import React from "react";
import {Input, Space} from "antd";
import classes from './Search.module.css';
import {CgMathPlus} from "react-icons/cg";
import {PlusOutlined} from "@ant-design/icons";
const {Search} = Input;

const SearchBar = (props) => {
    const {onSearch} = props;

    return (
        <div className={classes.center}>
            <div className={classes.spaceComp}>
                <div className={classes.spaceComp}>
                    <div className={classes.centerSpace}>
                        <Space direction="vertical" style={{width: "40%"}}>
                            <Search
                                allowClear
                                placeholder="Search..."
                                onSearch={onSearch}
                            />
                        </Space>
                    </div>
                </div>
            </div>
            <button className={classes.dugme}>
                <PlusOutlined size={15} className="cart"/>
                New offer
            </button>
        </div>
    );
};

export default SearchBar;
