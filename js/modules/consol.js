const nextBtn = document.querySelector("#next-btn");
const backBtn = document.querySelector("#back-btn");
const allImg = document.querySelectorAll(".img__block img")
const btnBottomBlock = document.querySelector('.btn__block-field')
const btnBottomAll = document.querySelector('.btn__block-field span')

export function selectorsQuery() {
  return { nextBtn, backBtn, allImg, btnBottomBlock, btnBottomAll };
}
