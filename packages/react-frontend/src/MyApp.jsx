import React, { useState, useEffect } from "react";
import Table from "./Table";
import Form from "./Form";


function MyApp() {
    const [characters, setCharacters] = useState([]);

    function fetchUsers() {
        const promise = fetch("http://localhost:8000/users/");
        return promise;
    }

    function postUser(person) {
        const promise = fetch("http://localhost:8000/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(person),
        });

        return promise;
    }

    function deleteUser(id) {
        const promise = fetch(`http://localhost:8000/users/${id}`, {
            method: "DELETE"
        });

        return promise;
    }

    function updateList(person) {
        postUser(person)
            .then((res) => {
                if (res.status == 201) {
                    res.json()
                        .then((user) => {
                            setCharacters([...characters, user])
                        })
                        .catch((error) => {
                            console.log(error)
                        })
                    ;
                } else {
                    console.log(`Bad Status Code ${res.status}`);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    function removeOneCharacter(index) {
        const updated = characters.filter((character, i) => {
            if (i === index) {
                deleteUser(character._id)
                    .then((res) => {if (!res.ok) {
                        console.log(`Failed to remove user ${character}`)
                    }})
                    .catch((e) => console.log(e));
                return false;
            } else {
                return true;
            }
        });
        setCharacters(updated);
    }

    useEffect(() => {
        fetchUsers()
            .then((res) => res.json())
            .then((json) => setCharacters(json))
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <div className="container">
            <Table characterData={characters} removeCharacter={removeOneCharacter}></Table>
            <Form handleSubmit={updateList}></Form>
        </div>
    );
}
export default MyApp;