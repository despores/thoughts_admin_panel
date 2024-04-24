import * as styles from "./login.module.scss";
import * as commonStyles from "../../assets/styles/common.module.scss";
import React from "react";
import Logo from "../../components/Logo/logo";
import { NavLink, useNavigate } from "react-router-dom";
import { ROUTES } from "../../routes/constants";


function LoginPage() {

    const navigate = useNavigate();

    const handleLogin = () => {
        // Add your login logic here
        navigate(ROUTES.MAIN);
    };

    return (
        <>
            <nav className={styles.logo}>
                <NavLink to={ROUTES.LOGIN}>
                    <Logo />
                </NavLink>
            </nav>
            <div className={[commonStyles.box, styles.content].join(" ")}>
                <p>Вход</p>
                <form onSubmit={handleLogin}>
                    <input
                     type="text" 
                     placeholder="Login" 
                     aria-d
                     />
                    <input type="password" placeholder="Password" />
                    <button onClick={handleLogin}>Login</button>
                </form>
            </div>
        </>

    );
}

export default LoginPage;