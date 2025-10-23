import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import TodoCounter from "../components/TodoCounter.js";

const addTodoButton = document.querySelector(".button_action_add");
const addTodoForm = document.querySelector(".popup__form");

const todoCounter = new TodoCounter(initialTodos, ".counter__text");

const generateTodo = (data) => {
  const todo = new Todo(data, "#todo-template", todoCounter);
  return todo.getView();
};

const section = new Section({
  items: initialTodos,
  renderer: (todoData) => {
    const todo = generateTodo(todoData);
    section.addItem(todo);
  },
  containerSelector: ".todos__list",
});

section.renderItems();

const addTodoPopup = new PopupWithForm("#add-todo-popup", (formData) => {
  const { name, date } = formData;
  const id = uuidv4();

  const todoData = {
    name,
    date: new Date(date),
    id,
    completed: false,
  };

  const todo = generateTodo(todoData);
  section.addItem(todo);

  todoCounter.updateTotal(true);

  newTodoValidator.resetValidation();
  addTodoPopup.close();
});

addTodoPopup.setEventListeners();

addTodoButton.addEventListener("click", () => addTodoPopup.open());

const newTodoValidator = new FormValidator(validationConfig, addTodoForm);
newTodoValidator.enableValidation();
