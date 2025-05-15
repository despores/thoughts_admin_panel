import { meditationsMocks } from "../assets/data/data";
import Meditation from "../types/meditation";

const DELAY = 1000;

const meditations = [...meditationsMocks];

export const meditationsApi = {
    getMeditations: async (): Promise<Meditation[]> => {
        await new Promise(resolve => setTimeout(resolve, DELAY));
        return [...meditations];
    },

    getMeditationById: async (id: number): Promise<Meditation> => {
        await new Promise(resolve => setTimeout(resolve, DELAY));
        
        const meditation = meditations.find(m => m.id === id);
        if (!meditation) {
            throw new Error("Meditation not found");
        }
        return { ...meditation };
    },

    addMeditation: async (meditation: Omit<Meditation, "id">): Promise<Meditation> => {
        await new Promise(resolve => setTimeout(resolve, DELAY));

        const newMeditation: Meditation = {
            ...meditation,
            id: Math.max(...meditations.map(m => m.id), 0) + 1
        };
        meditations.push(newMeditation);
        return { ...newMeditation };
    },

    updateMeditation: async (id: number, meditation: Partial<Meditation>): Promise<Meditation> => {
        await new Promise(resolve => setTimeout(resolve, DELAY));

        const index = meditations.findIndex(m => m.id === id);
        if (index === -1) {
            throw new Error("Meditation not found");
        }

        const updatedMeditation = {
            ...meditations[index],
            ...meditation,
            id 
        };
        meditations[index] = updatedMeditation;
        return { ...updatedMeditation };
    },

    deleteMeditation: async (id: number): Promise<void> => {
        await new Promise(resolve => setTimeout(resolve, DELAY));

        const index = meditations.findIndex(m => m.id === id);
        if (index === -1) {
            throw new Error("Meditation not found");
        }

        meditations.splice(index, 1);
    }
}; 