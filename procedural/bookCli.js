//Import command line prompt created by flatiron: https://github.com/flatiron/prompt
const prompt = require("prompt");
//Import node-fetch library for querying the Google Books API
const fetch = require("node-fetch");

//Declare arrays to store search results and reading list
let searchResults = [];
let readingList = [];

//Configure the prompt and prompt for the initial search
function initialize() {
  console.clear();
  console.log("Welcome to the procedural version of book cli");
  console.log("\nPlease enter the name of the book you would like to find:");
  setupPrompt();
  initiateSearchPrompt();
}

//Set the global configuration settings for the prompt
function setupPrompt() {
  prompt.start();
  prompt.message = "";
  prompt.colors = false;
  prompt.delimiter = "";
}

//Set the properties for the search prompt and initiate it
function initiateSearchPrompt() {
  const properties = {
    name: "query",
    type: "string",
    description: "Please enter a search query:",
    message: "Please enter a search term",
    required: true
  };

  prompt.get([properties], initiateSearch);
}

//Receives userInput from the search prompt and fetches 5 books from Google's API
function initiateSearch(err, { query }) {
  const baseURL = "https://www.googleapis.com/books/v1/volumes?";
  const maxResults = "maxResults=5&";
  const queryStructure = "q=";
  const encodedQuery = encodeURI(query);

  fetch(baseURL + maxResults + queryStructure + encodedQuery)
    .then(resp => resp.json())
    .then(json => {
      generateSearchResults(json.items);
      displaySearchResults();
    })
    .catch(error => {
      console.log("There was a fatal error, please try again.");
      initiateSearchPrompt();
    })
    .catch(error => error);
}

function displaySearchResults(message = null) {
  console.clear();
  console.log("The current search results are: \n");
  displayBooks(searchResults);
  displayOptions();
  message ? console.log(message) : null;
  initiateOptionsPrompt();
}

//Generates the basic objects using the relevant attributes for each book
function generateSearchResults(books) {
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
  return searchResults;
}

//Collects the titles of the books into an array for ease of listing
function collectBookTitles(books) {
  const bookTitles = [];
  for (let { title } of books) {
    bookTitles.push(title);
  }
  return bookTitles;
}

//Displays an array of books to the user
function displayBooks(books) {
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
}

function readingListContains(book, index) {
  return readingList.some(book => {
    return (
      book.title === searchResults[index].title &&
      book.authors === searchResults[index].authors
    );
  });
}

//Generates the post-search menu
function displayOptions() {
  const bookTitles = collectBookTitles(searchResults);
  const addBookList = [];
  const check = `\u2713`;
  for (const [index, book] of bookTitles.entries()) {
    const added = readingListContains(searchResults[index], index);

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

//Set the properties for post-search prompt and initiate it
function initiateOptionsPrompt() {
  const properties = {
    name: "input",
    type: "string",
    description: "Please select an option:",
    message: "Please select a valid option",
    required: true
  };

  prompt.get([properties], handleOptionSelection);
}

//Read user menu selection and handle the response
function handleOptionSelection(err, { input }) {
  switch (input.toLowerCase()) {
    //Display the current reading list
    case "list":
      displayList();
      break;
    //Search for a new book
    case "search":
      console.clear();
      initiateSearchPrompt();
      break;
    //Exit the program
    case "exit":
      exit();
      break;
    default:
      console.clear();
      const index = parseInt(input);
      //Handle case where user wants to add book to reading list
      if (searchResults[index - 1]) {
        addBookToList(index - 1);
      } else {
        //If invalid input re-prompt for valid input
        console.log("That input was invalid, please try again");
        initiateOptionsPrompt();
      }
      break;
  }
}

//Add a book to the reading list if it's not already there
function addBookToList(index) {
  const present = readingListContains(searchResults[index], index);

  if (!present) {
    readingList.push(searchResults[index]);
    displaySearchResults(
      `Added ${
        readingList[readingList.length - 1].title
      } to the reading list.\n`
    );
  } else {
    displaySearchResults(
      `${searchResults[index].title} is already in the reading list.\n`
    );
  }
}

function displayList(message = null) {
  console.clear();
  console.log("The current reading list is: \n");
  displayBooks(readingList);
  displayListOptions();
  message ? console.log(message) : null;
  initiateListOptionsPrompt();
}

//Display menu while user is looking at reading list
function displayListOptions() {
  const bookTitles = collectBookTitles(readingList);
  const removeBookList = [];
  for (const [index, book] of bookTitles.entries()) {
    removeBookList.push(
      `  ${index + 1} - Remove ${book} from the reading list`
    );
  }
  const options = [
    `Choose one of the following options: \n`,
    //...removeBookList, // Removed as the instructions asked us to not include additional features
    `  back - Return to previous search`,
    `  search - Search for a new book`,
    `  exit - Exit the program`,
    `\n`
  ];

  for (const option of options) {
    console.log(option);
  }
}

//Set properties for post reading list prompt and initialize it
function initiateListOptionsPrompt(books) {
  const properties = {
    name: "input",
    type: "string",
    description: "Please select an option:",
    message: "Please select a valid option",
    required: true
  };

  prompt.get([properties], handleListOptionSelection);
}

//Read user post reading list menu selection and handle response
function handleListOptionSelection(err, { input }) {
  switch (input.toLowerCase()) {
    case "back":
      console.log("The previous search results were: \n");
      displaySearchResults();
      break;
    case "search":
      console.clear();
      initiateSearchPrompt();
      break;
    case "exit":
      exit();
      break;
    default:
      const index = parseInt(input.toLowerCase);
      // if (readingList[index - 1]) { //Removed as the instructions asked us to not include additional features in the applicaton
      //   removeBookFromList(index - 1);
      // } else {
      console.log("That input was invalid, please try again");
      initiateListOptionsPrompt();
      // }
      break;
  }
}

//Remove a book from the reading list then re-prompt
function removeBookFromList(index) {
  readingList.splice(index, 1);
  console.log("\nThe current reading list is as follows: ");
  displayBooks(readingList);
  displayListOptions();
  initiateListOptionsPrompt();
}

function exit() {
  console.clear();
  console.log("Thanks for using Book CLI \n");
}

// Uncomment this line if you want to use `node ./procedural/bookCli.js` to run this version
// Don't forget to re-comment it if you want the version selector to run properly
//initialize();

// Export the initialize method for the version selector to use
module.exports = { initialize: initialize };
