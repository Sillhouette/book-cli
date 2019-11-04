//Import command line prompt created by flatiron: https://github.com/flatiron/prompt
const prompt = require("prompt");
//Import node-fetch library for querying the Google Books API
const fetch = require("node-fetch");

//Declare arrays to store search results and reading list
let searchResults = [];
let bookList = [];

//Configure the prompt and prompt for the initial search
const initialize = () => {
  setupPrompt();
  initiateSearchPrompt();
};

//Set the global configuration settings for the prompt
const setupPrompt = () => {
  prompt.start();
  prompt.message = "";
  prompt.colors = false;
  prompt.delimiter = "";
};

//Set the properties for the search prompt and initiate it
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

//Receives userInput from the search prompt and fetches 5 books from Google's API
const initiateSearch = (err, { query }) => {
  const baseURL = "https://www.googleapis.com/books/v1/volumes?";
  const maxResults = "maxResults=5&";
  const queryStructure = "q=";
  const encodedQuery = encodeURI(query);

  fetch(baseURL + maxResults + queryStructure + encodedQuery)
    .then(resp => resp.json())
    .then(json => {
      console.log(`\nFetching results for ${query}: \n`);
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

//Generates the basic objects using the relevant attributes for each book
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

//Collects the titles of the books into an array for ease of listing
const collectBookNames = books => {
  const bookNames = [];
  for (let { title } of books) {
    bookNames.push(title);
  }
  return bookNames;
};

//Displays an array of books to the user
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

//Generates the post-search menu
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

//Set the properties for post-search prompt and initiate it
const initiateOptionsPrompt = () => {
  const properties = {
    name: "input",
    type: "string",
    description: "Please select an option:",
    message: "Please select a valid option",
    required: true
  };

  prompt.get([properties], handleOptionSelection);
};

//Read user menu selection and handle the response
const handleOptionSelection = (err, selection) => {
  switch (selection.input) {
    //Display the current reading list
    case "list":
      console.log("\nThe current reading list is as follows: ");
      displayBooks(bookList);
      displayListOptions();
      initiateListOptionsPrompt();
      break;
    //Search for a new book
    case "search":
      initiateSearchPrompt();
      break;
    //Exit the program
    case "exit":
      console.log("Goodbye");
      break;
    default:
      const index = parseInt(selection.input);
      //Handle case where user wants to add book to reading list
      if (searchResults[index - 1]) {
        addBookToList(index - 1);
      } else {
        //If invalid input re-prompt for valid input
        initiateOptionsPrompt();
      }
      break;
  }
};

//Add a book to the reading list if it's not already there
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

//Display menu while user is looking at reading list
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
    //...removeBookList,
    `  search - Search for a new book`,
    `  exit - Exit the program`,
    `\n`
  ];

  for (const option of options) {
    console.log(option);
  }
};

//Set properties for post reading list prompt and initialize it
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

//Read user post reading list menu selection and handle response
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
        //removeBookFromList(index - 1); //Removed as the instructions asked us to not include additional features in the applicaton
      } else {
        initiateListOptionsPrompt();
      }
      break;
  }
};

//Remove a book from the reading list then re-prompt
const removeBookFromList = index => {
  bookList.splice(index, 1);
  console.log("\nThe current reading list is as follows: ");
  displayBooks(bookList);
  displayListOptions();
  initiateListOptionsPrompt();
};

initialize();
