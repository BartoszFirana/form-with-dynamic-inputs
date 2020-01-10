import Form from './Form.js';

const formNode = document.querySelector('.form');

const form = new Form(formNode);
form.setSearchParam();
form.init();