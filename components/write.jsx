// var MainInterface = React.createClass({
// 	getInitialState: function(){
// 		return {
// 			title: 'Started',
// 			started: true
// 		}
// 	},

// 	render: function(){
// 		var started;
// 		if (this.state.started){
// 			started = "yes";
// 		}

// 		return (
// 			<div>
// 				<h2>{ started } { this.state.title }</h2>
// 				<ul>
// 					<li> Apple 222</li>
// 					<li> potato 42</li>
// 					<li> tomato 2</li>
// 				</ul>
// 			</div>
// 		)
// 	}
// });

// list of prompts
// var prompts = [
//   {prompt: "write the letter yay"},
//   {prompt: "write the cat yay"},
//   {prompt: "segsg"},
//   {prompt: "wty"}
// ];



// WRITEYO --------------------------------------------------------------
// Countdown timer
// var Timer = React.createClass({
//   getInitialState: function() {
//     return {
//     	promptNo: 1,
//     	currentPrompt: prompts[0].prompt,
//     	timeRemaining: 15
//     };
//   },
//   tick: function() {
//   	// countdown
//     this.setState({
//     	timeRemaining: this.state.timeRemaining - 1
//     });
//     // if out of time 
//   	if (this.state.timeRemaining == 0){
//   		  this.resetCount();
//         this.advancePromptNo();
//   	}
//   },
//   resetCount: function() {
//     this.setState({
//       timeRemaining: 15
//     });
//   },
//   advancePromptNo: function() {
//     this.setState({
//       promptNo: this.state.promptNo + 1
//     });
//     this.advancePrompt();
//   },
//   advancePrompt: function(){
//     this.setState({
//       currentPrompt: prompts[this.state.promptNo].prompt
//     });
//   },
//   componentDidMount: function() {
//   	// countdown every second
//     this.interval = setInterval(this.tick, 1000);
//   },
//   componentWillUnmount: function() {
//     clearInterval(this.interval);
//   },
//   render: function() {
//     return (
//     <div>
//       <div>Time Remaining: {this.state.timeRemaining}</div>
//       <div>Prompt number: {this.state.promptNo}</div>
//       <div>Prompt: {this.state.currentPrompt}</div>
//     </div>
//     );
//   }
// });



// Prompt



// Prompt number





// INPUT ---------------------------------------------------------------
// Inputs



// Full page -------------------------------------------------------------
var App = React.createClass({
  getInitialState: function() {
    return {
      promptNo: 1,
      timeRemaining: 8,
      items: [], 
      text: ''
    }
  },
  tick: function() {
    // countdown
    this.setState({
      timeRemaining: this.state.timeRemaining - 1
    });
    // if out of time 
    if (this.state.timeRemaining == 0){
        this.resetCount();
        this.advancePromptNo();
        this.submitBlank();
    }
  },

  onChange: function(e) {
    this.setState({text: e.target.value});
  },
  submitBlank: function() {
    var nextItems = this.state.items.concat([{text: this.state.text, id: Date.now()}]);
    var nextText = '';
    this.setState({items: nextItems, text: nextText});
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var nextItems = this.state.items.concat([{text: this.state.text, id: Date.now()}]);
    var nextText = '';
    this.setState({items: nextItems, text: nextText});
    if (this.state.timeRemaining != 0){
      this.resetCount();
      this.advancePromptNo();
    }
  },

  resetCount: function() {
    this.setState({
      timeRemaining: 8
    });
  },
  advancePromptNo: function() {
    this.setState({
      promptNo: this.state.promptNo + 1
    });
  },
  componentDidMount: function() {
    // countdown every second
    this.interval = setInterval(this.tick, 1000);

    // applying styles
    fullHeight('writeyO');
    fullHeight('writeInput');
  },
  componentWillUnmount: function() {
    clearInterval(this.interval);
  },
  render: function() {
    return (
        <div>
          <div className= "six columns" id="writeyO">
            <Timer timeRemaining={this.state.timeRemaining}/>
            <Prompt promptNo = {this.state.promptNo}/>
          </div>

          <div className= "six columns" id="writeInput">
            <div>
              <h3>Write</h3>
              <Entry items={this.state.items} />
              <form onSubmit={this.handleSubmit}>
                <input id="writeyoInput" onChange={this.onChange} value={this.state.text} />
                <button>{'Add #' + (this.state.items.length + 1)}</button>
              </form>
            </div>
          </div>
        </div>
    )
  }
});


var Timer = React.createClass({
  render: function(){
    return (
      <div>
        <div>Time Remaining: {this.props.timeRemaining}</div>
      </div>
    )
  }
});


var Prompt = React.createClass({
  getInitialState: function(){
    return {
      prompts : [
        "Write a sentence without the letter 'R'",
        "Use the word 'potato' in your sentence",
        "Write a sentence exactly 6 syllables long",
        "Write a sentence which contains both an adjective and a verb"
      ]
    }
  },
  render: function(){
    return (
      <div>
        <div>{this.props.promptNo}</div>
        <div>{this.state.prompts[this.props.promptNo-1]}</div>
      </div>
    )
  }
});


// Adapted from React documentation example
var Entry = React.createClass({
  render: function() {
    var createItem = function(item) {
      return <li key={item.id}>{item.text}</li>;
    };9
    return <ul>{this.props.items.map(createItem)}</ul>;
  }
});

ReactDOM.render(<App />, document.getElementById('body'));
