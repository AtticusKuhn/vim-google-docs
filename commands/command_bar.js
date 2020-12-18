function command_bar_keydown(e) {
  if (e.code === "Enter") {
    execute_command(e.target.value);
    return;
  }
  if (e.code == "Escape") {
    hide_command_bar();
    vim.mode = "normal";
    return;
  }
}
function create_command_bar() {
  console.log("creating command bar");
  if (document.getElementById("vim-command-bar")) {
    show_command_bar();
    return;
  }
  const command_bar = document.createElement("textarea");
  command_bar.value = ":";
  command_bar.id = "vim-command-bar";
  command_bar.style.width = "100%";
  document.body.appendChild(command_bar);
  command_bar.addEventListener("keydown", command_bar_keydown);
  $("#vim-command-bar").focus();
  return command_bar;
}
function show_command_bar() {
  console.log("show command bar");
  const command_bar = $("#vim-command-bar");
  if (!command_bar) {
    create_command_bar();
    return;
  }
  command_bar.show();
}
function hide_command_bar() {
  console.log("hide command bar");
  let command_bar = $("#vim-command-bar");
  if (!command_bar) {
    command_bar = create_command_bar();
  }
  command_bar.hide();
}
