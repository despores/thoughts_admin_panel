import React, { useState } from "react";
import * as styles from "./viewMeditationPage.module.scss";
import * as commonStyles from "../../assets/styles/common.module.scss";
import { useParams } from "react-router-dom";
import Meditation from "../../types/meditation";
import skipPreviousIcon from "../../assets/images/skip-previous.svg";
import playIcon from "../../assets/images/play.svg";
import skipNextIcon from "../../assets/images/skip-next.svg";
import playerImage from "../../assets/images/player-image.svg";
import waveImage from "../../assets/images/wave.svg";
import controlsImage from "../../assets/images/controls.svg";
import editIcon from "../../assets/images/edit-icon.svg";
import useSound from "use-sound";
import sound from "../../assets/music/meditation1.mp3";
import { RootState, store } from "../../core/store";

function ViewMeditationPage() {

    const [isPlaying, setIsPlaying] = useState(false);
    //const [play, { pause, duration }] = useSound(sound);

    const { id } = useParams();
    const state: RootState = store.getState();
    const items: Meditation[] = state.items;
    const meditation: Meditation | undefined = items.find((item) => item.id === Number(id));

    // const playingButton = () => {
    //     if (isPlaying) {
    //         pause();
    //         setIsPlaying(false);
    //     } else {
    //         play();
    //         setIsPlaying(true);
    //     }
    // };

    return (
        <div className={[commonStyles.box, styles.content].join(" ")}>
            <div className={styles.player}>
                <img className={styles.cover} src={playerImage} alt="cover" />
                <img className={styles.wave} src={waveImage} alt="wave" />
                <img className={styles.controls} src={controlsImage} alt="controls" />
            </div>
            <div className={styles.info}>
                <div className={styles.title}>
                    <p>{meditation?.title ?? "No Title"}</p>
                    <img src={editIcon} alt="edit" />
                </div>
                <p>{meditation?.author ?? "No Author"}</p>
                <p className={styles.description}>{meditation?.description ?? "No Description"}</p>
                <div className={styles.moreInfo}>
                    <div>
                        <p className={styles.littleTitle}>Теги</p>
                        {meditation?.tags.map((tag, index) => (
                            <div className={styles.coloredBox} key={index}>{tag}</div>
                            //<p className={styles.coloredBox} key={index}>{tag}</p>
                        ))}
                    </div>
                    <div>
                        <p className={styles.littleTitle}>Категория</p>
                        <div className={styles.whiteBox}>{meditation?.category ?? "No Category"}</div>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default ViewMeditationPage;