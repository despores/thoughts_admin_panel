import * as React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { toast } from "react-toastify";
import NotificationsPage from "../../../src/views/NotificationsPage/NotificationsPage";
import { notificationsApi } from "../../../src/api/notifications";
import "@testing-library/jest-dom";

jest.mock("react-toastify");
jest.mock("../../../src/api/notifications", () => ({
    notificationsApi: {
        sendNotification: jest.fn(),
    },
}));

describe("NotificationsPage", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should show validation errors when submitting empty form", async () => {
        render(<NotificationsPage />);

        const submitButton = screen.getByText("Отправить");
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(screen.getByText("Название уведомления обязательно")).toBeInTheDocument();
            expect(screen.getByText("Текст уведомления обязателен")).toBeInTheDocument();
        });
    });

    it("should handle successful notification submission", async () => {
        (notificationsApi.sendNotification as jest.Mock).mockResolvedValueOnce({});

        render(<NotificationsPage />);

        fireEvent.change(screen.getByPlaceholderText("Название уведомления"), {
            target: { value: "Test Title" },
        });
        fireEvent.change(screen.getByPlaceholderText("Текст уведомления"), {
            target: { value: "Test Message" },
        });

        const submitButton = screen.getByText("Отправить");
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(notificationsApi.sendNotification).toHaveBeenCalledWith(
                "Test Title",
                "Test Message"
            );

            expect(toast.success).toHaveBeenCalledWith(
                "Уведомление успешно отправлено",
                expect.any(Object)
            );

            expect(screen.getByPlaceholderText("Название уведомления")).toHaveValue("");
            expect(screen.getByPlaceholderText("Текст уведомления")).toHaveValue("");
        });
    });

    it("should handle API errors correctly", async () => {
        (notificationsApi.sendNotification as jest.Mock).mockRejectedValueOnce(
            new Error("API Error")
        );

        render(<NotificationsPage />);

        fireEvent.change(screen.getByPlaceholderText("Название уведомления"), {
            target: { value: "Test Title" },
        });
        fireEvent.change(screen.getByPlaceholderText("Текст уведомления"), {
            target: { value: "Test Message" },
        });

        const submitButton = screen.getByText("Отправить");
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(toast.error).toHaveBeenCalledWith(
                "Ошибка при отправке уведомления",
                expect.any(Object)
            );

            expect(screen.getByPlaceholderText("Название уведомления")).toHaveValue("Test Title");
            expect(screen.getByPlaceholderText("Текст уведомления")).toHaveValue("Test Message");
        });
    });

    it("should disable submit button while submitting", async () => {
        (notificationsApi.sendNotification as jest.Mock).mockImplementationOnce(
            () => new Promise(resolve => setTimeout(resolve, 100))
        );

        render(<NotificationsPage />);

        fireEvent.change(screen.getByPlaceholderText("Название уведомления"), {
            target: { value: "Test Title" },
        });
        fireEvent.change(screen.getByPlaceholderText("Текст уведомления"), {
            target: { value: "Test Message" },
        });

        const submitButton = screen.getByText("Отправить");
        fireEvent.click(submitButton);

        expect(submitButton).toBeDisabled();
        expect(screen.getByText("Отправка...")).toBeInTheDocument();

        await waitFor(() => {
            expect(submitButton).not.toBeDisabled();
            expect(screen.getByText("Отправить")).toBeInTheDocument();
        });
    });

    it("should clear errors when user starts typing", async () => {
        render(<NotificationsPage />);

        const submitButton = screen.getByText("Отправить");
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(screen.getByText("Название уведомления обязательно")).toBeInTheDocument();
            expect(screen.getByText("Текст уведомления обязателен")).toBeInTheDocument();
        });

        fireEvent.change(screen.getByPlaceholderText("Название уведомления"), {
            target: { value: "a" },
        });
        fireEvent.change(screen.getByPlaceholderText("Текст уведомления"), {
            target: { value: "b" },
        });

        expect(screen.queryByText("Название уведомления обязательно")).not.toBeInTheDocument();
        expect(screen.queryByText("Текст уведомления обязателен")).not.toBeInTheDocument();
    });
}); 