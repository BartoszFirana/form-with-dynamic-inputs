import '@testing-library/jest-dom/extend-expect';
import { queryByTestId } from '@testing-library/dom';
import Form from './Form';

function getExampleDOM() {
    const div = document.createElement('div');
    div.innerHTML = `
    <form class="form" data-testid="pagination">
          <fieldset class="form__fieldset">
            <!-- inputs -->
          </fieldset>
          <button class="container__button--add layout__button">dodaj</button>
          <p class="container__paragraph--error"></p>
          <input
            class="container__input--submit layout__button"
            type="submit"
            value="zapisz"
            name="save"
          />
        </form>
    `;
    const form = new Form(div);
    form.init()
    return div;
}

describe('Test of DOM inited in Form Class', () => {

    test('Query by test ID', async () => {
        const container = getExampleDOM();
        console.log(container);
        console.log(queryByTestId(container, 'pagination'));
        expect(queryByTestId(container, 'pagination')).toBeTruthy();
    });

});