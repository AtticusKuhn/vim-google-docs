docs.setCursorHeight = function (height) {
  // docs.getUserCursor().find(".kix-cursor-caret").css("height", height);
};
docs.moveLeft = (isShift = false) => {
  // console.log("moveleft called");
  docs.pressKey(docs.codeFromKey("ArrowLeft"), false, isShift);
};
docs.moveRight = (isShift = false) => {
  // console.log("moveright called with isShift", isShift);
  // docs.pressKey(docs.codeFromKey("ArrowRight"), false, isShift);
  docs.pressKey(docs.codeFromKey("ArrowRight"), false, isShift);
};
docs.getLeftPos = () => {
  const leftPx = getComputedStyle(docs.getUserCursor()[0]).left;
  return Number(leftPx.substring(0, leftPx.length - 2));
};
docs.getRightPos = () => {
  const rightPx = getComputedStyle(docs.getUserCursor()[0]).right;
  return Number(rightPx.substring(0, rightPx.length - 2));
};
docs.goToLineBegin = (isShift = false) => {
  let previousRight = docs.getRightPos();
  docs.moveLeft(isShift);
  let currentRight = docs.getRightPos();
  while (currentRight > previousRight) {
    previousRight = docs.getRightPos();
    docs.moveLeft(isShift);
    currentRight = docs.getRightPos();
  }
  docs.moveRight(isShift);
};
docs.goToLineEnd = async (isShift = false) => {
  let previousLeft = docs.getLeftPos();
  docs.moveRight(isShift);
  let currentLeft = docs.getLeftPos();
  while (currentLeft > previousLeft) {
    // await sleep(1e3);
    previousLeft = docs.getLeftPos();
    docs.moveRight(isShift);
    currentLeft = docs.getLeftPos();
  }
  docs.moveLeft(isShift);
};
docs.selectLine = async () => {
  docs.goToLineBegin();
  await sleep(100);
  await docs.goToLineEnd(true);
  return true;
};
docs.createDisplay = (text) => {
  const element = $(".menu-button")[0].cloneNode();
  element.innerText = text;
  element.id = "new-id";
  $("#docs-menubar")[0].appendChild(element);
  return element;
};
docs.getCursorRow = () => {
  const cursor = docs.getUserCursor()[0];
  const rows = $(".kix-lineview");
  let closestRow = null;
  let distance = 1000;
  for (let i = 0; i < rows.length; i++) {
    let newDistance = Math.abs(
      rows[i].getBoundingClientRect().top - cursor.getBoundingClientRect().top
    );
    if (newDistance < distance) {
      distance = newDistance;
      closestRow = i;
    }
  }
  return closestRow;
};
docs.getnumberOfRows = () => $(".kix-lineview").length;

docs.asyncCopySelection = (defaultToParagraph, getRaw) => {
  return new Promise((resolutionFunc, rejectionFunc) => {
    docs.getSelection(
      (text) => {
        resolutionFunc(text);
      },
      defaultToParagraph,
      getRaw
    );
  });
};
docs.getCursorChar = async (isShift) => {
  docs.moveRight(true);
  const char = await docs.asyncCopySelection();
  docs.moveLeft(isShift);
  return char;
};
docs.deselect = (moveCursor = true) => {
  if (!moveCursor) {
    docs.pressKey(docs.codeFromKey("A"), true, true);
    return true;
  }
  if (!docs.hasSelection()) {
    return false;
  }
  const cursorBox = docs.getUserCursor()[0].getBoundingClientRect();
  const selectionBox = docs.getSelectionEl()[0].getBoundingClientRect();
  const l1 = docs.getLeftPos();
  if (cursorBox.y - selectionBox.y > 1) {
    console.log("cursor is above selection");
    docs.moveRight();
    const l2 = docs.getLeftPos();
    if (l1 !== l2) {
      docs.moveLeft();
    }
    return true;
  }
  if (Math.abs(cursorBox.x - selectionBox.x) < 1) {
    console.log("cursor is to the left of selelction");
    docs.moveLeft();
    const l2 = docs.getLeftPos();
    if (l1 !== l2) {
      docs.moveRight();
    }
    return true;
  } else {
    console.log("cursor is to the right of selection");
    docs.moveRight();
    const l2 = docs.getLeftPos();
    if (l1 !== l2) {
      docs.moveLeft();
    }
    return true;
  }
};
