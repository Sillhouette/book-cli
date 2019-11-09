const prompt = require("prompt");
const procedural = require("./procedural/cli");
const Cli = require("./object-oriented/cli").Cli;

//Set the global configuration settings for the prompt
const setupPrompt = () => {
  prompt.start();
  prompt.message = "";
  prompt.colors = false;
  prompt.delimiter = "";
};

//Set the properties for the search prompt and initiate it
const initialPrompt = () => {
  const properties = {
    name: "query",
    type: "string",
    description: "Please enter your selection:",
    message: "Please enter a search term",
    required: true
  };

  prompt.get([properties], chooseVersion);
};

//Process user input and decide which version to run
const chooseVersion = (err, { query }) => {
  if (query === "1") {
    procedural.initialize();
  } else if (query === "2") {
    cli = new Cli();
    cli.initialize();
  } else if (query === "exit") {
    console.log("Goodbye");
  } else {
    console.log("Please make a valid selection.");
    initialPrompt();
  }
};

//Initialize the app with prompt and version selection menu
const initialize = () => {
  console.clear();
  console.log("Welcome to book CLI");
  console.log("Which version of the program do you want to run?\n");
  console.log("1 - Procedural version");
  console.log("2 - Object Oriented version");
  console.log("exit - Exit the program\n");
  setupPrompt();
  initialPrompt();
};

initialize();

module.exports = { initialize: initialize };
