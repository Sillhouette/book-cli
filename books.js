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

  fetch(baseURL + maxResults + queryStructure + query)
    .then(resp => resp.json())
    .then(json => {
      console.log(`\nFetching results for ${user_input.query}: \n`);
      generateSearchResults(json.items);
      displayBooks(searchResults);
      displayOptions();
      initiateOptionsPrompt();
    })
    .catch(error => {
      console.log("There was a fatal error, please try again.");
      initiateSearchPrompt();
    });
};

const generateSearchResults = books => {
  searchResults = [];
  for (let {
    volumeInfo: { title, authors = "Unknown", publisher = "Unknown" }
  } of books) {
    authors = Array.isArray(authors) ? authors.join() : authors;
    searchResults.push({
      title: title,
      authors: authors,
      publisher: publisher
    });
  }
};

const collectBookNames = books => {
  const bookNames = [];
  for (let { title } of books) {
    bookNames.push(title);
  }
  return bookNames;
};

const displayBooks = books => {
  if (books.length === 0) {
    console.log("There are no books in the reading list yet.");
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
  const bookNames = collectBookNames(searchResults);
  const addBookList = [];
  for (const [index, book] of bookNames.entries()) {
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
};

const initiateOptionsPrompt = books => {
  const properties = {
    name: "input",
    type: "string",
    description: "Please select an option:",
    message: "Please select a valid option",
    required: true
  };

  prompt.get([properties], handleOptionSelection);
};

const handleOptionSelection = (err, selection) => {
  switch (selection.input) {
    case "list":
      console.log("\nThe current reading list is as follows: ");
      displayBooks(bookList);
      displayListOptions();
      initiateListOptionsPrompt();
      break;
    case "search":
      initiateSearchPrompt();
      break;
    case "exit":
      console.log("Goodbye");
      break;
    default:
      const index = parseInt(selection.input);
      if (searchResults[index - 1]) {
        addBookToList(index - 1);
      } else {
        initiateOptionsPrompt();
      }
      break;
  }
};

const addBookToList = index => {
  const present = bookList.some(book => {
    return (
      book.title === searchResults[index].title &&
      book.authors === searchResults[index].authors
    );
  });
  if (!present) {
    bookList.push(searchResults[index]);
    console.log(
      `Added ${bookList[bookList.length - 1].title} to the reading list.`
    );
    displayOptions();
    initiateOptionsPrompt();
  } else {
    console.log("That book is already in the book list.");
    initiateOptionsPrompt();
  }
};

const displayListOptions = () => {
  const bookNames = collectBookNames(bookList);
  const removeBookList = [];
  for (const [index, book] of bookNames.entries()) {
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
};

const initiateListOptionsPrompt = books => {
  const properties = {
    name: "input",
    type: "string",
    description: "Please select an option:",
    message: "Please select a valid option",
    required: true
  };

  prompt.get([properties], handleListOptionSelection);
};

const handleListOptionSelection = (err, selection) => {
  switch (selection.input) {
    case "search":
      initiateSearchPrompt();
      break;
    case "exit":
      console.log("Goodbye");
      break;
    default:
      const index = parseInt(selection.input);
      if (bookList[index - 1]) {
        removeBookFromList(index - 1);
      } else {
        initiateListOptionsPrompt();
      }
      break;
  }
};

const removeBookFromList = index => {
  bookList.splice(index, 1);
  console.log("\nThe current reading list is as follows: ");
  displayBooks(bookList);
  displayListOptions();
  initiateListOptionsPrompt();
};

initialize();
