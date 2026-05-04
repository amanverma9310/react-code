import React from "react";
import ReactDOM from "react-dom/client";

const parent = React.createElement(
   "div",
   { id: "parent" },
   [React.createElement("div", { id: "child1" }, [
      React.createElement("h1", {}, "i am Aman verma"),
      React.createElement("h2", {}, "i am an h2 tag")
   ]),
   React.createElement("div", { id: "child2" }, [
      React.createElement("h1", {}, "i am an h3 tag"),
      React.createElement("h2", {}, "i am an h2 tag")
   ])
   ]);
//jsx  - HTML -Like or xml -like syntax but is not HTML in jsx  

//react element
const Title = () => (
   <h1 id="heading" className="head">
      Hello World from React using jsx
   </h1>
   );

//react component
     //1. class based component -OLD
     //2. functional components-NEW


//Component Composition - combining multiple components together to create a complex UI
const HeadingComponent =() =>(
  <div id="container">
   {100+200}
   <Title/>
   <h1 className="heading">HELLO world react with Functional component    </h1>
   </div>
);


const heading = React.createElement("h1",
   { id: "heading" },
   "Hello World from React");
console.log(parent);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<HeadingComponent/>);