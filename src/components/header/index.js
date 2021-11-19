import React, { useEffect } from "react";
import { Button, Layout } from "antd";
import { LogoutOutlined, SearchOutlined } from '@ant-design/icons';
// import { getCookie, removeCookie } from "../utils/useCookie";
import axios from "axios";
import { useCookies } from "react-cookie";
import logoImg from "../../img/logo02.png";
import Search from "antd/lib/input/Search";

const { Header } = Layout;

export const MainHeader = () => {
    const btnCss = {float: 'right', verticalAlign: 'middle', top: '15%', marginRight: '20px'};
    const headerCss = { background: '#fff', padding: 0, dispay: 'inline-block' };
    // const userName = getCookie('userName');
    const [cookies, setCookie, removeCookie] = useCookies(['userId']);



    let a = new Promise ((resolve, reject) => {
        setTimeout(function ()  {
            removeCookie('userId');
            // removeCookie('userName');
            resolve("a")
        }, 3000);
    })

    const handlerLogout = async() => {

        
            removeCookie('userId');
            removeCookie('userName');
            
            window.location.replace('/login');

        
        // })
        
    }
    return (
        <Header style={headerCss} >
            <a href="/main">
                <img src={logoImg} alt={"logo"} style={{height: '50px'}}></img>
            </a>
            <Button shape="round" icon={<LogoutOutlined />} size={'large'}  style={btnCss} onClick={handlerLogout}>
              Logout
            </Button>
            <Search placeholder="Search NFT Information!" enterButton="Search" size="large" style={{width: '40%', marginTop: '15px'}}/>
            <span style={{float: 'right', marginRight: '30px'}}> {cookies.userName}님 환영합니다 </span>
            <span style={{float: 'right', marginRight: '30px'}}> 토큰 보유량 : {'511'} TKN </span>
        </Header>
    )
}