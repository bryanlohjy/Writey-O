// var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
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
    // console.log("submitting blank: "+ this.state.promptNo);
    var nextItems = this.state.items.concat([{response: this.state.response, timestamp: Date.now(), prompt: this.state.prompt.prompt, promptType: this.state.prompt.promptType, promptParam: this.state.prompt.param}]);
    var nextText = '';
    this.setState({items: nextItems, response: nextText});
    this.resetCount();
    this.advancePromptNo();
  },
  handleSubmit: function(e) {
    // console.log("submitting: "+ this.state.promptNo);
    e.preventDefault();
    var nextItems = this.state.items.concat([{response: this.state.response, timestamp: Date.now(), prompt: this.state.prompt.prompt, promptType: this.state.prompt.promptType, promptParam: this.state.prompt.param}]);
    var nextText = '';
    this.setState({items: nextItems, response: nextText});
    this.resetCount();
    this.advancePromptNo();
  },
  resetCount: function() {
    // console.log("resetting countdown: "+ this.state.promptNo);
    this.setState({
      timeRemaining: writeConfig.time
    });
  },
  advancePromptNo: function() {
    // console.log("advancing promptNo: "+ this.state.promptNo);
    rotateWriteyO(writeConfig.noPrompts);
    changeBG(this.state.promptNo);
    this.setState({
      promptNo: this.state.promptNo + 1
    });
    if (this.state.promptNo < writeConfig.noPrompts){
      this.advancePrompt();
    } else if (this.state.promptNo >= writeConfig.noPrompts){
      this.stopTimer();
      this.setState({
        done:true
      });
      document.addEventListener("keydown", this.endKeyPress, false);
    }

  },
  advancePrompt: function() {
    // console.log("advancing prompt: "+ this.state.promptNo);
    this.setState({
      prompt: writeConfig.prompts[this.state.promptNo]
    });
  },
  componentWillMount: function() {
    checkWidth();
    this.firebaseRef = firebase.database().ref("write");
  },
  startTimer: function(e){
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
  refresh: function(){
    window.location.reload();
  },
  saveOutput: function(){
    this.firebaseRef.push({
      items: this.state.items
    });
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
  splashClick: function(k){
    k.preventDefault();
    this.startTimer();
    document.removeEventListener("keydown", this.splashKeyPress, false);
  },
  endKeyPress: function(z){
    z.preventDefault();
    var keyCode = z.keyCode;
    if(keyCode==13) {
      // console.log("refreshpagepls");
      this.refresh();
    }    
  },
  endClick:function(){
    this.refresh();
  },
  checkEnter: function(e){
    var keyCode = e.keyCode;
    if(keyCode===13) {
      this.handleSubmit(e);
    }     
  },
  conditionalRender: function() {
    // if the user has not started
    if (this.state.started == false){
       return (
          <Splash splashClick={this.splashClick} onKeyPress={this.splashKeyPress}/>
        )
    // User has started
    } else if (this.state.started == true) {
      // Session is running
      if (this.state.done == false) {
       return (
          <Session timeRemaining={this.state.timeRemaining} promptNo={this.state.promptNo} checkEnter={this.checkEnter} prompt={this.state.prompt} onChange={this.onChange} value={this.state.response} items={this.state.items} onSubmit={this.handleSubmit}/>
        )
      // Session is over
      } else if (this.state.done == true){
        return(
          <End items={this.state.items} saveOutput={this.saveOutput} restart={this.restart} endKeyPress={this.endKeyPress} endClick={this.endClick}/>
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
  componentWillMount: function() {
  },
  componentDidMount: function() {
    styleSplash();
    currentState="splash";
  },
  render: function(){
    return (
      <div onKeyPress={this.props.splashKeyPress} onClick={this.props.splashClick} id="splash">
        <div id="splash-writeyO">
          <h3 id="splash-text">Writey-O, tap or hit 'enter' to start</h3>
        </div>
      </div>
    )
  }
});
var Session = React.createClass({
  componentDidMount: function() {
    // applying styles
    styleSession();
    currentState="session";
  },
  render: function(){
    return (
      <div id="session">
        <div className= "six columns" id="session-left">
          <div id="session-writeyO">
            <div id="session-writeyO-timerPrompt">
              <Timer timeRemaining={this.props.timeRemaining} id="session-writeyO-timer"/>
              <Prompt prompt={this.props.prompt} id="session-writeyO-prompt"/> 
            </div>
            <PromptNo noPrompts={writeConfig.noPrompts} currentPrompt={this.props.promptNo}/>
          </div>
          <div id="session-writeyO-indicator"></div>
        </div>
        <div className= "six columns" id="session-right">
          <div>
            <Entry items={this.props.items} />
            <form id="session-writey-O-Input">
              <textarea className="session-writeyO-entry-input" onChange={this.props.onChange} onKeyDown={this.props.checkEnter} value={this.props.value} autoComplete="off" autoFocus/>
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
    // push to firebase
    // this.props.saveOutput();
    // applying styles
    styleEnd();
    currentState="end";
  },
  render: function(){
    return (
      <div id="end" onKeyPress={this.props.endKeyPress} onClick={this.props.endClick}>
        <div className= "six columns" id="end-left">
          <div id="end-writeyO">
            <div id="end-writeyO-text">
                <h3 id="end-text">Your story has been saved, tap or hit 'enter' to restart.</h3>
            </div>
          </div>
        </div>
        <div className= "six columns" id="end-right">
          <div>
            <Entry items={this.props.items} />
          </div>
        </div>
      </div>
    )
  }
});
var Timer = React.createClass({
  render: function(){
    return (
      <div id="countdown">
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
        <h3 id="session-writeyO-prompt">{this.props.prompt.prompt}</h3>
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
          <div className = "session-writeyO-circ-length">
            <li className="session-writeyO-circ session-writeyO-circ-active" key={index}>{circle}</li>
          </div>
          );
      } else {
        return (
          <div className = "session-writeyO-circ-length">
            <li className="session-writeyO-circ" key={index}>{circle}</li>
          </div>
          );        
      }
    });
    return (
      <ul id="session-writeyO-circ-container">{promptCircs}</ul>
    );
  }
});
var Entry = React.createClass({
  render: function() {
    var createItem = function(item) {
      return <h4 className= "session-writeyO-entry" key={item.timestamp}>{item.response}</h4>;
    };
    return <div id="session-writeyO-entry-container">{this.props.items.map(createItem)}</div>;
  }
});

ReactDOM.render(<App />, document.getElementById('body'));




