import { v4 as uuid } from 'uuid';

const formEl = document.querySelector<HTMLFormElement>('form#add');
const updateForm = document.querySelector<HTMLFormElement>('form#update');
const updateModal = document.querySelector<HTMLDivElement>('.modal-update');
const addModal = document.querySelector<HTMLDivElement>('.modal-add');
const itemsEl = document.querySelector<HTMLDivElement>('.items ul');
const addButton = document.querySelector<HTMLButtonElement>('button.add');

interface Field {
  inputType: "button" | "checkbox" | "color" | "date" | "datetime-local" | "email" | "file" | "hidden" | "image" | "month" | "password" | "radio" | "range" | "reset" | "search" | "submit" | "tel" | "text" | "time" | "url" | "week" | "number";
  label: string;
  name: string;
}

const fields: Field[] = [
  { inputType: 'hidden', label: 'ID', name: '_id' },
  { inputType: 'text', label: 'Description', name: 'description' },
  { inputType: "number", label: 'Price', name: 'price' },
];

// From the above data, how do I get this?
interface Item {
  _id: string;
  description: string;
  price: number;
}

type ItemKey = keyof Item;

interface Response {
  status: 'success' | 'error';
  message: string;
}

type ItemUpdateInput = Partial<Omit<Item, '_id'>>;

interface CreateFormElement extends HTMLFormElement {
  _id: HTMLInputElement;
  price: HTMLInputElement;
  description: HTMLInputElement;
}

interface FormEvent extends Event {
  target: EventTarget & HTMLFormElement
}

let items: Item[] = [];

const testItem: Item = {
  _id: 'test',
  price: 100,
  description: 'test'
}

function createItem(item: Omit<Item, '_id'>): Item {
  const newItem = {
    _id: uuid(),
    ...item,
  };
  items.push(newItem);
  const createdEvent = new CustomEvent('items:changed', {
    detail: newItem,
  });
  formEl.dispatchEvent(createdEvent);
  formEl.reset();
  return newItem;
}

function readItems(): Item[] {
  return items;
}

function deleteItem(id: string): Response {
  // 1 find the item
  items = items.filter((item) => item._id !== id);
  formEl.dispatchEvent(new CustomEvent('items:changed'));
  return {
    message: `Item ${id} Deleted!`,
    status: 'success',
  };
}

function updateItem(id: string, updates: ItemUpdateInput): Item {
  // 1. find the item
  let itemIndex = items.findIndex((item) => item._id === id);
  if (itemIndex < 0) {
    throw new Error('Item not found');
  }
  // 2. Update it
  items[itemIndex] = {
    ...items[itemIndex],
    ...updates,
  };
  console.log(items);

  // 3. Trigger an event
  formEl.dispatchEvent(new CustomEvent('items:changed', { detail: items[itemIndex] }));
  return items[itemIndex];
}

function renderItems(event: CustomEvent<Item>) {
  itemsEl.innerHTML = /* html */ `
    <ul>
      ${items
    .map(
      (item) => /*html*/`<li id="${item._id}" draggable="true" class="${item._id === event.detail?._id ? 'fresh' : ''}">
        <h2>${item.description}</h2>
        <p class="price">${formatMoney(item.price)}</p>
        <button type="button" data-item-delete="${item._id}" title="Delete">❌ Delete</button>
        <button type="button" data-item-update="${item._id}" title="Delete"> ✏️ Edit</button>
      </li>`
        )
    .join('')}
    </ul>
  `;
}

function generateUpdateForm(item: Item): string {
  return fields.map(field => /*html*/`
  <label for="${field.name}">
    ${field.inputType === 'hidden' ? '' : field.label}
    <input type="${field.inputType}" name="${field.name}" id="${field.name}" value="${item[field.name as ItemKey]}">
  </label>
  `).join('')
}

// Event Handlers
function handleSubmit(event: FormEvent) {
  event.preventDefault();
  createItem({
    description: event.target.description.value,
    price: parseFloat(event.target.price.value),
  });
  // close the modal
  addModal.classList.remove('visible');
}

function handleDelete(event: Event) {
  // This is not the button that was clicked
  const button = event.target as HTMLButtonElement;
  const id = button.dataset.itemDelete;
  if(!id) return;
  deleteItem(id);
}

function handleUpdate(event: FormEvent) {
  // This is not the button that was clicked
  event.preventDefault();
  console.log('saving...')
  const form = event.target;
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries()) as unknown as Item;
  const { _id, ...updates } = data;
  updateItem(_id, updates);
  // hide the form
  updateModal.classList.remove('visible');
}

function populateUpdateForm(event: FormEvent) {
  // This is not the button that was clicked
  const id = event.target.dataset.itemUpdate;
  if(!id) return;
  console.log('gotta update!')
  // find the item
  const item = items.find(item => item._id === id);
  updateForm.querySelector('fieldset').innerHTML = generateUpdateForm(item);
  // show the form
  updateModal.classList.add('visible');
}

function mirrorLocally() {
  localStorage.setItem('items', JSON.stringify(items));
}

function restore() {
  const itemString = localStorage.getItem('items');
  if(itemString) {
    items = JSON.parse(itemString) as Item[];
  }
  formEl.dispatchEvent(new CustomEvent('items:changed'));
}

function formatMoney(amount: number) {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });
  return formatter.format(amount);
}

function handleKeyUp(e: KeyboardEvent) {
  if(e.key === 'Escape') {
    // find any modal open
    const modal = document.querySelector('.modal.visible');
    if(modal) {
      modal.classList.remove('visible');
    }
  }

}

formEl.addEventListener('submit', handleSubmit);
formEl.addEventListener('items:changed', renderItems);
formEl.addEventListener('items:changed', mirrorLocally);
itemsEl.addEventListener('click', handleDelete);
itemsEl.addEventListener('click', populateUpdateForm);
updateForm.addEventListener('submit', handleUpdate);
addButton.addEventListener('click', () => addModal.classList.add('visible'));
// close modals when esc is pressed
window.addEventListener('keyup', handleKeyUp);

// on page load
restore();
export {};


