class Father {
  constructor(elementWrapper, imgArr) {
    this.elementWrapper = elementWrapper;
    this.imgArr = imgArr
  }

  allImageLength() {
    return this.imgArr.length;
  }
}

class Carousel extends Father {
  constructor(slider, imageArr) {
    super(slider, imageArr);
    this.currentShowType = 1;
    this.currentImgIndex = 0;
    this.generateHTML();
    this.getElements();
    this.init();
  }

  generateHTML() {
    const labelElement = document.createElement("label");
    labelElement.setAttribute("class", "selectTypeShow");
    labelElement.textContent = "Change type show: ";

    const selectElement = document.createElement("select");
    selectElement.setAttribute("name", "typeShow");
    selectElement.setAttribute("class", "typeShowImg");

    const optionValues = ["1", "3"];

    for (let i = 0; i < optionValues.length; i++) {
      const optionElement = document.createElement("option");
      optionElement.setAttribute("value", optionValues[i]);
      optionElement.textContent = optionValues[i];
      selectElement.appendChild(optionElement);
    }

    labelElement.appendChild(selectElement);

    const sliderDiv = document.createElement("div");
    sliderDiv.setAttribute("class", "slider__block");

    const btnBackDiv = document.createElement("div");
    btnBackDiv.setAttribute("class", "btn__back");

    const btnBackInnerDiv = document.createElement("div");
    btnBackInnerDiv.setAttribute("class", "btn");
    btnBackInnerDiv.textContent = "<";

    btnBackDiv.appendChild(btnBackInnerDiv);

    sliderDiv.appendChild(btnBackDiv);

    const btnNextDiv = document.createElement("div");
    btnNextDiv.setAttribute("class", "btn__next");

    const btnNextInnerDiv = document.createElement("div");
    btnNextInnerDiv.setAttribute("class", "btn");
    btnNextInnerDiv.textContent = ">";

    btnNextDiv.appendChild(btnNextInnerDiv);

    sliderDiv.appendChild(btnNextDiv);

    const btnBlockDiv = document.createElement("div");
    btnBlockDiv.setAttribute("class", "btn__block");

    const btnBlockFieldDiv = document.createElement("div");
    btnBlockFieldDiv.setAttribute("class", "btn__block-field");

    btnBlockDiv.appendChild(btnBlockFieldDiv);

    sliderDiv.appendChild(btnBlockDiv);

    const imgBlockDiv = document.createElement("div");
    imgBlockDiv.setAttribute("class", "img__block");

    for (let j = 0; j < this.allImageLength(); j++) {
      let imgElement = document.createElement("img");
      imgElement.setAttribute("src", this.imgArr[j]);
      imgElement.setAttribute("alt", "empty");
      imgBlockDiv.appendChild(imgElement);
    }

    sliderDiv.appendChild(imgBlockDiv);

    this.elementWrapper.appendChild(labelElement);
    this.elementWrapper.appendChild(sliderDiv);
  }

  getElements() {
    this.allImg = this.elementWrapper.querySelectorAll(".img__block img");
    this.nextBtn = this.elementWrapper.querySelector(".btn__next .btn");
    this.backBtn = this.elementWrapper.querySelector(".btn__back .btn");
    this.imgBlock = this.elementWrapper.querySelector(".img__block");
    this.btnBottomBlock =
      this.elementWrapper.querySelector(".btn__block-field");
    this.typeShowSelect = this.elementWrapper.querySelector(".typeShowImg");
  }

  init() {
    this.btnBottomBlock.addEventListener(
      "click",
      this.handleButtonClick.bind(this)
    );
    this.nextBtn.addEventListener(
      "click",
      this.handleNextButtonClick.bind(this)
    );
    this.backBtn.addEventListener(
      "click",
      this.handleBackButtonClick.bind(this)
    );
    this.typeShowSelect.addEventListener(
      "change",
      this.handleTypeShowSelectChange.bind(this)
    );
    this.updateDOM();
    this.updateStyleForImage();
  }

  getMaxImgIndex() {
    return this.allImageLength() - 1;
  }

