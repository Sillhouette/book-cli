const sinon = require("sinon");
const chai = require("chai");
const assert = require("assert");
const Cli = require("../object-oriented/cli").Cli;
const Book = require("../object-oriented/book").Book;

describe("cli.js", function() {
  describe("CLI constructor", function() {
    it("should create a new CLI with proper default settings", function() {
      let cli = new Cli();
      expect(cli).to.be.an.instanceof(Cli);
      expect(cli.baseURL).to.equal(
        "https://www.googleapis.com/books/v1/volumes?"
      );
      expect(cli.maxResults).to.equal("maxResults=5&");
      expect(cli.queryStructure).to.equal("q=");
    });

    it("should create a new CLI proper settings", function() {
      let cli = new Cli(10);
      expect(cli).to.be.an.instanceof(Cli);
      expect(cli.baseURL).to.equal(
        "https://www.googleapis.com/books/v1/volumes?"
      );
      expect(cli.maxResults).to.equal("maxResults=10&");
      expect(cli.queryStructure).to.equal("q=");
    });
  });

  describe("CLI #initialize", function() {
    let cli;
    before(() => {
      cli = new Cli();
    });
    it("should initiate a new search when initialized", function() {
      let stub = sinon.stub(cli, "initiateSearchPrompt").callsFake(() => true);
      cli.initialize();

      assert(stub.called);
      stub.restore();
    });
  });

  describe("CLI #initiateSearch(err, queryObj)", function() {
    before(() => {
      cli = new Cli();
    });
    beforeEach(function() {
      cli.fetch = require("node-fetch");
    });
    it("sends a fetch request to 'https://www.googleapis.com/books/v1/volumes?maxResults=5&q=eragon'", async () => {
      let stub = sinon.stub(cli, "initiateSearchPrompt").callsFake(() => true);

      let stub2 = sinon
        .stub(cli, "initiateOptionsPrompt")
        .callsFake(() => true);

      chai.spy.on(cli, "fetch");
      const encoded_eragon = encodeURI("eragon");
      await cli.initiateSearch("", { query: encoded_eragon });
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

  describe("#displayBooks(books)", function() {
    before(() => {
      cli = new Cli();
      eragonBook = new Book({
        title: "Eragon and Eldest Omnibus",
        authors: "Christopher Paolini",
        publisher: "Random House"
      });
    });
    it("should log the correct values to console", () => {
      let spy = sinon.spy(console, "log");

      cli.displayBooks([eragonBook]);

      assert(spy.calledWith("1. Eragon and Eldest Omnibus"));
      assert(spy.calledWith("   Author(s): Christopher Paolini"));
      assert(spy.calledWith("   Publisher: Random House\n"));
      spy.restore();
    });
  });

  describe("#displayOptions()", function() {
    before(() => {
      cli = new Cli();
      eragonBook = new Book({
        title: "Eragon and Eldest Omnibus",
        authors: "Christopher Paolini",
        publisher: "Random House"
      });
    });
    it("should log the correct value to console", () => {
      let spy = sinon.spy(console, "log");
      cli.searchResults = [eragonBook];
      cli.displayOptions();

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

  describe("CLI #handleOptionSelection(err, selectionObj)", function() {
    before(() => {
      cli = new Cli();
      eragonBook = new Book({
        title: "Eragon and Eldest Omnibus",
        authors: "Christopher Paolini",
        publisher: "Random House"
      });
    });
    it("should display reading list and options when passed 'list'", function() {
      let stub3 = sinon
        .stub(cli, "initiateListOptionsPrompt")
        .callsFake(() => true);

      let spy = sinon.spy(console, "log");
      cli.readingList = [eragonBook];

      cli.handleOptionSelection("", { input: "list" });
      assert(spy.calledWith("\nThe current reading list is as follows: "));
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
      let stub = sinon.stub(cli, "initiateSearchPrompt").callsFake(() => true);

      cli.handleOptionSelection("", { input: "search" });

      assert(stub.called);
      stub.restore();
    });

    it("should call addBookToList(book) when passed an integer", function() {
      let stub2 = sinon
        .stub(cli, "initiateOptionsPrompt")
        .callsFake(() => true);

      let spy = sinon.spy(cli, "addBookToList");
      cli.readingList = [];
      cli.searchResults = [eragonBook];

      cli.handleOptionSelection("", { input: "1" });
      assert(spy.calledWith(0));
      expect(cli.readingList).to.eql([eragonBook]);
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

      assert(spy.calledWith("Goodbye"));
      spy.restore();
    });
  });
});
