import React from "react";
import * as styles from "./achievementCard.module.scss";
import Achievement from "../../types/achievement";
import cover from "../../assets/images/achievement-image.svg";

function AchievementCard({ achievement }: { achievement: Achievement }) {

    return (
        <div className={styles.content}>
            <img src={cover} alt="icon" />
            <h1>{achievement.title}</h1>
            <p>{achievement.description}</p>
        </div>
    );
}

export default AchievementCard;