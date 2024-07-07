import React, { useEffect, useState } from "react";
import { Input, Button } from "reactstrap";
import { useLazyQuery } from "@apollo/client";
import { GET_CHARACTERS_QUERY } from "../Graphql/Queries";

function Home() {
  const [character, setCharacter] = useState("");
  const [getCharacters, { loading, data }] = useLazyQuery(GET_CHARACTERS_QUERY);

  function handleSubmit() {
    getCharacters({
      variables: { name: character },
    });
  }

  const handleChange = (e) => {
    setCharacter(e.target.value);
  };

  useEffect(() => {
    getCharacters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h3 className="text-center">
        You can access data about hundreds of characters in Rick and Morty.
      </h3>
      <div className="d-flex justify-content-center align-center flex-row gap-2">
        <Input
          className="col-1 w-25 align-center"
          type="text"
          value={character}
          placeholder="character name"
          onChange={handleChange}
        />
        <Button onClick={handleSubmit} className="col-1">
          Search
        </Button>
        <Button
          onClick={() => {
            setCharacter("");
            getCharacters({});
          }}
          className="col-1"
        >
          Clear
        </Button>
      </div>

      <div className="m-5">
        {loading ? (
          <h3>Loading...</h3>
        ) : data && data.characters?.results?.length ? (
          <>
            {data.characters.results.map((char, idx) => (
              <p key={idx}>{char.name}</p>
            ))}
          </>
        ) : (
          <p>No results found!</p>
        )}
      </div>
    </div>
  );
}

export default Home;
