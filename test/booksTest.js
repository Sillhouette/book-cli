const sinon = require("sinon");
const helpers = require("./helpers");
const chai = require("chai");
const spies = require("chai-spies");
const assert = require("assert");
const prompt = require("prompt");

chai.use(spies);

const eragonFetchResult = [
  {
    volumeInfo: {
      title: "Eragon and Eldest Omnibus",
      authors: "Christopher Paolini",
      publisher: "Random House"
    }
  }
];

const eragonObjects = [
  {
    title: "Eragon and Eldest Omnibus",
    authors: "Christopher Paolini",
    publisher: "Random House"
  }
];

const eragonTitles = ["Eragon and Eldest Omnibus"];

describe("books.js", function() {
  describe("#initiateSearch(err, queryObj)", function() {
    beforeEach(() => {
      //window.document.body.innerHTML = "<main></main>";
      window.fetch = require("node-fetch");
    });

    it("sends a fetch request to 'https://www.googleapis.com/books/v1/volumes?maxResults=5&q=eragon'", async () => {
      chai.spy.on(window, "fetch");
      const encoded_eragon = encodeURI("eragon");
      await initiateSearch("", { query: encoded_eragon });
      expect(
        window.fetch,
        "A fetch to the API was not found"
      ).to.have.been.called.with(
        "https://www.googleapis.com/books/v1/volumes?maxResults=5&q=eragon"
      );
    });
  });

  describe("#generateSearchResults(booksData)", function() {
    it("Generates object with correct book information", () => {
      expect(generateSearchResults(eragonFetchResult)).to.eql(eragonObjects);
    });
  });

  describe("#collectBookTitles(books)", function() {
    it("Generates array with correct book titles", () => {
      expect(collectBookTitles(eragonObjects)).to.eql(eragonTitles);
    });
  });

  describe("#displayBooks(books)", function() {
    it("should log the correct values to console", () => {
      let spy = sinon.spy(console, "log");

      displayBooks(eragonObjects);

      assert(spy.calledWith("1. Eragon and Eldest Omnibus"));
      assert(spy.calledWith("   Author(s): Christopher Paolini"));
      assert(spy.calledWith("   Publisher: Random House\n"));
      spy.restore();
    });
  });

  describe("#displayOptions()", function() {
    it("should log the correct value to console", () => {
      let spy = sinon.spy(console, "log");
      let searchResults = eragonObjects;
      displayOptions();

      assert(spy.calledWith("Choose one of the following options: \n"));
      assert(
        spy.calledWith(
          "  1 - Add Eragon and Eldest Omnibus to the reading list"
        )
      );
      assert(spy.calledWith("  list - View current reading list"));
      assert(spy.calledWith("  search - Search for a new book"));
      assert(spy.calledWith("  exit - Exit the program"));
      assert(spy.calledWith("\n"));
      spy.restore();
    });
  });

  describe("#handleOptionSelection(err, selectionObj)", function() {
    it("should display bookList and options when passed 'list'", function() {
      let spy = sinon.spy(console, "log");
      window.bookList = eragonObjects;
      window.prompt = prompt;

      handleOptionSelection("", { input: "list" });
      assert(spy.calledWith("\nThe current reading list is as follows: "));
      assert(spy.calledWith("1. Eragon and Eldest Omnibus"));
      assert(spy.calledWith("   Author(s): Christopher Paolini"));
      assert(spy.calledWith("   Publisher: Random House\n"));
      assert(spy.calledWith("Choose one of the following options: \n"));
      assert(spy.calledWith("  search - Search for a new book"));
      assert(spy.calledWith("  exit - Exit the program"));

      spy.restore();
    });

    it("should display bookList when passed 'search'", function() {
      let spy = sinon.spy(window, "initiateSearchPrompt");
      window.bookList = eragonObjects;
      window.prompt = prompt;

      handleOptionSelection("", { input: "search" });

      assert(spy.calledOnce);
      spy.restore();
    });

    it("should call addBookToList(book) when passed an integer", function() {
      let spy = sinon.spy(window, "addBookToList");
      window.bookList = [];
      window.searchResults = eragonObjects;
      window.prompt = prompt;

      handleOptionSelection("", { input: "1" });

      assert(spy.calledWith(0));
      expect(window.bookList).to.eql(eragonObjects);
      spy.restore();
      process.stdin.destroy();
    });
  });
});
