import '../ui/submission.html';
import '../ui/reviewText.html';
import '../ui/highlightText.html';
import '../ui/storytext.html';
import '../ui/mainLayout.html';
import '../ui/submissionStory.html';
import '../ui/body.html';


FlowRouter.route('/', {
    name: 'home',
    action: function(params) {
        console.log("Am I on the home page?");
        BlazeLayout.render("mainLayout", {content: "welcome"});
    }
});

FlowRouter.route('/story', {
    name: 'story',
    action: function(params) {
        console.log("Am I on the story page?");
        BlazeLayout.render("mainLayout", {content: "story"});
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
        console.log("Am I on the submit page?");
        BlazeLayout.render("mainLayout", {content: "hightext"});
    }
});