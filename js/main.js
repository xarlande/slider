class Father {
  constructor(elementWrapper) {
    this.currentImgIndex = 0;
    this.elementWrapper = elementWrapper;
  }
}

class Carousel extends Father {
  constructor(slider) {
    super(slider);
    this.currentShowType = 1;
    this.getElements();
    this.init();
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

  getAllImgLength() {
    return this.allImg.length;
  }

  getMaxImgIndex() {
    return this.getAllImgLength() - 1;
  }

  generateBtn() {
    const itemsArr = [];
    let itemsString = "";
    const active = " ● ";
    const notActive = " ○ ";

    for (let i = 0; i < this.getAllImgLength(); i += 1) {
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
    this.allImg.forEach((item) => {
      item.style.width = `${100 / this.currentShowType}%`;
      item.style.borderRadius = "4px";
      item.style.height = "100%";
    });
  }
}

class tabMenu extends Father {
  constructor(tabMenu) {
    super(tabMenu);
    this.getElements();
    this.init();
    this.generateTabMenuButtons();
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
  }

  allImageLength() {
    return this.allImage.length;
  }

  generateTabMenuButtons() {
    const buttonsArr = [];
    let buttonsString = "";

    for (let i = 0; i < this.allImageLength(); i += 1) {
      buttonsArr.push(i);
    }

    buttonsArr.forEach((item,idx) => {
      if (idx === 0){
        buttonsString = `<span index="${item}" class="active">Image: ${item + 1} </span>\n`
      } else {
        buttonsString =
            buttonsString + `<span index="${item}"> Image: ${item + 1}</span>\n`;
      }
    });

    this.headerTab.innerHTML = buttonsString;
  }

  activatedButtonsForHeader(event) {
    const target = event.target;
    if (target.closest('span')){
      this.getElements()

      console.log(event.target);
      console.log(this.allHeaderBtn);

      this.allHeaderBtn.forEach(item => {
        item.classList.remove('active')
      })

      this.allImage.forEach((item, idx) => {
        item.classList.remove("active");
        if (idx === +target.attributes.index.value) {
          item.classList.add("active");
        }
      });

      target.classList.add('active')
    }
  }
}

new Carousel(document.querySelector("#slider"));
new Carousel(document.querySelector("#slider1"));

new tabMenu(document.querySelector("#tab"));
new tabMenu(document.querySelector("#tab1"));
