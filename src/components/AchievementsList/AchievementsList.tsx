import React from "react";
import * as styles from "./achievementsList.module.scss";
import Scroll from "../Scroll/Scroll";
import Achievement from "../../types/achievement";
import AchievementCard from "../AchievementCard/AchievementCard";

function AchievementList({ achievements }: { achievements: Achievement[] }) {
    return (
        <div>
            <Scroll>
                <div className={styles.achievementGrid}>
                    {achievements.map((achievement) => (
                        <AchievementCard key={achievement.id} achievement={achievement} />
                    ))}
                </div>
            </Scroll>
        </div>
    );
}

export default AchievementList;