import './App.css';

import React, { Fragment } from 'react'
import { Helmet } from 'react-helmet'
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect
} from 'react-router-dom'
import { apiEndpoint } from './prismic-configuration'
import { NotFound, Page, CreateEpics } from './Pages'
import { Navigation } from './Components/Navigation';

function App() {
  const repoNameArray = /([^/]+)\.cdn.prismic\.io\/api/.exec(apiEndpoint)
  const repoName = repoNameArray[1]


  return (
    <Fragment>
      <Helmet>
        <script async defer src={`//static.cdn.prismic.io/prismic.js?repo=${repoName}&new=true`} />
      </Helmet>
      <BrowserRouter>
        <div className="App">
          <header className="App-header">
            <div className="App-logo">
              <img src="/logo.svg" alt="Vienna Struggle" />
            <Navigation />
            </div>
            <div>
              <h1>
              EPIC TEMPLATES
        </h1>
            <p>
              Templates for common VIS projects.
        </p>
              </div>

          </header>
          <div className="App-main">
            <Switch>
              <Redirect exact from='/' to='/page/terms' />
              <Route exact path='/epics/create' component={CreateEpics} />
              <Route exact path='/page/:uid' component={Page} />
              <Route component={NotFound} />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    </Fragment>
  );
}

export default App;
