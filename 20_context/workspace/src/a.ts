export default undefined;

type IPerson = {
  firstname: string;
};

// warum kein Return Type?

let x = "";

type YesOrNo = true | false;

type Greeting = {
  phrase: string;
  title: string | null | undefined;
};

const g: Greeting = {
  phrase: "..",
  title: null,
};

Object.getOwnPropertyNames(g);

interface IGreeting {
  phrase: string;
  title: string;
}

interface IGreeting {
  firstname: number;
}

type OptionalPerson = IPerson | null | undefined;

function greet(person?: OptionalPerson): Greeting {
  // if (person === null) {  // Type Guards
  // 	return "Hallo"
  // }
  // if (person === undefined) {  // Type Guards
  // 	return "Hallo"//
  // }
  return { phrase: "" };
}

greet(undefined);
greet();

const greeting = greet({
  firstname: "Klaus",
});
greeting.phrase.toLowerCase();

greet(null);

greet(undefined);
