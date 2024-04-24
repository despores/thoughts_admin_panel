import React, { useRef, useState } from "react";
import * as styles from "./add.module.scss";
import * as commonStyles from "../../assets/styles/common.module.scss";
import addMusicIcon from "../../assets/images/music-upload-icon.svg";
import addCoverIcon from "../../assets/images/cover-upload-icon.svg";
import Meditation from "../../types/meditation";
import { AppDispatch, RootState, addItem, store } from "../../core/store";

function AddMeditationPage() {

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

    const handleCoverFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            console.log(file);
            setCoverFileName(file.name);
        }
    };

    const handleMeditationFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            console.log(file);
            setMeditationFileName(file.name);
            // Здесь вы можете обработать файл, например, загрузить его на сервер
        }
    };

    const handleCoverUploadClick = () => {
        coverFileInput.current?.click();
    };

    const handleMeditationUploadClick = () => {
        meditationFileInput.current?.click();
    };

    const handleConfirmButton = () => {
        const state: RootState = store.getState();
        const items: Meditation[] = state.items;
        alert("Медитация добавлена");
        const newMeditation = {
            id: items.length + 1,
            title: title,
            author: author,
            description: description,
            tags: tags,
            category: category,
            cover: cover,
            mediaFile: mediaFile,
        };

        console.log(newMeditation);
        const dispatch: AppDispatch = store.dispatch;

        // Отправьте действие
        dispatch(addItem(newMeditation));
    };

    return (
        <>
            <form className={[commonStyles.box, styles.content].join(" ")}>
                <span>
                    <p>Опишите медитацию</p>
                    <textarea onChange={(event) => setTitle(event.target.value)} required placeholder="Введите название медитации" />
                    <textarea onChange={(event) => setAuthor(event.target.value)} required placeholder="Введите автора медитации" />
                    <textarea onChange={(event) => setDescription(event.target.value)} required placeholder="Добавьте описание медитации" />
                    <textarea onChange={(event) => setTags(event.target.value.split(","))} required placeholder="Добавьте теги, через запятую" />
                    <select onChange={(event) => setCategory(event.target.value)} required defaultValue={"default"}>
                        <option value="default" disabled hidden>Выберите категорию</option>
                        <option value="category1">Личностное развитие</option>
                        <option value="category2">Стресс-менеджмент</option>
                        <option value="category2">Саморазвитие</option>
                        <option value="category2">Привлечение успеха</option>
                        <option value="category2">Самосовершенствование</option>
                        <option value="category2">Очищение сознания</option>
                        <option value="category2">Развитие творческого потенциала</option>

                    </select>
                </span>
                <div>
                    <p>Загрузите обложку медитации</p>
                    <div className={styles.fileUpload} onClick={handleCoverUploadClick}>
                        <input type="file" required ref={coverFileInput} onChange={handleCoverFileUpload} style={{ display: "none" }} />
                        {coverFileName ? (
                            <p>{coverFileName}</p>
                        ) : (
                            <img src={addCoverIcon} alt="Upload" />
                        )}
                    </div>
                </div>
                <div>
                    <p>Загрузите аудиодорожку</p>
                    <div className={styles.fileUpload} onClick={handleMeditationUploadClick}>
                        <input type="file" required ref={meditationFileInput} onChange={handleMeditationFileUpload} style={{ display: "none" }} />
                        {meditationFileName ? (
                            <p>{meditationFileName}</p>
                        ) : (
                            <img src={addMusicIcon} alt="Upload" />
                        )}
                    </div>
                </div>
                <div>
                    <p className={styles.emptyText}>Empty text</p>
                    <button className={styles.confirmButton} onClick={handleConfirmButton}>Готово</button>
                </div>
            </form>
        </>
    );
}

export default AddMeditationPage;