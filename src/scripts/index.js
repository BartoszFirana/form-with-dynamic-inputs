const fieldset = document.querySelector(".form__fieldset");
const inputsMaxNumbers = 6;

const Input = function () {
    this.inputs = ["domyślny"];
}

Input.prototype.render = function () {
    fieldset.innerHTML = this.inputs.map((input, index) => (
        `
        <fieldset class="form__fieldset">
            <legend class="form__fieldset--legend">hasło${index + 1}</legend>
            <div class="form__wrapper">
                <input id="${index}" class="container__input--text" type="text" value="${input}"/>
                <button id="${index}" class="${index === 0 ? "container__button--none" : "container__button--delete"}" ${index === 0 ? "disable" : ""}></button>
            </div>
        </fieldset>
    `
    )).join(``);
};

Input.prototype.add = function (value) {
    const errorParaghraph = document.querySelector(".container__paragraph--error");

    function isInputEmpty(element, index) {
        return element === "";
    }

    if (this.inputs.filter(isInputEmpty).length > 0) {
        console.log("pusto");
        errorParaghraph.innerHTML = `Nie wszystkie pola są wypełnione!`;
    } if (this.inputs.filter(isInputEmpty).length === 0) {
        errorParaghraph.innerHTML = ``;
        this.inputs.push(value);
        inputArray.render();
        if (this.inputs.length === inputsMaxNumbers) {
            addButton.disabled = true;
        }
        const allInputs = document.querySelectorAll(".container__input--text");
        allInputs[allInputs.length - 1].focus();
    }
}

Input.prototype.delete = function (index) {
    this.inputs.splice(index, 1);
    inputArray.render();
    if (this.inputs.length < inputsMaxNumbers) {
        addButton.disabled = false;
    }
}

Input.prototype.onChange = function (index, value) {
    this.inputs.splice(index, 1, value);
}

Input.prototype.onSave = function () {
    function firstIndexWithout(element, index) {
        return (index > 0 ? element : null);
    }
    location.href = `/?search=${this.inputs[0]}&passwords=${this.inputs.map(firstIndexWithout).join(';')}`
}

const inputArray = new Input();
inputArray.render();

const addButton = document.querySelector(".container__button--add");
const saveButton = document.querySelector(".container__input--submit");

addButton.addEventListener("click", e => {
    e.preventDefault();
    const maxInputNumbers = inputArray.inputs.length < inputsMaxNumbers;
    if (maxInputNumbers) {
        inputArray.add("");
    }
})

fieldset.addEventListener('click', e => {
    e.preventDefault();
    const isButtonDelete = e.target.classList.value === "container__button--delete";
    const isIdButton = e.target.id > 0;
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