import React from "react";
import * as styles from "./achievementsPage.module.scss";
import * as commonStyles from "../../assets/styles/common.module.scss";
import { achievementsMocks } from "../../assets/mocks/mocks";
import AchievementList from "../../components/AchievementsList/AchievementsList";
import achievementPic from "../../assets/images/add-achievement.svg";

function AchievementsPage() {

    return (
        <div>
            <div className={[commonStyles.box, styles.content].join(" ")}>
                <div className={styles.achievements}>
                    <p>Достижения</p>
                    <AchievementList achievements={achievementsMocks} />
                </div>
                <div className={styles.addAchievement}>
                    <p>Добавить достижение</p>
                    <img src={achievementPic} alt="" />
                </div>
            </div>
        </div>
    );
}

export default AchievementsPage;