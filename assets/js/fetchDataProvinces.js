/** ********************FORM & MODAL************************* */
const addBtnElm = document.getElementById('add');
const modalElm = document.querySelector('.modal');
const modalFormElm = document.querySelector('.modal__form');
const cancelBtnElm = document.querySelector('.btn.btn--error.modal__btn');
/** ********************Fetch data************************* */
const API_URL = 'https://provinces.open-api.vn/api';
const provinceListElms = document.querySelectorAll('.data-list.modal__list');
const inputElms = document.querySelectorAll('.form__input.modal__input');

const handleProvinceItemClick = e => {
  e.target.parentElement.classList.remove('show');
  document.querySelector('.data-list__item.active')?.classList.remove('active');
  e.target.classList.add('active');
  inputElms[0].value = e.target.innerText;
};

const fetchDataProvince = async url => {
  const response = await fetch(url);
  const provinceList = await response.json();

  provinceListElms[0].innerHTML = '';

  provinceList.forEach(provinceItem => {
    const name = provinceItem.name.replace('Tỉnh', '').replace('Thành phố', '').trim();
    const item = document.createElement('li');
    item.className = 'data-list__item';
    item.setAttribute('data-code', provinceItem.code);
    item.innerText = name;
    item.addEventListener('click', handleProvinceItemClick);
    provinceListElms[0].appendChild(item);
  });
};

inputElms.forEach((inputElm, index) => {
  inputElm.addEventListener('focus', () => {
    document.querySelectorAll('.data-list.modal__list.show').forEach(item => {
      item?.classList.remove('show');
    });
    provinceListElms[index].classList.add('show');
  });

  inputElm.addEventListener('click', e => {
    e.stopPropagation();
  });
});

inputElms[0].addEventListener('input', e => {
  const value = e.target.value.trim();

  if (value == '') fetchDataProvince(`${API_URL}/p/`);
  else fetchDataProvince(`${API_URL}/p/search/?q=${value}`);
});

const handleAddClick = () => {
  modalElm.classList.add('show');
  fetchDataProvince(`${API_URL}/p/`);
};

const handleModalFormClick = e => {
  e.stopPropagation();
  document.querySelectorAll('.data-list.modal__list.show').forEach(item => {
    item?.classList.remove('show');
  });
};

const handleCloseModal = () => {
  modalElm.classList.remove('show');
  modalFormElm.reset();
  document.querySelector('.data-list__item.active')?.classList.remove('active');
  document.querySelectorAll('.data-list.modal__list.show').forEach(item => {
    item?.classList.remove('show');
  });
};

addBtnElm.addEventListener('click', handleAddClick);
modalElm.addEventListener('click', handleCloseModal);
modalFormElm.addEventListener('click', handleModalFormClick);
cancelBtnElm.addEventListener('click', handleCloseModal);
