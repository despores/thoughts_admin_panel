import * as React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter, useParams } from "react-router-dom";
import ViewMeditationPage from "../../../src/views/ViewMeditationPage/ViewMeditationPage";
import "@testing-library/jest-dom";
import { ROUTES } from "../../../src/routes/constants";

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useParams: jest.fn(),
    useNavigate: () => jest.fn(),
}));

jest.mock("../../../src/assets/music/meditation1.mp3", () => "test-audio-file.mp3");
jest.mock("../../../src/assets/images/player-image.svg", () => "test-player-image.svg");
jest.mock("../../../src/assets/images/edit-icon.svg", () => "test-edit-icon.svg");

jest.mock("../../../src/core/store", () => ({
    meditationStore: {
        items: [
            {
                id: 1,
                title: "Test Meditation",
                author: "Test Author",
                description: "Test Description",
                tags: ["tag1", "tag2"],
                category: "Test Category",
                cover: "test-cover.jpg",
                mediaFile: "test-audio.mp3"
            }
        ]
    }
}));

jest.mock("react-h5-audio-player", () => {
    return {
        __esModule: true,
        default: () => <div data-testid="audio-player">Audio Player Mock</div>,
        RHAP_UI: {
            CURRENT_TIME: "CURRENT_TIME",
            PROGRESS_BAR: "PROGRESS_BAR",
            DURATION: "DURATION",
            MAIN_CONTROLS: "MAIN_CONTROLS"
        }
    };
});

describe("ViewMeditationPage", () => {
    const mockNavigate = jest.fn();

    beforeEach(() => {
        (useParams as jest.Mock).mockReturnValue({ id: "1" });
        jest.spyOn(require("react-router-dom"), "useNavigate").mockReturnValue(mockNavigate);
    });

    const renderComponent = () => {
        return render(
            <BrowserRouter>
                <ViewMeditationPage />
            </BrowserRouter>
        );
    };

    it("should render meditation details from store correctly", () => {
        renderComponent();

        expect(screen.getByText("Test Meditation")).toBeInTheDocument();
        expect(screen.getByText("Test Author")).toBeInTheDocument();
        expect(screen.getByText("Test Description")).toBeInTheDocument();
        expect(screen.getByText("tag1")).toBeInTheDocument();
        expect(screen.getByText("tag2")).toBeInTheDocument();
        expect(screen.getByText("Test Category")).toBeInTheDocument();
    });

    it("should render audio player", () => {
        renderComponent();
        expect(screen.getByTestId("audio-player")).toBeInTheDocument();
    });

    it("should render edit button and handle click", () => {
        renderComponent();
        const editButton = screen.getByAltText("edit");
        expect(editButton).toBeInTheDocument();

        fireEvent.click(editButton);
        expect(mockNavigate).toHaveBeenCalledWith(`${ROUTES.NEW}?edit=1`);
    });

    it("should handle meditation not found in store", () => {
        (useParams as jest.Mock).mockReturnValue({ id: "999" });
        renderComponent();

        expect(screen.getByText("No Title")).toBeInTheDocument();
        expect(screen.getByText("No Author")).toBeInTheDocument();
        expect(screen.getByText("No Description")).toBeInTheDocument();
        expect(screen.getByText("No Category")).toBeInTheDocument();
    });
}); 