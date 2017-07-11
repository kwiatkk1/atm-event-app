// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import {Redirect, Route, BrowserRouter} from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import injectTapEventPlugin from 'react-tap-event-plugin';
import {MuiThemeProvider} from 'material-ui';
import createHistory from 'history/createBrowserHistory'
import ScrollToTop from './Components/ScrollToTop/ScrollToTop';
import ApplicationBar from './Components/ApplicationBar/ApplicationBar';
import BottomMenu from './Components/BottomMenu/BottomMenu';
import Home from './Views/Home/Home';
import Profile from './Views/Profile/Profile';
import Speakers from './Views/Speakers/Speakers';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import theme from './Config/theme';
import Schedule from './Views/Schedule/Schedule';
import Info from './Views/Info/Info';
import Talk from './Views/Talk/Talk';
import Login from './Views/Login/Login';
import FirebaseAuth from './Auth/Auth';
import AnimatedRoute from './Components/Route/AnimatedRoute';
import SecuredRoute from './Components/Route/SecuredRoute';
import 'moment/locale/pl';
import './index.css';
import Stream from './Views/Stream/Stream';

injectTapEventPlugin();

const auth = new FirebaseAuth();

const app = <MuiThemeProvider muiTheme={getMuiTheme(theme)}>
    <BrowserRouter history={createHistory({forceRefresh: true})}>
        <div>
            <ApplicationBar auth={auth} />
            <Route exact path="/" view={() => <Redirect to="/atm/home"/>}/>
            <AnimatedRoute path="/atm/login" view={<Login handleLogin={auth.login}/>}/>
            <SecuredRoute auth={auth} path="/atm/home" view={<Home/>}/>
            <SecuredRoute auth={auth} path="/atm/schedule" view={<Schedule/>}/>
            <SecuredRoute auth={auth} path="/atm/talk/:id" view={<Talk firebase={auth.firebase} getProfile={auth.getProfile}/>}/>
            <SecuredRoute auth={auth} path="/atm/info" view={<Info/>}/>
            <SecuredRoute auth={auth} path="/atm/stream" view={<Stream/>}/>
            <SecuredRoute auth={auth} path="/atm/speakers" view={<Speakers firebase={auth.firebase}/>}/>
            <SecuredRoute auth={auth} path="/atm/profile" view={<Profile handleProfile={auth.getProfile} handleLogout={auth.logout}/>}/>
            <BottomMenu />
            <ScrollToTop/>
        </div>
    </BrowserRouter>
</MuiThemeProvider>;

ReactDOM.render(app, document.querySelector('body'));
registerServiceWorker();
