import { selectorsQuery } from "./modules/consol.js";

const selectors = selectorsQuery();

let currentImgIndex = 0;

const allImgLength = selectors.allImg.length;
const maxCurrentImg = allImgLength - 1;

const active = " ● ";
const notActive = " ○ ";

const generateBtn = () => {
  const itemsArr = [];
  let itemsString = "";

  for (let i = 0; i < allImgLength; i += 1) {
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
const updateImgBlockStyle = () => selectors.imgBlock.style.transform = `translate3d(${-1300 * currentImgIndex}px, 0px, 0px)`


updateHtmlForButtons();


selectors.btnBottomBlock.addEventListener("click", (event) => {
  const target = event.target;

  if (target.closest(".btn__block-field span")) {
    currentImgIndex = +target.attributes.index.value;
    updateHtmlForButtons();
    updateImgBlockStyle()
  }
});

selectors.nextBtn.addEventListener("click", () => {
  if (maxCurrentImg < currentImgIndex + 1) {
    currentImgIndex = 0;
  } else {
    currentImgIndex += 1;
  }
  updateHtmlForButtons();
  updateImgBlockStyle()
});
selectors.backBtn.addEventListener("click", () => {
  if (currentImgIndex > 0) {
    currentImgIndex -= 1;
  } else {
    currentImgIndex = maxCurrentImg;
  }
  updateHtmlForButtons();
  updateImgBlockStyle()
});

class Slider {
  constructor() {}
}

const Sli = new Slider();
