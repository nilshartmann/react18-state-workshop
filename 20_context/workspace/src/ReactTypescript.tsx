import React, { JSX, ReactNode } from "react";

type MyComponentProps = {
  title: string;
};

function MyComponent1(props: MyComponentProps) {
  return <h1>Hallo{props.title}</h1>;
  // return Symbol()
}

function MyComponent(props: MyComponentProps): ReactNode {
  return <h1>Hallo{props.title}</h1>;
  // return Symbol()
}
const MyOtherComponent = (props: MyComponentProps): ReactNode => {
  return <h1>Hallo{props.title}</h1>;
  // return Symbol()
};
const MyFunctionalComponent: React.FC<MyComponentProps> = (props) => {
  return <h1>Hallo {props.title}</h1>;
  // return Symbol()
};
type HelloProps = {
  children?: ReactNode;
  title?: ReactNode;
};
const helloWorld: JSX.Element = <h1>Hello World</h1>;
function Hello({ title, children }: HelloProps) {
  return (
    <div>
      <div className={"Title"}>{title}</div>
      {children}
    </div>
  );
}
function HelloWorld() {
  const object = {};
  return (
    <>
      <Hello title={<h1>World</h1>} />
      <Hello>
        <h1></h1>
        <h2></h2>
        ...
      </Hello>
      <Hello>123</Hello>
    </>
  );
}

function TestComponent() {
  return (
    <>
      <MyComponent1 title={"..."} />
      <MyComponent title={"..."} />
      <MyOtherComponent title={"..."} />
    </>
  );
}
