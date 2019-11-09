//Import command line prompt created by flatiron: https://github.com/flatiron/prompt
exports.prompt = require("prompt");
//Import the cli module for access to it's methods
exports.cli = require("./cli");
//Import the cli module for access to it's methods
exports.fetchHandler = require("./fetchHandler");
//Import the listHandler module for managing the book lists
exports.listHandler = require("./listHandler");

//Set the global configuration settings for the prompt
exports.setupPrompt = () => {
  this.prompt.start();
  this.prompt.message = "";
  this.prompt.colors = false;
  this.prompt.delimiter = "";
};

//Set the properties for the search prompt and initiate it
exports.initiateSearchPrompt = () => {
  const properties = {
    name: "query",
    type: "string",
    description: "Please enter a search query:",
    message: "Please enter a search term",
    required: true
  };

  this.prompt.get([properties], this.fetchHandler.initiateSearch);
};

//Set the properties for post-search prompt and initiate it
exports.initiateOptionsPrompt = () => {
  const properties = {
    name: "input",
    type: "string",
    description: "Please select an option:",
    message: "Please select a valid option",
    required: true
  };

  this.prompt.get([properties], this.handleOptionSelection);
};

//Set properties for post reading list prompt and initialize it
exports.initiateListOptionsPrompt = books => {
  const properties = {
    name: "input",
    type: "string",
    description: "Please select an option:",
    message: "Please select a valid option",
    required: true
  };

  this.prompt.get([properties], this.handleListOptionSelection);
};

//Read user menu selection and handle the response
exports.handleOptionSelection = (err, { input }) => {
  switch (input.toLowerCase()) {
    //Display the current reading list
    case "list":
      this.cli.displayList();
      break;
    //Search for a new book
    case "search":
      console.clear();
      this.initiateSearchPrompt();
      break;
    //Exit the program
    case "exit":
      this.cli.exit();
      break;
    default:
      console.clear();
      const index = parseInt(input);
      //Handle case where user wants to add book to reading list
      if (global.searchResults[index - 1]) {
        this.listHandler.addBookToList(index - 1);
      } else {
        //If invalid input re-prompt for valid input
        console.log("That input was invalid, please try again");
        this.initiateOptionsPrompt();
      }
      break;
  }
};

//Read user post reading list menu selection and handle response
exports.handleListOptionSelection = (err, { input }) => {
  switch (input.toLowerCase()) {
    case "back":
      console.log("The previous search results were: \n");
      this.cli.displaySearchResults();
      break;
    case "search":
      console.clear();
      this.initiateSearchPrompt();
      break;
    case "exit":
      this.cli.exit();
      break;
    default:
      const index = parseInt(input.toLowerCase);
      // if (this.readingList[index - 1]) { //Removed as the instructions asked us to not include additional features in the applicaton
      //   removeBookFromList(index - 1);
      // } else {
      console.log("That input was invalid, please try again");
      this.initiateListOptionsPrompt();
      // }
      break;
  }
};
