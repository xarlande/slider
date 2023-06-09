import { selectorsQuery } from "./modules/consol.js";

const selectors = selectorsQuery();

let currentImg = 0;

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

  itemsArr.splice(currentImg, 1, active);

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

updateHtmlForButtons();

selectors.btnBottomBlock.addEventListener("click", (event) => {
  const target = event.target;

  if (target.closest(".btn__block-field span")) {
    currentImg = target.attributes.index.value;
    updateHtmlForButtons();
  }
});

selectors.nextBtn.addEventListener("click", () => {
  if (maxCurrentImg < currentImg + 1) {
    currentImg = 0;
  } else {
    currentImg += 1;
  }
  updateHtmlForButtons();
});
selectors.backBtn.addEventListener("click", () => {
  if (currentImg > 0) {
    currentImg -= 1;
  } else {
    currentImg = maxCurrentImg;
  }
  updateHtmlForButtons();
});

class Slider {
  constructor() {}
}

const Sli = new Slider();
