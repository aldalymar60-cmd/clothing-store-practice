'use strict';
const cards = Array.from(document.querySelectorAll('.product'));
const search = document.querySelector('#search');
const category = document.querySelector('#category');
const sort = document.querySelector('#sort');
function update() {
  const query = search.value.trim().toLocaleLowerCase('ru');
  const ordered = [...cards];
  if (sort.value !== 'default') ordered.sort((a,b) => (Number(a.dataset.price)-Number(b.dataset.price)) * (sort.value === 'asc' ? 1 : -1));
  let count = 0;
  for (const card of ordered) {
    card.hidden = !(card.dataset.name.toLocaleLowerCase('ru').includes(query) && (!category.value || card.dataset.category === category.value));
    if (!card.hidden) count++;
    document.querySelector('#products').append(card);
  }
  document.querySelector('#count').textContent = `Товаров: ${count}`;
  document.querySelector('#empty').hidden = count !== 0;
}
document.querySelector('#filters').hidden = false;
search.addEventListener('input', update);
category.addEventListener('change', update);
sort.addEventListener('change', update);
document.querySelector('#reset').addEventListener('click', () => {search.value='';category.value='';sort.value='default';update();search.focus();});
