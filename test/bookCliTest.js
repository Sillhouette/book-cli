const sinon = require("sinon");
const chai = require("chai");
const spies = require("chai-spies");
const assert = require("assert");

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
    beforeEach(function() {
      window.fetch = require("node-fetch");
    });
    it("sends a fetch request to 'https://www.googleapis.com/books/v1/volumes?maxResults=5&q=eragon'", async () => {
      let stub = sinon
        .stub(window, "initiateSearchPrompt")
        .callsFake(() => true);

      let stub2 = sinon
        .stub(window, "initiateOptionsPrompt")
        .callsFake(() => true);

      chai.spy.on(window, "fetch");
      const encoded_eragon = encodeURI("eragon");
      await initiateSearch("", { query: encoded_eragon });
      expect(
        window.fetch,
        "A fetch to the API was not found"
      ).to.have.been.called.with(
        "https://www.googleapis.com/books/v1/volumes?maxResults=5&q=eragon"
      );
      stub.restore();
      stub2.restore();
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
      window.searchResults = eragonObjects;
      window.readingList = [];
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
    it("should display readingList and options when passed 'list'", function() {
      let stub3 = sinon
        .stub(window, "initiateListOptionsPrompt")
        .callsFake(() => true);

      let spy = sinon.spy(console, "log");
      window.readingList = eragonObjects;

      handleOptionSelection("", { input: "list" });
      assert(spy.calledWith("The current reading list is: \n"));
      assert(spy.calledWith("1. Eragon and Eldest Omnibus"));
      assert(spy.calledWith("   Author(s): Christopher Paolini"));
      assert(spy.calledWith("   Publisher: Random House\n"));
      assert(spy.calledWith("Choose one of the following options: \n"));
      assert(spy.calledWith("  search - Search for a new book"));
      assert(spy.calledWith("  exit - Exit the program"));

      spy.restore();
      stub3.restore();
    });

    it("should initiate a new search when passed 'search'", function() {
      //let spy = sinon.spy(window, "initiateSearchPrompt");
      let stub = sinon
        .stub(window, "initiateSearchPrompt")
        .callsFake(() => true);

      window.readingList = eragonObjects;

      handleOptionSelection("", { input: "search" });

      assert(stub.called);
      stub.restore();
    });

    it("should call addBookToList(book) when passed an integer", function() {
      let stub2 = sinon
        .stub(window, "initiateOptionsPrompt")
        .callsFake(() => true);

      let spy = sinon.spy(window, "addBookToList");
      window.readingList = [];
      window.searchResults = eragonObjects;

      handleOptionSelection("", { input: "1" });

      assert(spy.calledWith(0));
      expect(window.readingList).to.eql(eragonObjects);
      spy.restore();
      stub2.restore();
    });

    it("should call initiateOptionsPrompt when passed invalid selections", function() {
      let stub2 = sinon
        .stub(window, "initiateOptionsPrompt")
        .callsFake(() => true);

      handleOptionSelection("", { input: "gibberish" });

      assert(stub2.called);
      stub2.restore();
    });

    it("should exit the program when passed 'exit'", () => {
      let spy = sinon.spy(console, "log");

      handleOptionSelection("", { input: "exit" });

      assert(spy.calledWith("Thanks for using Book CLI \n"));
      spy.restore();
    });
  });

  describe("#handleListOptionSelection(err, selectionObj)", function() {
    it("should initiate a new search when passed 'search'", function() {
      let stub = sinon
        .stub(window, "initiateSearchPrompt")
        .callsFake(() => true);

      handleListOptionSelection("", { input: "search" });
      assert(stub.called);
      stub.restore();
    });

    it("should call initiateListOptionsPrompt when passed invalid selections", function() {
      let stub3 = sinon
        .stub(window, "initiateListOptionsPrompt")
        .callsFake(() => true);
      handleListOptionSelection("", { input: "gibberish" });

      assert(stub3.called);
      stub3.restore();
    });

    it("should exit the program when passed 'exit'", () => {
      let spy = sinon.spy(console, "log");

      handleListOptionSelection("", { input: "exit" });

      assert(spy.calledWith("Thanks for using Book CLI \n"));
      spy.restore();
      process.stdin.destroy();
    });
  });
});
