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
let searchResults = [];
let bookList = [];

const initialize = () => {
  setupPrompt();
  initiateSearchPrompt();
};

const setupPrompt = () => {
  prompt.start();
  prompt.message = "";
  prompt.colors = false;
  prompt.delimiter = "";
};

const initiateSearchPrompt = () => {
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
      generatesearchResults(json.items);
      displayBooks(searchResults);
      displayOptions();
      initiateOptionsPrompt();
    });
};

const generatesearchResults = books => {
  searchResults = [];
  for (let {
    volumeInfo: { title, authors, publisher = "unknown" }
  } of books) {
    searchResults.push({
      title: title,
      authors: authors.join(" "),
      publisher: publisher
    });
  }
};

const collectBookNames = books => {
  const bookNames = [];
  for (let { title } of searchResults) {
    bookNames.push(title);
  }
  return bookNames;
};

const displayBooks = books => {
  if (books.length === 0) {
    console.log("There are no books in the list yet.");
  }
  const spacing = "   ";
  for (let [
    index,
    { title, authors, publisher = "unknown" }
  ] of books.entries()) {
    console.log(`${index + 1}. ${title}`);
    console.log(`${spacing}Author(s): ${authors}`);
    console.log(`${spacing}Publisher: ${publisher}\n`);
  }
};

const displayOptions = () => {
  const bookNames = collectBookNames();
  const options = [
    `Choose one of the following options: \n`,
    `  1 - Add '${bookNames[0]}' to the book list`,
    `  2 - Add '${bookNames[1]}' to the book list`,
    `  3 - Add '${bookNames[2]}' to the book list`,
    `  4 - Add '${bookNames[3]}' to the book list`,
    `  5 - Add '${bookNames[4]}' to the book list`,
    `  list - View current book list`,
    `  search - Search for a new book`,
    `  exit - Exit the program`,
    `\n`
  ];

  for (const option of options) {
    console.log(option);
  }
};

const initiateOptionsPrompt = books => {
  const properties = {
    name: "input",
    type: "string",
    description: "Please select an option:",
    message: "Please select an option",
    required: true
  };

  prompt.get([properties], handleOptionSelection);
};

const handleOptionSelection = (err, selection) => {
  switch (selection.input) {
    case "1":
      addBookToList(0);
      break;
    case "2":
      addBookToList(1);
      break;
    case "3":
      addBookToList(2);
      break;
    case "4":
      addBookToList(3);
      break;
    case "5":
      addBookToList(4);
      break;
    case "list":
      displayBooks(bookList);
      break;
    case "search":
      initiateSearchPrompt();
      break;
    case "exit":
      console.log("Goodbye");
      break;
    default:
      initiateOptionsPrompt();
      break;
  }
};

const addBookToList = index => {
  bookList.push(searchResults[index]);
  console.log(`Added ${bookList[bookList.length - 1].title} to the book list.`);
  displayOptions();
  initiateOptionsPrompt();
};

initialize();
