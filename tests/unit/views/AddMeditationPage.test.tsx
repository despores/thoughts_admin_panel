import * as React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { toast } from "react-toastify";
import AddMeditationPage from "../../../src/views/AddMeditationPage/AddMeditationPage";
import { meditationStore } from "../../../src/core/store";
import "@testing-library/jest-dom";

jest.mock("react-toastify");
jest.mock("../../../src/core/store", () => ({
    meditationStore: {
        items: [],
        addItem: jest.fn(),
        updateItem: jest.fn(),
    }
}));

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => mockNavigate,
    useLocation: () => ({
        search: "",
    }),
}));

describe("AddMeditationPage", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    const renderComponent = () => {
        return render(
            <BrowserRouter>
                <AddMeditationPage />
            </BrowserRouter>
        );
    };

    it("should show validation errors when submitting empty form", async () => {
        renderComponent();

        const submitButton = screen.getByText("Готово");
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(screen.getByText("Введите название медитации", { selector: "p" })).toBeInTheDocument();

            expect(screen.getByText("Введите автора медитации", { selector: "p" })).toBeInTheDocument();

            expect(screen.getByText("Добавьте описание медитации", { selector: "p" })).toBeInTheDocument();

            expect(screen.getByText("Добавьте хотя бы один тег", { selector: "p" })).toBeInTheDocument();

            const categoryErrors = screen.getAllByText("Выберите категорию");
            const categoryErrorMessage = categoryErrors.find(element => element.tagName === "P");
            expect(categoryErrorMessage).toBeInTheDocument();

            expect(screen.getAllByText("Загрузите обложку медитации")[1]).toBeInTheDocument();
            expect(screen.getAllByText("Загрузите аудиодорожку")[1]).toBeInTheDocument();
        });
    });

    it("should handle file uploads correctly", async () => {
        const { container } = renderComponent();

        const coverInput = container.querySelector("input[accept=\"image/*\"]") as HTMLInputElement;
        const meditationInput = container.querySelector("input[accept=\"audio/*\"]") as HTMLInputElement;

        expect(coverInput).toBeInTheDocument();
        expect(meditationInput).toBeInTheDocument();

        const coverFile = new File(["cover"], "cover.jpg", { type: "image/jpeg" });
        const audioFile = new File(["audio"], "meditation.mp3", { type: "audio/mpeg" });

        fireEvent.change(coverInput, { target: { files: [coverFile] } });
        fireEvent.change(meditationInput, { target: { files: [audioFile] } });

        expect(screen.getByText("cover.jpg")).toBeInTheDocument();
        expect(screen.getByText("meditation.mp3")).toBeInTheDocument();
    });

    it("should submit form successfully with valid data", async () => {
        const { container } = renderComponent();

        fireEvent.change(screen.getByPlaceholderText("Введите название медитации"), {
            target: { value: "Test Meditation" },
        });
        fireEvent.change(screen.getByPlaceholderText("Введите автора медитации"), {
            target: { value: "Test Author" },
        });
        fireEvent.change(screen.getByPlaceholderText("Добавьте описание медитации"), {
            target: { value: "Test Description" },
        });
        fireEvent.change(screen.getByPlaceholderText("Добавьте теги, через запятую"), {
            target: { value: "tag1,tag2" },
        });

        const select = screen.getByRole("combobox");
        fireEvent.change(select, { target: { value: "Саморазвитие" } });

        const coverInput = container.querySelector("input[accept=\"image/*\"]") as HTMLInputElement;
        const meditationInput = container.querySelector("input[accept=\"audio/*\"]") as HTMLInputElement;
        const coverFile = new File(["cover"], "cover.jpg", { type: "image/jpeg" });
        const audioFile = new File(["audio"], "meditation.mp3", { type: "audio/mpeg" });

        Object.defineProperty(URL, "createObjectURL", {
            writable: true,
            value: jest.fn().mockImplementation((file) => `mock-url-${file.name}`)
        });

        fireEvent.change(coverInput, { target: { files: [coverFile] } });
        fireEvent.change(meditationInput, { target: { files: [audioFile] } });

        const submitButton = screen.getByText("Готово");
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(meditationStore.addItem).toHaveBeenCalledWith({
                id: expect.any(Number),
                title: "Test Meditation",
                author: "Test Author",
                description: "Test Description",
                tags: ["tag1", "tag2"],
                category: "Саморазвитие",
                cover: "mock-url-cover.jpg",
                mediaFile: "mock-url-meditation.mp3",
            });
            expect(toast.success).toHaveBeenCalledWith(
                "Медитация успешно добавлена",
                expect.any(Object)
            );
            expect(mockNavigate).toHaveBeenCalled();
        });
    });

    it("should load existing meditation data in edit mode", async () => {
        const mockMeditation = {
            id: 1,
            title: "Existing Meditation",
            author: "Existing Author",
            description: "Existing Description",
            tags: ["tag1", "tag2"],
            category: "Саморазвитие",
            cover: "cover-url",
            mediaFile: "audio-url",
        };

        meditationStore.items = [mockMeditation];

        jest.spyOn(URLSearchParams.prototype, "get").mockReturnValue("1");

        render(
            <BrowserRouter>
                <AddMeditationPage />
            </BrowserRouter>
        );

        await waitFor(() => {
            expect(screen.getByDisplayValue("Existing Meditation")).toBeInTheDocument();
            expect(screen.getByDisplayValue("Existing Author")).toBeInTheDocument();
            expect(screen.getByDisplayValue("Existing Description")).toBeInTheDocument();
            expect(screen.getByDisplayValue("tag1,tag2")).toBeInTheDocument();
            expect(screen.getByDisplayValue("Саморазвитие")).toBeInTheDocument();
            expect(screen.getByText("Текущая обложка")).toBeInTheDocument();
            expect(screen.getByText("Текущая аудиодорожка")).toBeInTheDocument();
        });
    });
}); 