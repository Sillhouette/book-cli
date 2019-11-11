# 8th Light Technical Assessment Code Submission

This is the repo that contains my code submission for the technical assessment at 8th light. It contains two main directories, the first is a procedural directory that contains a procedural approach and the second folder contains an object oriented approach, both of which are attempts at achieving the goals set out by 8th light.

#### A note to the reviewer(s):

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

Start the object-oriented version directly: Open up `/object-oriented/cli.js` and uncomment the instantiation of the cli object and the call to `initialize()`. Run `node ./object-oriented/cli.js` **NOTE:** This breaks the version selector so when you're done re-comment the lines if you want to use the selector

#### Test

Run the test suite using the command `npm test`

If you get a prompt after the tests run use `ctrl + c` to exit the prompt

**Note:** The output from the running of the cli still gets printed to the console so you likely have to scroll up to see the results of the tests once they have been run

Thank you!

Austin Melchior

_This project has been licensed under the MIT open source license._
