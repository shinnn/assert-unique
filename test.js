'use strict';

var requireBowerFiles = require('require-bower-files');
var test = require('tape');

function runTest(description, main) {
  test(description, function(t) {
    t.plan(7);

    t.equal(main.name, 'assertUnique', 'should have a function name.');

    t.doesNotThrow(
      main.bind(null, 'a', 1, ['a'], 'A', 'aa', 'Aa', 'aA'),
      'should not throw when no value is duplicated.'
    );

    t.doesNotThrow(
      main.bind(null, 'å'),
      'should not throw when it takes a single argument.'
    );

    t.doesNotThrow(
      main.bind(null),
      'should not throw when it takes no arguments.'
    );

    t.throws(
      main.bind(null, undefined, null, undefined),
      /undefined is duplicated\./,
      'should throw an error when a value is duplicated.'
    );

    t.throws(
      main.bind(null, false, false, main, '', main, false, test, test),
      /false, \[Function: assertUnique\] and \[Function\] are duplicated\./,
      'should throw an error when multiple values are duplicated.'
    );

    t.throws(
      main.bind(null, {}, '1', {}, '1', [], 1, 1, [], main.bind({}), main.bind({})),
      /"1" and 1 are duplicated\./,
      'should not check deep equality.'
    );
  });
}

runTest('require(\'array-to-sentence\')', require('./'));

global.window = {};
requireBowerFiles({self: true});

runTest('window.assertUnique', window.assertUnique);
