const Input = function () {
    this.inputs = ["text"];
}

Input.prototype.render = function () {
    const fieldset = document.querySelector(".form__fieldset");
    console.log(this.inputs);
    fieldset.innerHTML = this.inputs.map((input, index) => (
        `
        <fieldset id="${input.index}" class="form__fieldset">
            <legend class="form__fieldset--legend">${"hasło" + index}</legend>
            <div class="form__wrapper">
                <input class="container__input--text" type="text" value="${input}"/>
                <button id="${input.index}" onclick="${inputArray.delete(index)}" class="container__button--delete">X</button>
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
    this.inputs.splice(index, 0);
}

const inputArray = new Input();

inputArray.render();

inputArray.add("");