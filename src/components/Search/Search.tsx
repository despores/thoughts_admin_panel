import React, { useState } from "react";
import * as styles from "./search.module.scss";
import Meditation from "../../types/meditation";
import Scroll from "../Scroll/Scroll";
import SearchList from "../SearchList/SearchList";

function Search({ meditations }: { meditations: Meditation[] }) {

    const [searchField, setSearchField] = useState("");

    const filteredMeditations = meditations.filter(meditation => {
        return (
            meditation.title.toLowerCase().includes(searchField.toLowerCase()) ||
            meditation.author.toLowerCase().includes(searchField.toLowerCase()) ||
            meditation.category.toLowerCase().includes(searchField.toLowerCase()) ||
            meditation.tags.join(" ").toLowerCase().includes(searchField.toLowerCase())
        );
    });

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setSearchField(e.target.value);
    }

    function searchList() {
        return (
            <Scroll>
                <SearchList filteredMeditations={filteredMeditations} />
            </Scroll>
        );
    }

    return (
        <div className={styles.content}>
            <div>
                <input
                    type="search"
                    placeholder="Поиск"
                    onChange={handleChange}
                />
            </div>
            {searchList()}
        </div>
    );
}

export default Search;