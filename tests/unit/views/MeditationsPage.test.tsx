import * as React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import MeditationsPage from "../../../src/views/MeditationsPage/MeditationsPage";
import "@testing-library/jest-dom";

jest.mock("../../../src/core/store", () => ({
    meditationStore: {
        items: [
            {
                id: 1,
                title: "Meditation 1",
                author: "Author 1",
                description: "Description 1",
                tags: ["tag1", "tag2"],
                category: "Category 1",
                cover: "cover1.jpg",
                mediaFile: "audio1.mp3"
            },
            {
                id: 2,
                title: "Meditation 2",
                author: "Author 2",
                description: "Description 2",
                tags: ["tag3", "tag4"],
                category: "Category 2",
                cover: "cover2.jpg",
                mediaFile: "audio2.mp3"
            }
        ]
    }
}));

describe("MeditationsPage", () => {
    const renderComponent = () => {
        return render(
            <BrowserRouter>
                <MeditationsPage />
            </BrowserRouter>
        );
    };

    it("should render search component with meditations data from store", () => {
        renderComponent();

        expect(screen.getByRole("searchbox")).toBeInTheDocument();
        expect(screen.getByText("Meditation 1")).toBeInTheDocument();
        expect(screen.getByText("Author 1")).toBeInTheDocument();
        expect(screen.getByText("Category 1")).toBeInTheDocument();
        expect(screen.getByText("Meditation 2")).toBeInTheDocument();
        expect(screen.getByText("Author 2")).toBeInTheDocument();
        expect(screen.getByText("Category 2")).toBeInTheDocument();
    });

    it("should render outlet for nested routes", () => {
        const { container } = renderComponent();
        expect(container.firstChild).toBeInTheDocument();
    });
}); 