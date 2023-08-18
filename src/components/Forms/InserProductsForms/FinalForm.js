import {Button, Form} from "antd";
import classes from "../BuyProductsForms/ThirdStep/ThirdStep.module.css";
import React from "react";


const FinalForm = ({onFinish,isDisabled}) =>
{

    return (
        <div className={classes.container}>
            <h4 style={{textAlign: 'center'}}>This is the final step.</h4>

            <p style={{textAlign: 'center'}}>Please confirm your inputs.</p>
            <div style={{textAlign: "center"}}>
                <button
                    style={{width: "fit-content",height:'fit-content'}}
                    type="submit"
                    onClick={onFinish}
                    disabled={isDisabled}
                >
                    Confirm
                </button>
            </div>
        </div>
    )
}


 export default FinalForm;