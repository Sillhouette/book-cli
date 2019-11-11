exports.inputHandler = require("./inputHandler");
exports.listHandler = require("./listHandler");
// Import colors for a colorful ui
const colors = require("colors/safe");

//Configure the prompt and prompt for the initial search
exports.initialize = () => {
  console.clear();
  console.log("Welcome to the procedural version of book cli");
  console.log("\nPlease enter the name of the book you would like to find:");
  this.inputHandler.setupPrompt();
  this.inputHandler.initiateSearchPrompt();
};

// Displays the search results array to the user
exports.displaySearchResults = (message = null) => {
  console.clear();
  console.log("The current search results are: \n");
  this.displayBooks(global.searchResults);
  this.displayOptions();
  message ? console.log(message) : null;
  this.inputHandler.initiateOptionsPrompt();
};

//Displays an array of books to the user
exports.displayBooks = books => {
  if (books.length === 0) {
    console.log("There are no books in this list yet.\n");
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
exports.displayOptions = () => {
  const bookTitles = this.listHandler.collectBookTitles(global.searchResults);
  const addBookList = [];
  const check = `\u2713`;
  for (const [index, book] of bookTitles.entries()) {
    const added = this.listHandler.readingListContains(
      global.searchResults[index],
      index
    );

    const message = added
      ? colors.green(`  ${check} - Add ${book} to the reading list`)
      : `  ${index + 1} - Add ${book} to the reading list`;

    addBookList.push(message);
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

// Display the reading list to the user
exports.displayList = (message = null) => {
  console.clear();
  console.log("The current reading list is: \n");
  this.displayBooks(global.proceduralReadingList);
  this.displayListOptions();
  message ? console.log(message) : null;
  this.inputHandler.initiateListOptionsPrompt();
};

//Display menu while user is looking at reading list
exports.displayListOptions = () => {
  const bookTitles = this.listHandler.collectBookTitles(
    global.proceduralReadingList
  );
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

// Exit the program
exports.exit = () => {
  console.clear();
  console.log("Thanks for using the procedural Book CLI! \n");
};

// Uncomment this line if you want to use `node ./procedural/cli.js` to run this version
// Don't forget to re-comment it if you want the version selector to run properly
//initialize();
