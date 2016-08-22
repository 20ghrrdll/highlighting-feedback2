import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';

import '../ui/submission.html';



function isAlphaNumeric(str) {
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
      console.log(wordPuncList);
  }
  return wordPuncList;
}

Template.submission.onCreated(function submissionOnCreated(){
     $("#hitNext").hide();
});

Template.submission.events({

  'click #submitSample'(event) {
    // Prevent default browser form submit
    event.preventDefault();

    var hitNext = $('#hitNext');

    if(!hitNext.is(':visible')){

      hitNext.show();
      // Get value from form element
      var utext = $("#sample").val();
      if(utext === ""){
        alert("Oops! Make sure to write a description!");
        $('#hitNext').hide();
      }
      else{

        var promptNum = Session.get("promptNum");

        // Insert a sample into the collection
        if(promptNum < 2){
          console.log("Submitting to controls");
          Meteor.call('utexts.insert', utext);
        }
        else if(promptNum === 2) {
          console.log("Submitting to review");

        //Split sample by word because samples are analysed by word, punctuation
        //and spaces
          var revTextWords  = utext.split(" ");
          console.log(revTextWords);
          var wordDivs = [];
          //search for and separate punctuation. Wrap each word, space, and punctuation
          //in highlight div.
          revTextWords = getWordPunc(revTextWords, wordDivs);
          

          console.log(revTextWords);
          console.log(wordDivs);

          Meteor.call('revtexts.insert',  revTextWords, wordDivs);
        }
      }
    }
  },

});



//I like apples, pears;not squash!~

/*Template.welcome.events({

  'click .clearAll'(event) {

    event.preventDefault();

    Meteor.call('revtexts.deleteAll');
    Meteor.call('utexts.deleteAll');
  },

});*/

//I like apples, pears;not squash!~
