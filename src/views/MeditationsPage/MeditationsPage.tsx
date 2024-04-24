import React from "react";
import * as styles from "./meditations.module.scss";
import * as commonStyles from "../../assets/styles/common.module.scss";
import Meditation from "../../types/meditation";
import Search from "../../components/Search/Search";
import { Outlet } from "react-router-dom";
import { RootState, store } from "../../core/store";

// Получите текущее состояние

function MeditationsPage() {

    const state: RootState = store.getState();
    const items: Meditation[] = state.items;

    return (
        <div>
            <div className={[commonStyles.box, styles.content].join(" ")}>
                <Search meditations={items} />
            </div>
            <Outlet />
        </div>
    );
}

export default MeditationsPage;