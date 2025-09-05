import "./App.css";
import { Application } from "@pixi/react";
import { useEffect, useState } from "react";
import { getWindowSize } from "./helpers/common";
import { MainContainer } from "./components/Containers/MainContainer";

function App() {
  const [size, setSize] = useState(getWindowSize);

  useEffect(() => {
    const updateCanvasSize = () => setSize(getWindowSize());
    window.addEventListener("resize", updateCanvasSize);
    return () => window.removeEventListener("resize", updateCanvasSize);
  }, []);

  return (
    <Application width={size.width} height={size.height}>
      <MainContainer size={size}>
      </MainContainer>
    </Application>
  );
}

export default App;
