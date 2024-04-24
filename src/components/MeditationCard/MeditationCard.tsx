import React from "react";
import * as styles from "./meditationCard.module.scss";
import Meditation from "../../types/meditation";
import cover from "../../assets/images/cover-1.svg";
import { Link } from "react-router-dom";

function MeditationCard({ meditation }: { meditation: Meditation }) {

    return (
        <Link to={`${meditation.id}`} className={styles.content}>
            <img src={cover} alt="cover" />
            <div className={styles.info}>
                <div className={styles.row}>
                    <h1>{meditation.title}</h1>
                    <h2>{meditation.author}</h2>
                </div>
                <div className={styles.category}>
                    <p>{meditation.category}</p>
                </div>
            </div>
        </Link>
    );
}

export default MeditationCard;