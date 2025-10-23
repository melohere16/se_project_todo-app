class Todo {
  constructor({ name, date, completed, id }, selector, counter) {
    this._name = name;
    this._date = date;
    this._completed = completed;
    this._id = id;
    this._selector = selector;
    this._counter = counter;
  }

  _setEventListeners() {
    this._todoDeleteBtn.addEventListener("click", () => {
      this._todoElement.remove();

      this._counter.updateTotal(false);

      if (this._completed) {
        this._counter.updateCompleted(false);
      }
    });

    this._todoCheckboxEl.addEventListener("change", () => {
      this._completed = !this._completed;

      this._counter.updateCompleted(this._completed);
    });
  }

  _generateCheckboxEl() {
    this._todoCheckboxEl = this._todoElement.querySelector(".todo__completed");
    this._todoLabel = this._todoElement.querySelector(".todo__label");
    this._todoCheckboxEl.checked = this._completed;
    this._todoCheckboxEl.id = `todo-${this._id}`;
    this._todoLabel.setAttribute("for", `todo-${this._id}`);
  }

  _generateDeleteBtnEl() {
    this._todoDeleteBtn = this._todoElement.querySelector(".todo__delete-btn");
  }

  getView() {
    this._templateElement = document.querySelector(this._selector);
    this._todoElement = this._templateElement.content
      .querySelector(".todo")
      .cloneNode(true);

    const todoNameEl = this._todoElement.querySelector(".todo__name");
    todoNameEl.textContent = this._name;

    const todoDateEl = this._todoElement.querySelector(".todo__date");
    if (this._date) {
      const dueDate = new Date(this._date);
      if (!isNaN(dueDate)) {
        todoDateEl.textContent = `Due: ${dueDate.toLocaleString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })}`;
      }
    }

    this._generateCheckboxEl();
    this._generateDeleteBtnEl();
    this._setEventListeners();

    return this._todoElement;
  }
}

export default Todo;
