import React, { useState } from "react";
import * as styles from "./search.module.scss";
import Scroll from "../Scroll/Scroll";
import Achievement from "../../types/achievement";
import AchievementCard from "../AchievementCard/AchievementCard";

function AchievementList({ achievements }: { achievements: Achievement[] }) {


    return (
        <div>
            <Scroll>
                <div>
                    {Array.from(achievements.entries()).map(([key, achievement]) => (
                        <AchievementCard key={key} achievement={achievement} />
                    ))}
                </div>
            </Scroll>
        </div>
    );
}

export default AchievementList;