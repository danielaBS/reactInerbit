
import { Route, Switch, Redirect } from "react-router-dom";

import Login from "../utils/Login/Login";
import Register from "../utils/Register/Register";

const RoutesUnprotected = () =>{    
    return (
        <Switch>         
          <Route exact path="/"><Redirect to="/login" /> : <Login /></Route>
          <Route exact path="/login" component={Login}/>
          <Route exact path="/register" component={Register} />        
        </Switch>
    );
};

export default RoutesUnprotected;