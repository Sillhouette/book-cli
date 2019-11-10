//Import command line prompt created by flatiron: https://github.com/flatiron/prompt

const BookFetch = require("./bookFetch").BookFetch;
const List = require("./list").List;

exports.UserInput = class UserInput {
  constructor() {
    this.prompt = require("prompt");
    this.prompt.start();
    this.prompt.message = "";
    this.prompt.colors = false;
    this.prompt.delimiter = "";
    this.bookFetch = new BookFetch();
  }

  //Set the properties for the search prompt and initiate it
  initiateSearchPrompt() {
    const properties = {
      name: "query",
      type: "string",
      description: "Please enter a search query:",
      message: "Please enter a search term",
      required: true
    };
    const cb = this.bookFetch.fetchResults.bind(this.bookFetch);
    this.prompt.get([properties], cb);
  }

  //Set the properties for post-search prompt and initiate it
  initiateOptionsPrompt() {
    const properties = {
      name: "input",
      type: "string",
      description: "Please select an option:",
      message: "Please select a valid option",
      required: true
    };

    const cb = this.handleOptionSelection.bind(this);
    this.prompt.get([properties], cb);
  }

  //Set properties for post-reading list prompt and initialize it
  initiateListOptionsPrompt() {
    const properties = {
      name: "input",
      type: "string",
      description: "Please select an option:",
      message: "Please select a valid option",
      required: true
    };

    const cb = this.handleListOptionSelection.bind(this);
    prompt.get([properties], cb);
  }

  //Read user menu selection and handle the response
  handleOptionSelection(err, { input }) {
    switch (input.toLowerCase()) {
      //Display the current reading list
      case "list":
        console.log("\nThe current reading list is as follows: ");
        global.cli.displayBooks(this.readingList);
        global.cli.displayListOptions();
        this.initiateListOptionsPrompt();
        break;
      //Search for a new book
      case "search":
        this.initiateSearchPrompt();
        break;
      //Exit the program
      case "exit":
        console.log("Goodbye");
        break;
      default:
        const index = parseInt(input) - 1;

        //Handle case where user wants to add book to reading list
        if (global.searchResults.books[index]) {
          //because the procedural
          if (global.readingList) {
            global.readingList.addBookToList(global.searchResults.books[index]);
          } else {
            global.readingList = new List(global.searchResults.books[index]);
          }
        } else {
          //If invalid input re-prompt for valid input
          console.log("That command was invalid, please try again");
          this.initiateOptionsPrompt();
        }
        break;
    }
  }

  //Read user post reading list menu selection and handle response
  handleListOptionSelection(err, { input }) {
    switch (input.toLowerCase()) {
      case "back":
        this.displaySearchResults();
        break;
      case "search":
        this.initiateSearchPrompt();
        break;
      case "exit":
        console.log("Goodbye");
        break;
      default:
        // const index = parseInt(input);
        // if (this.readingList[index - 1]) { //Removed as the instructions asked us to not add additional features
        // } else {
        //   this.removeBookFromList(index - 1);
        console.log("That command was invalid, please try again");
        this.initiateListOptionsPrompt();
        // }
        break;
    }
  }
};
