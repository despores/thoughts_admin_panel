import React, { useRef, useState, useEffect } from "react";
import * as styles from "./add.module.scss";
import * as commonStyles from "../../theme/common.module.scss";
import addMusicIcon from "../../assets/images/music-upload-icon.svg";
import addCoverIcon from "../../assets/images/cover-upload-icon.svg";
import { meditationStore } from "../../core/store";
import { observer } from "mobx-react-lite";
import { useNavigate, useLocation } from "react-router-dom";
import { ROUTES } from "../../routes/constants";
import { toast } from "react-toastify";

const AddMeditationPage: React.FC = observer(() => {
    const navigate = useNavigate();
    const location = useLocation();
    const editId = new URLSearchParams(location.search).get("edit");
    const isEditing = Boolean(editId);

    const [coverFileName, setCoverFileName] = useState<string | null>(null);
    const [meditationFileName, setMeditationFileName] = useState<string | null>(null);
    const coverFileInput = useRef<HTMLInputElement>(null);
    const meditationFileInput = useRef<HTMLInputElement>(null);

    const [title, setTitle] = useState<string>("");
    const [author, setAuthor] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [tags, setTags] = useState<string[]>([]);
    const [category, setCategory] = useState<string>("");
    const [cover, setCover] = useState<string>("");
    const [mediaFile, setMediaFile] = useState<string>("");
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    useEffect(() => {
        if (isEditing) {
            const meditation = meditationStore.items.find(item => item.id === Number(editId));
            if (meditation) {
                setTitle(meditation.title);
                setAuthor(meditation.author);
                setDescription(meditation.description);
                setTags(meditation.tags);
                setCategory(meditation.category);
                setCover(meditation.cover);
                setMediaFile(meditation.mediaFile);
                if (meditation.cover) {
                    setCoverFileName("Текущая обложка");
                }
                if (meditation.mediaFile) {
                    setMeditationFileName("Текущая аудиодорожка");
                }
            }
        }
    }, [editId]);

    const handleCoverFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            console.log(file);
            setCoverFileName(file.name);
            setCover(URL.createObjectURL(file));
            setErrors(prev => ({ ...prev, cover: "" }));
        }
    };

    const handleMeditationFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            console.log(file);
            setMeditationFileName(file.name);
            setMediaFile(URL.createObjectURL(file));
            setErrors(prev => ({ ...prev, mediaFile: "" }));
        }
    };

    const handleCoverUploadClick = () => {
        coverFileInput.current?.click();
    };

    const handleMeditationUploadClick = () => {
        meditationFileInput.current?.click();
    };

    const validateForm = (): boolean => {
        const newErrors: { [key: string]: string } = {};

        if (!title.trim()) {
            newErrors.title = "Введите название медитации";
        }
        if (!author.trim()) {
            newErrors.author = "Введите автора медитации";
        }
        if (!description.trim()) {
            newErrors.description = "Добавьте описание медитации";
        }
        if (!tags.length || (tags.length === 1 && !tags[0])) {
            newErrors.tags = "Добавьте хотя бы один тег";
        }
        if (!category || category === "default") {
            newErrors.category = "Выберите категорию";
        }
        if (!cover) {
            newErrors.cover = "Загрузите обложку медитации";
        }
        if (!mediaFile) {
            newErrors.mediaFile = "Загрузите аудиодорожку";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleConfirmButton = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        const meditationData = {
            title,
            author,
            description,
            tags: tags.filter(tag => tag.trim()),
            category,
            cover,
            mediaFile,
        };

        if (isEditing) {
            meditationStore.updateItem(Number(editId), meditationData);
            toast.success("Медитация успешно обновлена", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                style: { background: "#c979be", color: "white" }
            });
        } else {
            meditationStore.addItem({
                ...meditationData,
                id: meditationStore.items.length + 1,
            });
            toast.success("Медитация успешно добавлена", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                style: { background: "#c979be", color: "white" }
            });
        }

        navigate(ROUTES.MEDITATIONS);
    };

    return (
        <>
            <form className={[commonStyles.box, styles.content].join(" ")}>
                <span>
                    <p>{isEditing ? "Редактировать медитацию" : "Добавить медитацию"}</p>
                    <div className={styles.inputGroup}>
                        <textarea
                            onChange={(event) => {
                                setTitle(event.target.value);
                                setErrors(prev => ({ ...prev, title: "" }));
                            }}
                            value={title}
                            placeholder="Введите название медитации"
                            className={errors.title ? styles.error : ""}
                        />
                        {errors.title && <p className={styles.errorText}>{errors.title}</p>}
                    </div>
                    <div className={styles.inputGroup}>
                        <textarea
                            onChange={(event) => {
                                setAuthor(event.target.value);
                                setErrors(prev => ({ ...prev, author: "" }));
                            }}
                            value={author}
                            placeholder="Введите автора медитации"
                            className={errors.author ? styles.error : ""}
                        />
                        {errors.author && <p className={styles.errorText}>{errors.author}</p>}
                    </div>
                    <div className={styles.inputGroup}>
                        <textarea
                            onChange={(event) => {
                                setDescription(event.target.value);
                                setErrors(prev => ({ ...prev, description: "" }));
                            }}
                            value={description}
                            placeholder="Добавьте описание медитации"
                            className={errors.description ? styles.error : ""}
                        />
                        {errors.description && <p className={styles.errorText}>{errors.description}</p>}
                    </div>
                    <div className={styles.inputGroup}>
                        <textarea
                            onChange={(event) => {
                                setTags(event.target.value.split(","));
                                setErrors(prev => ({ ...prev, tags: "" }));
                            }}
                            value={tags.join(",")}
                            placeholder="Добавьте теги, через запятую"
                            className={errors.tags ? styles.error : ""}
                        />
                        {errors.tags && <p className={styles.errorText}>{errors.tags}</p>}
                    </div>
                    <div className={styles.inputGroup}>
                        <select
                            onChange={(event) => {
                                setCategory(event.target.value);
                                setErrors(prev => ({ ...prev, category: "" }));
                            }}
                            value={category || "default"}
                            className={errors.category ? styles.error : ""}
                        >
                            <option value="default">Выберите категорию</option>
                            <option value="Личностное развитие">Личностное развитие</option>
                            <option value="Стресс-менеджмент">Стресс-менеджмент</option>
                            <option value="Саморазвитие">Саморазвитие</option>
                            <option value="Привлечение успеха">Привлечение успеха</option>
                            <option value="Самосовершенствование">Самосовершенствование</option>
                            <option value="Очищение сознания">Очищение сознания</option>
                            <option value="Развитие творческого потенциала">Развитие творческого потенциала</option>
                        </select>
                        {errors.category && <p className={styles.errorText}>{errors.category}</p>}
                    </div>
                </span>
                <div>
                    <p>Загрузите обложку медитации</p>
                    <div
                        className={`${styles.fileUpload} ${errors.cover ? styles.errorBorder : ""}`}
                        onClick={handleCoverUploadClick}
                    >
                        <input
                            type="file"
                            accept="image/*"
                            ref={coverFileInput}
                            onChange={handleCoverFileUpload}
                            style={{ display: "none" }}
                        />
                        {coverFileName ? (
                            <p>{coverFileName}</p>
                        ) : (
                            <img src={addCoverIcon} alt="Upload" />
                        )}
                    </div>
                    {errors.cover && <p className={styles.errorText}>{errors.cover}</p>}
                </div>
                <div>
                    <p>Загрузите аудиодорожку</p>
                    <div
                        className={`${styles.fileUpload} ${errors.mediaFile ? styles.errorBorder : ""}`}
                        onClick={handleMeditationUploadClick}
                    >
                        <input
                            type="file"
                            accept="audio/*"
                            ref={meditationFileInput}
                            onChange={handleMeditationFileUpload}
                            style={{ display: "none" }}
                        />
                        {meditationFileName ? (
                            <p>{meditationFileName}</p>
                        ) : (
                            <img src={addMusicIcon} alt="Upload" />
                        )}
                    </div>
                    {errors.mediaFile && <p className={styles.errorText}>{errors.mediaFile}</p>}
                </div>
                <div>
                    <button className={styles.confirmButton} onClick={handleConfirmButton}>
                        Готово
                    </button>
                </div>
            </form>
        </>
    );
});

export default AddMeditationPage;