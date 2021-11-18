import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Layout, Menu, Breadcrumb, Icon, Button, Popover } from 'antd';
import Main from './components/main';
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

import login from './components/login/login';
import { getCookie, removeCookie } from './components/utils/useCookie';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;


class App_Login extends Component {
  state = {
    collapsed: false,
  };


  onCollapse = (collapsed) => {
    this.setState({ collapsed });
  }

  render() {
    const isLogined = getCookie('userId');

    return (
    <>
     
      <Router>
        <Switch>
          <Route exact path='/' component={login}/>
          <Route exact path='/login' component={login}/>
        </Switch>
      </Router>
     
     </>
    )
  }
}

export default App_Login;
