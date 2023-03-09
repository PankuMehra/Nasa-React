import React from "react";
import "./Asteroid.css";

interface IAsteroid {
  id: string;
  name: string;
  nasa_jpl_url: string;
  is_potentially_hazardous_asteroid: boolean;
}

const Asteroid: React.FC = (): JSX.Element => {
  const [ast, setAst] = React.useState<IAsteroid | undefined>();
  const [loading, setLoading] = React.useState<boolean>(true);

  const fetchAsteroid = async (): Promise<void> => {
    let astId = localStorage.getItem("astId");
    console.log("astId:", astId);
    try {
      let res = await fetch(
        `https://api.nasa.gov/neo/rest/v1/neo/${astId}?api_key=SUMYHcZ74F0a1OCIjrssh7Ufw9g6DxlaEMgVgnCw`
      );
      let data: IAsteroid = await res.json();
      setAst(data);
      setLoading((prev: boolean) => false);
    } catch (error) {
      console.log(error);
      setLoading((prev: boolean) => false);
    }
  };

  React.useEffect(() => {
    fetchAsteroid();
  }, []);

  return (
    <>
      <div id="asteroid">
        {loading ? (
          <p>Loading...</p>
        ) : ast ? (
          <div>
            <h1>Asteroid</h1>
            <p id="outerText">
              <span id="innerText">ID: </span>
              {ast.id}
            </p>
            <p id="outerText">
              <span id="innerText">Name: </span>
              {ast.name}
            </p>
            <p id="outerText">
              <span id="innerText">NASA JPL URL: </span>
              {ast.nasa_jpl_url}
            </p>
            <p id="outerText">
              <span id="innerText">Is Potentially Hazardous Asteroid: </span>
              {ast.is_potentially_hazardous_asteroid ? "True" : "False"}
            </p>
          </div>
        ) : (
          <p>Incorrect Asteroid ID</p>
        )}
      </div>
    </>
  );
};

export default Asteroid;
