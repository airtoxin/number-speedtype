import { useCallback, useEffect, useState } from 'react'
import './App.css'
import { getRandomNumber, seq } from "./utils";
import useSound from "use-sound";

const NumNumbersAtLine = 10;
function App() {
  const [missCount, setMissCount] = useState(0);
  const [progress, setProgress] = useState(0);
  const [numberLines, setNumberLines] = useState(seq(10).map(() => seq(NumNumbersAtLine).map(() => getRandomNumber())));
  const [pi] = useSound("/pi.wav");
  const [ok] = useSound("/ok.wav");

  const handleKeydown = useCallback((event: KeyboardEvent) => {
    if (event.key === `${numberLines[0][progress]}`) {
      if (progress+1 >= NumNumbersAtLine) {
        setProgress(0);
        setNumberLines(nl => nl.slice(1).concat([seq(10).map(() => getRandomNumber())]));
        ok();
      } else {
        setProgress(c => c + 1);
        pi();
      }
    } else {
      setMissCount(mc => mc+1);
    }
  }, [numberLines, setProgress, progress, pi]);

  useEffect(() => {
    document.addEventListener("keydown", handleKeydown);
    return () => document.removeEventListener("keydown", handleKeydown);
  }, [handleKeydown]);

  return (
    <div className="App">

      <div>Miss: {missCount}</div>
      
      <h1><span style={{color: "lightgrey"}}>{numberLines[0]?.slice(0, progress).join(" ")}</span>{" "}{numberLines[0]?.slice(progress).join(" ")}</h1>
      {numberLines.slice(1).map((numbers, i) => <h2 key={i}>{numbers.join(" ")}</h2>)}
    </div>
  )
}

export default App
