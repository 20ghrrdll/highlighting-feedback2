import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { Session } from 'meteor/session';

//import { revTexts } from '../api/reviewedTexts.js';
 
import '../ui/reviewText.html';

Template.utext.onCreated(function utextOnCreated() {
  this.state = new ReactiveDict();
  this.subscribe('revtexts');

});
 
Template.utext.helpers({

	reviewText: function() {
  return Session.get("reviewText");
  },

  writer: function () {
    return Session.get("writer");
  },

  reviewers: function () {
    return Session.get("reviewers");
  },

  id: function () {
    return Session.get("sampleId");
  },
  
});

function stringifyArray(a) {
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



Template.utext.events({
  'click .review'(event) {
    
    event.preventDefault();

    var id = $("#idNum").val();
    console.log(id);

    Meteor.call('revtexts.addReviewer', id);
  },

  'click .delete'(event) {

  	 event.preventDefault();

    const id = $("#idNum").value;
    console.log(id);

  	 Meteor.call('utexts.remove', id);
  },

  //Will return a sample to review that was not written by the given user.
  'click .getReview'(event) {

    event.preventDefault();
    
    console.log("clicked!");
    Meteor.call('revtexts.findReviewSample', function (err, data){
      if (err)
        console.log(err);
      else {
        console.log(data);

        var sample = stringifyArray(data.revtext);
        Session.set("reviewText", sample);

        Session.set("writer", data.writer);

        var reviewers = stringifyArray(data.reviewers);
        Session.set("reviewers", reviewers);

        console.log("The id for this sample is " + data._id);
        Session.set("sampleId", data._id);
      }
    });
  },

});