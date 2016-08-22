import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

import { revTexts } from '../api/reviewedTexts.js';
 
export const userTexts = new Mongo.Collection('userTexts');

//schema for userTexts. Make sure each entry has text, an associated user and date.
userTexts.schema = new SimpleSchema ({
	text: {type: String},
	username: {type: String, regEx: SimpleSchema.RegEx.Id},
	date: {type: Date}
});

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('utexts', function tasksPublication() {
    return userTexts.find();
  });
}

Meteor.methods({

  'utexts.insert'(text) {
    //check(text, String);
 
    // Make sure the user is logged in before inserting a task
    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }
 
    userTexts.insert({
      text: text,
      username: Meteor.users.findOne(this.userId).username,
      date: new Date(),
    });
  },

  'utexts.remove'(textId) {
    //check(taskId, String);
 	if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    //userTexts.remove(textId);
    Meteor.call('revtexts.remove', textId);
  },

  'utexts.deleteAll'(){
  	if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }

  	userTexts.remove({});
  },

  'utexts.findReviewSample'(){
  	if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    var differentUser = { username: { $ne: Meteor.users.findOne(this.userId).username } };
    //Session.set(differentUser, sample);
  	return userTexts.findOne(differentUser);
  },


 });
