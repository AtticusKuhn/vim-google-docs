vim.normal.d = (text) => {
  docs.backspace();
};
vim.normal.c = (text) => {
  docs.backspace();
  vim.switchToInsertMode();
};
vim.normal.y = async (text) => {
  const selected = await docs.asyncCopySelection();
  vim.clipboard = selected;
  await navigator.clipboard.writeText(selected);
};
vim.normal.p = () => {
  docs.pasteText(vim.clipboard);
};

vim.normal.Escape = () => {
  console.log("escape called");
  vim.switchToNormalMode();
};

vim.normal.i = () => {
  vim.switchToInsertMode();
  return true;
};
vim.normal.a = () => {
  vim.switchToInsertMode();
  docs.pressKey(docs.codeFromKey("ArrowRight"));
  return true;
};
vim.normal.A = async () => {
  await docs.goToLineEnd();
  vim.switchToInsertMode();
  return true;
};
vim.normal.I = () => {
  docs.goToLineBegin();
  vim.switchToInsertMode();
  return true;
};
vim.normal.o = async () => {
  await docs.goToLineEnd();
  docs.pasteText("\n");
  vim.switchToInsertMode();
  return true;
};
vim.normal.O = () => {
  docs.goToLineBegin();
  docs.pasteText("\n");
  vim.switchToInsertMode();
  return true;
};
vim.normal.selectInside = async (char) => {
  char = vim.currentSequence[0];
  console.log("char is ", char);
  if (![`"`, `'`, "`", "(", "{"].includes(char)) {
    console.log("select inside exiting, invalid char");
    return false;
  }
  const complement = char == "(" ? ")" : char == "{" ? "}" : char;
  for (let i = 0; i < 100; i++) {
    // console.log("moving left");
    const cursorChar = await docs.getCursorChar();
    if (cursorChar == char) {
      // console.log("found end");
      break;
    }
    docs.moveLeft();
  }
  docs.moveRight(); //fix OBOE
  for (let t = 0; t < 100; t++) {
    // console.log("moving right");
    const cursorChar = await docs.getCursorChar(true);
    const isStopping = cursorChar.endsWith(complement);
    // console.log({ cursorChar, complement, isStopping });
    if (isStopping) {
      // console.log("found right end");
      break;
    }
    docs.moveRight(true);
  }
};
