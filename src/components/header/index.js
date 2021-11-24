import React, { useEffect } from "react";
import { Button, Layout } from "antd";
import { LogoutOutlined, SearchOutlined } from '@ant-design/icons';
// import { getCookie, removeCookie } from "../utils/useCookie";
import { useCookies } from "react-cookie";
import logoImg from "../../img/logo02.png";
import Search from "antd/lib/input/Search";
import "antd/dist/antd.css"
import "../../css/main.css";

const { Header } = Layout;

export const MainHeader = () => {
  const btnCss = {float: 'right', verticalAlign: 'middle', top: '15%', marginRight: '20px'};
  const headerCss = { background: '#fff', padding: 0, dispay: 'inline-block' };
  const [cookies, setCookie, removeCookie] = useCookies(['userId']);
  
  const handlerLogout = async() => {
    removeCookie('user_Id');
    removeCookie('userName');
    removeCookie('userPhoto');
    removeCookie('userToken');
    window.location.replace('/login');
  }
  return (
    <Header style={headerCss} >
      <a href="/main">
        <img src={logoImg} alt={"logo"} style={{height: '50px'}}></img>
      </a>
      <Button className="LogoutBtn" shape="round" icon={<LogoutOutlined />} size={'large'}  style={btnCss} onClick={handlerLogout}>
        Logout
      </Button>
      <Search placeholder="Search artworks, creators and collectors..."  size="large" style={{width: '40%', marginTop: '15px'}}/>
      <img style={{float: 'right', height: '50px', marginRight: '30px', marginTop:'7px'}} src={"/images/" + cookies.userPhoto} />
      <span style={{float: 'right', marginRight: '30px'}}> {cookies.userName}님 환영합니다 </span>
      <span style={{float: 'right', marginRight: '30px'}}> 토큰 보유량 : {cookies.userToken} NHC </span>
    </Header>
    )
}