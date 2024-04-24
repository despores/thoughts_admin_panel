import React from "react";
import Meditation from "../../types/meditation";
import MeditationCard from "../MeditationCard/MeditationCard";

function SearchList({ filteredMeditations }: { filteredMeditations: Meditation[] }) {

    return (
        <div>
            {Array.from(filteredMeditations.entries()).map(([key, meditation]) => (
                <MeditationCard key={key} meditation={meditation} />
            ))}
        </div>
    );
}

export default SearchList;