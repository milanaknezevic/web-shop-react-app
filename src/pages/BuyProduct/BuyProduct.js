import {Modal, Steps} from 'antd';
import {useDispatch} from "react-redux";
import React, {useState} from "react";
import FirstStep from "../../components/Forms/BuyProductsForms/FirstStep/FirstStep";
import SecondStep from "../../components/Forms/BuyProductsForms/SecondStep/SecondStep";
import ThirdStep from "../../components/Forms/BuyProductsForms/ThirdStep/ThirdStep";
import {purchaseProduct} from "../../redux/features/productSlice";

const BuyProduct = ({show, onClose, product}) => {
    const dispatch = useDispatch();
    const handleClick = (e) => {
        e.stopPropagation();
    };

    const [isDisabled, setIsDisabled] = useState(false);


    const [currentPage, setCurrentPage] = useState(0);
    const [generalDetails, setGeneralDetails] = useState({});
    const [secondStepDetails, setSecondStepDetails] = useState({});

    const onFinishedGeneral = (values) => {
        console.log("gerneral zavrsen " + values)
        setGeneralDetails(values);
        setCurrentPage(1);
    }
    const onFinishedSecondStep = (values) => {
        console.log("second zavrsen " + JSON.stringify(values))
        setSecondStepDetails(values);
        setCurrentPage(2);
    }
    const onFinishedThirdStep = (values) => {
        setIsDisabled(true)
        dispatch(purchaseProduct({id: product.id}));
        setTimeout(() => {
            setIsDisabled(false);
            onClose();
        }, 1000);
    }

    const isStepDisabled = (number) => {
        if (number === 0) {
            return false;
        }
        if (number === 1) {
            return Object.keys(generalDetails).length === 0;
        }
        if (number === 2) {
            return generalDetails === null || Object.keys(secondStepDetails).length === 0;
        }

    }
    const forms = [
        <FirstStep onFinish={onFinishedGeneral} product={product}/>,
        <SecondStep onFinish={onFinishedSecondStep} initialValues={secondStepDetails}/>,
        <ThirdStep onFinish={onFinishedThirdStep} isDisabled={isDisabled}/>
    ]

    return (
        <>
            <Modal width="40%" maskClosable={false}
                   title={<div style={{textAlign: 'center', fontSize: '20px'}}>Buy product</div>} footer={[]}
                   open={show} onCancel={onClose} bodyStyle={{maxHeight: '410px', overflowY: 'auto', width: "100%"}}>
                <Steps onChange={setCurrentPage} current={currentPage}>
                    <Steps.Step disabled={isStepDisabled(0)}></Steps.Step>
                    <Steps.Step disabled={isStepDisabled(1)}></Steps.Step>
                    <Steps.Step disabled={isStepDisabled(2)}></Steps.Step>
                </Steps>
                {forms[currentPage]}
            </Modal>
        </>
    );
};
export default BuyProduct;