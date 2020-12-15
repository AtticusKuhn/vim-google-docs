vim.universal.selectLine = async () => {
  await docs.selectLine();
  return true;
};
vim.universal.l = () => {
  docs.moveRight(true);
};
vim.universal.h = () => {
  docs.moveLeft(true);
};
vim.universal.j = () => {
  docs.pressKey(docs.codeFromKey("ArrowDown"), false, true);
};
vim.universal.k = () => {
  docs.pressKey(docs.codeFromKey("ArrowUp"), false, true);
};
vim.universal.$ = async () => {
  await docs.goToLineEnd(true);
};
vim.universal["0"] = () => {
  docs.goToLineBegin(true);
};
vim.universal.w = async () => {
  console.log("w called");
  let currChar = await docs.getCursorChar(true);
  for (let i = 0; i < 50; i++) {
    if (/.+\s/g.test(currChar)) {
      break;
    }
    // console.log(`/.+\s/g.test(currChar))`, /.+\s/g.test(currChar));
    // console.log("currChar is", currChar);
    // await sleep(100);
    docs.moveRight(true);
    currChar = await docs.getCursorChar(true);
  }
  // docs.moveRight(true);
};
vim.universal.f = async (char) => {
  char = vim.currentSequence[0];
  for (let t = 0; t < 100; t++) {
    const cursorChar = await docs.getCursorChar(true);
    const isStopping = cursorChar.endsWith(char);
    if (isStopping) {
      break;
    }
    docs.moveRight(true);
  }
};
vim.universal.G = async () => {
  const rows = docs.getnumberOfRows();
  const cursorRow = docs.getCursorRow();
  const diff = rows - cursorRow;
  for (let i = 0; i < diff; i++) {
    docs.pressKey(docs.codeFromKey("ArrowDown"), false, true);
  }
  docs.goToLineBegin(true);
};
vim.universal.v = () => {
  vim.switchToVisualMode();
};
vim.universal.Escape = () => {
  vim.switchToNormalMode();
};
vim.universal.g = async (stuff) => {
  // this is a bodge because I think g is a mess and I just want to do gg
  docs.deselect();
  let currentPos = docs.getCursorRow();
  let targetPos = Number(vim.num);
  let difference = Math.abs(currentPos - targetPos);
  let direction = currentPos > targetPos ? "ArrowUp" : "ArrowDown";
  for (let i = 0; i < difference; i++) {
    docs.pressKey(docs.codeFromKey(direction), false, true);
  }
  await docs.goToLineBegin(true);
  return;
};
