function switchToInsertMode() {
  vim.currentSequence = [];
  vim.mode = "insert";
  vim.num = "1";
  docs.setCursorWidth("2px");
}
vim.switchToInsertMode = switchToInsertMode;
vim.insert.Escape = () => {
  console.log("vim.insert.Escape called");
  vim.switchToNormalMode();
};
