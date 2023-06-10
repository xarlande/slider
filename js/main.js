import { selectorsQuery } from "./modules/consol.js";

const selectors = selectorsQuery();

class Carousel {
  constructor() {
    this.currentImgIndex = 0;
    this.currentShowType = 1;
    this.active = " ● ";
    this.notActive = " ○ ";
  }

  getAllImgLength() {
    return selectors.allImg.length;
  }

  getMaxImgIndex() {
    return this.getAllImgLength() - 1;
  }

  generateBtn() {
    const itemsArr = [];
    let itemsString = "";

    for (let i = 0; i < this.getAllImgLength(); i += 1) {
      itemsArr.push(this.notActive);
    }

    itemsArr.splice(this.currentImgIndex, 1, this.active);

    let index = 0;

    itemsArr.forEach((item) => {
      itemsString =
          itemsString + `<span index='${index}'> ${item} </span>` + "\n";
      index += 1;
    });

    return itemsString;
  }

  updateHtmlForButtons() {
    selectors.btnBottomBlock.innerHTML = this.generateBtn();
  }

  updateImgBlockStyle() {
    if (this.currentShowType === 1) {
      selectors.imgBlock.style.transform = `translate3d(${
          -1300 * this.currentImgIndex
      }px, 0px, 0px)`;
    }
    if (this.currentShowType === 3) {
      selectors.imgBlock.style.transform = `translate3d(${
          -(1330 / 3) * this.currentImgIndex
      }px, 0px, 0px)`;
    }
  }

  updateDOM() {
    this.updateHtmlForButtons();
    this.updateImgBlockStyle();
  }

  handleButtonClick(event) {
    const target = event.target;

    if (target.closest(".btn__block-field span")) {
      this.currentImgIndex = +target.attributes.index.value;
      this.updateDOM();
    }
  }

  handleNextButtonClick() {
    if (this.currentShowType === 3) {
      if (this.getMaxImgIndex() < this.currentImgIndex + 3) {
        this.currentImgIndex = 0;
      } else {
        this.currentImgIndex += 3;
      }
    }
    if (this.currentShowType === 1) {
      if (this.getMaxImgIndex() < this.currentImgIndex + 1) {
        this.currentImgIndex = 0;
      } else {
        this.currentImgIndex += 1;
      }
    }
    this.updateDOM();
  }

  handleBackButtonClick() {
    if (this.currentShowType === 3) {
      if (this.currentImgIndex > 2) {
        this.currentImgIndex -= 3;
      } else if (this.currentImgIndex > 0) {
        this.currentImgIndex = 0;
      } else {
        this.currentImgIndex = this.getMaxImgIndex() - 2;
      }
    }
    if (this.currentShowType === 1) {
      if (this.currentImgIndex > 0) {
        this.currentImgIndex -= 1;
      } else {
        this.currentImgIndex = this.getMaxImgIndex();
      }
    }
    this.updateDOM();
  }

  handleTypeShowSelectChange(event) {
    this.currentShowType = +event.target.value;
    this.currentImgIndex = 0;
    this.updateStyleForImage();
    this.updateDOM();
  }

  updateStyleForImage() {
    selectors.allImg.forEach((item) => {
      item.style.width = `${100 / this.currentShowType}%`;
      item.style.borderRadius = "4px";
      item.style.height = "100%";
    });
  }

  init() {
    selectors.btnBottomBlock.addEventListener("click", this.handleButtonClick.bind(this));
    selectors.nextBtn.addEventListener("click", this.handleNextButtonClick.bind(this));
    selectors.backBtn.addEventListener("click", this.handleBackButtonClick.bind(this));
    selectors.typeShowSelect.addEventListener("change", this.handleTypeShowSelectChange.bind(this));
    this.updateDOM();
    this.updateStyleForImage();
  }
}

const NewCarousel = new Carousel();
NewCarousel.init();


// class Father {}
//
// class Slider extends Father {
//   #currentImgIndex = 0;
//   currentShowType = 1;
//   allImgLength = selectors.allImg.length;
//   maxImgIndex = this.allImgLength - 1;
//   active = " ● ";
//   notActive = " ○ ";
// }
// class TabMenu extends Father {
//
// }
//
// const Sli = new Father();
//
// const test = new Slider();
// const test2 = new Slider();
//
// console.log(test2.currentImgIndex)
