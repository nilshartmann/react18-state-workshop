// AUFGABE:
//
//    Implementiere die updateShppingCart-Funktion mit JavaScript/TypeScript Bordmitteln,
//     OHNE zusätzliche Bibliothek!
//
//  Diese Funktion fügt ein neues Produkt zu einem Warenkorb hinzu,
//   entfernt ein Produkt oder aktualisiert dessen Anzahl im Warenkorb
//
// - zurückgeliefert wird
//
//  - amount kann eine positive oder negative Zahl sein
//     - wenn positiv wird die Anzahl im Warenkorb erhöht
//     - wenn negativ wird die Anzahl im Warenkorb verringert
//
//  Anforderungen:
//   - wenn amount === 0 ist, soll die Cart unverändert bleiben
//   - wenn amount > 0 ist:
//      - wenn das Produkt bereis in der Cart vorhanden ist, soll dessen quantity entsprechend
//        erhöht werden (quantity = quantity + amount)
//      - wenn das Produkt nicht vorhanden ist, soll es der Cart hinzugefügt werden
//        (quantity = amount)
//  - wenn amount < 0 ist:
//       - wenn das Produkt nicht in der Cart vorhanden ist, soll die Cart unverändert
//         zurückgegeben werden
//       - wenn das Produkt vorhanden ist, soll die neue quantity berechnet werden
//          (newQuantity = oldQuantity + amount) (Bedenke: amount ist hier negativ!)
//          (z.B. newQuantity = 5 + -3)
//       - wenn die neue Quantity < 1 ist, soll das Produkt aus der Cart entfernt werden
//       - ansonsten soll die Quantity im bestehenden Produkt aktualisiert werden
//
//  ACHTUNG!
//   Sämtliche Änderungen sollen immutable passieren, aber es sollen SO WENIG WIE MÖGLICH
//    neue Listen und Objekte erzeugt werden
//      - wenn die Cart nicht verändert wird => Cart unverändert zurückgeben!
//      - Items die in der Cart nicht verändert werden => unverändert zurückgeben
//
//  KONTROLLE / TEST
//   - Wenn Du alles korrekt implementiert hast, sollten die Tests in '__test__/updateShoppingCart.test.ts'
//       alle "grün" werden
//
//

type IShoppingCartItem = {
  productId: string;
  quantity: number;
};

type IShoppingCart = {
  username: string;
  items: IShoppingCartItem[];
};

export function updateShoppingCart(
  cart: IShoppingCart,
  productId: string,
  amount: number,
): IShoppingCart {
  // todo!
  return cart;
}
