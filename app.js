/*   
<div id=parent>
   <div id=child>
          <h1> i am an h1 tag</h1>
            <h2> i am an h2 tag</h2>
          </div>
           <div id=child>
          <h1> i am an h1 tag</h1>
            <h2> i am an h2 tag</h2>
          </div>
</div>
 
ReactElement is an object which has type and props as its properties. Type is the type of the element and props is the properties of the element. Props is an object which has children as its property. Children is an array which contains the children of the element.
 
*
*
*/
const parent = React.createElement(
   "div",
   { id: "parent" },
  [ React.createElement( "div",  { id: "child1" },[
      React.createElement("h1", {}, "i am an h1 tag"),
      React.createElement("h2", {}, "i am an h2 tag")
   ]),
    React.createElement( "div",  { id: "child2" },[
      React.createElement("h1", {}, "i am an h1 tag"),
      React.createElement("h2", {}, "i am an h2 tag")
   ])
]);
      

//jsx  



const heading = React.createElement("h1",
   { id: "heading" },
   "Hello World from React");
console.log(parent);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(parent);
