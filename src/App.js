import React,{Component} from 'react';
import './App.css';
import SignUp from './signUp/signUp'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
        <SignUp {...this.props}/>
        </header>
      </div>
    );
  }
}

export default App;
