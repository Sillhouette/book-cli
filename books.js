// Google API CLI App
//
// Google API URL:
//   baseURL = 'https://www.googleapis.com/books/v1/volumes?maxResults=5&'
//   queryStructure = 'q='
//   query = encodeURI(user_input)
//
// CLI Prompts:
//   https://github.com/flatiron/prompt
const prompt = require("prompt");
const fetch = require("node-fetch");

prompt.start();
prompt.message = "";
prompt.colors = false;
prompt.delimiter = "";

const initialPrompt = () => {
  const properties = {
    name: "query",
    type: "string",
    description: "Please enter a search query:",
    message: "Please enter a search term",
    required: true
  };

  prompt.get([properties], initiateSearch);
};

const initiateSearch = (err, user_input) => {
  const baseURL = "https://www.googleapis.com/books/v1/volumes?";
  const maxResults = "maxResults=5&";
  const queryStructure = "q=";
  const query = encodeURI(user_input.query);
  const bookNames = [];

  fetch(baseURL + maxResults + queryStructure + query)
    .then(resp => resp.json())
    .then(json => {
      console.log(`\nDisplaying results for ${query}: \n`);
      displayBooks(json.items);
      for (let {
        volumeInfo: { title }
      } of json.items) {
        bookNames.push(title);
      }
      displayOptions(bookNames);
    });

  //optionsPrompt();
};

const displayBooks = books => {
  const tab = "\t";
  for (let [
    index,
    {
      volumeInfo: { title, authors, publisher = "unknown" }
    }
  ] of books.entries()) {
    console.log(`${index + 1}. ${title}`);
    console.log(`${tab}Author(s): ${authors.join(", ")}`);
    console.log(`${tab}Publisher: ${publisher}\n`);
  }
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

const logPrompt = (err, query) => {
  console.log(query);
};

initialPrompt();

const otherPrompt = () => {
  const properties = {
    name: "selection",
    type: "integer",
    description: "Select a book number to add to your book list.",
    message: "Please enter a number 1-5.",
    required: true
  };

  prompt.get([properties], logPrompt);
};

const runCLI = () => {};
