export function shallowCompare(o1: unknown, o2: unknown) {
  // TODO:
  //   Implementiere diese shallowCompare-Funktion, die zwei Werte vergleicht
  //
  //   Zwei Werte sollen identisch sein:
  //     - wenn sie identisch gemäß Object.is sind
  //       (darin enthalten z.B. o1 === o2)
  //     - wenn beide vom Typ Objekt / Array sind
  //     - im Objekt bzw. Array auf erster Ebene dieselben Werte vorhanden sind (Object.is)
  //       - Mit Object.keys bekommst Du sowohl die Keys von Objekten als auch von Arrays ("1", "2", "3")
  //     - "Sonderfälle" wie Klassen, Maps, Sets, prototypsiche Vererbung etc. behandeln wir nicht
  //
  //  In ../material/10_shallow_compare/__test__ findest Du eine Test-Funktion
  //   - Kopiere diese in dein src/-Verzeichnis.
  //   - Wenn du die shallowCompare-Funktion korrekt implementiert hast, sollten die Tests darin "grün" sein
  //
  // Nur als Überlegung:
  //  - was müsste man tun, wenn man auch Map/Set unterstützen wollte?
  //  - was müsste man tun, wenn man eine "deepCompare"-Funktion bauen wollte, die Objekte/Arrays komplett vergleicht
  //    (also nicht nur o1.a === o2.a sondern auch o1.a.x === o2.a.x usw)
}
