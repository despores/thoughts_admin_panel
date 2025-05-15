import React from "react";
import mainLogo from "../../assets/images/MainLogo.svg";
import * as styles from "./logo.module.scss";

const Logo = () => {
    return (
        <div className={styles.logo}>
            <img src={mainLogo} alt="Logo" />
        </div>
    );
};

export default Logo;