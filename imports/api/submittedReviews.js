import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
 
export const reviews = new Mongo.Collection('reviews');

//schema for reviewedTextss. Make sure each entry has text array, a writer, 
// a list of reviewers and a date.
reviews.schema = new SimpleSchema ({ 
	sampleId: {type: String},
  reviewer: {type: String},
  descriptive: {type: [Number]},
	notDescriptive: {type: [Number]},
	grammar: {type: [Number]},
	date: {type: Date},
});


if (Meteor.isServer) {
  // This code only runs on the server
  const reviews = new Mongo.Collection('reviews');

  Meteor.publish('reviews', function tasksPublication() {
    return reviews.find({});
  });


  Meteor.methods({
    'reviews.insert'(sampleId) {
      check(text, [String]);
      check(divs, [String]);
   
      // Make sure the user is logged in before inserting a task
      if (! this.userId) {
        throw new Meteor.Error('not-authorized');
      }
        var _id = sampleId + Meteor.users.findOne(this.userId).username;
   
        reviewTexts.insert({
        _id: _id,
        sampleId: sampleId,
        reviewer: Meteor.users.findOne(this.userId).username,
        descriptive: [],
        notDescriptive: [],
        grammar: [],
        date: new Date(),
      });

      return _id;
    },

    'reviews.sayHi'(){
      return "hello";
    },

    'reviews.remove'(revId) {
      //check(textId, String);
   
      reviews.remove(revId);
    },

    /*******To Finish this task *****
     - Create add methods for descriptive, nondescriptive, and grammar
     - Figure out html for cycling through d, n, and g highlights
     - (Extension: figure out how to provide all highlights at same time)

    */

    //add descriptive review 
    'reviews.addDescriptive'(revId,  descriptArray) {
      if (! this.userId) {
        throw new Meteor.Error('not-authorized');
      }

    	check(revId, String);
      check(descriptArray, [Number]);

    	reviews.update(revId, {
        $set: { descriptive: descriptArray },
      });
    },

  //add not descriptive review 
    'reviews.addNotDescriptive'(revId,  notDescriptArray) {
      if (! this.userId) {
        throw new Meteor.Error('not-authorized');
      }

      check(revId, String);
      check(notDescriptArray, [Number]);

      reviews.update(revId, {
        $set: { notDescriptive: notDescriptArray },
      });
    },
  //add not descriptive review 
    'reviews.addGrammar'(revId,  grammarArray) {
      if (! this.userId) {
        throw new Meteor.Error('not-authorized');
      }

      check(revId, String);
      check(grammarArray, [Number]);

      reviews.update(revId, {
        $set: { grammar: grammarArray },
      });
    },

    'reviews.getReviews'(sampleId){
    	if (! this.userId) {
        throw new Meteor.Error('not-authorized');
      }
      var allReviews = { sampleId: { $eq: sampleId } };
      //Session.set(differentUser, sample);
    	return reviews.find(allReviews);
    },

    'reviews.returnReview'(){
      if (! this.userId) {
        throw new Meteor.Error('not-authorized');
      }
      //var username = Meteor.users.findOne(this.userId).username;
      return "hello!";
    },

   });
}