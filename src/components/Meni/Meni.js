import React, {useState} from 'react';
import {LogoutOutlined, PlusOutlined, QuestionCircleOutlined, UserOutlined} from '@ant-design/icons';
import {Dropdown, message} from 'antd';
import classes from './Meni.module.css';
import {useDispatch} from 'react-redux';
import {useNavigate} from "react-router-dom";
import {logout} from '../../redux/features/userSlice';
import CustomerSupport from "../../pages/CustomerSupport/CustomerSupport";

const items = [
    {
        label: 'My profile',
        key: '1',
        icon: <UserOutlined/>,
    },
    {
        label: 'New offer',
        key: '2',
        icon: <PlusOutlined/>,
    },
    {
        label: 'Customer support',
        key: '3',
        icon: <QuestionCircleOutlined/>,
    },
    {
        label: 'Log out',
        key: '4',
        icon: <LogoutOutlined/>,
    },
];

const Meni = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [customSupportModal, setCustomSupportModal] = useState(false);
    const onClick = ({key}) => {
        if (key === '1') {
            navigate('/profile');

        } else if (key === '3') {

            setCustomSupportModal(true);

        } else if (key === '4') {
            handleLogout();
        } else {
            message.info(`Click on item ${key}`);
        }
    };

    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
    };

    const handleCloseSupportModal = () => {
        setCustomSupportModal(false);
    };


    return (
        <div>
            <Dropdown menu={{items, onClick}}>
                <a onClick={(e) => e.preventDefault()} className={classes.navLink}>
                    Menu
                </a>
            </Dropdown>
            {customSupportModal && <CustomerSupport show={customSupportModal} onClose={handleCloseSupportModal}/>}
        </div>
    );
};

export default Meni;
