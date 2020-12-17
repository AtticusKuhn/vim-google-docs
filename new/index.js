const vim = {
  mode: "insert", // Keep track of current mode
  num: 1, // Keep track of number keys pressed by the user
  currentSequence: [], // Keep track of key sequences
  keys: {
    move: "hjkl", // QWERTY: hjkl
    escapeSequence: "jk", // QWERTY: jk or jl
  },
  addKeyMappings: function (baseMap) {
    baseMap[vim.keys.move[0]] = "ArrowLeft";
    baseMap[vim.keys.move[1]] = "ArrowDown";
    baseMap[vim.keys.move[2]] = "ArrowUp";
    baseMap[vim.keys.move[3]] = "ArrowRight";
  },
  display: (e) => null,
  normal: {},
  visual: {},
  insert: {},
  universal: {},
};
function switchToNormalMode() {
  vim.currentSequence = [];
  vim.mode = "normal";
  vim.num = "1";
  docs.setCursorWidth("7px");
}
vim.switchToNormalMode = switchToNormalMode;
function switchToVisualMode() {
  vim.currentSequence = "";
  vim.mode = "visual";
  vim.num = "1";
  docs.setCursorWidth("7px");
}
vim.switchToVisualMode = switchToVisualMode;
// vim.switchToNormalMode = switchToNormalMode;
// vim.switchToInsertMode = switchToInsertMode;
// vim.switchToVisualMode = switchToVisualMode;

// vim.insert_keydown = insert_keydown;
// vim.normal_keydown = normal_keydown;
// vim.visual_keydown = visual_keydown;

const formatMsg = (vim) => `vim
mode:${vim.mode}
current sequence: ${vim.currentSequence}
number: ${vim.num}`;
function resetVim() {
  vim.currentSequence = [];
  vim.num = 1;
  vim.display.innerText = formatMsg(vim);
  if (vim.mode === "normal") {
    docs.deselect();
  }
}
async function execute(sequence, e) {
  // console.log("execute called");
  sequence = sequence.reverse();
  let valFunc = vim[vim.mode][sequence[0]] || vim.universal[sequence[0]];
  for (let i = 0; i < vim.num; i++) {
    let val = valFunc ? await valFunc() : valFunc;
    sequence = sequence.slice(1);
    for (const char of sequence) {
      let charFunc = vim[vim.mode][char] || vim.universal[char];
      // console.log("char is", char, "charFunc is ", charFunc);
      res = await charFunc(val);
    }
  }
  e.preventDefault();
  e.stopPropagation();
  resetVim();
}
vim.display = docs.createDisplay(formatMsg(vim));

const ignoreChars = /(Shift|F\d+|Control)/g;
const keydown_handler = async (e) => {
  if (ignoreChars.test(e.key)) {
    return true;
  }
  vim.display.innerText = formatMsg(vim);
  try {
    // console.log(vim.currentSequence[vim.currentSequence.length - 1], e.key);
    if (e.key === vim.currentSequence[vim.currentSequence.length - 1]) {
      e.key = "selectLine";
    }
    if (e.key === "i" && vim.currentSequence.length > 0) {
      e.key = "selectInside";
    }
    const func = vim[vim.mode][e.key] || vim.universal[e.key];
    if (vim.mode === "insert" && e.key !== "Escape") {
      vim.display.innerText = formatMsg(vim);
      return true;
    } else {
      e.preventDefault();
      e.stopPropagation();
      if (/\d/.test(e.key)) {
        if (!(e.key == "0" && vim.num == "1")) {
          vim.num = Number(vim.num.toString() + e.key);
          return false;
        }
      }
      vim.currentSequence.push(e.key);
      if (!func) {
        console.log("c");
        await execute(vim.currentSequence, e);
        return true;
      }
      if (func.length === 1) {
        return false;
      }
      if (func.length === 0) {
        console.log("b");
        await execute(vim.currentSequence, e);
        return true;
      }
      // console.log("a");
      // execute(vim.currentSequence, e);
      // return true;
    }
  } catch (e) {
    console.log("error", e);
    // vim.display("invalid squenece");
  }
};
docs.keydown = async function (e) {
  await keydown_handler(e);
  vim.display.innerText = formatMsg(vim);
};
