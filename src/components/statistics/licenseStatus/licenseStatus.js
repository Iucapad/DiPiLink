import React from 'react';
import './licenseStatus.css';

const LicenseStatus = ({level}) => {
    const getItem = () => {
        if (level > 10) return require("./rank_1.svg").default;
        return require("./rank_0.svg").default;
    }
    return(
        <img className="status-container" alt="" width="120" height="120" src={getItem()}/>
    );
}

export default LicenseStatus;