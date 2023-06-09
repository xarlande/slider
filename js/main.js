import { selectorsQuery } from "./modules/consol.js";

const selectors = selectorsQuery();

let currentImgIndex = 0;
let currentShowType = 1;

const allImgLength = () => selectors.allImg.length;
const maxImgIndex = allImgLength() - 1;

const active = " ● ";
const notActive = " ○ ";

const generateBtn = () => {
  const itemsArr = [];
  let itemsString = "";

  for (let i = 0; i < allImgLength(); i += 1) {
    itemsArr.push(notActive);
  }

  itemsArr.splice(currentImgIndex, 1, active);

  let index = 0;

  itemsArr.forEach((item) => {
    itemsString =
      itemsString + `<span index='${index}'> ${item} </span>` + "\n";
    index += 1;
  });

  return itemsString;
};

const updateHtmlForButtons = () =>
  (selectors.btnBottomBlock.innerHTML = generateBtn());
const updateImgBlockStyle = () => {
  if (currentShowType === 1) {
    selectors.imgBlock.style.transform = `translate3d(${
      -1300 * currentImgIndex
    }px, 0px, 0px)`;
  }
  if (currentShowType === 3) {
    selectors.imgBlock.style.transform = `translate3d(${
      -(1330/3) * currentImgIndex
    }px, 0px, 0px)`;
  }
};

const updateDOM = () => {
  updateHtmlForButtons();
  updateImgBlockStyle();
};

selectors.btnBottomBlock.addEventListener("click", (event) => {
  const target = event.target;

  if (target.closest(".btn__block-field span")) {
    currentImgIndex = +target.attributes.index.value;
    updateDOM();
  }
});

selectors.nextBtn.addEventListener("click", () => {
  if (currentShowType === 3){
    if (maxImgIndex < currentImgIndex + 3) {
      currentImgIndex = 0
    } else {
      currentImgIndex += 3
    }
  }
  if (currentShowType === 1){
    if (maxImgIndex < currentImgIndex + 1) {
      currentImgIndex = 0;
    } else {
      currentImgIndex += 1;
    }
  }
  updateDOM();
});
selectors.backBtn.addEventListener("click", () => {
  if (currentShowType === 3){
    if (currentImgIndex > 2){
      currentImgIndex -= 3
    }
    else if (currentImgIndex > 0){
      currentImgIndex = 0
    }
    else {
      currentImgIndex = maxImgIndex - 2;
    }
  }
  if (currentShowType === 1){
    if (currentImgIndex > 0) {
      currentImgIndex -= 1;
    } else {
      currentImgIndex = maxImgIndex;
    }
  }
  updateDOM();
});
selectors.typeShowSelect.addEventListener("change", (event) => {
  currentShowType = +event.target.value;
  currentImgIndex = 0
  updateStyleForImage();
  updateDOM()
});

const updateStyleForImage = () => {
  selectors.allImg.forEach((item) => {
    item.style.width = `${100 / currentShowType}%`;
  });
};
updateDOM();
updateStyleForImage();

class Slider {
  constructor() {}
}

const Sli = new Slider();
