import {Modal, Steps} from 'antd';
import React, {useState} from "react";
import {useDispatch} from "react-redux";
import FirstForm from "../../components/Forms/InserProductsForms/FirstForm";
import SecondForm from "../../components/Forms/InserProductsForms/SecondForm";
import ThirdForm from "../../components/Forms/InserProductsForms/ThirdForm";
import FourthForm from "../../components/Forms/InserProductsForms/FourthForm";
import FinalForm from "../../components/Forms/InserProductsForms/FinalForm";
import {insertImages} from "../../api/auth.service";
import {insertProduct} from "../../redux/features/productSlice";

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
        setFourthStepDetails(values.images);
        setCurrentPage(4);
        console.log("onFinishedFourth aaaa " + values.images);
        console.log("onFinishedFourth fourthStepDetails " + fourthStepDetails);
    };
    const handleFormSubmit = async (values) => {
        setIsDisabled(true)
        const responseImages = await insertImages(fourthStepDetails);
        const imagesRequests = responseImages.data.map(imageName => {
            return {slikaProizvoda: imageName};
        });

        const resultAttributes = Object.entries(thirdStepDetails).map(([attributId, value]) => ({
            vrijednost: value,
            attributId: parseInt(attributId)
        }));
        console.log("imagesRequests " + JSON.stringify(imagesRequests));
        console.log("resultAttributes " + JSON.stringify(resultAttributes));
        const productData = {
            naslov: firstStepDetails.naslov,
            opis: firstStepDetails.opis,
            cijena: firstStepDetails.cijena,
            stanje: firstStepDetails.stanje,
            lokacija: firstStepDetails.grad,
            kontakt: firstStepDetails.kontakt,
            kategorijaId: secondStepDetails.category,
            slikas: imagesRequests,
            proizvodAtributs: resultAttributes
        };
        console.log("productRequest " + JSON.stringify(productData));

        dispatch(insertProduct({productData: productData}));
        setTimeout(() => {
            setIsDisabled(false);
            onClose();
        }, 1000);
    };
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
                   categoryId={secondStepDetails && secondStepDetails.category !== undefined ? secondStepDetails.category : 0}/>,
        <FourthForm onFinish={onFinishedFourth}/>,
        <FinalForm onFinish={handleFormSubmit} isDisabled={isDisabled}/>
    ]

    return (
        <>
            <Modal width="40%" maskClosable={false}
                   title={<div style={{textAlign: 'center', fontSize: '20px'}}>Add new product</div>} footer={[]}
                   open={show} onCancel={onClose} bodyStyle={{maxHeight: '410px', overflowY: 'auto', width: "100%"}}>
                <Steps onChange={setCurrentPage} current={currentPage}>
                    <Steps.Step disabled={isStepDisabled(0)} title='General'></Steps.Step>
                    <Steps.Step disabled={isStepDisabled(1)} title='Category'></Steps.Step>
                    <Steps.Step disabled={isStepDisabled(2)} title='Attribute'></Steps.Step>
                    <Steps.Step disabled={isStepDisabled(3)} title='Images'></Steps.Step>
                    <Steps.Step disabled={isStepDisabled(4)} title='Final'></Steps.Step>
                </Steps>
                {forms[currentPage]}
            </Modal>
        </>
    );
};
export default InsertProduct;