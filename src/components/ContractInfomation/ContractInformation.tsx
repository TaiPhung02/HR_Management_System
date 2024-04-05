import React from "react";
import "./contractInformation.css";

const ContractInformation = () => {
    return (
        <div className="addnew-container">
            <div className="addnew__header">
                <h2 className="addnew__header-heading">Contract Information</h2>
                <p className="addnew__header-desc">
                    Required (<span className="required">*</span>)
                </p>
            </div>
            <div className="addnew__header-line"></div>
            <div className="addnew__contract"></div>
        </div>
    );
};

export default ContractInformation;
