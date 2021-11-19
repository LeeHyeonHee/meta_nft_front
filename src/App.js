import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Layout, Menu, Breadcrumb, Icon, Button, Popover } from 'antd';
import Main from './components/main';
import detail from './components/NFT/detail';
import photo from './components/NFT/photo';
import video from './components/NFT/video';
import 'antd/dist/antd.css';
import logo from './logo.svg';
import './App.css';
import { extension } from 'mime';
import NotFound from './components/error/NotFound';
import { SideMenu } from './components/SideMenu';
import { MainFooter } from './components/Footer';
import { MainHeader } from './components/header';
import { createBrowserHistory } from 'history';
import login from './components/login/login';
import { getCookie, removeCookie } from './components/utils/useCookie';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
const history = createBrowserHistory();


class App extends Component {
  

  render() {
    return (
    <>
          <Router history={history}>
            <Switch>

            <Route exact path='/' component={login}/>
            <Route exact path='/login' component={login}/>
            <Route exact path='/main' component={Main}/>
            <Route exact path='/detail' component={detail}/>
            <Route exact path='/a' component={Main}/>
            <Route exact path='/b' component={Main}/>
            <Route exact path='/NFT/photo' component={photo}/>
            <Route exact path='/NFT/video' component={video}/>
            <Route path='*' to="/" component={NotFound}/> 
            </Switch>
          </Router>

     </>
    )
  }
}

export default App;
