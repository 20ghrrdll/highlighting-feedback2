import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';
import { ReactiveDict } from 'meteor/reactive-dict';


import "../ui/welcome.html";
import '../api/highlightText.js';
import '../api/revText.js';

import '../api/story.js';

Template.welcome.onCreated(function welcomeOnCreated(){
	Session.set ("name", "noNameYet");
	Session.set ("highlightNum", 0);
	Session.set ("storyNum", 0);
  Session.set ("promptNum", 0);
	/***** This is where max reviewers is created ******/
  	Session.set("maxReviewers", 6);
  	//Hard coded into reviewedTexts.js line 75. 


  	this.state = new ReactiveDict();
  	const reviewTexts = Meteor.subscribe('revtexts');
  	const writtenTexts = Meteor.subscribe('utexts');
    const reviews = Meteor.subscribe('reviews');
  	console.log("creating welcome!");



});