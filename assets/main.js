/**
 * CONTAINER
 *  HEADing
 *  BOX-UL
 *  <li>
 *      radiocheckbox
 *      content
 *  </li>  
 * button onlcick -> tạo ra li vs input là rỗng -> nếu 2 thg heading vs content = '' thì xóa li khi unblur
 */
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const form = $('.box__form');
const addInput = $('.box__add-input');
const addBtn = $('.box__add-btn');
const ul = $('.box__list');
form.addEventListener('submit', function(e) {
    e.preventDefault();
    let val = addInput.value.trim('');
    if(val) {
        renderList(val);
    }
    addInput.value = '';
})

renderList = (val) => {
    const htmls = `
    <li class="box__list-items">
    <input class="box__list-checkbox" type="checkbox" >
    <div class="box__list-content">
        <input class="box__list-content-input" value="${val}" placeholder="write something..." type="text">
        </div>
 </li>
 `
 ul.innerHTML += htmls;
 const liElements = ul.querySelectorAll('.box__list-items');
 const liArray = Array.from(liElements).map(li => li.outerHTML);
 localStorage.setItem('listItems', JSON.stringify(liArray));
handleCheckbox();
}

window.addEventListener('load', () => {
    const savedListItems = JSON.parse(localStorage.getItem('listItems'));
    if (savedListItems) {
      ul.innerHTML = savedListItems.join('');
      handleCheckbox();
    }
  });
handleCheckbox = () => {
    const checkboxes = $$('.box__list-checkbox');
    checkboxes.forEach(function(checkbox) {
      checkbox.addEventListener('change', function(e) {
        const listInput = this.parentNode.querySelector('.box__list-content-input'); 
        if (e.target.checked) {
            listInput.classList.add('box__list-content-input--checked')
          timeout = setTimeout(() => {
            this.parentElement.remove();
            saveItem();
          }, 3000);
        } else {
            listInput.classList.remove('box__list-content-input--checked');
            clearTimeout(timeout)
        }
      });
    });
  }

saveItem = () => {
  const liElements = ul.querySelectorAll('.box__list-items');
  const liArray = Array.from(liElements).map(li => li.outerHTML);
  localStorage.setItem('listItems', JSON.stringify(liArray));
}

// checkValueInput = () => {
//   const liInput = this.parentNode.querySelector('.box__list-content-input'); 
//   console.log(liInput);
//   liInput.onblur = () => {
//     if(liInput.value == '') {
//       console.log('empty');
//     }
//   }
// }

// checkValueInput();

