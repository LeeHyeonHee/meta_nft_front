import React, { Component, useEffect, useState } from 'react';
import ReactDOM from "react-dom";
import { Breadcrumb, Layout, Menu, List, Card, Avatar } from "antd";
import "../css/main.css";
import "antd/dist/antd.css"
import styled from "styled-components"
import axios from "axios";
import { MainFooter } from './Footer';
import { MainHeader } from './header';
import { SideMenu } from './SideMenu';
import Icon, { MoneyCollectOutlined } from '@ant-design/icons';
import Loader from './utils/Loader';

const { Header, Footer, Sider, Content } = Layout;

const { Meta } = Card;

const HeartSvg = () => (
  <svg width="1em" height="1em" fill="currentColor" viewBox="0 0 1024 1024">
    <path d="M923 283.6c-13.4-31.1-32.6-58.9-56.9-82.8-24.3-23.8-52.5-42.4-84-55.5-32.5-13.5-66.9-20.3-102.4-20.3-49.3 0-97.4 13.5-139.2 39-10 6.1-19.5 12.8-28.5 20.1-9-7.3-18.5-14-28.5-20.1-41.8-25.5-89.9-39-139.2-39-35.5 0-69.9 6.8-102.4 20.3-31.4 13-59.7 31.7-84 55.5-24.4 23.9-43.5 51.7-56.9 82.8-13.9 32.3-21 66.6-21 101.9 0 33.3 6.8 68 20.3 103.3 11.3 29.5 27.5 60.1 48.2 91 32.8 48.9 77.9 99.9 133.9 151.6 92.8 85.7 184.7 144.9 188.6 147.3l23.7 15.2c10.5 6.7 24 6.7 34.5 0l23.7-15.2c3.9-2.5 95.7-61.6 188.6-147.3 56-51.7 101.1-102.7 133.9-151.6 20.7-30.9 37-61.5 48.2-91 13.5-35.3 20.3-70 20.3-103.3 0.1-35.3-7-69.6-20.9-101.9z" />
  </svg>
);

const ImgBox = styled.article`
  border: 1px solid lightgray;
  
  width: 100%;
  height: 200px;
  box-sizing: border-box;
`;


const toBase64 = (arr) => {
  return btoa(
    arr.reduce((data, byte) => data + String.fromCharCode(byte), '')
    )
  }
  
  const HeartIcon = props => <Icon component={HeartSvg} {...props} />
  
  const data = [
    {
      title: 'Title 1',
      img: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png'
    },
    {
      title: 'Title 2',
      img: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
    },
    {
      title: 'Title 3',
      img: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png'
    },
    {
      title: 'Title 4',
      img: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png'
    },
    {
      title: 'Title 5',
      img: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png'
    },
    {
      title: 'Title 6',
      img: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png'
    },
    {
      title: 'Title 6',
      img: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png'
    },  
    {
      title: 'Title 6',
      img: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png'
    },
  ];


export const Main = (props) => {
  
  const [loading, setLoading] = useState(null);
  const [nftData, setNftData] = useState({});
  const apiUrl = "http://10.0.3.115:4100/api/nft-agent/getAllTokensInfo";

useEffect(async() => {
  const callNftData = async() => {
    try{

      setLoading(true);
      await axios.get(apiUrl).then((res) => {
        console.log(res);
        setNftData(res.data.allTokensInfo); 
      });
    }catch(e){
      console.log(e);
      // throw (e);
    }
    setLoading(false);
  } 

  callNftData();


}, []);

  
  if (loading) return( <Loader type="spin" color="#87ceeb" message={"Loading to NFT"} />);


  return(

    <Layout style={{ minHeight: '120vh' }}>
      <Sider
      collapsible
      // collapsed={this.state.collapsed}
      // onCollapse={this.onCollapse}
      >
        <div className="App-logo" />
        <SideMenu />
      </Sider>

      <Layout>
      
          <MainHeader/>
          <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
                  <Breadcrumb.Item>메인페이지</Breadcrumb.Item>
                  <Breadcrumb.Item>메인</Breadcrumb.Item>
              </Breadcrumb>

        <div style={{width: '100%', height: '100%', textAlign: 'center'}}> 
        <div style={{width: '80%', display: 'inline-block'}}>

        {/* <div className="userInfo">
          <div className="token">
          
            <h2> <MoneyCollectOutlined twoToneColor="#52c41a" style={{marginTop: '13px', marginLeft: '10px'}}/> &nbsp; My Tokens</h2>

            <div className="ammount">
              7,123,542              <span>TKN</span>
            </div>
          </div>
          <div>

          </div>
        </div> */}
        <h2 style={{textAlign: 'left'}}> <HeartIcon style={{color: 'hotpink'}} /> Hot NFT !  </h2>
        <hr/>
        <br/>
        <List
            grid={{
              gutter: 16,
              xs: 1,
              sm: 2,
              md: 3,
              lg: 3,
              xl: 3,
              xxl: 4,
            }}
            dataSource={data}
            renderItem={item => (
              <List.Item className="card_object">
                <Card 
                  cover = {
                    <img src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png" alt="NFT" height="350px;"/>
                  }
                  style={{textAlign: 'left'}}
                >
                <Meta title="아무튼 NFT 제목 ㅋㅋ" />
                <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" 
                  style={{margin: '2%'}}
                /> 
                <span className="nftowner"> @HyeonHui </span>
                
                    {/* <Card title= "Current bid"> 2312313</Card> */}
                  </Card>
                    <div className="purchaseinfo" >
                      <div className="information"> <span className="bid"> Current bid </span>  <span className="time"> Ending in </span>  </div>
                      <div className="realdata"><span className="bid">a</span> <span className="time"> aa</span></div>
                    </div>
              </List.Item>
            )}
          />
            {/* <section>
              <h3>NFT List </h3>
              <div className="nftImage"> 
                  <ImgBox className="imgBox">
                    <div className="imgDescription">NFT 1 </div>
                  </ImgBox>
                <ImgBox className="imgBox">
                    <img src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png" />
                    <div className="imgDescription">adsdas </div>
                </ImgBox>
                <ImgBox className="imgBox">
                    <img src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png" />
                    <div className="imgDescription">adsdas </div>
                </ImgBox>
                <ImgBox className="imgBox">
                    <img src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png" />
                    <div className="imgDescription">adsdas </div>
                </ImgBox>
                <ImgBox className="imgBox">
                    <img src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png" />
                    <div className="imgDescription">adsdas </div>
                </ImgBox>                    
                <ImgBox className="imgBox">
                    <img src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png" />
                    <div className="imgDescription">adsdas </div>
                </ImgBox>

              </div>
            </section> */}
        </div>
        </div>

    
    </Content>
    <MainFooter />
  </Layout>
</Layout>
)
}




// class main extends Component {
//     state = {
//        collapsed: false,
//      };
    
    
//      onCollapse = (collapsed) => {
//        this.setState({ collapsed });
//      }

//     render(){
//       useEffect(()=> {

//       })
        
//     }

// }

export default Main;







