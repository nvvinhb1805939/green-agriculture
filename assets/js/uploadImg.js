const uploadBtnElm = document.querySelector('.info__btn[type="button"]');
const fileUploadElm = document.querySelector('.info__input');
const imgElm = document.querySelector('.info__img');

const handleUploadBtnClick = () => {
  fileUploadElm.click();
};
const handleFileChange = e => {
  const objectURL = URL.createObjectURL(e.target.files[0]);
  imgElm.src = objectURL;
  imgElm.onload = function () {
    URL.revokeObjectURL(this.src);
  };
};

uploadBtnElm.addEventListener('click', handleUploadBtnClick);
fileUploadElm.addEventListener('change', handleFileChange);
