import { BrowserRouter as Router } from 'react-router-dom';
import Login from 'ant-design-pro/lib/Login';
import {Alert, Checkbox, Layout} from 'antd';
import React, { Component } from 'react';
import axios from 'axios';
// import { useCookies } from 'react-cookie';
import { getCookie, setCookie } from '../utils/useCookie';

const { Tab, UserName, Password, Submit } = Login;


class login extends Component {
    state = {
        notice: '',
        type: 'tab1',
        autoLogin: true,
        loading: false,
        userId: '',
        password: '',
        loginData: {},
    };


    onSubmit = (err, values) => {
        this.setState({
            loading: false
        })

        axios.post("/login", {
            userId: this.state.userId,
            password: this.state.password
        }).then((res) => {

            setCookie("userName", res.data.data.NAME);
            setCookie("userId",res.data.data.USER_ID);


            if(res.status === 200) {
              window.location.replace('/main');
            }else{
                setTimeout(() => {
                    this.setState({
                        notice: 'The combination of username and password is incorrect!',
                      });
                }, 500);
            }
        });
    };
    changeAutoLogin = e => {
        this.setState({
            autoLogin: e.target.checked,
        });
    }
    handleKeyPress = (e) => {
        if (e.key === "Enter") {
            this.onSubmit();
        }
    }

    idChange = (e) => {
        this.setState({
            userId: e.target.value,
        });
    }

    pwChange = (e) => {
        this.setState({
            password: e.target.value,
        })
    }
    render() {
        return (
        <Layout style={{ minHeight: '100vh', alignContent:'center'}}>
            
          <div  style= {{width: '560px', margin: 'auto'}}>
            <Login
              defaultActiveKey={this.state.type}
              onTabChange={this.onTabChange}
              onSubmit={this.onSubmit}
            >
            <Tab key="tab1" tab="Login">
            {this.state.notice && (
              <Alert
                style={{ marginBottom: 24 }}
                message={this.state.notice}
                type="error"
                showIcon
                closable
              />
            )}
          </Tab>
                <UserName name="userId"onChange={this.idChange}/>
                <Password name="password" onKeyPress={this.handleKeyPress} onChange={this.pwChange}/>
              <div>
                <Checkbox checked={this.state.autoLogin} onChange={this.changeAutoLogin}>
                  Keep me logged in
                </Checkbox>
                <a style={{ float: 'right' }} href="">
                  Forgot password
                </a>
                {/* <div style={{float: 'right', width: ''}}>

                <a style={{ float: 'right'}} href="">
                  Register
                </a>
                </div> */}
              </div>
              <Submit>Login</Submit>
              
            </Login>
          </div>
        </Layout>

        );
      }
    }

export default login;