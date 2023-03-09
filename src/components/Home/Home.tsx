import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home: React.FC = () => {
  const [input, setInput] = React.useState<string>("");
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const showRandomAsteroid = async (): Promise<void> => {
    try {
      let res = await fetch(
        "https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=SUMYHcZ74F0a1OCIjrssh7Ufw9g6DxlaEMgVgnCw"
      );
      let data = await res.json();
      const randomNumber = Math.round(Math.random() * 20);
      let astId: string = data.near_earth_objects[randomNumber].id;
      console.log("astId:", astId);
      localStorage.setItem("astId", astId);
      navigate("/asteroid");
    } catch (error: unknown) {
      console.log(error);
    }
  };

  const showAsteroid = (): void => {
    localStorage.setItem("astId", input);
    navigate("/asteroid");
  };

  return (
    <div>
      <div id="home">
        <h1>Home</h1>
        <div id="form">
          <input
            id="input"
            placeholder="Enter Astroid Id"
            onChange={handleChange}
            value={input}
          />
          <button id="random" onClick={showRandomAsteroid}>
            Random Asteroid
          </button>
          <input
            type="submit"
            disabled={input === "" ? true : false}
            id={input === "" ? "disabledButton" : "enabledButton"}
            value="Click Me"
            onClick={showAsteroid}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
