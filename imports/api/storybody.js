import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';

import '../ui/storytext.html';



function getStoryFrame (framNum) {
	check(framNum, Number);
	var name = Session.get("name");

	//[0: intro, 1: what is name, 2: example, 3-5: telling vs showing,
	// 6,7: Submission (control), 8: Submission for review, 9: peer review intro,
	// 10: return of peer review and explaination of peer highlights, 
	// 11: Second sub to review, 12: second peer review intro, 
	// 13: Second return of peer review, 14: conclusion]
	var storyFrames = [

		`	It’s a beautiful sunny day at Stanford University, just like every other day. You’re walking through the engineering quad. Bikes whiz and click as they fly past you. Students sit in the shade of great trees with rustling, green leaves. Suddenly you hear a cry of frustration from beneath one of the trees.
		“I just don’t get it!” 
		A rabbit seated beneath one of the great trees slams her clipboard to the ground. “This is dumb!”, she groans, beating the ground with her large flat feet. 
		The other rabbits seated around the tree work furiously on their clipboards, paying no mind to their frustrated classmate.\n 
		Beside the frustrated rabbit is an owl that picks up the clipboard and dusts it off with a sigh. She clacks her beak with exasperation and looks off into the distance. Her eyes meet yours and lock onto them.\n
		“Hello stranger!” The owl waves at you. “Might we ask you for a moment of your time?”\n`,

		`	Uncertain, you approach the owl and the rabbit, whose paws are now crossed tightly and stubbornly over her chest.\n “Greetings!” The owl announces. “We are learning how to write descriptively and could really use a second opinion.” The rabbit rolls her eyes and studies her claws. \n
		“My descriptions are fine.” The frustrated rabbit huffs. “My fur is brown, the grass is green, my butt is numb from sitting all day and my descriptions are fine.” \n
		The owl puffs up her chest. “There is a difference between showing and telling, Rebecca.”\n
		“Becks,” The rabbit corrects her with exasperation.
		Choosing not to respond, the owl turns to you again. “Goodness me, where are our manners. My name is Theodosia Tailfeather of the Willowbee Tailfeathers. I am teaching this lovely class of rabbits and I'd like you to work with one in particular. This is Rebecca Cottontail.” \n
		“Becks,” the rabbit insists with growing irritation.\n
		“Pray tell, stranger. What is your name?” the owl asked.`
,

		`“Charmed to meet you, ` +
		 name + 
		`. As I was saying, there is a difference between showing and telling. Rebecca, what was that sentence you used earlier?” The owl hands the clipboard back to the rabbit

		“The boy stands in the grass and watches the sunset,” the rabbit reads.

		“That is good, Rebecca, but you told us exactly what the boy did. Consider this: ‘The grass rustled under his feet and a smile softened his eyes. A warm breeze caressed his cheek and the boy watched as the sky paled yellow, then crimson, and within a breath, electric violet.’ 
		Rather than saying that the boy stands in the grass, I’m showing how the grass felt under his feet. Rather than saying that he watches the sunset...”

		Becks scrunches up her nose, “You’re showing what he saw... as he watched the sunset?”
		“Exactly.” The owl wiggled her tail feathers in approval. 
		`,

		`Let’s look at some other descriptions together. For each passage,  I want you both to tell me if it is a telling description or a showing description.  A good way to tell a showing description and a telling description apart is to try to imagine what the sentence is saying. Showing descriptions should engage your senses. They will tell you what you could see, touch, smell or hear if you were there in the story.

		Try this one: “The woman had a terrible headache.”

		“Telling,” Becks said firmly.
		“What do you think, ` + name + 
		"?”",

		`“One by one, butterflies shook the dew from their wings and opened them to dry in the heat of the rising sun. A field mouse stuck his head out of his burrow and cautiously surveyed the rich, green grass before emerging to search for seeds.  Flowers slowly turn to follow the sun’s determined climb, soaking up as many rays as possible.”

		“What do you think, ` + name + 

		"? Showing or telling?”",

		`Remember that the easiest way to distinguish showing and telling passages is to ask yourself how detailed the description is. The more detailed the description, the more it shows and helps you imagine the scene using your senses. When you imagine what is going on in the scene, are the objects and actions thoroughly described or do you have to fill in some blanks?
		“Let’s try one more:
		‘The girl stood on the corner of the busy intersection and witnessed the accident as it happened.’ ”
		
		“What do you think, ` + name + 

		"? Showing or telling?”",

		`“Alright, lets talk about turning telling descriptions into showing descriptions. Rebecca, read the sentence we discussed earlier.”

		Becks sighs. 


			“The boy pulled a large fish out of the river,” she reads.


		“This is a telling sentence,” Theodosia wobbles her great head. “Now, Rebecca, how did you rewrite that into a showing description?”

		Becks nods, “The boy stood in the river and watched carefully. Suddenly, he saw a silver flash in the water. He ground his feet into the smooth rocks. He waited and waited. Finally, he threw his hands into the water, fastened them around the fish and yanked with all his strength.”

		 “Very good. Your turn, ` + name + `. Try rewriting Rebecca’s sentence as a showing sentence. To help you write this,” the owl continues. “ Think about the objects you could describe: the boy, the fish and the river. Also think about the actions you could describe: the boy pulling the fish out of the river.




		 `,

		 `“Good work.” The owl nodded. “Lets try another sentence. Class, can anyone give me a showing description for the sentence, 
			“ Joey missed his father”?
		The rabbits all hunch over their clipboards with great enthusiasm. Suddenly, a rabbit with scruffy grey fur raises her hand. 

			“Joey, hadn’t seen his father for a long, long time – not since he was in kindergarten. He couldn’t remember his father’s face very well. But at night, he could still hear him say, “Good night, Joey. I love you.” 

			“That was lovely.” Theodosia sighed. “How about you,` +name+ `? I’d like you and Rebecca to try writing a showing description for this sentence:

			Joey was hot and tired.“


		`,

		`“Well done,” said the owl.  “Rebecca, what did you write?”

			“Joey used his sleeve to wipe the sweat from his face. He gathered his strength, ready for the slow, steep walk up the stairs,” Becks read. 

		“I do believe you’re developing a knack for this, Rebecca!” The owl sounded pleasantly surprised. “That was the best you’ve done all day. You created a reason why Joey was hot and tired and explained it very well. Good technique. These telling descriptions don't have much detail at all. A good trick is to invent a story that explains them, so that we can write with more detail.”  The owl turned to the rest of the class and cleared her throat. “Alright everyone! We’re going to write a showing description for a sentence I’ll give you and then share them with each other. Here is the sentence:

			“Joey was embarrassed when he fell.”
		`,

		`Once everyone was finished, Theodosia gathered up the papers. “I’m going to give each of you some descriptions to read. Once you’re done reading, I’ll tally up the results, and then let you see what your peers thought of your description.”
		`,

		`Theodosia returns your description to you. “This is what some of your classmates thought of your description. Green highlighting means that bit was well described. Pink highlighting means they wish you had included more detail there. Yellow highlighting represents a spelling or grammar mistake.”
		`,

		`“Well done, everyone. You guys have put in so much hard work, let’s do one final peer review and be done for the day. I’d like all of you to write a showing description for the telling passage: 
			
			My mornings are crazy. I am rushing all the time.
		`,

		`Once everyone was finished, Theodosia gathered up the papers. “Like before, I’m going to give each of you some descriptions to read. Once you’re done reading, I’ll tally up the results, and then let you see what your peers thought of your description.”
		`,

		`Theodosia returns your description to you. “This is what some of your classmates thought of your description. Green highlighting means that what is highlighted was a good description. Pink highlighting means they wish you had included more detail there. Yellow highlighting represents a spelling or grammar mistake.”
		`,

		'Lovely.” Theodosia coos. “ I can see that you and Rebecca have both improved so much! Thank you for your help,' + name + `. I think we’ll end this lesson here for today.”
		The other rabbits begin to put away their things, chatting amongst themselves. Becks stands up and stretches, letting out a great yawn. “Great, I’m beat. It’s been real.” She turns to Theodosia and snaps into a sharp salute. 
		the owl nods in reply, trying to hide her amusement. Becks begins to saunter away, then turns back and looks straight at you. 
		“Hey! You comin’ or what?” 
		Seeing as you have nothing else to do today, you follow the rabbit through the engineering quad and on to a new adventure.`


	]

	return storyFrames[framNum];
}