exports.cli = require("./bookCli");

//Read user menu selection and handle the response
exports.handleOptionSelection = (err, { input }) => {
  switch (input.toLowerCase()) {
    //Display the current reading list
    case "list":
      this.cli.displayList();
      break;
    //Search for a new book
    case "search":
      console.clear();
      this.cli.initiateSearchPrompt();
      break;
    //Exit the program
    case "exit":
      this.cli.exit();
      break;
    default:
      console.clear();
      const index = parseInt(input);
      //Handle case where user wants to add book to reading list
      if (global.searchResults[index - 1]) {
        this.cli.addBookToList(index - 1);
      } else {
        console.log(global.searchResults);
        //If invalid input re-prompt for valid input
        console.log("That input was invalid, please try again");
        this.cli.initiateOptionsPrompt();
      }
      break;
  }
};

//Read user post reading list menu selection and handle response
exports.handleListOptionSelection = (err, { input }) => {
  switch (input.toLowerCase()) {
    case "back":
      console.log("The previous search results were: \n");
      this.cli.displaySearchResults();
      break;
    case "search":
      console.clear();
      this.cli.initiateSearchPrompt();
      break;
    case "exit":
      this.cli.exit();
      break;
    default:
      const index = parseInt(input.toLowerCase);
      // if (this.readingList[index - 1]) { //Removed as the instructions asked us to not include additional features in the applicaton
      //   removeBookFromList(index - 1);
      // } else {
      console.log("That input was invalid, please try again");
      this.cli.initiateListOptionsPrompt();
      // }
      break;
  }
};
