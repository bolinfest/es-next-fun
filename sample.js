/** @jsx React.DOM */
// The above annotation is mandatory for enabling the JSX transform.

/*
 * This sample file exercises several futuristic JS language features:
 *
 * - JSX
 * - Flow/TypeScript type annotations
 * - async/await
 * - classes, arrow functions, and other ES6 features
 */

// Note that in [Atom](https://atom.io/), Promise is globally available.
var Promise = require('promise');

// Here are some sample React components from the React tutorial.
// Note how they can reference one another.
var React = require('react');
var CommentList = React.createClass({
  render: function() {
    return (
      <div className="commentList">
        Hello, world! I am a CommentList.
      </div>
    );
  }
});
var CommentForm = React.createClass({
  render: function() {
    return (
      <div className="commentForm">
        Hello, world! I am a CommentForm.
      </div>
    );
  }
});
var CommentBox = React.createClass({
  render: function() {
    return (
      <div className="commentBox">
        <h1>Comments</h1>
        <CommentList />
        <CommentForm />
      </div>
    );
  }
});

// Here is a simple ES6 class hierarchy.
// Some of the methods are async.
// Note the use of type annotations.

class Vehicle {
  constructor(name: string) {
    this._name = name;
  }

  async getMeaningOfLifeAsync() {
    return 42;
  }

  async getDelayedReaction() {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve('done'), 2000 /* 2 seconds */);
    });
  }

  toString(): string {
    return 'I am a vehicle named ' + this._name + '.';
  }
}

class Car extends Vehicle {

  async fail() {
    console.log('in fail()');
    return Promise.reject(new Error('oh no!'));
  }
}

async function main() {
  var car = new Car('Fred');
  console.log('%s', car);
  var meaningOfLife = await car.getMeaningOfLifeAsync();
  console.log('meaning of life is: %s', meaningOfLife);
  var reaction = await car.getDelayedReaction();
  console.log('reaction: %s', reaction);

  try {
    console.log('before fail()');
    var theResult = await car.fail();
    console.log('Unexpected success: %s', theResult);
  } catch (e) {
    console.log('Error: %s', e);
  }

  console.log('The end.');
}

main();
