import React, { useState } from 'react';
import { Tree } from 'antd';
const treeData = [
    {
        title: '0-0',
        key: '0-0',
        children: [
            {
                title: '0-0-0',
                key: '0-0-0',
                children: [
                    {
                        title: '0-0-0-0',
                        key: '0-0-0-0',
                    },
                    {
                        title: '0-0-0-1',
                        key: '0-0-0-1',
                    },
                    {
                        title: '0-0-0-2',
                        key: '0-0-0-2',
                    },
                ],
            },
            {
                title: '0-0-1',
                key: '0-0-1',
                children: [
                    {
                        title: '0-0-1-0',
                        key: '0-0-1-0',
                    },
                    {
                        title: '0-0-1-1',
                        key: '0-0-1-1',
                    },
                    {
                        title: '0-0-1-2',
                        key: '0-0-1-2',
                    },
                ],
            },
            {
                title: '0-0-2',
                key: '0-0-2',
            },
        ],
    },
    {
        title: '0-1',
        key: '0-1',
        children: [
            {
                title: '0-1-0-0',
                key: '0-1-0-0',
            },
            {
                title: '0-1-0-1',
                key: '0-1-0-1',
            },
            {
                title: '0-1-0-2',
                key: '0-1-0-2',
            },
        ],
    },
    {
        title: '0-2',
        key: '0-2',
    },
];
const CategoryTree = () => {
    const [expandedKeys, setExpandedKeys] = useState([]);
    const [checkedKeys, setCheckedKeys] = useState([]);
    const [selectedKeys, setSelectedKeys] = useState([]);
    const [autoExpandParent, setAutoExpandParent] = useState(true);
    const onExpand = (expandedKeysValue) => {

        // if not set autoExpandParent to false, if children expanded, parent can not collapse.
        // or, you can remove all expanded children keys.
        setExpandedKeys(expandedKeysValue);
        setAutoExpandParent(false);
    };
    const onCheck = (checkedKeysValue) => {

        setCheckedKeys(checkedKeysValue);
    };
    const onSelect = (selectedKeysValue, info) => {

        setSelectedKeys(selectedKeysValue);
    };
    return (
     <div>
         <div  style={{textAlign:'left',marginBottom:'15px',marginTop:'15px' }}>
             <label style={{ color: 'black',fontSize:'16px',fontWeight:'bold' }}>Filter</label>
         </div>
         <Tree
             checkable
             onExpand={onExpand}
             expandedKeys={expandedKeys}
             autoExpandParent={autoExpandParent}
             onCheck={onCheck}
             checkedKeys={checkedKeys}
             onSelect={onSelect}
             selectedKeys={selectedKeys}
             treeData={treeData}
             style={{ backgroundColor: '#e6e6e6' }}
         />
     </div>
    );
};
export default CategoryTree;