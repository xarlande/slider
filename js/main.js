import { selectorsQuery } from "./modules/consol.js";

const selectors = selectorsQuery();

selectors.nextBtn.addEventListener('click', () => console.log('Next'))
