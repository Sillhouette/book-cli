//Import command line prompt created by flatiron: https://github.com/flatiron/prompt
const prompt = require("prompt");
//Import node-fetch library for querying the Google Books API
const fetch = require("node-fetch");

const Book = require("./book").Book;
let searchResults = [];
let readingList = [];

class CLI {
  constructor(numResults = 5) {
    this.baseURL = "https://www.googleapis.com/books/v1/volumes?";
    this.maxResults = `maxResults=${numResults}&`;
    this.queryStructure = "q=";
    prompt.start();
    prompt.message = "";
    prompt.colors = false;
    prompt.delimiter = "";
  }

  initialize() {
    this.initiateSearchPrompt();
  }

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
        searchResults = Book.generateSearchResults(json.items);
        displayBooks(searchResults);
        displayOptions();
        optionsPrompt();
      })
      .catch(error => {
        console.log(error);
        console.log("There was a fatal error, please try again.");
        searchPrompt();
      });
  }

  displayBooks(books) {
    for (const [index, book] of books.entries()) {
      book.display(index + 1);
    }
  }

  //Generates the post-search menu
  displayOptions() {
    const bookTitles = Book.collectBookTitles(searchResults);
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
        this.displayBooks(readingList);
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
        if (searchResults[index - 1]) {
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
    const present = readingList.some(book => {
      return (
        book.title === searchResults[index].title &&
        book.authors === searchResults[index].authors
      );
    });
    if (!present) {
      readingList.push(searchResults[index]);
      console.log(
        `Added ${
          readingList[readingList.length - 1].title
        } to the reading list.`
      );
      this.displayOptions();
      this.initiateOptionsPrompt();
    } else {
      console.log("That book is already in the book list.");
      this.initiateOptionsPrompt();
    }
  }

  //Display menu while user is looking at reading list
  displayListOptions() {
    const bookTitles = Book.collectBookTitles(readingList);
    const removeBookList = [];
    for (const [index, book] of bookTitles.entries()) {
      removeBookList.push(
        `  ${index + 1} - Remove ${book} from the reading list`
      );
    }
    const options = [
      `Choose one of the following options: \n`,
      ...removeBookList,
      `  search - Search for a new book`,
      `  exit - Exit the program`,
      `\n`
    ];

    for (const option of options) {
      console.log(option);
    }
  }
}

let cli = new CLI();
cli.initialize();
