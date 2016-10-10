// Parameters for read interface
// var readConfig= {
//       stories: returnedStories
// };Z

// var App = React.createClass({
// 	getInitialState: function() {
// 	    return {
// 	      stories: readConfig.stories
// 	    }
// 	},
// 	componentDidMount: function() {
// 		// applying styles
// 		fullHeight('columns');
// 	},
//     render: function() {
//         var storyComponents = this.state.stories.map(function(stories) {
//             return <div>{stories}</div>;
//         });
//         return <div id="columns">{storyComponents}</div>;
//     }
// });

// var StoryItem = React.createClass({
// 	render: function() {
// 		return (
// 		    <div className="storyItem">
// 		        {this.props.}
// 		    </div>
// 		)
// 	}
// });


// ReactDOM.render(<Test />, document.getElementById('body'));


var stories = [
	["What does pittance even mean", 
	"Hallucinations are more frequent ", 
	"I love almonds",
	 "I love almonds",
	 "four sllyblea?",
	 "I wish I had a cellmate",
	 "That wasn't a deviant",
	 "such wishful thinking"
	],
	["I would love to sublet my apartment",
	 "ONLY",
	 "my apartment, but it happens to be too vertiva",
	 "That is fine, I can find a tall person",
	 "to rent my apartment",
	 "In the event that they are insensitive, I would wid",
	 "DAMNATION UPON THEM",
	 "RAAAAARR RARR ARR"]
]; 

// var stories = returnedStories;

var App = React.createClass({
	getInitialState: function() {
		return {
			stories: []
		}
	},
	componentDidMount: function() {
	},
	componentWillMount: function() {
		// this.setState({
		// 	stories: retrieveStories();
		// });
	},
    render: function() {
        var storyComponents = stories.map(function(story,index) {
        	var sentences = stories[index].map(function(sentence,i) {
        		return <p>{sentence}</p>;
        	})
            return <StoryItem key={index} storyNo={index+"."} story={sentences}/>;
        })
        return <div id="columns">{storyComponents}</div>;
    }
});


var StoryItem = React.createClass({
	handleClick: function(){
		console.log("potato has been clicked");
		console.log(this.props.key);
	},
	render: function(){
		return <ul className="storyItem" onClick={this.handleClick}>{this.props.storyNo}{this.props.story}</ul>
	}
});



ReactDOM.render(<App />, document.getElementById('body'));




// Not sure if this will work for your situation, but often map is a good answer.

// If this was your code with the for loop:

// <tbody>
//     for (var i=0; i < objects.length; i++) {
//         <ObjectRow obj={objects[i]} key={i}>
//     } 
// </tbody>
// You could write it like this with map:

// <tbody>
//     {objects.map(function(object, i){
//         return <ObjectRow obj={object} key={i} />;
//     })}
// </tbody>

// var doubledArray = array.map(function (nested) {
//     return nested.map(function (element) {
//         return element * 2;
//     });
// });

// var Hello = React.createClass({
//     render: function() {
//         var names = ['Jake', 'Jon', 'Thruster'];
//         var namesList = names.map(function(name){
//                         return <li>{name}</li>;
//                       })

//         return  <ul>{ namesList }</ul>
//     }
// });