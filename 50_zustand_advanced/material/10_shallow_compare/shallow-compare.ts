export function shallowCompare(o1: unknown, o2: unknown) {
  if (Object.is(o1, o2)) {
    return true;
  }

  // wenn Objekt is false zurückliefert, haben wir entweder
  //  - zwei PRIMITIVE Typen mit anderen Werten
  //  - EINMAL null
  //  - oder zwei unterschiedliche Objekte

  if (
    typeof o1 !== "object" ||
    o1 === null ||
    typeof o2 !== "object" ||
    o2 === null
  ) {
    return false;
  }

  // wir machen es uns hier leicht(er) und prüfen keine Sets, Maps, Klassen, Prototype-Chaing etc.

  const keys1 = Object.keys(o1);
  const keys2 = Object.keys(o2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (const k of keys1) {
    // auch das hier ist vereinfacht
    const v1 = o1[k as keyof typeof o1];
    const v2 = o2[k as keyof typeof o2];
    if (!Object.is(v1, v2)) {
      return false;
    }
  }

  return true;
}
