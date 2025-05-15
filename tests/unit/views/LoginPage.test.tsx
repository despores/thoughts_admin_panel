import * as React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import LoginPage from "../../../src/views/LoginPage/LoginPage";
import { authStore } from "../../../src/core/store";
import { ROUTES } from "../../../src/routes/constants";
import "@testing-library/jest-dom";

jest.mock("../../../src/core/store", () => ({
    authStore: {
        login: jest.fn(),
        isAuthInProgress: false,
    }
}));

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => mockNavigate,
}));

describe("LoginPage", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    const renderComponent = () => {
        return render(
            <BrowserRouter>
                <LoginPage />
            </BrowserRouter>
        );
    };

    it("should render login form with all necessary elements", () => {
        renderComponent();

        expect(screen.getByLabelText("Email")).toBeInTheDocument();
        expect(screen.getByLabelText("Password")).toBeInTheDocument();
        expect(screen.getByRole("button", { name: "Login" })).toBeInTheDocument();
    });

    it("should handle successful login", async () => {
        (authStore.login as jest.Mock).mockResolvedValueOnce(undefined);
        renderComponent();

        const emailInput = screen.getByLabelText("Email");
        const passwordInput = screen.getByLabelText("Password");
        const submitButton = screen.getByRole("button", { name: "Login" });

        fireEvent.change(emailInput, { target: { value: "test@example.com" } });
        fireEvent.change(passwordInput, { target: { value: "password123" } });
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(authStore.login).toHaveBeenCalledWith("test@example.com", "password123");
            expect(mockNavigate).toHaveBeenCalledWith(ROUTES.MAIN);
            expect(screen.queryByText("Invalid email or password")).not.toBeInTheDocument();
        });
    });

    it("should show error message on login failure", async () => {
        (authStore.login as jest.Mock).mockRejectedValueOnce(new Error("Login failed"));
        renderComponent();

        const emailInput = screen.getByLabelText("Email");
        const passwordInput = screen.getByLabelText("Password");
        const submitButton = screen.getByRole("button", { name: "Login" });

        fireEvent.change(emailInput, { target: { value: "test@example.com" } });
        fireEvent.change(passwordInput, { target: { value: "wrongpassword" } });
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(screen.getByText("Invalid email or password")).toBeInTheDocument();
            expect(mockNavigate).not.toHaveBeenCalled();
        });
    });

    it("should disable submit button while authentication is in progress", async () => {
        Object.defineProperty(authStore, "isAuthInProgress", {
            get: () => true
        });

        renderComponent();

        const submitButton = screen.getByRole("button");
        expect(submitButton).toBeDisabled();
        expect(submitButton).toHaveTextContent("Logging in...");
    });

    it("should require email and password fields", () => {
        renderComponent();

        const emailInput = screen.getByLabelText("Email");
        const passwordInput = screen.getByLabelText("Password");

        expect(emailInput).toBeRequired();
        expect(passwordInput).toBeRequired();
    });
}); 