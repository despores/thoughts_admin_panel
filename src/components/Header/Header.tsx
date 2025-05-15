import * as commonStyles from "../../theme/common.module.scss";
import * as styles from "./header.module.scss";
import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import Logo from "../Logo/logo";
import { ROUTES } from "../../routes/constants";
import personIcon from "../../assets/images/person-icon.svg";

function Header() {
    const location = useLocation();

    return (
        <header className={styles.header}>
            <div className={commonStyles.container}>
                <nav className={styles.content}>
                    <NavLink to={ROUTES.MAIN}>
                        <Logo />
                    </NavLink>
                    {location.pathname === ROUTES.MAIN || location.pathname === ROUTES.LOGIN
                        ? null
                        : <div className={styles.navContainer}>
                            <NavLink to={ROUTES.NEW}>Добавить медитацию</NavLink>
                            <NavLink to={ROUTES.MEDITATIONS}>Загруженные медитации</NavLink>
                            <NavLink to={ROUTES.NOTIFICATIONS}>Отправить уведомление</NavLink>
                            <NavLink to={ROUTES.ACHIEVMENTS}>Достижения</NavLink>
                        </div>
                    }
                    <div className={styles.right}>
                        <NavLink to={ROUTES.LOGIN}>admin</NavLink>
                        <NavLink to={ROUTES.LOGIN}>
                            <img src={personIcon} alt="icon" />
                        </NavLink>
                    </div>
                </nav>
            </div>
        </header>
    );
}

export default Header; 