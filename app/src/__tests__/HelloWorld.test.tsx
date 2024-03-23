import { render } from "@testing-library/react";
import HelloWorld from "../HelloWorld.tsx";
test("demo", () => {
  expect(true).toBe(true);
});
test("hello", () => {
  const r = render(<HelloWorld />);
  expect(r.getByRole("heading")).toHaveTextContent(/hello/i);
});
