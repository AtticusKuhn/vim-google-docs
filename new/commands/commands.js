const commands = {
  q: () => (location.href = "https://drive.google.com/drive/"),
};
function execute_command(command) {
  command = command.substring(1);
  console.log("I recieved the command", command);
  const exists = commands[command];
  if (exists) {
    exists();
    hide_command_bar();
    return;
  }
  alert("I don't recognize that command");
}
