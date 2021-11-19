import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { Avatar, Breadcrumb, Card, Icon, Layout, List } from 'antd';

import { SideMenu } from '../SideMenu';
import { MainHeader } from '../header';
import { MainFooter } from '../Footer';
import Meta from 'antd/lib/card/Meta';
import { Link } from 'react-router-dom';


export const Video= (props) => {
    const { Header, Content, Sider } = Layout;
    const [collapsed, setCollapsed] = useState(false);
    const onCollapse = (collapsed) => {
        setCollapsed(collapsed)
    }

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
    return(
        <>
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={onCollapse}
      >
        <div className="App-logo" />
        <SideMenu />

      </Sider>
      <Layout>
        <MainHeader/>
        <Content style={{ margin: '0 16px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>NFT</Breadcrumb.Item>
                <Breadcrumb.Item>영상</Breadcrumb.Item>
            </Breadcrumb>
            <h2 style={{textAlign: 'left'}}> My Video NFT</h2>
            <hr/>
            <br/>
            <div style={{display: 'inline-block'}}>
              
            <div style={{display: 'inline-block', width: "29%" , float:'left'}}>
                <div style={{position: '-webkit-sticky', position: 'sticky',top: '0px', height: '450px' , marginTop: '5%', textAlign: 'center', width: '100%'}}>
                    <div className="prifileBox" style={{background: '#BDBDBD', width: '150px', height: '150px', borderRadius: '70%', display:'block', margin: 'auto'}}>
                        <img src={"https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"} className="profile" style={{width: '100%', height: '100%', objectFit: 'cover'}}/>
                    </div>
                    <div style={{marginTop:'50px', width:'100%', height: '340px'}}>
                        <div style={{fontSize:'50px'}}>
                            @idididididi
                        </div>
                        <div style={{display: 'flex', marginTop: '25px'}}>
                            <div style={{flex: '1'}}>
                                <Icon type="meh" theme="filled" style={{fontSize: '40px', color: '#68de7c'}} />
                            </div>
                            <div style={{flex: '1'}}>
                                <Icon type="picture" style={{fontSize: '40px', color: '#08c'}}/>
                            </div>
                            <div style={{flex: '1'}}>
                                <Icon type="video-camera" style={{fontSize: '40px', color: '#f2d675'}}/>
                            </div>
                            
                        </div>
                        <div style={{display: 'flex', marginTop: '25px'}}>
                            <div style={{flex: '1', textAlign: 'center'}}>
                                <p style={{fontSize: '40px', color: '#68de7c'}} >45</p>
                            </div>
                            <div style={{flex: '1'}}>
                                <p style={{fontSize: '40px', color: '#08c'}} >35</p>
                            </div>
                            <div style={{flex: '1'}}>
                                <p style={{fontSize: '40px', color: '#f2d675'}} >10</p>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
            <div style={{width: "69%", float: 'right'}}> 

            <List
                grid={{
                    gutter: 16,
                    xs: 1,
                    sm: 2,
                    md: 3,
                    lg: 3,
                    xl: 3,
                    xxl: 3,
                }}
                dataSource={data}
                renderItem={item=> (
                    <Link to ={{
                        pathname: '/detail',
                        state: {item}
                    }}>
                    <List.Item className="card_object">
                            <Card
                                cover={
                                    <img src={"https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"} alt="NFT" height="300px;" width="200px"/>
                                    
                                }
                                >
                                <Meta title={"테스트Test"} />
                                <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" 
                                    style={{margin: '2%'}}
                                /> 
                                <span className="nftowner"> @{"testUser"} </span>
                            </Card>
                            <div className="myPurchaseInfo" >
                                <div className="information"> <span className="bid"> Token Price </span>  </div>
                                <div className="realdata"><span className="bidNum">541</span> <span> TKN </span> </div>
                            </div>
                    </List.Item>
                    </Link>
                )}
                />
                </div>
                </div>
         </Content>
         <MainFooter />
       </Layout>
     </Layout>
        
           
        </>
    )

}


export default Video;