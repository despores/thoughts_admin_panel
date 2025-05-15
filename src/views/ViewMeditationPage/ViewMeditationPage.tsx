import React from "react";
import * as styles from "./viewMeditationPage.module.scss";
import * as commonStyles from "../../theme/common.module.scss";
import { useParams, useNavigate } from "react-router-dom";
import editIcon from "../../assets/images/edit-icon.svg";
import { meditationStore } from "../../core/store";
import { observer } from "mobx-react-lite";
import AudioPlayer, { RHAP_UI } from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import sound from "../../assets/music/meditation1.mp3";
import playerImage from "../../assets/images/player-image.svg";
import { ROUTES } from "../../routes/constants";

const ViewMeditationPage: React.FC = observer(() => {
    const { id } = useParams();
    const navigate = useNavigate();
    const meditation = meditationStore.items.find((item) => item.id === Number(id));

    const handleEditClick = () => {
        navigate(`${ROUTES.NEW}?edit=${id}`);
    };

    return (
        <div className={[commonStyles.box, styles.content].join(" ")}>
            <div className={styles.player}>
                <div className={styles.imageContainer}>
                    <img className={styles.cover} src={playerImage} alt="cover" />
                    <div className={styles.playerControls}>
                        <AudioPlayer
                            src={sound}
                            showSkipControls={false}
                            showJumpControls={false}
                            showFilledProgress={true}
                            hasDefaultKeyBindings={false}
                            customProgressBarSection={[
                                RHAP_UI.CURRENT_TIME,
                                RHAP_UI.PROGRESS_BAR,
                                RHAP_UI.DURATION,
                            ]}
                            customControlsSection={[
                                RHAP_UI.MAIN_CONTROLS
                            ]}
                            autoPlayAfterSrcChange={false}
                            className={styles.audioPlayer}
                            layout="horizontal"
                        />
                    </div>
                </div>
            </div>
            <div className={styles.info}>
                <div className={styles.header}>
                    <div className={styles.title}>
                        <h1>{meditation?.title ?? "No Title"}</h1>
                        <img
                            src={editIcon}
                            alt="edit"
                            onClick={handleEditClick}
                            style={{ cursor: "pointer" }}
                        />
                    </div>
                    <p className={styles.author}>{meditation?.author ?? "No Author"}</p>
                    <p className={styles.description}>{meditation?.description ?? "No Description"}</p>
                </div>
                <div className={styles.moreInfo}>
                    <div>
                        <p className={styles.littleTitle}>Теги</p>
                        <div className={styles.tags}>
                            {meditation?.tags.map((tag, index) => (
                                <div className={styles.coloredBox} key={index}>{tag}</div>
                            ))}
                        </div>
                    </div>
                    <div>
                        <p className={styles.littleTitle}>Категория</p>
                        <div className={styles.whiteBox}>{meditation?.category ?? "No Category"}</div>
                    </div>
                </div>
            </div>
        </div>
    );
});

export default ViewMeditationPage;