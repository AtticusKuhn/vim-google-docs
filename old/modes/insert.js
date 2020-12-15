function switchToInsertMode() {
  vim.currentSequence = "";
  vim.mode = "insert";
  vim.num = "1";
  docs.setCursorWidth("2px");
}
function insert_keydown(e) {
  console.log("insert keydown");
  if (e.key == "Escape") {
    vim.switchToNormalMode();
    return true;
  }
  vim.currentSequence = "";
  return false;
  // docs.pressKey(e.keyCode);
  // vim.currentSequence += e.key;
  // if (vim.currentSequence == vim.keys.escapeSequence) {
  //   // e.preventDefault();
  //   // e.stopPropagation();

  //   // We need to delete the first character already typed in the escape
  //   // sequence.
  //   for (var i = 0; i < vim.currentSequence.length - 1; i++) {
  //     docs.backspace();
  //   }

  //   vim.switchToNormalMode();
  //   return false;
  // }
  // if (vim.keys.escapeSequence.indexOf(vim.currentSequence) != 0) {
  //   vim.currentSequence = e.key;
  // }
  // return true;
}
