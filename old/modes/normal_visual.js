//normal mode and visual mode share many similar commands
// so this file is for the commands shared between them

const normalVisual = (isVisualMode, e) => {
  if (e.key.match(/F\d+/)) {
    // Pass through any function keys.
    return true;
  }
  if (e.key == "Escape") {
    console.log("e.key is Escape");
    // Escape visual mode.
    vim.switchToNormalMode();
    return true;
  }
  if (e.key == "v") {
    vim.switchToVisualMode();
    return true;
  }

  e.preventDefault();
  e.stopPropagation();
  if (vim.currentSequence === "g") {
    if (e.key === "g") {
      console.log("using gg");
      let currentPos = docs.getCursorRow();
      let targetPos = Number(vim.num);
      let difference = Math.abs(currentPos - targetPos);
      let direction = currentPos > targetPos ? "ArrowUp" : "ArrowDown";
      for (let i = 0; i < difference; i++) {
        docs.pressKey(docs.codeFromKey(direction), false, isVisualMode);
      }
      return true;
    }
    return false;
  }
  if (e.key === "$" && vim.currentSequence == "") {
    docs.goToLineEnd(isVisualMode);
    return true;
  }
  if (e.key == "0" && vim.currentSequence == "") {
    docs.goToLineBegin(isVisualMode);
    return true;
  }
  var keyMap = { Backspace: "ArrowLeft", x: "Delete" };
  vim.addKeyMappings(keyMap);
  if (/\d+/g.test(vim.currentSequence)) {
    if (/\d+/g.test(e.key)) {
      return false;
    } else {
      vim.num = Number(vim.currentSequence);
      vim.currentSequence = "";
      return true;
    }
  }

  if (e.key in keyMap) {
    e.key = keyMap[e.key];
  }
  if (e.key.indexOf("Arrow") == 0 || e.key == "Delete") {
    docs.pressKey(docs.codeFromKey(e.key), false, isVisualMode);
    return true;
  }
  return false;
};
