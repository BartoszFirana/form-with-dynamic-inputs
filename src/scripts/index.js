class Input {
    constructor() {
        this.inputs = ["domyślny"];
    }
};

class Render extends Input {
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
}

class Add extends Input {
    add(value) {
        const errorParaghraph = document.querySelector(".container__paragraph--error");
        function isInputEmpty(element) {
            return element === "";
        }
        if (this.inputs.filter(isInputEmpty).length > 0) {
            console.log("pusto");
            errorParaghraph.innerHTML = `Nie wszystkie pola są wypełnione!`;
        }
        if (this.inputs.filter(isInputEmpty).length === 0) {
            errorParaghraph.innerHTML = ``;
            this.inputs.push(value);
            renderArray.render();
            if (this.inputs.length === inputsMaxNumbers) {
                addButton.disabled = true;
            }
            const allInputs = document.querySelectorAll(".container__input--text");
            allInputs[allInputs.length - 1].focus();
        }
    }
}

class Delete extends Input {
    delete(index) {
        this.inputs.splice(index, 1);
        renderArray.render();
        if (this.inputs.length < inputsMaxNumbers) {
            addButton.disabled = false;
        }
    }
}

class OnChange extends Input {
    onChange(index, value) {
        this.inputs.splice(index, 1, value);
    }
}

class OnSave extends Input {
    onSave() {
        function firstIndexWithout(element, index) {
            return (index > 0 ? element : null);
        }
        location.href = `/?search=${this.inputs[0]}&passwords=${this.inputs.map(firstIndexWithout).join(';')}`;
    }
}

const fieldset = document.querySelector(".form__fieldset");
const inputsMaxNumbers = 6;

const renderArray = new Render();
const addArray = new Add();
const deleteArray = new Delete();
const onChangeArray = new OnChange();
const onSave = new OnSave();
renderArray.render();

const addButton = document.querySelector(".container__button--add");
const saveButton = document.querySelector(".container__input--submit");

addButton.addEventListener("click", e => {
    e.preventDefault();
    const maxInputNumbers = addArray.inputs.length < inputsMaxNumbers;
    if (maxInputNumbers) {
        addArray.add("");
    }
})

fieldset.addEventListener('click', e => {
    e.preventDefault();
    const isButtonDelete = e.target.classList.value === "container__button--delete";
    const isIdButton = e.target.id > 0;
    if (isButtonDelete && isIdButton) {
        deleteArray.delete(e.target.id);
    }
})

fieldset.addEventListener('input', e => {
    const isClassList = e.target.classList.value === "container__input--text";
    const inputId = e.target.id;
    if (isClassList) {
        renderArray.onChange(inputId, e.target.value);
    }
})

saveButton.addEventListener('click', e => {
    e.preventDefault();
    renderArray.onSave();
})