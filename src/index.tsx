import React, { useState } from "react";
import ReactDOM from "react-dom";

import { GistList } from "./gists.component";
import { useGists } from "./gists.control";

function App() {
  const [whichList, setWhichList] = useState(0);
  return (
    <div className="App">
      <h1>Fetching GitHub Gists</h1>
      <button onClick={() => setWhichList(0)}>List 1</button>
      <button onClick={() => setWhichList(1)}>List 2</button>
      <h2>Showing list {whichList + 1}</h2>
      {whichList === 0 && <GistList useGists={useGists} />}
      {whichList === 1 && <GistList useGists={useGists} />}
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
