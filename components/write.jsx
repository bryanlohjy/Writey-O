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

    // if out of time 
    if (this.state.timeRemaining == 1){
        this.resetCount();
        this.advancePromptNo();
        this.submitBlank();
    }else{
      // countdown
      this.setState({
        timeRemaining: this.state.timeRemaining - 1
      });  
    }
  },
  onChange: function(e) {
    this.setState({response: e.target.value});
  },
  submitBlank: function() {
    var nextItems = this.state.items.concat([{response: this.state.response, timestamp: Date.now(), prompt: this.state.prompt.prompt, promptType: this.state.prompt.promptType, promptParam: this.state.prompt.param}]);
    var nextText = '';
    this.setState({items: nextItems, response: nextText});
    rotateWriteyO(writeConfig.noPrompts,this.state.promptNo);
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var nextItems = this.state.items.concat([{response: this.state.response, timestamp: Date.now(), prompt: this.state.prompt.prompt, promptType: this.state.prompt.promptType, promptParam: this.state.prompt.param}]);
    var nextText = '';
    this.setState({items: nextItems, response: nextText});
    if (this.state.timeRemaining != 1){
      this.resetCount();
      this.advancePromptNo();
    }
    rotateWriteyO(writeConfig.noPrompts,this.state.promptNo);
  },
  resetCount: function() {
    this.setState({
      timeRemaining: writeConfig.time
    });
  },
  advancePromptNo: function() {
    // if prompt number reaches final amount
    if (this.state.promptNo == writeConfig.noPrompts){
      this.stopTimer();
      this.setState({
        done:true
      });
    }else{
      this.setState({
        promptNo: this.state.promptNo + 1
      });
      this.advancePrompt();
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
  startTimer: function(e){
    // e.preventDefault();
    // countdown every second
    if (this.state.started==false){
      this.interval = setInterval(this.tick, 1000);
    }
    this.setState({
      started: true
    });

  },
  stopTimer: function(){
    clearInterval(this.interval);
  },

  restart: function(){
    this.firebaseRef.push({
      items: this.state.items
    });
    this.getInitialState();
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
  componentDidMount: function(){
    document.addEventListener("keydown", this.splashKeyPress, false);
  },
  splashKeyPress: function(z){
    z.preventDefault();
    var keyCode = z.keyCode;
    if(keyCode==13) {
      this.startTimer();
      document.removeEventListener("keydown", this.splashKeyPress, false);
    }    
  },
  checkEnter: function(e){
    // e.preventDefault();
    var keyCode = e.keyCode;
    if(keyCode===13) {
      this.handleSubmit(e);
      // this.startTimer();
      // document.removeEventListener("keydown", this.splashKeyPress, false);
    }     
  },
  conditionalRender: function() {
    // if the user has not started
    if (this.state.started == false){
       return (
            <Splash onClick={this.startTimer} onKeyPress={this.splashKeyPress}/>
        )
    // User has started
    } else if (this.state.started == true) {
      // Session is running
      if (this.state.done == false) {
       return (
          <Session timeRemaining={this.state.timeRemaining} promptNo={this.state.promptNo} checkEnter={this.checkEnter} prompt={this.state.prompt} onChange={this.onChange} value={this.state.response} items={this.state.items} onSubmit={this.handleSubmit}/>
        )
      // Session is over
      } else {
        return(
            <End items={this.state.items} saveOutput={this.saveOutput} restart={this.restart}/>
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

var Splash = React.createClass({
  componentDidMount: function() {
    // applying styles
    fullHeight('splash');
    vertCenter('splash','splash-prompt', 0, 'padding');
  },
  render: function(){
    return (
      <div onKeyPress={this.props.splashKeyPress} id="splash">
        <h2 id="splash-prompt">Writey-O, press 'enter' to start!</h2>
      </div>
    )
  }
});

var Session = React.createClass({
  componentDidMount: function() {
    // applying styles
    fullHeight('session');
    // fullHeight('session-left');
    // fullHeight('session-right');
    vertCenter('session-left','writeyO', 0 , 'margin');
    vertCenter('writeyO','writeyO-timerPrompt', -40 , 'margin');
    // vertCenter('writeyO','writeyO-prompt', 0 , 'padding');
  },
  render: function(){
    return (
      <div id="session">
        <div className= "six columns" id="session-left">
          <div id="writeyO">
            <div id="writeyO-timerPrompt">
              <Timer timeRemaining={this.props.timeRemaining} id="writeyO-timer"/>
              <Prompt prompt={this.props.prompt} id="writeyO-prompt"/> 
            </div>
            <PromptNo noPrompts={writeConfig.noPrompts} currentPrompt={this.props.promptNo}/>
          </div>
        </div>

        <div className= "six columns" id="session-right">
          <div>
            <Entry items={this.props.items} />
            <form id="writey-O-Input">
              <textarea className="writeyO-entry-input" onChange={this.props.onChange} onKeyDown={this.props.checkEnter} value={this.props.value} autoComplete="off" autoFocus/>
              <button onClick={this.props.onSubmit} className="button"><i className="fa fa-pencil" aria-hidden="true"></i></button>
            </form>
          </div>
        </div>
      </div>
    )
  }
});

var End = React.createClass({
  componentDidMount: function() {
    // applying styles
    fullHeight('session');
    // fullHeight('session-left');
    // fullHeight('session-right');
    vertCenter('session-left','writeyO', 0 , 'margin');
    // vertCenter('writeyO','writeyO-prompt', 0 , 'padding');
  },
  render: function(){
    return (
      <div id="session">
        <div className= "six columns" id="session-left">
          <div id="writeyO">
          </div>
        </div>

        <div className= "six columns" id="session-right">
          <div>
            <Entry items={this.props.items} />
            <div id="session-input">
              <form onSubmit={this.props.saveOutput}>
                <button className="button"><i className="fa fa-repeat" aria-hidden="true"></i></button>
              </form>
              <a href="read.html">
                <button onClick={this.props.saveOutput} className="button"><i className="fa fa-book" aria-hidden="true"></i></button>
              </a>
            </div>
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
        <h3>{this.props.timeRemaining}</h3>
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
        <h3 id="writeyO-prompt">{this.props.prompt.prompt}</h3>
    )
  }
});

var PromptNo = React.createClass({
  getInitialState: function(){
    return {
      noPrompts: writeConfig.noPrompts,
      promptArray: []
    }
  },
  componentWillMount:function(){
    var temporalCircArray = [];
    for(var circs = 0; circs < this.props.noPrompts; circs++){
      temporalCircArray.push(circs+1);
    }
    this.setState({promptArray: temporalCircArray})
  },
  componentDidMount:function(){
    positionCircles(this.state.noPrompts);
  },
  render: function(){
    var currentPrompt = this.props.currentPrompt;
    var promptCircs = this.state.promptArray.map(function(circle,index) {
      if (index+1 == currentPrompt){
        return (
          <div className = "writeyO-circ-length">
            <li className="writeyO-circ writeyO-circ-active" key={index}>{circle}</li>
          </div>
          );
      } else {
        return (
          <div className = "writeyO-circ-length">
            <li className="writeyO-circ" key={index}>{circle}</li>
          </div>
          );        
      }
    });
    return (
      <ul id="writeyO-circ-container">{promptCircs}</ul>
    );
  }
});

var Entry = React.createClass({
  render: function() {
    var createItem = function(item) {
      return <h4 className= "writeyO-entry" key={item.timestamp}>{item.response}</h4>;
    };
    return <div id="writeyO-entry-container">{this.props.items.map(createItem)}</div>;
  }
});

ReactDOM.render(<App />, document.getElementById('body'));




