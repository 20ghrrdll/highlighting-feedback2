import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { Session } from 'meteor/session';

//import { userTexts } from '../api/userTexts.js';
//import { textsToReview} from '../api/reviewedTexts.js'
 
import './body.html';
import './submission.html';
import './reviewText.html';
import './highlightText.html';
import './storytext.html';
import './mainLayout.html';
import './submissionStory.html';
import './test.html';
import './welcome.html';

import '../api/highlightText.js';
import '../api/revText.js';

import '../api/welcome.js';
import '../api/submission.js';
import '../api/submissionStory.js';



/******* Routes *********/

FlowRouter.route('/', {
    name: 'home',
    action: function(params) {
        console.log("Am I on the home page?");
        BlazeLayout.render("mainLayout", {content: "welcome"});
    }
});

FlowRouter.route('/story', {
    name: 'story',
    action: function() {
        console.log("Am I on the story page?");
        BlazeLayout.render("mainLayout", {content: "storytext"});
    }
});

FlowRouter.route('/submit', {
    name: 'submit',
    action: function(params) {
        console.log("Am I on the submit page?");
        BlazeLayout.render("mainLayout", {content: "submissionStory"});
    }
});

FlowRouter.route('/highlight', {
    name: 'highlight',
    action: function(params) {
        console.log("Am I on the highlight page?");
        BlazeLayout.render("mainLayout", {content: "hightext"});
    }
});

FlowRouter.route('/test', {
    name: 'test',
    action: function(params) {
        console.log("Am I on the test page?");
        BlazeLayout.render("mainLayout", {content: "testFunctionality"});
    }
});



/*function isAlphaNumeric(str) {
  var code;
  var len;

  for (var i = 0, len = str.length; i < len; i++) {
    code = str.charCodeAt(i);
    if (!(code > 47 && code < 58) && // numeric (0-9)
        !(code > 64 && code < 91) && // upper alpha (A-Z)
        !(code > 96 && code < 123)) { // lower alpha (a-z)
      return i;
    }
  }
  return -1;
};

function makeWordDiv(word, idNum){
  var wordDiv = "<span class=\"highlight\" id=\"" + idNum + "\">" + word + "</span>";
  return wordDiv;
}

function makePuncDiv(punc, idNum){
  var puncDiv = "<span class=\"highlight punctuation\" id=\"" + idNum + "\">" + punc + "</span>";
  return puncDiv;
}

function getWordPunc(wordList, divList){
  //puncIndexList
  console.log("getting wordPunc");
  var wordPuncList = [];
  var counter = 0;

  for(i = 0; i < wordList.length; i++){
    var word = wordList[i];
    //check to see if there are non alpha-numeric characters in the strings
    //These need to be given separate divs from the words.
    //each div gets a numerical id that corresponds to its array index.
    var punc = isAlphaNumeric(word);
    while(punc != -1){

      if(word.length > 1){

        var newWord = word.substr(0, punc);
        var punctuation = word.substring(punc, punc+1);

        divList.push(makeWordDiv(newWord, wordPuncList.length));
        wordPuncList.push(newWord);

        divList.push(makePuncDiv(punctuation, wordPuncList.length));
        wordPuncList.push(punctuation);

        //puncIndexList.push(wordPuncList.length -1);
        word = word.substr(punc+1, word.length);
        punc = isAlphaNumeric(word);
        //console.log(word);
      }
      else if(word.length == 1) {
        //puncIndexList.push(wordPuncList.length);
        punc = -1;
      }
      else punc = -1;

    }

      if(word.length !=0) {
        divList.push(makeWordDiv(word, wordPuncList.length));
        wordPuncList.push(word);
      }
      //add spaces back in because additive errors
      divList.push(makeWordDiv(" ", wordPuncList.length));
       wordPuncList.push(" ");
  }
  wordPuncList.pop();
  return wordPuncList;
}


Template.submission.events({
  'submit .new-text'(event) {
    // Prevent default browser form submit
    event.preventDefault();
 
    // Get value from form element
    var target = event.target;
    var utext = target.text.value;

 
    // Insert a sample into the collection
    //Meteor.call('utexts.insert', utext);

    //Split sample by word because samples are analysed by word, punctuation
    //and spaces
    var revTextWords  = utext.split(" ");
    var wordDivs = [];
    revTextWords = getWordPunc(revTextWords, wordDivs);
    

    console.log(revTextWords.toString());
    console.log(wordDivs);




    Meteor.call('revtexts.insert',  revTextWords, wordDivs);
  },
  });*/

//I like apples, pears;not squash!~

/*Template.welcome.events({

  'click .clearAll'(event) {

    event.preventDefault();

    Meteor.call('revtexts.deleteAll');
    Meteor.call('utexts.deleteAll');
  },

});*/


