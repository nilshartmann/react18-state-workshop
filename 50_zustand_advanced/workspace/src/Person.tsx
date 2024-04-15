import { useState } from "react";

type IPerson = {
  firstname: string;
  lastname: string;
};

function PersonFormular() {
  const [person, setPerson] = useState<IPerson>({
    firstname: "",
    lastname: "",
  });

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");

  return (
    <form>
      <input
        type={"text"}
        value={person.firstname}
        onChange={(e) => {
          // ...
          // KLONEN + anpassen!
          setPerson({
            ...person,
            firstname: e.target.value,
          });
        }}
      />
    </form>
  );
}
