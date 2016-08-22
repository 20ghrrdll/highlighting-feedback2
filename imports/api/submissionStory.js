import { Template } from 'meteor/templating';

import '../ui/submissionStory.html';

Template.submissionStory.onCreated(function subStoryOnCreated(){
});


Template.submissionStory.helpers({
	 instructions: function(){
    var promptNum = Session.get("promptNum");
    return getPrompt(promptNum);
   }
});

Template.submissionStory.events({
  'click .next'(event){

  	if($("#sample").val() === '')
  		alert("Oops! Make sure to write a description!");
  	else{
	  	$("#sample").val('');

	    var promptNum = Session.get("promptNum");
	    Session.set("promptNum", promptNum+1);

	    if(promptNum < 2)FlowRouter.go('submit')
	    else if(promptNum === 2) FlowRouter.go('story');
	}

  },

});

function getPrompt(promptIndex){
  check(promptIndex, Number);
  var name = Session.get("name");
  //[0,1: Submission (control), 2: Submission for review]
  var prompts = [

    `“Alright, lets talk about turning telling descriptions into showing descriptions,” Theodosia proceeds. Rebecca, read the sentence we discussed earlier.”

    Becks sighs. 


      <strong>“The boy pulled a large fish out of the river,”</strong> she reads.


    “This is a telling sentence,” Theodosia wobbles her great head. “Now, Rebecca, how did you rewrite that into a showing description?”

    Becks nods, “The boy stood in the river and watched carefully. Suddenly, he saw a silver flash in the water. He ground his feet into the smooth rocks. He waited and waited. Finally, he threw his hands into the water, fastened them around the fish and yanked with all his strength.”

     “Very good. Your turn, ` + name + `. Try rewriting Rebecca’s telling sentence as a showing description. To help you write this,” the owl continues. “ Think about the objects you could describe: the boy, the fish and the river. Also think about the actions you could describe: the boy pulling the fish out of the river.
     <strong><p>“The boy pulled a large fish out of the river.”</p></strong>

     `,

     `“Good work.” The owl nodded. “Lets try another sentence.” Theodosia turns to address the rest of the class. “Can anyone give me a showing description for the sentence, 
      “ Joey missed his father”?
    The rabbits all hunch over their clipboards, writing with great enthusiasm. Suddenly, a rabbit with scruffy grey fur raises her hand. 

      “Joey, hadn’t seen his father for a long, long time – not since he was in kindergarten. He couldn’t remember his father’s face very well. 
      But at night, he could still hear him say, “Good night, Joey. I love you.” 

      “That was lovely.” Theodosia sighed. “How about you,` +name+ `? I’d like you and Rebecca to try writing a showing description for this sentence:

      <strong>Joey was hot and tired.</strong>“


    `,

    `“Well done,” said the owl.  “Rebecca, what did you write?”

      “Joey used his sleeve to wipe the sweat from his face. He gathered his strength, ready for the slow, steep walk up the stairs,” Becks read. 

    “I do believe you’re developing a knack for this, Rebecca!” The owl sounded pleasantly surprised. “That was the best you’ve done all day.`+
     `You created a reason why Joey was hot and tired and explained it very well. Good technique. These telling descriptions do not have much detail at all. 
     A good trick is to invent a story that explains them, so that we can write with more detail.”  The owl turned to the rest of the class and cleared her throat. 
     “Alright everyone! We’re going to write a showing description for a sentence I’ll give you and then share them with each other. Here is the sentence:

      <strong>“Joey was embarrassed when he fell.”</strong>
    `,
  ]

  return prompts[promptIndex];
}