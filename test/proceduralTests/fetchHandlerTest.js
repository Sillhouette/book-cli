const inputHandler = require("../../procedural/inputHandler");
const fetchHandler = require("../../procedural/fetchHandler");

describe(createDescribeHeader("Procedural fetchHandler.js"), function() {
  describe(createDescribeHeader("#initiateSearch(err, queryObj)"), function() {
    it(
      createItHeader("sends a fetch request to the Google Books API"),
      async () => {
        let stub = sinon
          .stub(inputHandler, "initiateSearchPrompt")
          .callsFake(() => true);

        let stub2 = sinon
          .stub(inputHandler, "initiateOptionsPrompt")
          .callsFake(() => true);

        chai.spy.on(fetchHandler, "fetch");
        const encoded_eragon = encodeURI("eragon");
        await fetchHandler.initiateSearch("", { query: encoded_eragon });
        expect(
          fetchHandler.fetch,
          "A fetch to the API was not found"
        ).to.have.been.called.with(
          "https://www.googleapis.com/books/v1/volumes?maxResults=5&q=eragon"
        );
        stub.restore();
        stub2.restore();
      }
    );
  });
});
