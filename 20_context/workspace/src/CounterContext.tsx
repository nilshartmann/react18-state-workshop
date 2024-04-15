// todo

import { createContext, ReactNode, useContext, useState } from "react";

type ICounterContext = {
  counter: number;
  increaseCounter(): void;
};

export const CounterContext = createContext<ICounterContext | null>(null);

type CounterContextProviderProps = {
  children: ReactNode;
};

// <CounterContextProvider>
//    <CounterButton />
// </CounterContextProvider>

export default function CounterContextProvider({
  children,
}: CounterContextProviderProps) {
  const [counter, setCounter] = useState(200);

  function increaseCounter() {
    setCounter(counter + 1);
  }

  const value: ICounterContext = {
    counter,
    increaseCounter,
  };

  return (
    <CounterContext.Provider value={value}>
      {/* */}
      {children}
    </CounterContext.Provider>
  );
}

//
export function useCounterContext() {
  const counterContext = useContext(CounterContext);
  if (counterContext === null) {
    throw new Error(
      "CounterContext is null. CounterContextProvider nicht gefunden.",
    );
  }

  return counterContext;
}
