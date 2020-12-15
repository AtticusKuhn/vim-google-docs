vim = {
  mode: "insert", // Keep track of current mode
  num: 1, // Keep track of number keys pressed by the user
  currentSequence: "", // Keep track of key sequences
  keys: {
    move: "hjkl", // QWERTY: hjkl
    escapeSequence: "jk", // QWERTY: jk or jl
  },
};

vim.addKeyMappings = function (baseMap) {
  baseMap[vim.keys.move[0]] = "ArrowLeft";
  baseMap[vim.keys.move[1]] = "ArrowDown";
  baseMap[vim.keys.move[2]] = "ArrowUp";
  baseMap[vim.keys.move[3]] = "ArrowRight";
};

vim.switchToNormalMode = switchToNormalMode;
vim.switchToInsertMode = switchToInsertMode;
vim.switchToVisualMode = switchToVisualMode;

vim.insert_keydown = insert_keydown;
vim.normal_keydown = normal_keydown;
vim.visual_keydown = visual_keydown;

const formatMsg = (vim) => `vim
mode:${vim.mode}
current sequence: ${vim.currentSequence}
number: ${vim.num}`;

vim.display = docs.createDisplay(formatMsg(vim));
const ignoreChars = /(Shift|F\d+)/g;
docs.keydown = async function (e) {
  if (ignoreChars.test(e.key)) {
    return true; // these are keys we want to ignore
  }
  let result = false;
  if (vim.currentSequence.length > 0) {
    docs.setCursorHeight("50%");
  }
  for (let i = 0; i < vim.num; i++) {
    if (vim.mode == "insert") {
      result = vim.insert_keydown(e);
    }
    if (vim.mode == "normal") {
      result = await vim.normal_keydown(e);
      docs.pressKey(docs.codeFromKey("Escape"));
    }
    if (vim.mode == "visual") {
      result = vim.visual_keydown(e);
    }
  }
  // console.trace(result);
  if (result) {
    vim.currentSequence = "";
    vim.num = "1";
    e.preventDefault();
    e.stopPropagation();
  } else {
    vim.currentSequence += e.key;
  }
  vim.display.innerText = formatMsg(vim);
  return result;
};
