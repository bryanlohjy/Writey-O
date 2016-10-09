// Current Data Structure============
// writey-o
  //  prompts
    //  -KTZ2WyCHNCga5A_qhfZ
      //  items
        //  0
          // id
          // text
// Proposed Data Structure============
// writey-o
  // User
    //-KTZ2WyCHNCga5A_qhfZ
      //  entry 1
        // prompt
          // search index
          // parameters
        // response
      //  entry 2
        // prompt
          // search index
          // parameters
        // response
      //  etx



// Parameters for write application
var writeConfig= {
      time: initWrite.time,
      noPrompts: initWrite.noPrompts,
      prompts: returnedPrompts

};

// Full page -------------------------------------------------------------
var App = React.createClass({
  mixins: [ReactFireMixin],

  getInitialState: function() {
    return {
      promptNo: 1,
      timeRemaining: writeConfig.time,
      items: [], 
      response: '',
      done: false,
      started: false,
      prompt: writeConfig.prompts[0]
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
    this.setState({response: e.target.value});
  },
  submitBlank: function() {
    var nextItems = this.state.items.concat([{response: this.state.response, timestamp: Date.now(), prompt: this.state.prompt.prompt, promptType: this.state.prompt.promptType, promptParam: this.state.prompt.param}]);
    var nextText = '';
    this.setState({items: nextItems, response: nextText});
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var nextItems = this.state.items.concat([{response: this.state.response, timestamp: Date.now(), prompt: this.state.prompt.prompt, promptType: this.state.prompt.promptType, promptParam: this.state.prompt.param}]);
    var nextText = '';
    this.setState({items: nextItems, response: nextText});
    if (this.state.timeRemaining != 0){
      this.resetCount();
      this.advancePromptNo();
    }
  },
  resetCount: function() {
    this.setState({
      timeRemaining: writeConfig.time
    });
  },
  advancePromptNo: function() {
    this.setState({
      promptNo: this.state.promptNo + 1,
    });
    this.advancePrompt();
    // if prompt number reaches final amount
    if (this.state.promptNo == writeConfig.noPrompts){
      this.stopTimer();
      this.setState({
        done:true
      });
    }
  },
  advancePrompt: function() {
    this.setState({
      prompt: writeConfig.prompts[this.state.promptNo]
    });
  },
  componentWillMount: function() {
    this.firebaseRef = firebase.database().ref("write");
  },
  componentDidMount: function() {
    // applying styles
    fullHeight('writeyO');
    fullHeight('writeInput');
  },
  startTimer: function(e){
    e.preventDefault();
    // countdown every second
    this.setState({
      started: true
    });
    this.interval = setInterval(this.tick, 1000);
  },
  stopTimer: function(){
    clearInterval(this.interval);
  },
  saveOutput: function(){
    // preventDefault();
    this.firebaseRef.push({
      items: this.state.items
    });
    // this.setState({text: ""});
  },
  componentWillUnmount: function() {
    clearInterval(this.interval);
    this.firebaseRef.off();
  },
  conditionalRender: function() {
    // if the user has not started
    if (this.state.started == false){
       return (
            <div>
              <div className= "six columns" id="writeyO">
                <Timer timeRemaining='xx'/>
                <div>Have not Started</div>
              </div>

              <div className= "six columns" id="writeInput">
                <div>
                  <h3>Click to start</h3>
                  <form onSubmit={this.startTimer}>
                    <button>Write</button>
                  </form>
                </div>
              </div>
            </div>
        )
    } else if (this.state.started == true) {
      if (this.state.done == false) {
       return (
            <div>
              <div className= "six columns" id="writeyO">
                <Timer timeRemaining={this.state.timeRemaining}/>
                <Prompt promptNo = {this.state.promptNo} prompt={this.state.prompt}/>
              </div>

              <div className= "six columns" id="writeInput">
                <div>
                  <h3>Write</h3>
                  <Entry items={this.state.items} />
                  <form onSubmit={this.handleSubmit}>
                    <input id="writeyoInput" onChange={this.onChange} value={this.state.response} autoComplete="off"/>
                    <button>Write</button>
                  </form>
                </div>
              </div>
            </div>
        )
      } else {
        return(
            <div>
              <div className= "six columns" id="writeyO">
                <div>Done</div>
              </div>

              <div className= "six columns" id="writeInput">
                <div>
                  <h3>Write</h3>
                  <Entry items={this.state.items} />
                  <form onSubmit={this.saveOutput}>
                    <input id="writeyoInput" onChange={this.onChange} value={this.state.response} autoComplete="off"/>
                    <button>Save</button>
                  </form>
                </div>
              </div>
            </div>
        )
      }     
    }

  },
  render: function() {
    return (
       <div className="component">
          {this.conditionalRender()}
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
      prompts: writeConfig.prompts
    }
  },
  render: function(){
    return (
      <div>
        <div>{this.props.promptNo}</div>
        <div>{this.props.prompt.prompt}</div>
      </div>
    )
  }
});


// Adapted from React documentation example
var Entry = React.createClass({
  render: function() {
    var createItem = function(item) {
      return <li key={item.timestamp}>{item.response}</li>;
    };
    return <ul>{this.props.items.map(createItem)}</ul>;
  }
});

ReactDOM.render(<App />, document.getElementById('body'));



