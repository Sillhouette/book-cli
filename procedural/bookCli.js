exports.inputHandler = require("./inputHandler");

//Declare arrays to store search results and reading list
global.searchResults = [];
global.readingList = [];

//Configure the prompt and prompt for the initial search
exports.initialize = () => {
  console.clear();
  console.log("Welcome to the procedural version of book cli");
  console.log("\nPlease enter the name of the book you would like to find:");
  this.inputHandler.setupPrompt();
  this.inputHandler.initiateSearchPrompt();
};

exports.displaySearchResults = (message = null) => {
  console.clear();
  console.log("The current search results are: \n");
  this.displayBooks(global.searchResults);
  this.displayOptions();
  message ? console.log(message) : null;
  this.inputHandler.initiateOptionsPrompt();
};

//Generates the basic objects using the relevant attributes for each book
exports.generateSearchResults = books => {
  global.searchResults = [];
  for (let {
    volumeInfo: { title, authors = "Unknown", publisher = "Unknown" }
  } of books) {
    authors = Array.isArray(authors) ? authors.join() : authors;
    global.searchResults.push({
      title: title,
      authors: authors,
      publisher: publisher
    });
  }
  return global.searchResults;
};

//Collects the titles of the books into an array for ease of listing
exports.collectBookTitles = books => {
  const bookTitles = [];
  for (let { title } of books) {
    bookTitles.push(title);
  }
  return bookTitles;
};

//Displays an array of books to the user
exports.displayBooks = books => {
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

exports.readingListContains = (book, index) => {
  return global.readingList.some(book => {
    return (
      book.title === global.searchResults[index].title &&
      book.authors === global.searchResults[index].authors
    );
  });
};

//Generates the post-search menu
exports.displayOptions = () => {
  const bookTitles = this.collectBookTitles(global.searchResults);
  const addBookList = [];
  const check = `\u2713`;
  for (const [index, book] of bookTitles.entries()) {
    const added = this.readingListContains(global.searchResults[index], index);

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
};

//Add a book to the reading list if it's not already there
exports.addBookToList = index => {
  const present = this.readingListContains(global.searchResults[index], index);

  if (!present) {
    global.readingList.push(global.searchResults[index]);
    this.displaySearchResults(
      `Added ${
        global.readingList[global.readingList.length - 1].title
      } to the reading list.\n`
    );
  } else {
    this.displaySearchResults(
      `${global.searchResults[index].title} is already in the reading list.\n`
    );
  }
};

exports.displayList = (message = null) => {
  console.clear();
  console.log("The current reading list is: \n");
  this.displayBooks(global.readingList);
  this.displayListOptions();
  message ? console.log(message) : null;
  this.inputHandler.initiateListOptionsPrompt();
};

//Display menu while user is looking at reading list
exports.displayListOptions = () => {
  const bookTitles = this.collectBookTitles(global.readingList);
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
};

//Remove a book from the reading list then re-prompt
exports.removeBookFromList = index => {
  global.readingList.splice(index, 1);
  console.log("\nThe current reading list is as follows: ");
  this.displayBooks(global.readingList);
  this.displayListOptions();
  this.initiateListOptionsPrompt();
};

exports.exit = () => {
  console.clear();
  console.log("Thanks for using Book CLI \n");
};

// Uncomment this line if you want to use `node ./procedural/bookCli.js` to run this version
// Don't forget to re-comment it if you want the version selector to run properly
//initialize();
