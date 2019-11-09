//Import node-fetch library for querying the Google Books API
exports.fetch = require("node-fetch");
//Import inputHandler for use of initiateSearchPrompt
exports.inputHandler = require("./inputHandler");
//Import listHandler for use of generateSearchResults
exports.listHandler = require("./listHandler");
//Import cli for use of cli functions
exports.cli = require("./bookCli");

//Receives userInput from the search prompt and fetches 5 books from Google's API
exports.initiateSearch = (err, { query }) => {
  const baseURL = "https://www.googleapis.com/books/v1/volumes?";
  const maxResults = "maxResults=5&";
  const queryStructure = "q=";
  const encodedQuery = encodeURI(query);

  this.fetch(baseURL + maxResults + queryStructure + encodedQuery)
    .then(resp => resp.json())
    .then(json => {
      this.listHandler.generateSearchResults(json.items);
      this.cli.displaySearchResults();
    })
    .catch(error => {
      console.log("There was a fatal error, please try again.");
      this.inputHandler.initiateSearchPrompt();
    })
    .catch(error => error);
};
