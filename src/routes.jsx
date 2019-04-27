import React, {Component} from 'react'
import { Switch, Route } from 'react-router-dom'
import App from './App';
import PrivateRoute from './privateRoute';
import UserProfile from './profile/userProfile'
import SignIn from './signIn/signIn'
class Routes extends Component {
    constructor(props) {
      super(props);
      this.state = {
        
      };
    }
    render(){
        return (
            <main>
              <Switch>
                <Route exact path='/' component={App}/>
                <Route path='/login' component={SignIn}/>
                <PrivateRoute path="/userProfile" component={UserProfile} />
                {/* <Route path='/userProfile' component={UserProfile}/> */}
              </Switch>
            </main>
          );
    }

}

export default Routes;