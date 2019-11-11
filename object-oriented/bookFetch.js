const List = require("./list").List;
const colors = require("colors/safe");

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

    this.fetch(
      this.baseURL + this.maxResults + this.queryStructure + encodedQuery
    )
      .then(resp => resp.json())
      .then(json => {
        console.log(`\nFetching results for ${query}: \n`);
        global.searchResults = new List(json.items);
        global.cli.displaySearchResults();
      })
      .catch(error => {
        // \u2717 is the unicode for the ✗
        console.log(colors.red("\u2717 There was an error, please try again."));
        global.cli.userInput.initiateSearchPrompt();
      })
      .catch(error => {
        console.log(
          colors.red(`\u2717 There was a fatal error, please restart the app.`)
        );
      });
  }
};
