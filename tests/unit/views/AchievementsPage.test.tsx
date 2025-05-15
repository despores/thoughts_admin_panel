import * as React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import AchievementsPage from "../../../src/views/AchievementsPage/AchievementsPage";
import { achievementsApi } from "../../../src/api/achievements";
import { achievementsMocks } from "../../../src/assets/data/data";
import "@testing-library/jest-dom";

jest.mock("../../../src/api/achievements", () => ({
    achievementsApi: {
        getAchievements: jest.fn(),
        addAchievement: jest.fn(),
    }
}));

jest.mock("../../../src/assets/data/data", () => ({
    achievementsMocks: [
        { id: 1, title: "Achievement 1", description: "Description 1", icon: "icon1.png" },
        { id: 2, title: "Achievement 2", description: "Description 2", icon: "icon2.png" },
    ]
}));

describe("AchievementsPage", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should render achievements list and add button", () => {
        render(<AchievementsPage />);

        expect(screen.getByText("Достижения")).toBeInTheDocument();

        expect(screen.getByText("Achievement 1")).toBeInTheDocument();
        expect(screen.getByText("Achievement 2")).toBeInTheDocument();

        expect(screen.getByText("Добавить достижение")).toBeInTheDocument();
        expect(screen.getByAltText("Add achievement")).toBeInTheDocument();
    });

    it("should open modal when clicking add achievement button", () => {
        render(<AchievementsPage />);

        const addButton = screen.getByText("Добавить достижение");
        fireEvent.click(addButton);

        expect(screen.getByText("Добавить достижение", { selector: "h2" })).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Название достижения")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Описание достижения")).toBeInTheDocument();
    });

    it("should close modal when clicking close button", () => {
        render(<AchievementsPage />);

        const addButton = screen.getByText("Добавить достижение");
        fireEvent.click(addButton);

        const closeButton = screen.getByText("Отмена");
        fireEvent.click(closeButton);

        expect(screen.queryByText("Добавить достижение", { selector: "h2" })).not.toBeInTheDocument();
    });

    it("should update achievements list after successful addition", async () => {
        const updatedAchievements = [
            ...achievementsMocks,
            { id: 3, title: "New Achievement", description: "New Description", icon: "new-icon.png" }
        ];

        (achievementsApi.addAchievement as jest.Mock).mockResolvedValueOnce({});
        (achievementsApi.getAchievements as jest.Mock).mockResolvedValueOnce(updatedAchievements);

        render(<AchievementsPage />);

        const addButton = screen.getByText("Добавить достижение");
        fireEvent.click(addButton);

        const titleInput = screen.getByPlaceholderText("Название достижения");
        const descriptionInput = screen.getByPlaceholderText("Описание достижения");

        fireEvent.change(titleInput, { target: { value: "New Achievement" } });
        fireEvent.change(descriptionInput, { target: { value: "New Description" } });

        const submitButton = screen.getByText("Добавить", { selector: "button[type=\"submit\"]" });
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(achievementsApi.addAchievement).toHaveBeenCalledWith({
                title: "New Achievement",
                description: "New Description"
            });
            expect(achievementsApi.getAchievements).toHaveBeenCalled();
        });
    });

    it("should handle error when adding achievement", async () => {
        const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => undefined);
        (achievementsApi.addAchievement as jest.Mock).mockRejectedValueOnce(new Error("Add failed"));

        render(<AchievementsPage />);

        const addButton = screen.getByText("Добавить достижение");
        fireEvent.click(addButton);

        const titleInput = screen.getByPlaceholderText("Название достижения");
        const descriptionInput = screen.getByPlaceholderText("Описание достижения");

        fireEvent.change(titleInput, { target: { value: "Test Achievement" } });
        fireEvent.change(descriptionInput, { target: { value: "Test Description" } });

        const submitButton = screen.getByText("Добавить", { selector: "button[type=\"submit\"]" });
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(consoleErrorSpy).toHaveBeenCalledWith(
                "Failed to add achievement:",
                expect.any(Error)
            );
            expect(achievementsApi.getAchievements).not.toHaveBeenCalled();
        });

        consoleErrorSpy.mockRestore();
    });
}); 