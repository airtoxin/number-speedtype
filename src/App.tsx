import { useCallback, useEffect, useState } from 'react'
import './App.css'
import { getRandomNumber, seq } from "./utils";

const NumNumbersAtLine = 10;
function App() {
  const [count, setCount] = useState(0);
  const [numberLines, setNumberLines] = useState(seq(10).map(() => seq(NumNumbersAtLine).map(() => getRandomNumber())));

  console.log("@numberLines", numberLines);
  const handleKeydown = useCallback((event: KeyboardEvent) => {
    if (event.key === `${numberLines[0][count]}`) {
      if (count+1 >= NumNumbersAtLine) {
        setCount(0);
        setNumberLines(nl => nl.slice(1).concat([seq(10).map(() => getRandomNumber())]))
      } else {
        setCount(c => c + 1);
      }
    }
  }, [numberLines, setCount, count]);

  useEffect(() => {
    document.addEventListener("keydown", handleKeydown);
    return () => document.removeEventListener("keydown", handleKeydown);
  }, [handleKeydown]);

  return (
    <div className="App">
      <h1><span style={{color: "lightgrey"}}>{numberLines[0]?.slice(0, count).join(" ")}</span>{" "}{numberLines[0]?.slice(count).join(" ")}</h1>
      {numberLines.slice(1).map((numbers, i) => <h2 key={i}>{numbers.join(" ")}</h2>)}
    </div>
  )
}

export default App
