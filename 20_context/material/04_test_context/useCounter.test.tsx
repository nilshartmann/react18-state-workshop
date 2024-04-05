import { act, renderHook } from "@testing-library/react";
import { useState } from "react";

function useDemoCounter() {
  const [count, setCount] = useState(100);

  function increaseCount() {
    setCount(count + 1);
  }

  return {
    count,
    increaseCount,
  };
}

test("useDemoCounter Works", () => {
  const { result } = renderHook(() => useDemoCounter());
  expect(result.current.count).toBe(100);

  act(() => result.current.increaseCount());

  expect(result.current.count).toBe(101);
});
