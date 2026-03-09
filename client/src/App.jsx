import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { useCallback } from "react";
import { useEffect } from "react";

function App() {
  const [count, setCount] = useState(0);
  const [json, setJson] = useState("");
  const [error, setError] = useState("");

  const helloApi = useCallback(async () => {
    try {
      const response = await fetch("http://localhost:8080/api/hello", {
        method: "GET",
      });
      const jsonResponse = await response.json();
      console.log(jsonResponse);
      setJson(jsonResponse.message);
    } catch (error) {
      setError(error);
      console.error("Virhe", error);
    }
  });

  useEffect(() => {
    helloApi();
  }, []);

  return (
    <>
      <p>{json}</p>
      <p>{error}</p>
    </>
  );
}

export default App;
