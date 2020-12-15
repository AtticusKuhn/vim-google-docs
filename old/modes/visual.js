function switchToVisualMode() {
  vim.currentSequence = "";
  vim.mode = "visual";
  vim.num = "1";
  docs.setCursorWidth("7px");
}

function visual_keydown(e) {
  // console.log("visual keydown");

  // console.log("visual mode called with key", e.key);
  const normalVisualResult = normalVisual(true, e);
  if (normalVisualResult) {
    return true;
  }
  // vim.currentSequence += e.key;
  // if (vim.currentSequence == vim.keys.escapeSequence) {
  //   vim.switchToNormalMode();
  //   return false;
  // }
  // if (vim.keys.escapeSequence.indexOf(vim.currentSequence) != 0) {
  //   vim.currentSequence = e.key;
  // }

  // var keyMap = { Backspace: "ArrowLeft", x: "Delete" };
  // vim.addKeyMappings(keyMap);

  // if (/\d+/g.test(vim.currentSequence)) {
  //   if (/\d+/g.test(e.key)) {
  //     return false;
  //   } else {
  //     vim.num = Number(vim.currentSequence);
  //     vim.currentSequence = "";
  //     return true;
  //   }
  // }

  // if (e.key in keyMap) {
  //   e.key = keyMap[e.key];
  // }

  // if (e.key.indexOf("Arrow") == 0 || e.key == "Delete") {
  //   if (e.key.indexOf("Arrow") == 0) {
  //     docs.pressKey(docs.codeFromKey(e.key), false, true);
  //   } else {
  //     docs.pressKey(docs.codeFromKey(e.key));
  //     vim.switchToNormalMode();
  //   }
  //   return true;
  // }

  return false;
}
