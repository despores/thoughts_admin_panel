export interface Notification {
    id: number;
    title: string;
    message: string;
    createdAt: string;
    status: "sent" | "failed";
}

const mockNotifications: Notification[] = [
    {
        id: 1,
        title: "Новая медитация",
        message: "Добавлена новая медитация 'Спокойствие'",
        createdAt: new Date().toISOString(),
        status: "sent"
    }
];

const MOCK_DELAY = 1000;

export const notificationsApi = {
    sendNotification: async (title: string, message: string): Promise<Notification> => {
        await new Promise(resolve => setTimeout(resolve, MOCK_DELAY));

        const newNotification: Notification = {
            id: mockNotifications.length + 1,
            title,
            message,
            createdAt: new Date().toISOString(),
            status: "sent"
        };
        mockNotifications.push(newNotification);
        return newNotification;
    },

    getNotifications: async (): Promise<Notification[]> => {
        await new Promise(resolve => setTimeout(resolve, MOCK_DELAY));
        return [...mockNotifications];
    },

    getNotificationById: async (id: number): Promise<Notification> => {
        await new Promise(resolve => setTimeout(resolve, MOCK_DELAY));
        
        const notification = mockNotifications.find(n => n.id === id);
        if (!notification) {
            throw new Error("Notification not found");
        }
        return notification;
    },

    deleteNotification: async (id: number): Promise<void> => {
        await new Promise(resolve => setTimeout(resolve, MOCK_DELAY));

        const index = mockNotifications.findIndex(n => n.id === id);
        if (index === -1) {
            throw new Error("Notification not found");
        }
        mockNotifications.splice(index, 1);
    }
}; 