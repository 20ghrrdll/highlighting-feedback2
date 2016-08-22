import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
 
import '../ui/highlightText.html';

import './submittedReviews.js';
import './reviewedTexts.js';




function arrayToString(a) {
  console.log(a);
  if(a != undefined){
  var newString = "";
    for(i = 0; i < a.length; i++){
      newString = newString.concat(a[i]);
    }
  return newString;
  }
  else
    return "";
  }   


function callback(err, data){
  if (err)
    console.log(err);
  else {
    console.log(data);
    if(data !== undefined){
      var sample = data.divtext;
      sample = arrayToString(sample);
      console.log(sample);
      Session.set("textToReview", sample);

      console.log("The id for this sample is " + data._id);
      Session.set("sampleId", data._id);
      check(data.revtext.length, Number);
      Session.set ("numWords", data.revtext.length);

      var id = data._id;
        if(id !== "noSample" && id !== undefined && Session.get("highlightNum") === 0){
        Meteor.call('reviews.sayHi', function(err, data){
          if (err)
          console.log(err);
        else 
          concole.log(data);
        });
      //Meteor.call('revtexts.addReviewer', id);
      /*Meteor.call('reviews.insert', id, function(err,data) {
        if (err)
          console.log(err);
        else 
          Session.set("reviewId", data);
      });*/

      var numWords = Session.get("numWords");


      var descriptiveReviews =  [];
      var notDescriptiveReviews =  [];
      var grammarReviews = [];

      descriptiveReviews[numWords-1] = 0;
      notDescriptiveReviews[numWords-1] = 0;
      grammarReviews[numWords-1] = 0;

      descriptiveReviews.fill(0);
      notDescriptiveReviews.fill(0);
      grammarReviews.fill(0);

      Session.set("descriptiveReviews", descriptiveReviews);
      Session.set("notDescriptiveReviews", notDescriptiveReviews);
      Session.set("grammarReviews", grammarReviews);

      //put review in document
      displayRevText();

    }
  }
    else{
      //If there is nothing to review at this moment
      Session.set("textToReview", "Hello! There is nothing to review at this time. " +
        "Wait a minute and then click the 'Get Text To Review' button.");

      var noSample = "noSample";
      Session.set("sampleId", noSample);
      Session.set ("numWords", 0);
    }

  }
}

function displayRevText (){
    var text = Session.get("textToReview");
    if(text !== undefined){
      var htmlText = "";
      for(i = 0; i < text.length; i++)
        htmlText = htmlText.concat(text[i]);
      $(".fullReviewText").html(htmlText);
    }
    else
      $(".fullReviewText").html("");

}


Template.hightext.onCreated(function hightextOnCreated() {
  const reviews = Meteor.subscribe('reviews');
  Meteor.call('revtexts.findReviewSample', callback);
  //add self as reviewer
  //create review in reviews table
  var id = Session.get("sampleId");
  console.log("id is:");
  console.log(id);
  /*if(id !== "noSample" && id !== undefined && Session.get("highlightNum") === 0){
    Meteor.call('revtexts.addReviewer', id);
    Meteor.call('reviews.insert', id, function(err,data) {
      if (err)
        console.log(err);
      else 
        Session.set("reviewId", data);
    });

    var numWords = Session.get("numWords");


    var descriptiveReviews =  [];
    var notDescriptiveReviews =  [];
    var grammarReviews = [];

    descriptiveReviews[numWords-1] = 0;
    notDescriptiveReviews[numWords-1] = 0;
    grammarReviews[numWords-1] = 0;

    descriptiveReviews.fill(0);
    notDescriptiveReviews.fill(0);
    grammarReviews.fill(0);

    Session.set("descriptiveReviews", descriptiveReviews);
    Session.set("notDescriptiveReviews", notDescriptiveReviews);
    Session.set("grammarReviews", grammarReviews);

    //put review in document
    displayRevText();
  }*/
});
 
