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
    fetch(this.baseURL + this.maxResults + this.queryStructure + encodedQuery)
      .then(resp => resp.json())
      .then(json => {
        console.log(`\nFetching results for ${query}: \n`);
        searchResults = Book.generateSearchResults(json.items);
        for (const [index, book] of searchResults.entries()) {
          book.display(index + 1);
        }
        //displayOptions();
        //initiateOptionsPrompt();
      })
      .catch(error => {
        console.log(error);
        console.log("There was a fatal error, please try again.");
        searchPrompt();
      });
  }
}

let cli = new CLI();
cli.initialize();
