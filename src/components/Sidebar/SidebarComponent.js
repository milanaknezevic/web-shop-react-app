import React from "react";
import {Button, InputNumber} from "antd";
import CategoryTree from "../CategoryTree/CategoryTree";
import {SearchOutlined} from "@ant-design/icons";
import Select from "../Select/Select";

const SidebarComponent = () => {

    const onChangeValue = (value) => {
        console.log(`selected ${value}`);
    };

    return (
        <div>

            <CategoryTree/>
            <div>
                <div style={{textAlign: 'left', marginBottom: '15px'}}>
                    <label style={{color: 'black', fontSize: '16px', fontWeight: 'bold'}}>Status</label>
                </div>
                <div style={{textAlign: 'left', marginLeft: '5px'}}>
                   <Select onChangeValue={onChangeValue}></Select>
                </div>
                <br/>
            </div>

            <div style={{textAlign: 'left', marginLeft: '5px'}}>

                <div style={{textAlign: 'left', marginBottom: '15px'}}>
                    <label style={{color: 'black', fontSize: '16px', fontWeight: 'bold'}}>Location</label>
                </div>
                <input placeholder={"Location"}/>
                <br/>
                <br/>

            </div>
            <div style={{textAlign: 'left', marginLeft: '5px'}}>

                <div style={{textAlign: 'left', marginBottom: '15px'}}>
                    <label style={{color: 'black', fontSize: '16px', fontWeight: 'bold'}}>Price</label>
                </div>

                <InputNumber min={0} style={{width: '50%'}} placeholder="Price from"/>
                <InputNumber style={{width: '50%'}} placeholder="Price to"/>
                <br/>
                <br/>

            </div>

            <Button style={{backgroundColor: '#41418d'}} type="primary" icon={<SearchOutlined/>}>
                Search
            </Button>


        </div>
    );
};
export default SidebarComponent;