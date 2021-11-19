import { Avatar, Breadcrumb, Layout } from 'antd';
import React, { useState } from 'react';
import "../../css/nftdetail.css"
import { useLocation } from 'react-router-dom'
import { MainFooter } from '../Footer';
import { MainHeader } from '../header';
import { SideMenu } from '../SideMenu';
import filetype from "file-type";

// class detail 

const { Sider, Content } = Layout;


// const data = await toBase

export const detail =  (props) => {
    // const data = useLocation();
    
    console.log(props);
    
    const data = props.location.state.item;
    
    
    return (
        <Layout style={{ minHeight: '100vh' }}>
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
                    <Breadcrumb.Item>NFT</Breadcrumb.Item>
                    <Breadcrumb.Item>상세정보</Breadcrumb.Item>
                </Breadcrumb>
                <div className = 'topImagePart'>
                  <img className="nftImage" src={"data:image/"+data.type+";base64,"+data.imageFile}/>
                
                </div>
                <div className="profileLine">

                    <div className= "profileBadge">
                        
                    <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" 
                    style={{margin: '2%'}}
                    /> 
                       <span style={{marginLeft: '5%'}}> @{data.tokenOwner}</span>
                        
                    </div>
                </div>
                <div style={{ background: '#fff', padding: 24, minHeight: 400 }}>
                    <div className="nftdetailcontent">
                        <div className="content">

                            <h2 style={{fontSize: '40px'}}> {data.tokenDescription} </h2>
                            <div style={{fontSize: '20px'}}>
                                Photo Data Type : <span>{data.type}</span>
                                <p>설명 설명</p>
                            </div>
                        </div>
                        <div className="priceData">
                            <div className="pricetable">
                                <div className="priceup">
                                    <div className= "pricenumber">
                                        <div className="numberdata">
                                            <p className="infonumber"> Assigned Price </p>
                                            <p className="realNumber">{data.tokenPrice}&nbsp;TKN</p>
                                        </div>
                                    </div>
                                    <div className="pricedescription">
                                        <p>
                                        The price indicates the amount allocated 
                                        or final traded for NFT product trading. 
                                        </p>
                                    </div>
                                </div>
                                
                                <div className="pricedown">
                                    <div className="mark">
                                        <p style={{fontSize: "25px", height: '20px'}}>Token ID</p>
                                        <p style={{fontSize: "60px"}}>{data.tokenId}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        
                {/* <div>
                    dassadda
                </div> */}
  
      
            </Content>
         <MainFooter />
        </Layout>
  </Layout>



    )
}

export default detail;