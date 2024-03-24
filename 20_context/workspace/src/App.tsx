import React from "react";
import Container from "./Container";

// TODO ÜBUNG 1: Stelle das Formular auf die Verwendung eines Kontexts um
//
//  - Baue dazu einen Kontext (FormContext), der alle benötigten Daten und
//    Callback-Funktionen hat, so dass Input und Clear Button keine Properties mehr benötigen
//    ('name' muss weiterhin per Property an die 'Input'-Komponenten übergeben werden,
//      also 'name' nicht in den Kontext nehmen)
//    - Definiere einen TypeScript-Typen (IFormContext) dafür
//    - 'createContext' soll als Typ 'IFormContext | null' haben und als Default-Wert
//      'null' übergeben bekommen
//
//  - Vervollständige die 'Form'-Komponente:
//     - diese soll als Provider-Komponente dienen und deren children den FormContext
//       zur Verfügung stellen
//  - Dann kannst Du den State und die beiden Callback-Funktionen aus 'PersonForm' entfernen
//  - Verwende dort stattdessen die Form-Komponente
//  - Dann kannst Du Input und ClearButton anpassen, so dass diese ebenfalls den Kontext
//    verwenden
//  - Wenn alles funktioniert kannst Du zwei Formulare gleichzeitig darstellen? Diese sollten sich
//    nicht gegenseitig behindern...
//
//  - Hinweise:
//    -  die Container - Komponente, die im Beispiel verwendet wird, ist nur zur Visualisierung
//       der Komponente-Hierarchie. Sie kann außerdem beim Rendern ausgeben, wie häufig sie aufgerufen wurde
//       - Dazu in Container.tsx in showRenderings auf true setzen, wenn Du die Renderings
//         kontrollieren willst. Du findest die Angaben auch auf der Browser Console.
//
//    - Bei Fragen gerne fragen, häufig sind Fragen (und deren Antworten) auch für andere interessant 😉
//
//    - Mögliche Lösung findest Du in ../../material/PersonForm_mit_context.tsx

type FormProps = {
  children: React.ReactNode;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function Form({ children }: FormProps) {
  return (
    <Container title="Form">
      {/* hier Provider und children rendern! */}
      {children}
    </Container>
  );
}

type InputProps = {
  name: string;
  formState: FormState;
  onFieldChange(name: string, newValue: string): void;
};

function Input({ name, formState, onFieldChange }: InputProps) {
  return (
    <Container title={`input_${name}`}>
      <label>
        {name}
        <input
          type="text"
          value={formState[name] || ""}
          onChange={e => onFieldChange(name, e.target.value)}
        />
      </label>
    </Container>
  );
}

type ClearButtonProps = {
  onClearForm: () => void;
};
function ClearButton({ onClearForm }: ClearButtonProps) {
  return (
    <Container title={`clear`}>
      <button onClick={onClearForm}>Clear form</button>{" "}
    </Container>
  );
}

type FieldSetProps = {
  children: React.ReactNode;
};

// Wann/wie oft wird eigentlich das FieldSet neu gerendert? 🤔
function FieldSet({ children }: FieldSetProps) {
  return <Container title="Fieldset">{children}</Container>;
}

type FormState = Record<string, string>;

export default function PersonForm() {
  const [formState, setFormState] = React.useState<FormState>({});

  function onClearForm() {
    setFormState({});
  }

  function onFieldChange(fieldname: string, value: string) {
    setFormState({
      ...formState,
      [fieldname]: value
    });
  }

  return (
    <Container title="PersonForm">
      <FieldSet>
        <Input name="firstname" formState={formState} onFieldChange={onFieldChange} />
        <Input name="lastname" formState={formState} onFieldChange={onFieldChange} />
      </FieldSet>
      <ClearButton onClearForm={onClearForm} />
    </Container>
  );
}
