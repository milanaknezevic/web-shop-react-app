import {Modal, Steps} from 'antd';
import React, {useState} from "react";
import {useDispatch} from "react-redux";
import FirstForm from "../../components/Forms/InserProductsForms/FirstForm";
import SecondForm from "../../components/Forms/InserProductsForms/SecondForm";
import ThirdForm from "../../components/Forms/InserProductsForms/ThirdForm";
import FourthForm from "../../components/Forms/InserProductsForms/FourthForm";
import FinalForm from "../../components/Forms/InserProductsForms/FinalForm";

const InsertProduct = ({show, onClose}) => {
    const [isDisabled, setIsDisabled] = useState(false);
    const [statusCode, setStatusCode] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const dispatch = useDispatch();
    const [firstStepDetails, setFirstStepDetails] = useState(null);
    const [secondStepDetails, setSecondStepDetails] = useState(null);
    const [thirdStepDetails, setThirdStepDetails] = useState(null);
    const [fourthStepDetails, setFourthStepDetails] = useState(null);
    const handleClick = (e) => {
        e.stopPropagation();
    };
    const onFinishedFirst = (values) => {
        setFirstStepDetails(values);
        setCurrentPage(1);
        console.log("onFinishedFirst  " + JSON.stringify(values));
    }
    const onFinishedSecond = (values) => {
        setSecondStepDetails(values);
        setCurrentPage(2);
        console.log("onFinishedSecondStepDetails  " + JSON.stringify(values));

    }
    const onFinishedThird = (values) => {
        setThirdStepDetails(values);
        setCurrentPage(3);
        console.log("onFinishedThird  " + JSON.stringify(values));
    }
    const onFinishedFourth = (values) => {
        setFourthStepDetails(values);
        setCurrentPage(4);
        console.log("onFinishedFourth  " + values);
    }
    const handleFormSubmit = (values) =>
    {

    }
    const isStepDisabled = (number) => {
        if (number === 0) {
            return false;
        }
        if (number === 1) {
            return firstStepDetails === null;
        }
        if (number === 2) {
            return firstStepDetails === null || secondStepDetails === null
        }
        if (number === 3) {
            return firstStepDetails === null || secondStepDetails === null || thirdStepDetails === null
        }
        if (number === 4) {
            return firstStepDetails === null || secondStepDetails === null || thirdStepDetails === null || fourthStepDetails === null
        }
    }
    const forms = [
        <FirstForm onFinish={onFinishedFirst} initialValues={firstStepDetails}/>,
        <SecondForm onFinish={onFinishedSecond} initialValues={secondStepDetails}/>,
        <ThirdForm onFinish={onFinishedThird} initialValues={thirdStepDetails}
                   categoryId={secondStepDetails !== null ? secondStepDetails.category : 0}/>,
        <FourthForm onFinish={onFinishedFourth} />,
        <FinalForm onFinish={handleFormSubmit} isDisabled={isDisabled}/>
    ]

    return (
        <>
            <Modal width="40%" maskClosable={false}
                   title={<div style={{textAlign: 'center', fontSize: '20px'}}>Add new product</div>} footer={[]}
                   open={show} onCancel={onClose} bodyStyle={{maxHeight: '410px', overflowY: 'auto', width: "100%"}}>
                <Steps onChange={setCurrentPage} current={currentPage}>
                    <Steps.Step title='General'></Steps.Step>
                    <Steps.Step title='Category'></Steps.Step>
                    <Steps.Step title='Attribute'></Steps.Step>
                    <Steps.Step title='Images'></Steps.Step>
                    <Steps.Step  title='Final'></Steps.Step>
                </Steps>
                {forms[currentPage]}
            </Modal>
        </>
    );
};
export default InsertProduct;