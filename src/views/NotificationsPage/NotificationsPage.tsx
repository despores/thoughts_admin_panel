import React from "react";
import * as styles from "./notificationsPage.module.scss";
import * as commonStyles from "../../assets/styles/common.module.scss";

function NotificationsPage() {

    const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        alert("Уведомление отправлено");
    };

    return (
        <div className={[commonStyles.box, styles.content].join(" ")}>
            <form>
                <p>Отправить уведомление</p>
                <textarea required placeholder="Название уведомления" />
                <textarea required placeholder="Текст уведомления" />
                <button onClick={handleButtonClick}>Отправить</button>
            </form>
        </div>
    );
}

export default NotificationsPage;