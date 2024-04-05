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
  // ... todo ...
});
