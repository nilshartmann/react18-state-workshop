import { useContext, useState } from "react";
import Container from "./Container";
import TwoColumns from "./TwoColumns";
import { useCounterStore } from "./CounterContext.tsx";

function Main() {
  // was wird neu gerendert wenn sich der lokale Zustand ändert?
  const [appCount, setAppCount] = useState(0);

  return (
    <Container title="Main">
      <div className="Flex">
        local app counter: {appCount}
        <button onClick={() => setAppCount(appCount + 1)}>Increase</button>
      </div>
      <TwoColumns>
        <CounterDisplay />
        <NumberDisplay />
      </TwoColumns>
    </Container>
  );
}

function CounterDisplay() {
  // Context verwenden
  // const counterContext = useCounterContext();
  const increaseCounter = useCounterStore(
    // Selektor-Funktion
    (currentStore) => currentStore.increaseCounter,
  );

  return (
    <>
      <Container title="Counter Display">
        <h1>Counter</h1>
        <button onClick={() => increaseCounter()}>Increase!</button>
      </Container>
    </>
  );
}

function NumberDisplay() {
  // const counterStore = useCounterStore();
  const counter = useCounterStore((s) => s.counter);
  // const counterContext = useCounterContext();
  return (
    <Container title="NumberDisplay">
      <p>current value: {counter}</p>
    </Container>
  );
}

export default function App() {
  return (
    <Container title="Root">
      <Main />
    </Container>
  );
}
