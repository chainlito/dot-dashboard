import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import {
    HomeComposition,
    FarmComposition,
    StatsComposition,
    Pool1Composition,
    Pool2Composition,
    Pool3Composition,
    Pool4Composition,
    Pool5Composition,
    Pool6Composition,
    Pool7Composition,
    Pool8Composition,
    AboutComposition,
    GameComposition,
    RulesComposition,
} from 'compositions';

import 'assets/scss/index.scss';

class MainScreen extends Component {
    public render() {
        return (
            <Router>
                <Switch>
                    <Route path='/' exact={true} component={HomeComposition} />
                    <Route path='/farm' exact={true} component={FarmComposition} />
                    <Route path='/farm-bluelp' exact={true} component={Pool1Composition} />
                    <Route path='/farm-uni' exact={true} component={Pool2Composition} />
                    <Route path='/farm-yfi' exact={true} component={Pool3Composition} />
                    <Route path='/farm-link' exact={true} component={Pool4Composition} />
                    <Route path='/farm-redlp' exact={true} component={Pool5Composition} />
                    <Route path='/farm-ytsla' exact={true} component={Pool6Composition} />
                    <Route path='/farm-meme' exact={true} component={Pool7Composition} />
                    <Route path='/farm-core' exact={true} component={Pool8Composition} />
                    <Route path='/stats' exact={true} component={StatsComposition} />
                    <Route path='/about' exact={true} component={AboutComposition} />
                    <Route path='/dashboard' exact={true} component={GameComposition} />
                    <Route path='/rules' exact={true} component={RulesComposition} />
                </Switch>
            </Router>
        );
    }
}

export default MainScreen;