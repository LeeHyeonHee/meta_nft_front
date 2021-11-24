import { Avatar, Button, Checkbox, Input, Layout } from 'antd';
import React, { useState } from 'react';
import "../../css/nftdetail.css"
import { Link } from 'react-router-dom'
import { MainFooter } from '../Footer';
import { MainHeader } from '../header';
import Search from 'antd/lib/input/Search';

const { Content } = Layout;

export const Detail =  (props) => {
  const data = props.location.state.item;
  return (
    <Layout style={{ minHeight: '120vh' }}>
      <Layout>
        <MainHeader/>
          <Content style={{ margin: '0 16px' }}>
            <div style= {{display:'inline-block', width: '100%'}}> 
              <div style= {{display: 'inline-block', width: '15%', height: '100%', textAlign:'left', verticalAlign: 'top', marginTop: '30px'}}> 
                <Link to={{
                  pathname: '/main'
                }}>
                  <h2 style= {{marginLeft:'15px'}}>
                    On Market
                  </h2>
                </Link>
                <hr/>
                <h2 style= {{marginLeft:'15px'}}>
                  Status
                </h2>
                <div>
                  <Checkbox style={{fontSize:'20px'}}> Buy Now </Checkbox>
                  <br/>
                  <Checkbox style={{fontSize:'20px'}}> In Auction </Checkbox>
                  <br/>
                  <Checkbox style={{fontSize:'20px'}}> Has Offers </Checkbox>
                </div>
                <hr/>
                <h2 style= {{marginLeft:'15px'}}>
                  Lowest Ask
                </h2>
                <Input placeholder="Minimum    NHC" allowClear style={{paddingLeft: '10px', paddingRight: '10px'}}/>
                <Input placeholder="Maximum   NHC" allowClear style={{paddingLeft: '10px', paddingRight: '10px'}}/>
                <Button style={{width:'93%', textAlign: 'center', marginTop:'10px', marginLeft: '10px', marginBottom: '10px'}} disabled>
                  Apply 
                </Button>
                <hr/>
                <h2 style= {{marginLeft:'15px'}}>
                  Filter
                </h2>
                <Search placeholder="Search Creator" size="default" style={{paddingLeft: '10px', paddingRight: '10px'}}/>
                <Link to={{
                  pathname: '/NFT/photo'
                }}>
                  <h2 style= {{marginLeft:'15px', marginTop: '25px'}}>
                    User Collection
                  </h2>
                </Link>
                <hr/>
              </div> 
              <div style={{display:'inline-block', width: '80%', height:'100%', textAlign: 'center', marginLeft: '15px'}}>
                <div style={{width: '84%', display: 'inline-block'}}></div>
                  <h2 style={{textAlign: 'left', marginTop:'9px'}}>
                    Artwrok Details
                  </h2>
                  <hr/>
                  <br/>
                <div className = 'topImagePart'>
                {(data.dataExt === 'png'
                  || data.dataExt === 'jpeg'
                  || data.dataExt === 'jpg'
                  || data.dataExt === 'bmp'
                  || data.dataExt === 'svg') &&
                    <img className="nftImage" src={"data:image/"+data.type+";base64,"+data.imageFile}/>
                } 
                {!(data.dataExt === 'png'
                  || data.dataExt === 'jpeg'
                  || data.dataExt === 'jpg'
                  || data.dataExt === 'bmp' 
                  || data.dataExt === 'svg') &&
                    <video className="nftVideo" src={"data:video/" + data.dataExt + ";base64,"+data.imageFile} autoPlay loop/>
                } 
              </div>
              <div className="profileLine">
                <div className= "profileBadge">
                  <Avatar src={"/images/" + data.tokenOwner + ".png"}
                    style={{margin: '2%'}}
                  /> 
                  <span className="detailSpan" style={{marginLeft: '5%', fontSize: '20px'}}> @{data.tokenOwner}</span>
                </div>
              </div>
              <div style={{ background: '#fff', padding: 24, minHeight: 400 }}>
                <div className="nftdetailcontent">
                  <div className="content">
                    <h2 style={{fontSize: '40px', textAlign: 'left'}}> {data.tokenDescription} </h2>
                    <div style={{fontSize: '20px'}}>
                      Photo Data Type : <span className="detailSpan">{data.type}</span>
                      <p>설명 설명</p>
                    </div>
                  <div className="badge"> 
                    <img src="/images/etherscan.jpg" className="etherscan"/>
                    <span className="detailSpan" style={{fontSize:"15px"}}>View on Transaction scan</span> 
                  </div>
                  <div className="badge"> 
                    <img src="/images/IPFS.png" className="ipfs"/>
                    <span className="detailSpan" style={{fontSize:"15px"}}>View on IPFS</span> 
                  </div>
                  <div className="badge"> 
                    <img src="/images/block.png" className="metadata"/>
                    <span className="detailSpan" style={{fontSize:"15px"}}>View Metadata</span> 
                  </div>
                </div>
                <div className="priceData">
                  <div className="pricetable">
                    <div className="tokenPriceField"> 
                      <div className="fieldTitle">
                        <p> Assigned Price </p>
                      </div>
                      <div className="fieldData">
                        <p> {data.tokenPrice} NHC </p>
                      </div>
                      <div className="fieldDescription">
                        <p>The price indicates the amount allocated or final traded for artwork trading</p>
                      </div>
                    </div>        
                    <div className="tokenIdField"> 
                      <div className="fieldTitle">
                        <p>Token ID</p>
                      </div>
                      <div className="fieldData">
                        <p>{data.tokenId}</p>
                      </div>
                      <div className="fieldDescription">
                        <p>The token id is a unique number given to the artwork by the network</p>
                      </div>
                    </div>        
                    <div className="tokenUriField"> 
                      <div className="fieldTitle">
                        <p>Token URI</p>
                      </div>
                      <div className="fieldData">
                        <p>{data.tokenURI}</p>
                      </div>
                      <div className="fieldDescription">
                        <p>Token URI is the URI of artwork issued when registered in IPFS</p>
                      </div>
                    </div>        
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>      
      </Content>
    <MainFooter />
    </Layout>
  </Layout>
)}
export default Detail;