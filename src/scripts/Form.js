export default class Form {
    fieldset = null;
    addButton = null;
    errorParaghraph = null;
    inputValues = [];

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
        this.fieldset = this.basicNode.querySelector(".form__fieldset");
        this.addButton = document.querySelector(".container__button--add");
        this.errorParaghraph = document.querySelector(".container__paragraph--error");
    }

    setSearchParam() {
        const url = new URL(window.location);
        const params = new URLSearchParams(url.search);

        if (params.has("search")) {
            const value = params.get("search");
            this.inputValues = [`${value}`];
        } if (!params.has("search")) {
            this.inputValues = [`all`];
        }
    }

    render = () => {
        const { fieldset, renderFieldset, inputValues } = this;
        fieldset.innerHTML = renderFieldset(inputValues);
    }

    renderFieldset(inputValues) {
        return inputValues.map((input, index) => (`
        <fieldset class="form__fieldset">
            <legend class="form__fieldset--legend">hasło${index + 1}</legend>
            <div class="form__wrapper">
                <input data-input-index="${index}" class="container__input--text" type="text" value="${input}"/>
                <button data-btn-index="${index}" class="${index === 0 ? "container__button--none" : "container__button--delete"}" ${index === 0 ? "disable" : ""}></button>
            </div>
        </fieldset>
    `)).join(``);
    }

    add(value) {
        const inputsMaxNumbers = 6;
        const { inputValues, render, addButton, errorParaghraph } = this;

        function isInputEmpty(element) {
            return element === "";
        }
        if (inputValues.filter(isInputEmpty).length > 0) {
            errorParaghraph.innerHTML = `Nie wszystkie pola są wypełnione!`;
        }
        if (inputValues.filter(isInputEmpty).length === 0) {
            errorParaghraph.innerHTML = ``;
            inputValues.push(value);
            render();
            if (inputValues.length === inputsMaxNumbers) {
                addButton.disabled = true;
            }
            const allInputs = document.querySelectorAll(".container__input--text");
            allInputs[allInputs.length - 1].focus();
        }
    }

    delete(index) {
        this.inputValues.splice(index, 1);
        this.init();
    }

    save() {
        const { inputValues } = this;

        location.href = `/?search=${inputValues[0]}&passwords=${inputValues.slice(1).join(";")}`;
    }

    bindEventHandlers() {
        const { basicNode, fieldset } = this;
        basicNode.addEventListener('click', this.onClickHandler);
        fieldset.addEventListener('input', this.onInputHandler);
    }

    onClickHandler = (e) => {
        e.preventDefault();
        const target = e.target.className;
        if (target === "container__button--add layout__button") {
            this.add("")
        } if (target === "container__button--delete") {
            this.delete(e.target.dataset.btnIndex);
        } if (target === "container__input--submit layout__button") {
            this.save();
        }
    }

    onInputHandler = (e) => {
        const { inputValues } = this;
        inputValues.splice(e.target.dataset.inputIndex, 1, e.target.value);
    }
}