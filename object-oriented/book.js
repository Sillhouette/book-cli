class Book {
  constructor({ title, authors, publisher }) {
    this.authors = authors;
    this.title = title;
    this.publisher = publisher;
  }

  //Displays a book to the user
  display(number) {
    const spacing = "   ";

    console.log(`${number}. ${this.title}`);
    console.log(`${spacing}Author(s): ${this.authors}`);
    console.log(`${spacing}Publisher: ${this.publisher}\n`);
  }
}

//Export the class for Cli and tests to use
module.exports = {
  Book: Book
};
