import { NavLink } from "react-router-dom";
import * as styles from "./main.module.scss";
import * as commonStyles from "../../assets/styles/common.module.scss";
import plusIcon from "../../assets/images/plus-icon.svg";
import addIcon from "../../assets/images/add-icon.svg";
import notifIcon from "../../assets/images/notif-icon.svg";
import achievmentIcon from "../../assets/images/achievment-icon.svg";
import React from "react";
import { ROUTES } from "../../routes/constants";


function MainPage() {

    // let navigate = useNavigate();

    return (
        <>
            <nav className={[commonStyles.box, styles.content].join(" ")}>
                <NavLink to={ROUTES.NEW}>
                    <p>Добавить медитацию</p>
                    <img src={plusIcon} alt="" />
                </NavLink>
                <NavLink to={ROUTES.MEDITATIONS}>
                    <p>Загруженные медитации</p>
                    <img src={addIcon} alt="" />
                </NavLink>
                <NavLink to={ROUTES.NOTIFICATIONS}>
                    <p>Отправить уведомление</p>
                    <img src={notifIcon} alt="" />
                </NavLink>
                <NavLink to={ROUTES.ACHIEVMENTS}>
                    <p>Достижения</p>
                    <img src={achievmentIcon} alt="" />
                </NavLink>
            </nav>
        </>
    );
}

export default MainPage;