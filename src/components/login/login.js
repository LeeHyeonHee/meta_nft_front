import Login from 'ant-design-pro/lib/Login';
import {Alert, Checkbox, Layout} from 'antd';
import React, { Component, useState } from 'react';
import axios from 'axios';
// import { useCookies } from 'react-cookie';
import { getCookie, setCookie } from '../utils/useCookie';
import getProxy from '../../Proxy';
const { Tab, UserName, Password, Submit } = Login;

export const LoginPage = (props) => {

  const [notice, setNotice] = useState('');
  const [type, setType] = useState('tab1');
  const [autoLogin, setAutoLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const onSubmit = async(err, values) => {
    setLoading(false);
    axios.post("/login", {
      userId: userId,
      password: password
    }).then(async(res) => {
      setCookie("user_Id",res.data.data.USER_ID);
      setCookie("userName", res.data.data.NAME);
      setCookie("userPhoto", res.data.data.PHOTO);
      const apiUrl = getProxy(4200) + "/api/erc20/balanceOf";
      if(res.status === 200) {
        await axios.post(apiUrl, {
          owner: userId
        }).then((result) => {
          setCookie("userToken", result.data.balance);
          window.location.replace('/main');
        })
      }else{
        setTimeout(() => {
          setNotice('The combination of username and password is incorrect!');
        }, 500);
      } 
    })
  };
  const changeAutoLogin = e => {
    setAutoLogin(e.target.checked);
  }
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
        onSubmit();
    }
  }
  const idChange = (e) => {
    setUserId(e.target.value)
  }
  const pwChange = (e) => {
    setPassword(e.target.value)
  }
  return (
    <Layout style={{ minHeight: '100vh', alignContent:'center'}}>
      <div  style= {{width: '560px', margin: 'auto'}}>
        <Login
          defaultActiveKey={type}
          onSubmit={onSubmit}
        >
        <Tab key="tab1" tab="Login">
          {notice && (
            <Alert
              style={{ marginBottom: 24 }}
              message={notice}
              type="error"
              showIcon
              closable
            />
          )}
        </Tab>
        <UserName placeholder="userId" name="userId" onChange={idChange}/>
        <Password placeholder="password" name="password" onKeyPress={handleKeyPress} onChange={pwChange} />
        <div>
          <Checkbox checked={autoLogin} onChange={changeAutoLogin}>
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
export default LoginPage;