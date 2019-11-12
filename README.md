# 8th Light Technical Assessment Code Submission

This is the repo that contains my code submission for the technical assessment at 8th light. It contains three main directories, the first is a procedural directory that contains a procedural approach, the second contains an object oriented approach, and the third contains a test suite that has sub-folders with tests for each of the aforementioned versions of the program. Both version of attempts at achieving the goals set out by 8th light for the technical assessment code challenge.

#### A revised note to the reviewer(s):

After I implemented the feedback that I received from an employee at 8th Light who reviewed my first submission of this code base I completely changed my mind on the approach for this project. The reviewer rightfully pointed out that I had not achieved proper single responsibility for the objects and methods in my first attempt and therefore asked me to refactor it to better reflect that principle.

After making the necessary changes and looking at the result of those changes I've come to the conclusion that the Object Oriented approach that I produced is superior to the procedural one. It is well organized, easy to follow, and provides a much better base to build upon than the procedural approach. I find that change of perspective to be exhilarating and I'm excited to continue having others review my code and give me suggestions on how I can get better as a developer

#### A note to the reviewer(s): _(written pre-refactor)_

While I believe that the procedural approach was the best, most logical approach to this particular challenge, I provided an object oriented solution as well because I know how valuable programming from an object oriented standpoint is, and I wanted to demonstrate my capabilities from both perspectives.

## Installation:

Follow these easy steps to install and start the app:

### Npm:

#### Install:

Run `npm install -g @sillhouette/book-cli`

#### Execute:

Run `book-cli` or `@sillhouette/book-cli` from bash

### Github:

#### Install:

Clone this repository, change directories into the folder for the repo and run `npm install`

#### Execute:

Start the application with the version selector: Run `node index.js` then choose which version of the app you want to run **(recommended)**

Start the procedural version directly: Open up `/procedural/cli.js` and uncomment the call to `initialize()`. Run `node ./procedural/cli.js` **NOTE:** This breaks the version selector so when you're done re-comment the line if you want to use the selector

Start the object-oriented version directly: Open up `/object-oriented/cli.js` and uncomment the instantiation of the cli class, instantiation of the cli object and the call to `initialize()`. Run `node ./object-oriented/cli.js` **NOTE:** This breaks the version selector so when you're done re-comment the lines if you want to use the selector

#### Test

Run the test suite using the command `npm test`

If you get a prompt after the tests run use `ctrl + c` to exit the prompt

**Note:** The output from the running of the cli still gets printed to the console so you likely have to scroll up to see the results of the tests once they have been run. I highlighted the headers of the modules/classes and method names in yellow and the test expectations in magenta, this should help to separate out what output is test-related versus what output is from the application running.

Thank you!

Austin Melchior

_This project has been licensed under the MIT open source license._
