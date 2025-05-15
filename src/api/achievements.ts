import { achievementsMocks } from "../assets/data/data";
import Achievement from "../types/achievement";

const DELAY = 1000;

const achievements = [...achievementsMocks];

export const achievementsApi = {
    getAchievements: async (): Promise<Achievement[]> => {
        await new Promise(resolve => setTimeout(resolve, DELAY));
        return [...achievements];
    },

    getAchievementById: async (id: number): Promise<Achievement> => {
        await new Promise(resolve => setTimeout(resolve, DELAY));
        
        const achievement = achievements.find(a => a.id === id);
        if (!achievement) {
            throw new Error("Achievement not found");
        }
        return { ...achievement };
    },

    addAchievement: async (achievement: Omit<Achievement, "id">): Promise<Achievement> => {
        await new Promise(resolve => setTimeout(resolve, DELAY));

        const newAchievement: Achievement = {
            ...achievement,
            id: Math.max(...achievements.map(a => a.id), 0) + 1
        };
        achievements.push(newAchievement);
        return { ...newAchievement };
    },

    updateAchievement: async (id: number, achievement: Partial<Achievement>): Promise<Achievement> => {
        await new Promise(resolve => setTimeout(resolve, DELAY));

        const index = achievements.findIndex(a => a.id === id);
        if (index === -1) {
            throw new Error("Achievement not found");
        }

        const updatedAchievement = {
            ...achievements[index],
            ...achievement,
            id
        };
        achievements[index] = updatedAchievement;
        return { ...updatedAchievement };
    },

    deleteAchievement: async (id: number): Promise<void> => {
        await new Promise(resolve => setTimeout(resolve, DELAY));

        const index = achievements.findIndex(a => a.id === id);
        if (index === -1) {
            throw new Error("Achievement not found");
        }

        achievements.splice(index, 1);
    }
}; 