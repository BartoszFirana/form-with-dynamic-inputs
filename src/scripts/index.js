const fieldset = document.querySelector(".form__fieldset");
const Input = function () {
    this.inputs = ["text"];
}

Input.prototype.render = function () {
    fieldset.innerHTML = this.inputs.map((input, index) => (
        `
        <fieldset id="${input.index}" class="form__fieldset">
            <legend class="form__fieldset--legend">${"hasło" + index}</legend>
            <div class="form__wrapper">
                <input class="container__input--text" type="text" value="${input}"/>
                <button id="${index}" class="container__button--delete">X</button>
            </div>
        </fieldset>
    `
    )).join(``);
};

Input.prototype.add = function (value) {
    this.inputs.push(value);
    inputArray.render();
}

Input.prototype.delete = function (index) {
    this.inputs.splice(index, 1);
    inputArray.render();
}

const inputArray = new Input();
inputArray.render();

const addButton = document.querySelector(".container__button--add");
const deleteButton = document.querySelectorAll(".container__button--delete");

addButton.addEventListener("click", e => {
    e.preventDefault();
    const maxInputNumbers = inputArray.inputs.length <= 5;
    if (maxInputNumbers) {
        inputArray.add("");
    }
})

fieldset.addEventListener('click', e => {
    e.preventDefault();
    const classList = e.target.classList.value;
    if (classList == "container__button--delete") {
        inputArray.delete(e.target.id);
    }
})