// AUFGABE:
//
//    Implementiere die updateShppingCart-Funktion mit JavaScript/TypeScript Bordmitteln,
//     OHNE zusätzliche Bibliothek!
//
//  Diese Funktion fügt ein neues Produkt zu einem Warenkorb hinzu,
//   entfernt ein Produkt oder aktualisiert dessen Anzahl im Warenkorb
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
//

import { ShoppingCart } from "./shopping-cart.types.ts";
import { produce } from "immer";

export function updateShoppingCartImmer(
  cart: ShoppingCart,
  productId: string,
  amount: number,
): ShoppingCart {
  return produce(cart, (draft) => {
    if (amount === 0) {
      return;
    }

    const existingItem = draft.items.find((p) => p.productId === productId);
    if (!existingItem) {
      if (amount < 1) {
        // item is not present, amount is < 1 => nothing to do
        return;
      }

      draft.items.push({
        productId,
        quantity: amount,
      });

      return;
    }

    // item is present
    const newQuantity = existingItem.quantity + amount;
    if (newQuantity < 1) {
      // Here we COULD work with items.filter as without immer,
      //  but we also can work with splice, which would not possible
      //  WITHOUT immer
      //   - use what best fits for you
      //   - eventhough I think 'filter' would be better here,
      //     I'm using splice to demonstrate that
      //     you COULD use splice here
      const ix = draft.items.findIndex((p) => p.productId === productId);
      draft.items.splice(ix, 1);
      return;
    }

    existingItem.quantity = newQuantity;
  });
}
