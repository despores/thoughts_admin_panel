import React from "react";
import * as styles from "./meditations.module.scss";
import * as commonStyles from "../../theme/common.module.scss";
import Search from "../../components/Search/Search";
import { Outlet } from "react-router-dom";
import { meditationStore } from "../../core/store";
import { observer } from "mobx-react-lite";

const MeditationsPage: React.FC = observer(() => {
    return (
        <div>
            <div className={[commonStyles.box, styles.content].join(" ")}>
                <Search meditations={meditationStore.items} />
            </div>
            <Outlet />
        </div>
    );
});

export default MeditationsPage;