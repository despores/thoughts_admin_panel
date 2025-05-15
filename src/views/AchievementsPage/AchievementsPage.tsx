import React, { useState } from "react";
import * as styles from "./achievementsPage.module.scss";
import * as commonStyles from "../../theme/common.module.scss";
import { achievementsMocks } from "../../assets/data/data";
import AchievementList from "../../components/AchievementsList/AchievementsList";
import achievementPic from "../../assets/images/add-achievement.svg";
import Modal from "../../components/Modal/Modal";
import AddAchievementForm from "../../components/AddAchievementForm/AddAchievementForm";
import { achievementsApi } from "../../api/achievements";

function AchievementsPage() {
    const [achievements, setAchievements] = useState(achievementsMocks);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleAddSuccess = async () => {
        try {
            const updatedAchievements = await achievementsApi.getAchievements();
            setAchievements(updatedAchievements);
        } catch (error) {
            console.error("Failed to fetch updated achievements:", error);
        }
    };

    return (
        <div>
            <div className={[commonStyles.box, styles.content].join(" ")}>
                <div className={styles.achievements}>
                    <p>Достижения</p>
                    <AchievementList achievements={achievements} />
                </div>
                <div className={styles.addAchievement} onClick={() => setIsModalOpen(true)}>
                    <p>Добавить достижение</p>
                    <img src={achievementPic} alt="Add achievement" />
                </div>
            </div>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <AddAchievementForm
                    onClose={() => setIsModalOpen(false)}
                    onSuccess={handleAddSuccess}
                />
            </Modal>
        </div>
    );
}

export default AchievementsPage;