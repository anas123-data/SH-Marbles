// Internal specimens only: no collection of personal data, network or storage.
const form = document.querySelector('#demo-form');
const nameInput = document.querySelector('#demo-name');
const nameError = document.querySelector('#name-error');
const formStatus = document.querySelector('#form-status');
const motion = () => matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth';

document.querySelector('#primary-demo').addEventListener('click', () => {
  nameInput.scrollIntoView({behavior: motion(), block: 'center'});
  nameInput.focus({preventScroll: true});
  document.querySelector('#action-status').textContent = 'Primary action: focus moved to the example form. No inquiry is being sent.';
});
document.querySelector('#secondary-demo').addEventListener('click', () => {
  document.querySelector('#imagery').scrollIntoView({behavior: motion()});
  document.querySelector('#action-status').textContent = 'Secondary action: showing the image-card specimens.';
});
document.querySelectorAll('input[name="tone"]').forEach(input => {
  input.addEventListener('change', () => {
    document.querySelector('#tone-status').textContent = `${input.value} tone selected. No material recommendation is implied.`;
  });
});
form.addEventListener('submit', event => {
  event.preventDefault();
  const valid = nameInput.value.trim().length > 0;
  nameError.hidden = valid;
  nameInput.setAttribute('aria-invalid', String(!valid));
  formStatus.textContent = valid ? 'Example checked. Nothing was sent or saved.' : 'Check the highlighted name field. Nothing was sent.';
  if (!valid) nameInput.focus();
});
nameInput.addEventListener('input', () => {
  if (nameInput.value.trim()) {nameError.hidden = true; nameInput.setAttribute('aria-invalid', 'false');}
});
form.addEventListener('reset', () => {
  nameError.hidden = true;
  nameInput.removeAttribute('aria-invalid');
  formStatus.textContent = 'Example reset. Nothing was sent or saved.';
});
const mobileMenu = document.querySelector('.mobile-nav');
mobileMenu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {mobileMenu.open = false;}));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && mobileMenu.open) {mobileMenu.open = false; mobileMenu.querySelector('summary').focus();}
});
