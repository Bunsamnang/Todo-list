let todoList = JSON.parse(localStorage.getItem("todoList")) || [];

// display the todo-list even when the page is refreshed
renderAddTodo();

document.querySelector(".js-addTodo-btn").addEventListener("click", () => {
  addTodo();
});
function addTodo() {
  const inputElement = document.querySelector(".js-name-input");
  const name = inputElement.value;

  const dateInputElement = document.querySelector(".js-date-input");
  const dueDate = dateInputElement.value;
  if (name === "" && dueDate === "") {
    alert("You did not add your todo list and due date.");
  } else if (name === "") {
    alert("You did not add your todo list.");
    dateInputElement.value = "";
  } else if (dueDate === "") {
    alert("You did not select your due date.");
    inputElement.value = "";
  } else {
    todoList.push({
      name: name,
      dueDate: dueDate,
      // Shord-hand property: when the variable name and the object property name is the same.
      // name,
      // dueDate,
    });
    inputElement.value = "";
    dateInputElement.value = "";
    renderAddTodo();

    // Whenever we update the todo list, save it in localStorage.
    saveToStorage();
  }
}

function renderAddTodo() {
  let todoListContainer = "";
  // for loop
  // for (let i = 0; i < todoList.length; i++) {
  //   const todoObject = todoList[i];
  //   const name = todoObject.name;
  //   const dueDate = todoObject.dueDate;
  //   // Short-hand or destructuring: when the variable name and the object property name is the same.
  //   // const { name, dueDate } = todoObject;
  //   const displayTodo = `
  //   <div>${name}</div>
  //   <div>${dueDate}</div>
  //   <button onclick = "
  //     todoList.splice(${i}, 1);
  //     renderAddTodo();

  //   // Whenever we update the todo list, save it in localStorage.
  //     saveToStorage();
  //   "
  //   class = "delete-btn"
  //   >Delete</button
  //   `;
  //   todoListContainer += displayTodo;

  // ForEach
  // to skip in foreach: use return;
  todoList.forEach((todoObject) => {
    const name = todoObject.name;
    const dueDate = todoObject.dueDate;
    // Short-hand or destructuring: when the variable name and the object property name is the same.
    // const { name, dueDate } = todoObject;
    const displayTodo = `
    <div>${name}</div>
    <div>${dueDate}</div>
    <button class = "delete-btn js-delete-btn"
    >Delete</button
    `;
    todoListContainer += displayTodo;
  });

  console.log(todoListContainer);

  document.querySelector(".js-todo-list").innerHTML = todoListContainer;
  // List of buttons works like an array
  document.querySelectorAll(".js-delete-btn").forEach((deleteBtn, index) => {
    deleteBtn.addEventListener("click", () => {
      todoList.splice(index, 1);
      renderAddTodo();
      saveToStorage();
    });
  });
}

document.querySelector(".js-name-input").addEventListener("keydown", () => {
  handleKeyDown();
});
function handleKeyDown() {
  if (event.key === "Enter") {
    addTodo();
  }
}

function saveToStorage() {
  localStorage.setItem("todoList", JSON.stringify(todoList));
}
