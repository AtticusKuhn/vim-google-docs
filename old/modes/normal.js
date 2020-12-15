function switchToNormalMode() {
  vim.currentSequence = "";
  vim.mode = "normal";
  vim.num = "1";
  docs.setCursorWidth("7px");
}

async function normal_keydown(e) {
  // console.log("normal keydown");
  const normalVisualResult = normalVisual(false, e);
  if (normalVisualResult) {
    return true;
  }

  if (e.key === "d") {
    if (!docs.hasSelection()) {
      return false;
    }
    docs.backspace();
    return true;
  }
  if (e.key === "y") {
    if (!docs.hasSelection()) {
      return false;
    }
    const text = await docs.asyncCopySelection();
    await navigator.clipboard.writeText(text);
    return true;
  }
  if (e.key === "c") {
    if (!docs.hasSelection()) {
      return false;
    }
    docs.backspace();
    vim.switchToInsertMode();
    return true;
  }
  // if (e.key === "y") {
  //   // if()
  //   if (vim.currentSequence === "y") {
  //     await docs.selectLine();
  //     const text = await docs.asyncCopySelection();
  //     await navigator.clipboard.writeText(text);
  //     return true;
  //   }
  // }
  if (e.key === "$") {
    await docs.goToLineEnd(true);
    return true;
    // if (vim.currentSequence === "") {
    //   await docs.goToLineEnd(ture);
    //   return true;
    // }
    // if (vim.currentSequence === "d") {
    //   await docs.goToLineEnd(true);
    //   docs.delete();
    //   return true;
    // }
    // if (vim.currentSequence === "c") {
    //   await docs.goToLineEnd(true);
    //   docs.delete();
    //   vim.switchToInsertMode();
    //   return true;
    // }
    // if (vim.currentSequence === "y") {
    //   await docs.goToLineEnd(true);
    //   const text = await docs.asyncCopySelection();
    //   await navigator.clipboard.writeText(text);
    //   return true;
    // }
  }
  // if (e.key === "c") {
  //   if (vim.currentSequence === "") {
  //     return false;
  //   }

  //   if (vim.currentSequence === "c") {
  //     await docs.selectLine();
  //     docs.backspace();
  //     vim.switchToInsertMode();
  //     return true;
  //   }
  // }

  if (e.key == "i") {
    if (vim.currentSequence === "") {
      vim.switchToInsertMode();
      return true;
    }
    if ("cyd".indexOf(e.key) > -1) {
      return false;
    }
  }
  if (e.key == "a") {
    vim.switchToInsertMode();
    docs.pressKey(docs.codeFromKey("ArrowRight"));
    return true;
  }
  if (e.key == "A") {
    await docs.goToLineEnd();
    vim.switchToInsertMode();
    return true;
  }
  if (e.key == "I") {
    docs.goToLineBegin();
    vim.switchToInsertMode();
    return true;
  }
  if (e.key === "o") {
    await docs.goToLineEnd();
    docs.pasteText("\n");
    vim.switchToInsertMode();
    return true;
  }
  if (e.key === "O") {
    docs.goToLineBegin();
    docs.pasteText("\n");
    vim.switchToInsertMode();
    // docs.pressKey(docs.codeFromKey("ArrowUp"));
    return true;
  }
  if (e.key == "w") {
    if (vim.currentSequence === "") {
      let currChar = await docs.getCursorChar(true);
      while (/[A-Za-z]/g.test(currChar)) {
        docs.moveRight(true);
        currChar = await docs.getCursorChar(true);
      }
      docs.moveRight(true);
      return true;
    }
    // if (vim.currentSequence === "d") {
    //   let currChar = await docs.getCursorChar(true);
    //   while (/[A-Za-z]/g.test(currChar)) {
    //     docs.moveRight(true);
    //     currChar = await docs.getCursorChar(true);
    //   }
    //   docs.moveRight(true);
    //   docs.backspace();
    //   return true;
    // }
  }
  if (vim.currentSequence === "ci") {
    if ([`'`, `"`, "`", "(", ")", "{", "}", "<", ">"].includes(e.key)) {
      null;
    }
    return true;
  }
  return false;
}
