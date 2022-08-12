import React from 'react';
import { Route, Redirect, Switch, BrowserRouter} from 'react-router-dom';
/*
import Header from '../Templates/Header/Header';
import Sidebar from '../Templates/Sidebar/Sidebar';
*/
import RoutesUnprotected from './RoutesUnprotected';
import Dashboard from '../components/Dashboard/Dashboard';
import Unauthorized from '../templates/Unauthorized/Unauthorized';
import { CONFIG } from '../config/config.common';
import Header from '../templates/Header/Header';

function Routes({component: Component, ...restOfProps }) {   
 
    const isAuthenticated = localStorage.getItem("token");   
       
    return (        
        <BrowserRouter basename={CONFIG.API_URL}>
            <Route
                {...restOfProps}
                render={(props) =>
                    isAuthenticated  ?                         
                    <div>     
                        <Header/>                               
                        <Switch>
                            <Route exact path="/"><Redirect to="/dashboard" /> : <Dashboard/></Route>
                            <Route exact path="/dashboard" component={Dashboard}/>          
                        </Switch>                                                                             
                    </div>                                                
                : <RoutesUnprotected></RoutesUnprotected>
                }            
            />   
        </BrowserRouter>     
    );
};

export default Routes;