  generateBtn() {
    const itemsArr = [];
    let itemsString = "";
    const active = " ● ";
    const notActive = " ○ ";

    for (let i = 0; i < this.allImageLength(); i += 1) {
      itemsArr.push(notActive);
    }

    itemsArr.splice(this.currentImgIndex, 1, active);

    let index = 0;

    itemsArr.forEach((item) => {
      itemsString =
        itemsString + `<span index='${index}'> ${item} </span>` + "\n";
      index += 1;
    });

    return itemsString;
  }

  updateHtmlForButtons() {
    this.btnBottomBlock.innerHTML = this.generateBtn();
  }

  updateImgBlockStyle() {
    if (this.currentShowType === 1) {
      this.imgBlock.style.transform = `translate3d(${
        -1300 * this.currentImgIndex
      }px, 0px, 0px)`;
    }
    if (this.currentShowType === 3) {
      this.imgBlock.style.transform = `translate3d(${
        -(1340 / 3) * this.currentImgIndex
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
    this.allImg.forEach((item) => {
      item.style.width = `${100 / this.currentShowType}%`;
      item.style.borderRadius = "4px";
      item.style.height = "100%";
    });
  }
}

class tabMenu extends Father {
  constructor(elTabMenu, imgArr) {
    super(elTabMenu, imgArr);
    this.generateHtml();
    this.getElements();
    this.init();
  }

  generateHtml() {
    const tabMenuDiv = document.createElement("div");
    tabMenuDiv.setAttribute("class", "tab-menu");

    const headerDiv = document.createElement("div");
    headerDiv.setAttribute("class", "tab-menu__header");

    tabMenuDiv.appendChild(headerDiv);

    const bodyDiv = document.createElement("div");
    bodyDiv.setAttribute("class", "tab-menu__body");

    for (let j = 0; j < this.allImageLength(); j++) {
      const imgElement = document.createElement("img");
      imgElement.setAttribute("src", this.imgArr[j]);
      imgElement.setAttribute("alt", "empty");

      if (j === 0) {
        imgElement.setAttribute("class", "active");
      }

      bodyDiv.appendChild(imgElement);
    }

    tabMenuDiv.appendChild(bodyDiv);

    this.elementWrapper.appendChild(tabMenuDiv);
  }

  getElements() {
    this.headerTab = this.elementWrapper.querySelector(".tab-menu__header");
    this.allHeaderBtn = this.elementWrapper.querySelectorAll(
      ".tab-menu__header span"
    );
    this.allImage = this.elementWrapper.querySelectorAll(".tab-menu__body img");
  }

  init() {
    this.headerTab.addEventListener(
      "click",
      this.activatedButtonsForHeader.bind(this)
    );
    this.generateTabMenuButtons();
  }

  generateTabMenuButtons() {
    const buttonsArr = [];
    let buttonsString = "";

    for (let i = 0; i < this.allImageLength(); i += 1) {
      buttonsArr.push(i);
    }

    buttonsArr.forEach((item, idx) => {
      if (idx === 0) {
        buttonsString = `<span index="${item}" class="active">Image: ${
          item + 1
        } </span>\n`;
      } else {
        buttonsString =
          buttonsString + `<span index="${item}"> Image: ${item + 1}</span>\n`;
      }
    });

    this.headerTab.innerHTML = buttonsString;
  }

  activatedButtonsForHeader(event) {
    const target = event.target;
    if (target.closest("span")) {
      this.getElements();

      this.allHeaderBtn.forEach((item) => {
        item.classList.remove("active");
      });

      this.allImage.forEach((item, idx) => {
        item.classList.remove("active");
        if (idx === +target.attributes.index.value) {
          item.classList.add("active");
        }
      });

      target.classList.add("active");
    }
  }
}

const imageSources = [
  "https://wallpaperaccess.com/full/3209967.jpg",
  "https://wallpaperaccess.com/full/3209964.jpg",
  "https://wallpaperaccess.com/full/1492158.jpg",
  "https://wallpaperaccess.com/full/1492161.jpg",
  "https://wallpaperaccess.com/full/3209971.jpg",
  "https://wallpaperaccess.com/full/898820.jpg",
];

new Carousel(document.querySelector("#slider"), imageSources);
new Carousel(document.querySelector("#slider1"), imageSources);

new tabMenu(document.querySelector("#tab"), imageSources);
new tabMenu(document.querySelector("#tab1"), imageSources);
