import React, { useState } from "react";
import Table from "./Table";

const characters_default = [
    {
        name: "Charlie",
        job: "Janitor",
    },
    {
        name: "Mac",
        job: "Bouncer",
    },
    {
        name: "Dee",
        job: "Aspring actress",
    },
    {
        name: "Dennis",
        job: "Bartender",
    },
];

function MyApp() {
    const [characters, setCharacters] = useState(characters_default);

    function removeOneCharacter(index) {
        const updated = characters.filter((character, i) => {
            return i !== index;
        });
        setCharacters(updated);
    }

    return (
        <div className="container">
            <Table characterData={characters} removeCharacter={removeOneCharacter}></Table>
        </div>
    );
}
export default MyApp;