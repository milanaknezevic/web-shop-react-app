import React from "react";
import {Button, InputNumber} from "antd";
import CategoryTree from "../CategoryTree/CategoryTree";
import { SearchOutlined } from "@ant-design/icons";
import classes from './SideBar.module.css'
import Select from "../Select/Select";

const SidebarComponent = () => {

    const onChangeValue = (value) => {
        console.log(`selected ${value}`);
    };

    return (
     <div>
         <div className={classes.container}>

             <CategoryTree/>
             <br/>
             <div>
                 <div style={{textAlign: 'left', }}>
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


         </div>
         <div style={{ textAlign: 'center', padding: '1rem' }}>
             <Button className={classes.dugme} type="primary" icon={<SearchOutlined />} style={{ whiteSpace: 'normal' }}>
                Search
             </Button>
         </div>

     </div>
    );
};

export default SidebarComponent;
