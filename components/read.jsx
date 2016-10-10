var App = React.createClass({
<<<<<<< HEAD
	getInitialState: function() {
		return {
			stories: []
		}
	},
=======
>>>>>>> parent of 1c1c8ed... Stories append with ids
	componentDidMount: function() {
		// applying styles
		fullHeight('columns');
	},
	render: function(){
		return (
			<div id="columns">
				<StoryItem />
				<StoryItem />
				<StoryItem />
				<StoryItem />
				<StoryItem />
				<StoryItem />
				<StoryItem />
				<StoryItem />
				<StoryItem />
			</div>
		)
	},
<<<<<<< HEAD
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
=======
>>>>>>> parent of 1c1c8ed... Stories append with ids
});

var StoryItem = React.createClass({
	render: function() {
		return (
		    <div className="storyItem">
		        <p>Put a bird on it viral wolf, 3 wolf moon ... </p>
		    </div>
		)
	}
});


<<<<<<< HEAD

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
=======
ReactDOM.render(<App />, document.getElementById('body'));
>>>>>>> parent of 1c1c8ed... Stories append with ids
