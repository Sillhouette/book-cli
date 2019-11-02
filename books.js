// Google API CLI App
//
// Google API URL:
//   baseURL = 'https://www.googleapis.com/books/v1/volumes?maxResults=5&'
//   queryStructure = 'q='
//   query = encodeURI(user_input)
//
// CLI Prompts:
//   https://github.com/flatiron/prompt
var prompt = require("prompt");
prompt.start();
prompt.message = "";
prompt.colors = false;
prompt.delimiter = "";

const initialPrompt = () => {
  let properties = {
    name: "query",
    type: "string",
    description: "Please enter a search query:",
    message: "Please enter a search term",
    required: true
  };

  prompt.get([properties], initiateSearch);
};

let initiateSearch = (err, query) => {
  //do search here

  //displayBooks()
  displayOptions();
  //optionsPrompt()
};

const displayOptions = bookNames => {
  const options = [
    `1 - Add ${bookNames[0]} to your list`,
    `2 - Add ${bookNames[1]} to your list`,
    `3 - Add ${bookNames[2]} to your list`,
    `4 - Add ${bookNames[3]} to your list`,
    `5 - Add ${bookNames[4]} to your list`,
    "list - View current book list",
    "search - Search for a new book",
    "exit - Exit the program"
  ];

  for (const option of options) {
    console.log(option);
  }
};

let logPrompt = (err, query) => {
  console.log(query);
};

initialPrompt();

const otherPrompt = () => {
  let properties = {
    name: "selection",
    type: "integer",
    description: "Select a book number to add to your book list.",
    message: "Please enter a number 1-5.",
    required: true
  };

  prompt.get([properties], logPrompt);
};

const runCLI = () => {};
