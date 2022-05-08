import React from 'react';
import './licenseStatus.css';
import rank1 from "./rank_1.svg";
import rank0 from "./rank_0.svg";

const LicenseStatus = ({level}) => {
    const getItem = () => {
        return (level > 10) ? rank1 : rank0;
    }
    return(
        <img className="status-container" alt="" width="120" height="120" src={getItem()}/>
    );
}

export default LicenseStatus;