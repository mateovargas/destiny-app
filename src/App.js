import logo from './logo.svg';
import './App.css';
import useHttp from './hooks/use-http';
import { getManifest, getDestinyPlayer } from './lib/api';
import { useEffect } from 'react';
function App() {

  const { sendRequest, data: manifest, status, error } = useHttp(getManifest);
  const playerHttp = useHttp(getDestinyPlayer);
  const playerRequest = playerHttp.sendRequest;

  const getManifestHandler = async (event) => {
    sendRequest();
  };

  useEffect(() => {
    sendRequest();
    playerRequest("Le Maquis#5343");
  }, [sendRequest, playerRequest]);

  console.log("manifest: ", manifest);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <button className="btn" onClick={getManifestHandler}>Click to test manifest</button>
      </header>
    </div>
  );
}

export default App;
