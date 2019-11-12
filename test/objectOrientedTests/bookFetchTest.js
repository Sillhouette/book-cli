const BookFetch = require("../../object-oriented/bookFetch").BookFetch;
const Cli = require("../../object-oriented/cli").Cli;

describe(createDescribeHeader("Object-Oriented bookFetch.js"), function() {
  describe(createDescribeHeader("BookFetch constructor"), function() {
    it(
      createItHeader(
        "should create a new BookFetch object with proper default settings"
      ),
      function() {
        let bookFetch = new BookFetch();
        expect(bookFetch).to.be.an.instanceof(BookFetch);
        expect(bookFetch.baseURL).to.equal(
          "https://www.googleapis.com/books/v1/volumes?"
        );
        expect(bookFetch.maxResults).to.equal("maxResults=5&");
        expect(bookFetch.queryStructure).to.equal("q=");
      }
    );

    it(
      createItHeader(
        "should create a new BookFetch object with proper max results setting"
      ),
      function() {
        let bookFetch = new BookFetch(10);
        expect(bookFetch).to.be.an.instanceof(BookFetch);
        expect(bookFetch.baseURL).to.equal(
          "https://www.googleapis.com/books/v1/volumes?"
        );
        expect(bookFetch.maxResults).to.equal("maxResults=10&");
        expect(bookFetch.queryStructure).to.equal("q=");
      }
    );
  });

  describe(
    createDescribeHeader("CLI #fetchResults(err, queryObj)"),
    function() {
      it(
        createItHeader(
          "sends a fetch request to 'https://www.googleapis.com/books/v1/volumes?maxResults=5&q=eragon'"
        ),
        async () => {
          bookFetch = new BookFetch();
          cli = new Cli();
          let stub = sinon
            .stub(cli.userInput, "initiateSearchPrompt")
            .callsFake(() => true);

          let stub2 = sinon
            .stub(cli.userInput, "initiateOptionsPrompt")
            .callsFake(() => true);

          chai.spy.on(bookFetch, "fetch");
          const encoded_eragon = encodeURI("eragon");
          await bookFetch.fetchResults("", { query: encoded_eragon });
          expect(
            bookFetch.fetch,
            "A fetch to the API was not found"
          ).to.have.been.called.with(
            "https://www.googleapis.com/books/v1/volumes?maxResults=5&q=eragon"
          );
          stub.restore();
          stub2.restore();
        }
      );
    }
  );
});
