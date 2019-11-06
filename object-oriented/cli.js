//Import command line prompt created by flatiron: https://github.com/flatiron/prompt
const prompt = require("prompt");
//Import node-fetch library for querying the Google Books API
const fetch = require("node-fetch");

//Import Book class
const Book = require("./book").Book;

class Cli {
  //Construct the CLI object and set initial attributes
  constructor(numResults = 5) {
    this.searchResults = [];
    this.readingList = [];
    this.baseURL = "https://www.googleapis.com/books/v1/volumes?";
    this.maxResults = `maxResults=${numResults}&`;
    this.queryStructure = "q=";
    prompt.start();
    prompt.message = "";
    prompt.colors = false;
    prompt.delimiter = "";
  }

  //Initialize the CLI
  initialize() {
    console.log("\nWelcome to the object oriented version of book cli");
    console.log("\nPlease enter the name of the book you would like to find:");
    this.initiateSearchPrompt();
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
    const cb = this.initiateSearch.bind(this);
    prompt.get([properties], cb);
  }

  //Receives userInput from the search prompt and fetches 5 books from Google's API
  initiateSearch(err, { query }) {
    const encodedQuery = encodeURI(query);
    const searchPrompt = this.initiateSearchPrompt.bind(this);
    const displayOptions = this.displayOptions.bind(this);
    const displayBooks = this.displayBooks.bind(this);
    const optionsPrompt = this.initiateOptionsPrompt.bind(this);

    fetch(this.baseURL + this.maxResults + this.queryStructure + encodedQuery)
      .then(resp => resp.json())
      .then(json => {
        console.log(`\nFetching results for ${query}: \n`);
        this.searchResults = Book.generateBooks(json.items);
        displayBooks(this.searchResults);
        displayOptions();
        optionsPrompt();
      })
      .catch(error => {
        console.log(error);
        console.log("There was a fatal error, please try again.");
        searchPrompt();
      });
  }

  //Takes array of books and displays them
  displayBooks(books) {
    for (const [index, book] of books.entries()) {
      book.display(index + 1);
    }
  }

  //Generates the post-search menu
  displayOptions() {
    const bookTitles = Book.collectBookTitles(this.searchResults);
    const addBookList = [];
    for (const [index, book] of bookTitles.entries()) {
      addBookList.push(`  ${index + 1} - Add ${book} to the reading list`);
    }
    const options = [
      `Choose one of the following options: \n`,
      ...addBookList,
      `  list - View current reading list`,
      `  search - Search for a new book`,
      `  exit - Exit the program`,
      `\n`
    ];

    for (const option of options) {
      console.log(option);
    }
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
    prompt.get([properties], cb);
  }

  //Read user menu selection and handle the response
  handleOptionSelection(err, { input }) {
    switch (input) {
      //Display the current reading list
      case "list":
        console.log("\nThe current reading list is as follows: ");
        this.displayBooks(this.readingList);
        this.displayListOptions();
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
        const index = parseInt(input);
        //Handle case where user wants to add book to reading list
        if (this.searchResults[index - 1]) {
          this.addBookToList(index - 1);
        } else {
          //If invalid input re-prompt for valid input
          this.initiateOptionsPrompt();
        }
        break;
    }
  }

  //Add a book to the reading list if it's not already there
  addBookToList(index) {
    const present = this.readingList.some(book => {
      return (
        book.title === this.searchResults[index].title &&
        book.authors === this.searchResults[index].authors
      );
    });
    if (!present) {
      this.readingList.push(this.searchResults[index]);
      console.log(
        `Added ${
          this.readingList[this.readingList.length - 1].title
        } to the reading list.`
      );
      this.displayOptions();
      this.initiateOptionsPrompt();
    } else {
      console.log("That book is already in the book list.");
      this.initiateOptionsPrompt();
    }
  }

  //Display menu for reading list
  displayListOptions() {
    const bookTitles = Book.collectBookTitles(this.readingList);
    const removeBookList = [];
    for (const [index, book] of bookTitles.entries()) {
      removeBookList.push(
        `  ${index + 1} - Remove ${book} from the reading list`
      );
    }
    const options = [
      `Choose one of the following options: \n`,
      //...removeBookList, //Removed as the instructions asked us to not add additional features
      `  search - Search for a new book`,
      `  exit - Exit the program`,
      `\n`
    ];

    for (const option of options) {
      console.log(option);
    }
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

  //Read user post reading list menu selection and handle response
  handleListOptionSelection(err, { input }) {
    switch (input) {
      case "search":
        this.initiateSearchPrompt();
        break;
      case "exit":
        console.log("Goodbye");
        break;
      default:
        const index = parseInt(input);
        // if (this.readingList[index - 1]) { //Removed as the instructions asked us to not add additional features
        // } else {
        //   this.removeBookFromList(index - 1);
        this.initiateListOptionsPrompt();
        // }
        break;
    }
  }

  //Remove a book from the reading list then re-prompt
  removeBookFromList(index) {
    this.readingList.splice(index, 1);
    console.log("\nThe new reading list is as follows: ");
    this.displayBooks(this.readingList);
    this.displayListOptions();
    this.initiateListOptionsPrompt();
  }
}

// Uncomment these lines if you want to use `node ./object-oriented/cli.js` to run this version
// Don't forget to re-comment them if you want the version selector to run properly
// let cli = new Cli();
// cli.initialize();

//Export the class for tests and version selector to use
module.exports = {
  Cli: Cli
};
