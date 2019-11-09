// Import cli functions for use after adding/removing books
exports.cli = require("./cli");
// Import input functions for use after removing books
exports.inputHandler = require("./inputHandler");

//Declare arrays to store search results and reading list
global.searchResults = [];
global.readingList = [];

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

//Add a book to the reading list if it's not already there
exports.addBookToList = index => {
  const present = this.readingListContains(global.searchResults[index], index);
  const error = `\u2717 `;
  const check = `\u2713`;

  if (!present) {
    global.readingList.push(global.searchResults[index]);
    this.cli.displaySearchResults(
      `${check} Added ${
        global.readingList[global.readingList.length - 1].title
      } to the reading list.\n`
    );
  } else {
    this.cli.displaySearchResults(
      `${error +
        global.searchResults[index].title} is already in the reading list.\n`
    );
  }
};

//Remove a book from the reading list then re-prompt
exports.removeBookFromList = index => {
  global.readingList.splice(index, 1);
  console.log("\nThe current reading list is as follows: ");
  this.cli.displayBooks(global.readingList);
  this.cli.displayListOptions();
  this.inputHandler.initiateListOptionsPrompt();
};

//Collects the titles of the books into an array for ease of listing
exports.collectBookTitles = books => {
  const bookTitles = [];
  for (let { title } of books) {
    bookTitles.push(title);
  }
  return bookTitles;
};

exports.readingListContains = (book, index) => {
  return global.readingList.some(book => {
    return (
      book.title === global.searchResults[index].title &&
      book.authors === global.searchResults[index].authors
    );
  });
};
