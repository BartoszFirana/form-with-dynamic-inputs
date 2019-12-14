const fieldset = document.querySelector(".form__fieldset");
const Input = function () {
    this.inputs = ["text"];
}

Input.prototype.render = function () {
    fieldset.innerHTML = this.inputs.map((input, index) => (
        `
        <fieldset class="form__fieldset">
            <legend class="form__fieldset--legend">${"hasło" + index}</legend>
            <div class="form__wrapper">
                <input id="${index}" class="container__input--text" type="text" value="${input}"/>
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

Input.prototype.onChange = function (index, value) {
    this.inputs.splice(index, 1, value);
    console.log(this.inputs);
}

Input.prototype.onSave = function () {
    const theArray = this.inputs
    location.href = `/?search=${this.inputs[0]}&passwords=${this.inputs.map((input) => input + ";")}`
}

const inputArray = new Input();
inputArray.render();

const addButton = document.querySelector(".container__button--add");
const saveButton = document.querySelector(".container__input--submit");

addButton.addEventListener("click", e => {
    e.preventDefault();
    const maxInputNumbers = inputArray.inputs.length < 5;
    if (maxInputNumbers) {
        inputArray.add("");
    }
})

fieldset.addEventListener('click', e => {
    e.preventDefault();
    const isButtonDelete = e.target.classList.value === "container__button--delete";
    const isIdButton = e.target.id > 0;
    console.log(e.target.classList.value);
    if (isButtonDelete && isIdButton) {
        inputArray.delete(e.target.id);
    }
})

fieldset.addEventListener('input', e => {
    const isClassList = e.target.classList.value === "container__input--text";
    const inputId = e.target.id;
    if (isClassList) {
        inputArray.onChange(inputId, e.target.value);
    }
})

saveButton.addEventListener('click', e => {
    e.preventDefault();
    inputArray.onSave();
})