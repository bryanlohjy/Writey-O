// Parameters for write application
var writeConfig= {
      time: initWrite.time,
      noPrompts: initWrite.noPrompts,
      prompts: returnedPrompts
};

var writeOutput ="ppppp";
function writeOutput () {
  console.log(writeOutput);
};

// Full page -------------------------------------------------------------
var App = React.createClass({
  mixins: [ReactFireMixin],

  getInitialState: function() {
    return {
      promptNo: 1,
      timeRemaining: writeConfig.time,
      items: [], 
      text: '',
      done: false
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
      timeRemaining: writeConfig.time
    });
  },
  advancePromptNo: function() {
    this.setState({
      promptNo: this.state.promptNo + 1
    });
    if (this.state.promptNo == writeConfig.noPrompts){
      this.stopTimer();
      this.textOut();
      this.setState({
        done:true
      });
    }
  },
  textOut: function() {
    console.log("exportnow");
  },
  componentWillMount: function() {
    this.firebaseRef = firebase.database().ref("items");
    this.firebaseRef.on("child_added", function(dataSnapshot) {
      this.items.push(dataSnapshot.val());
      this.setState({
        items: this.items
      });
    }.bind(this));
  },
  componentDidMount: function() {
    // countdown every second
    this.interval = setInterval(this.tick, 1000);
    // applying styles
    fullHeight('writeyO');
    fullHeight('writeInput');
  },
  stopTimer: function(){
    clearInterval(this.interval);
  },
  saveOutput: function(){
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
    // returning active vs. inactive states
    if (this.state.done == false) {
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
                  <input id="writeyoInput" onChange={this.onChange} value={this.state.text} autoComplete="off"/>
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
              <Prompt promptNo = "Done"/>
            </div>

            <div className= "six columns" id="writeInput">
              <div>
                <h3>Write</h3>
                <Entry items={this.state.items} />
                <form onSubmit={this.saveOutput}>
                  <input id="writeyoInput" onChange={this.onChange} value={this.state.text} autoComplete="off"/>
                  <button>Save</button>
                </form>
              </div>
            </div>
          </div>
      )
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
    };
    return <ul>{this.props.items.map(createItem)}</ul>;
  }
});

ReactDOM.render(<App />, document.getElementById('body'));



