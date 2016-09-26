var MainInterface = React.createClass({
	getInitialState: function(){
		return {
			title: 'Started',
			started: true
		}
	},

	render: function(){
		var started;
		if (this.state.started){
			started = "yes";
		}

		return (
			<div>
				<h2>{ started } { this.state.title }</h2>
				<ul>
					<li> Apple 222</li>
					<li> potato 42</li>
					<li> tomato 2</li>
				</ul>
			</div>
		)
	}
});



ReactDOM.render(<MainInterface />,
	document.getElementById('react-container'));