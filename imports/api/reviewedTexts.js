import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { Session } from 'meteor/session';
 
export const reviewTexts = new Mongo.Collection('reviewTexts');

//schema for reviewedTextss. Make sure each entry has text array, a writer, 
// a list of reviewers and a date.
reviewTexts.schema = new SimpleSchema ({ 
	revtext: {type: [String]},
  divtext: {type: [String]},
	writer: {type: String, regEx: SimpleSchema.RegEx.Id},
	reviewers: {type: [String], regEx: SimpleSchema.RegEx.Id},
  numReviewers: {type: Number},
	date: {type: Date},
});

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('revtexts', function tasksPublication() {
    return reviewTexts.find({ 
    	 writer: {$ne: Meteor.users.findOne(this.userId).username } 
    });
  });


  Meteor.methods({
    'revtexts.insert'(text, divs) {
      check(text, [String]);
      check(divs, [String]);
   
      // Make sure the user is logged in before inserting a task
      if (! this.userId) {
        throw new Meteor.Error('not-authorized');
      }
   
      reviewTexts.insert({
        revtext: text,
        divtext: divs,
        writer: Meteor.users.findOne(this.userId).username,
        reviewers: [],
        numReviewers: 0,
        date: new Date(),
      });
    },
    'revtexts.remove'(textId) {
      //check(textId, String);
   
      reviewTexts.remove(textId);
    },

    //add Reviewer to reviewer list
    'revtexts.addReviewer'(textId) {
    	check(textId, String);

    	reviewTexts.update(textId, {
        $addToSet: { reviewers: Meteor.users.findOne(this.userId).username },
        $inc: { numReviewers: 1 }
      });
    },

    'revtexts.deleteAll'(){
    	if (! this.userId) {
        throw new Meteor.Error('not-authorized');
      }
    	reviewTexts.remove({});
    },

    'revtexts.findReviewSample'(){
    	if (! this.userId) {
        throw new Meteor.Error('not-authorized');
      }
      var username = Meteor.users.findOne(this.userId).username;

      var differentWriter = { $ne: username };
      var needsReviewers = {$lt: 2};
      var notReviewedByUser = {$not: { $all: [username] } };

      //Looking for a text written by a different user, with less than the max number of reviews,
      //that this user has not already reviewed.
      var diff_Less_Unseen = { 
        numReviewers: needsReviewers,
        writer: differentWriter,
        //reviewers: notReviewedByUser
      };

    	return reviewTexts.findOne(diff_Less_Unseen);

    },
  });
}