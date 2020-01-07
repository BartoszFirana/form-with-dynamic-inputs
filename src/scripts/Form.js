export default class Form {
    fieldset = null;
    inputValues = ['wartosc'];

    constructor(basicNode) {
        this.basicNode = basicNode;
    }

    init() {
        this.setDomElements()

        if (!this.fieldset) {
            return;
        }

        this.render();
        this.bindEventHandlers();
    }

    setDomElements() {
        this.fieldset = this.basicNode.querySelector(".form__fieldset")
    }

    render() {
        this.fieldset.innerHTML = this.renderFieldset(this.inputValues)
    }

    renderFieldset(inputValues) {
        return inputValues.map((input, index) => (`
        <fieldset class="form__fieldset">
            <legend class="form__fieldset--legend">hasło${index + 1}</legend>
            <div class="form__wrapper">
                <input class="container__input--text" type="text" value="${input}"/>
                <button class="${index === 0 ? "container__button--none" : "container__button--delete"}" ${index === 0 ? "disable" : ""}></button>
            </div>
        </fieldset>
    `)).join(``);
    }

    bindEventHandlers() {
        console.log("1 bindEventHandlers");
        const { fieldset } = this;
        console.log("fieldset ma typ: ", typeof (fieldset));
        console.log("fieldset: ", fieldset)
        fieldset.addEventListener('click', e => {
            e.preventDefault();
            this.onClickHandler(e);
            console.log("3 e.target.value", e.target.value);
        });
        fieldset.addEventListener('input', this.onInputHandler);
    }

    onClickHandler = (e) => {
        console.log(e.target);
    }

    onInputHandler = (e) => {
        // e.target
    }
}




/**
class Input {
    constructor() {
        this.inputs = ["domyślny"];
    }

    render() {
        fieldset.innerHTML = this.inputs.map((input, index) => (`
        <fieldset class="form__fieldset">
            <legend class="form__fieldset--legend">hasło${index + 1}</legend>
            <div class="form__wrapper">
                <input id="${index}" class="container__input--text" type="text" value="${input}"/>
                <button id="${index}" class="${index === 0 ? "container__button--none" : "container__button--delete"}" ${index === 0 ? "disable" : ""}></button>
            </div>
        </fieldset>
    `)).join(``);
    }

    add(value) {
        const errorParaghraph = document.querySelector(".container__paragraph--error");
        function isInputEmpty(element) {
            return element === "";
        }
        if (this.inputs.filter(isInputEmpty).length > 0) {
            errorParaghraph.innerHTML = `Nie wszystkie pola są wypełnione!`;
        }
        if (this.inputs.filter(isInputEmpty).length === 0) {
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

    delete(index) {
        this.inputs.splice(index, 1);
        inputArray.render();
        if (this.inputs.length < inputsMaxNumbers) {
            addButton.disabled = false;
        }
    }

    onChange(index, value) {
        this.inputs.splice(index, 1, value);
    }

    onSave() {
        function firstIndexWithout(element, index) {
            return (index > 0 ? element : null);
        }
        location.href = `/?search=${this.inputs[0]}&passwords=${this.inputs.map(firstIndexWithout).join(';')}`;
    }
}

const fieldset = document.querySelector(".form__fieldset");
const inputsMaxNumbers = 6;

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

*/