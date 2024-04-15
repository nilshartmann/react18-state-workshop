// todo

import { createContext, ReactNode, useContext, useState } from "react";
import { create } from "zustand";

type ICounterContext = {
  counter: number;
  increaseCounter(): void;
};

type ICounterStore = {
  counter: number;
  name: string;

  // Actions
  increaseCounter(): void;
  resetCounter(): void;
};

// const counterStoreCreateFn = create<ICounterStore>();
export const useCounterStore = create<ICounterStore>()((set) => ({
  counter: 100,
  name: "Susi",

  increaseCounter() {
    set((currentStore) => ({
      counter: currentStore.counter + 1,
    }));
  },

  resetCounter() {
    set({ counter: 0 });
  },
}));
//
// export const CounterContext = createContext<ICounterContext | null>(null);
//
// type CounterContextProviderProps = {
//   children: ReactNode;
// };
//
// export default function CounterContextProvider({
//   children,
// }: CounterContextProviderProps) {
//   const [counter, setCounter] = useState(200);
//
//   function increaseCounter() {
//     setCounter(counter + 1);
//   }
//
//   const value: ICounterContext = {
//     counter,
//     increaseCounter,
//   };
//
//   return (
//     <CounterContext.Provider value={value}>
//       {/* */}
//       {children}
//     </CounterContext.Provider>
//   );
// }
//
// //
// export function useCounterContext() {
//   const counterContext = useContext(CounterContext);
//   if (counterContext === null) {
//     throw new Error(
//       "CounterContext is null. CounterContextProvider nicht gefunden.",
//     );
//   }
//
//   return counterContext;
// }
