import * as React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import MainPage from "../../../src/views/MainPage/MainPage";
import { ROUTES } from "../../../src/routes/constants";
import "@testing-library/jest-dom";

describe("MainPage", () => {
    const renderComponent = () => {
        return render(
            <BrowserRouter>
                <MainPage />
            </BrowserRouter>
        );
    };

    it("should render all navigation links", () => {
        renderComponent();

        expect(screen.getByText("Добавить медитацию")).toBeInTheDocument();
        expect(screen.getByText("Загруженные медитации")).toBeInTheDocument();
        expect(screen.getByText("Отправить уведомление")).toBeInTheDocument();
        expect(screen.getByText("Достижения")).toBeInTheDocument();
    });

    it("should render all navigation icons", () => {
        renderComponent();

        const icons = screen.getAllByRole("img");
        expect(icons).toHaveLength(4);
    });

    it("should have correct navigation links", () => {
        renderComponent();

        expect(screen.getByText("Добавить медитацию").closest("a")).toHaveAttribute("href", ROUTES.NEW);
        expect(screen.getByText("Загруженные медитации").closest("a")).toHaveAttribute("href", ROUTES.MEDITATIONS);
        expect(screen.getByText("Отправить уведомление").closest("a")).toHaveAttribute("href", ROUTES.NOTIFICATIONS);
        expect(screen.getByText("Достижения").closest("a")).toHaveAttribute("href", ROUTES.ACHIEVMENTS);
    });
}); 