const List = require("./list").List;

exports.BookFetch = class BookFetch {
  constructor(numResults = 5) {
    this.fetch = require("node-fetch");
    this.baseURL = "https://www.googleapis.com/books/v1/volumes?";
    this.maxResults = `maxResults=${numResults}&`;
    this.queryStructure = "q=";
  }

  //Receives userInput from the search prompt and fetches 5 books from Google's API
  fetchResults(err, { query }) {
    const encodedQuery = encodeURI(query);
    const searchPrompt = cli.initiateSearchPrompt;
    const displayResults = cli.displaySearchResults;

    this.fetch(
      this.baseURL + this.maxResults + this.queryStructure + encodedQuery
    )
      .then(resp => resp.json())
      .then(json => {
        console.log(`\nFetching results for ${query}: \n`);
        global.searchResults = new List(json.items); //Book.generateBooks(json.items);
        global.cli.displaySearchResults();
      })
      .catch(error => {
        console.log(error);
        console.log("There was a fatal error, please try again.");
        global.cli.searchPrompt();
      });
  }
};
