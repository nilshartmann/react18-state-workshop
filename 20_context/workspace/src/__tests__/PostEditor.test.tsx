import React from "react";
import { render, screen } from "@testing-library/react";
import _userEvent from "@testing-library/user-event";
import PostEditor, { NewBlogPost } from "../PostEditor";
import { jest } from "@jest/globals";

type OnSaveFn = (newBlogPost: NewBlogPost) => void;

// todo:
// diese setup-Funktion soll uns beim Setup der einzelnen Testfälle helfen
//
//  - sie soll:
//    - das user(Event)-Objekt initialisieren
//    - den PostEditor mit der übergebnen (Mock-)Funktion rendern
//    - die wichtigsten UI-Elemente suchen (title und body-Input, save-Button)

//  die Funktion soll das Ergebnis in eine Objekt zurückliefern,
//   so dass wir in den Test-Funktionen dann nur noch setup() aufrufen müssen
//   (Beispielhafte Verwendung s.u.)

const setup = (onSavePost: OnSaveFn = jest.fn()) => {
  const user = _userEvent.setup();

  // todo:
  //  PostEditor-Komponente rendern
  //    dabei onSavePost-Property setzen

  const titleInput = screen.getByTestId(
    "todo: richtige getBy-Funktion verwenden.",
  );
  const bodyInput = screen.getByTestId(
    "todo: richtige getBy-Funktion verwenden.",
  );
  const saveButton = screen.getByTestId(
    "todo: richtige getBy-Funktion verwenden.",
  );

  return {
    user,

    titleInput,
    bodyInput,

    saveButton,
    onSavePost,
  } as const;
};

test("add post button callback", async () => {
  const { user, titleInput, bodyInput, saveButton, onSavePost } = setup();

  // todo:
  //  ergänze den Test:
  //    1. in das Titel- und Body-Feld soll etwas eingegeben werdem
  //    2. Klicke auf den Save-Button
  //    3. Stelle sicher, dass 'onSavePost' mit den eingegebenen Werten
  //       aufgerufen wurde
  //
});

test("save button enablement", async () => {
  const { user, titleInput, bodyInput, saveButton } = setup();

  // todo:
  //
  // Stelle sicher, dass der Save-Button disabled ist
  // gib dann erst etwas in das title, dann in das body-Feld etwas ein
  // stelle danach sicher, dass der Save-Button nun enabled ist
  //   (der Save-Button ist nur enabled, wenn BEIDE Felder ausgefüllt sind)
});
