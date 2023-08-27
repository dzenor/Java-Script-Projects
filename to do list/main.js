let addToButton = document.getElementById("addToDo");
let toDoContainer = document.getElementById("toDoContainer");
let inputField = document.getElementById("inputField");

addToButton.addEventListener("click", function () {
  let paragraph = document.createElement("p");
  paragraph.classList.add("paragraph-styling");
  paragraph.innerText = inputField.value;
  toDoContainer.appendChild(paragraph);
  inputField.value = "";
  paragraph.addEventListener("click", function () {
    paragraph.style.textDecoration = "line-through";
  });
  paragraph.addEventListener("dblclick", function () {
    toDoContainer.removeChild(paragraph);
  });
});

window.addEventListener("beforeunload", function (e) {
  const paragraphs = this.document.querySelector("#toDoContainer p");

  paragraphsArr=[];

  paragraphs.forEach(p => {
    let text = p.classList;
    let classes = p.classList;
    let jObj ={
      
    }
  });
})
