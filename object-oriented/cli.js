//Import node-fetch library for querying the Google Books API

//Import Book class
const Book = require("./book").Book;

const UserInput = require("./userInput").UserInput;

// global.bookList = new List();
// global.readingList = new List();

class Cli {
  //Construct the CLI object and set initial attributes
  constructor() {
    this.userInput = new UserInput();
  }

  //Initialize the CLI
  initialize() {
    console.log("\nWelcome to the object oriented version of book cli");
    console.log("\nPlease enter the name of the book you would like to find:");
    this.userInput.initiateSearchPrompt();
  }

  displaySearchResults(message = null) {
    console.clear();
    console.log("The current search results are: \n");
    this.displayBooks(global.searchResults.books);
    this.displayOptions();
    message ? console.log(message) : null;
    this.userInput.initiateOptionsPrompt();
  }

  //Takes array of books and displays them
  displayBooks(books) {
    if (books.length === 0) {
      console.log("\nThere are no books in this list yet.\n");
    }
    for (const [index, book] of books.entries()) {
      book.display(index + 1);
    }
  }

  //Generates the post-search menu
  displayOptions() {
    const bookTitles = global.searchResults.collectBookTitles();
    let added = false;
    const addBookList = [];
    const check = `\u2713`;
    for (const [index, book] of bookTitles.entries()) {
      if (global.readingList) {
        added = global.readingList.listHasBook(index);
      }
      addBookList.push(
        `  ${added ? check : index + 1} - Add ${book} to the reading list`
      );
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

  //Display menu for reading list
  displayListOptions() {
    const bookTitles = global.readingList.collectBookTitles();
    const removeBookList = [];
    for (const [index, book] of bookTitles.entries()) {
      removeBookList.push(
        `  ${index + 1} - Remove ${book} from the reading list`
      );
    }
    const options = [
      `Choose one of the following options: \n`,
      //...removeBookList, //Removed as the instructions asked us to not add additional features
      `  back - Return to previous search`,
      `  search - Search for a new book`,
      `  exit - Exit the program`,
      `\n`
    ];

    for (const option of options) {
      console.log(option);
    }
  }

  // Exit the program
  exit() {
    console.clear();
    console.log("Thanks for using Book CLI \n");
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
