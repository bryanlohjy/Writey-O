var App = React.createClass({
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


ReactDOM.render(<App />, document.getElementById('body'));