Template.hightext.helpers({

  id: function() {
    return Session.get("sampleId");
  },

  instructions: function () {
    var instruct = "No Instructions";
    var highlightNum = Session.get("highlightNum");

    if(highlightNum === 0){
      instruct = "Highlight the parts of this passage that you think are "+
      "<span class=\"highlight-descriptive\">descriptive</span> " + 
      "by clicking those words or phrases. Look for phrases with details that "+
      "help you clearly imagine the scene the author is describing. " +
      "Click the submit button when you're done.";
    }
    else if (highlightNum === 1){
          instruct = "Highlight the parts of this passage that you think are "+
      "<span class=\"highlight-notdescriptive\">not descriptive enough</span> " + 
      "by clicking those words or phrases. Look for showing phrases or areas where "+
      "you wish there was more detail. Dont forget to click the submit button when "+
      "you're done!";
    }
    else if (highlightNum === 2){
          instruct = "Highlight any "+
      "<span class=\"highlight-grammar\">grammar or spelling mistakes</span> " + 
      " you see by clicking those words, phrases, or spaces where something should be."+
      " Dont forget to click the submit button when you're done!";
    }
    return instruct;
  },
  
  highlightReview: function (){
    return Session.get("textToReview");
    //return Session.get("textToReview");
  },

});

function deselect(event){
    event.preventDefault();

    var target = event.target;
    var wordId = parseInt(target.id, 10);

    target.className = "highlight";
    return wordId;
}

Template.hightext.events({
  //highlight selection
  'click .highlight'(event) {
    
    event.preventDefault();

    console.log("highlighting!");
    var target = event.target;
    var wordId = target.id


    var highlightNum = Session.get("highlightNum");

    //get idnum of curr target & alter appropriate highlight array

    if(highlightNum === 0){
      target.className = "highlight-descriptive";

      var dRevs = Session.get("descriptiveReviews");
      dRevs[wordId] = 1;
      Session.set("descriptiveReviews", dRevs);

    }
    else if (highlightNum === 1){
      target.className = "highlight-notdescriptive";

      var nRevs = Session.get("notDescriptiveReviews");
      nRevs[wordId] = 1;
      Session.set("notDescriptiveReviews", nRevs);

    }
    else if (highlightNum === 2){
      target.className = "highlight-grammar";

      var gRevs = Session.get("grammarReviews");
      gRevs[wordId] = 1;
      Session.set("grammarReviews", gRevs);

    }
  },

  //allow for deselection
  'click .highlight-descriptive'(event) {
    event.preventDefault();

     var id = deselect(event);

     var dRevs = Session.get("descriptiveReviews");
      dRevs[id] = 0;
      Session.set("descriptiveReviews", dRevs);
  },

  'click .highlight-notdescriptive'(event) {
    event.preventDefault();

     var id = deselect(event);

     var nRevs = Session.get("notDescriptiveReviews");
      nRevs[id] = 0;
      Session.set("notDescriptiveReviews", nRevs);

  },

  'click .highlight-grammar'(event) {
    event.preventDefault();

     var id = deselect(event);

     var gRevs = Session.get("grammarReviews");
      gRevs[id] = 0;
      Session.set("grammarReviews", gRevs);
  },

  //Submit button
  'click .formlessSubmit'(event) {
    var highlightNum = Session.get("highlightNum");
    var revId = Session.get("reviewId");

    if(sampleId !== "noSample"){
      if(highlightNum === 0){
        //submit descriptive
        var dRevs = Session.get("descriptiveReviews");
        Meteor.call('reviews.addDescriptive', revId, dRevs);
        //change highlightNum to 1
        var params = {highlightNum: "1"};
        //go to Highlight page 1
        FlowRouter.go('highlight');
      }
      else if (highlightNum === 1){
        var nRevs = Session.get("notDescriptiveReviews");
        Meteor.call('reviews.addNotDescriptive', revId, nRevs);
        //change highlightNum to 1
        var params = {highlightNum: "2"};
        //go to Highlight page 1
        FlowRouter.go('highlight');
      }
      else if(highlightNum === 2){
        var gRevs = Session.get("grammarReviews");
        Meteor.call('reviews.addGrammar', revId, gRevs);
        //change highlightNum to 1
        var params = {highlightNum: "1"};
        //go to Highlight page 1
        FlowRouter.go('story');
      }
      
    }

  }
  //Add submit button
  //FlowRouter.go('Lists.show', { _id: listId });

});