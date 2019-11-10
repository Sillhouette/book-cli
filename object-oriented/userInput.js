//Import BookFetch so we can create a fetch object for the api call
const BookFetch = require("./bookFetch").BookFetch;
//Import List so we can create new lists
const List = require("./list").List;

// \u2717 is the unicode for ✗
const errorSym = "\u2717";

exports.UserInput = class UserInput {
  constructor() {
    //Use command line prompt created by flatiron: https://github.com/flatiron/prompt
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
      message: `${errorSym} Please enter a search term`,
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
      message: `${errorSym} Please select a valid option`,
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
      message: `${errorSym} Please select a valid option`,
      required: true
    };

    const cb = this.handleListOptionSelection.bind(this);
    this.prompt.get([properties], cb);
  }

  //Read user menu selection and handle the response
  handleOptionSelection(err, { input }) {
    // Lowercase input to make it more user friendly
    switch (input.toLowerCase()) {
      //Display the current reading list
      case "list":
        console.clear();
        // Create Reading list if it doesnt exist
        global.readingList = global.readingList
          ? global.readingList
          : new List();
        console.log("The current reading list is as follows: \n");
        global.cli.displayBooks(global.readingList.books);
        global.cli.displayListOptions();
        this.initiateListOptionsPrompt();
        break;
      //Search for a new book
      case "search":
        console.clear();
        this.initiateSearchPrompt();
        break;
      //Exit the program
      case "exit":
        global.cli.exit();
        break;
      default:
        const index = parseInt(input) - 1;

        //Handle case where user wants to add book to reading list
        let book, message;
        const error = `\u2717 `;
        const check = `\u2713`;

        if ((book = global.searchResults.books[index])) {
          //because the procedural
          if (global.readingList) {
            message = global.readingList.addBookToList(book, index);
          } else {
            global.readingList = new List(book);
            message = `${check} Added ${book.title} to the reading list.\n`;
          }
          global.cli.displaySearchResults(message);
        } else {
          //If invalid input re-prompt for valid input
          console.log(`${error} That command was invalid, please try again`);
          this.initiateOptionsPrompt();
        }
        break;
    }
  }

  //Read user post reading list menu selection and handle response
  handleListOptionSelection(err, { input }) {
    switch (input.toLowerCase()) {
      case "back":
        global.cli.displaySearchResults();
        break;
      case "search":
        console.clear();
        this.initiateSearchPrompt();
        break;
      case "exit":
        global.cli.exit();
        break;
      default:
        // const index = parseInt(input);
        // if (this.readingList[index - 1]) { //Removed as the instructions asked us to not add additional features
        //   this.removeBookFromList(index - 1);
        // } else {
        //If invalid input re-prompt for valid input
        console.log("That command was invalid, please try again");
        this.initiateListOptionsPrompt();
        // }
        break;
    }
  }
};
