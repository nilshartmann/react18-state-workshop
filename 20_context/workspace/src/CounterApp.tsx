import { useContext, useState } from "react";
import Container from "./Container";
import TwoColumns from "./TwoColumns";
import CounterContextProvider, {
  CounterContext,
  useCounterContext,
} from "./CounterContext.tsx";

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
      </TwoColumns>
    </Container>
  );
}

function CounterDisplay() {
  // Context verwenden
  const counterContext = useCounterContext();

  return (
    <Container title="Counter Display">
      <h1>Counter</h1>
      <NumberDisplay
        label="Current Counter value"
        value={counterContext.counter}
      />
      <button onClick={() => counterContext.increaseCounter()}>
        Increase!
      </button>
    </Container>
  );
}

type NumberDisplayProps = {
  label: string;
  value: number;
};
function NumberDisplay({ label, value }: NumberDisplayProps) {
  return (
    <Container title="NumberDisplay">
      <p>
        {label}: {value}
      </p>
    </Container>
  );
}

export default function App() {
  return (
    <CounterContextProvider>
      <Container title="Root">
        <Main />
      </Container>
    </CounterContextProvider>
  );
}
