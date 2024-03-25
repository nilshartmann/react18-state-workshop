import { shallowCompare } from "../shallow-compare.ts";

test("works for primitives", () => {
  expect(shallowCompare("hallo", "welt")).toBe(false);
  expect(shallowCompare("hallo", "hallo")).toBe(true);

  expect(shallowCompare(true, true)).toBe(true);
  expect(shallowCompare(false, false)).toBe(true);
  expect(shallowCompare(true, false)).toBe(false);
  expect(shallowCompare(false, true)).toBe(false);

  expect(shallowCompare(1, 1)).toBe(true);
  expect(shallowCompare(1, 2)).toBe(false);
});

test("works for null", () => {
  expect(shallowCompare("", null)).toBe(false);
  expect(shallowCompare(null, "")).toBe(false);
  expect(shallowCompare(null, {})).toBe(false);
  expect(shallowCompare(null, null)).toBe(true);
});

test("works for object", () => {
  expect(shallowCompare({}, {})).toBe(true);
  expect(shallowCompare({}, null)).toBe(false);
  expect(shallowCompare({ firstName: "Klaus" }, { firstName: "Klaus" })).toBe(
    true,
  );
  expect(shallowCompare({ firstName: "Klaus" }, { firstName: "Susi" })).toBe(
    false,
  );
  expect(shallowCompare({ firstName: "Klaus" }, { lastName: "Klaus" })).toBe(
    false,
  );
  expect(shallowCompare({ firstName: "Klaus" }, {})).toBe(false);
});

test("works for array", () => {
  // expect(shallowCompare([], [])).toBe(true);
  expect(shallowCompare(["Susi", "Schmidt"], ["Susi", "Schmidt"])).toBe(true);
  expect(shallowCompare(["Susi", "Schmidt"], ["Susi", "Schneider"])).toBe(
    false,
  );
  expect(shallowCompare([{}], [{}])).toBe(false); // Nicht shallow equal!
});
