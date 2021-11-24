import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { Avatar, Button, Card, Checkbox, Input, Layout, List } from 'antd';
import { MainHeader } from '../header';
import { MainFooter } from '../Footer';
import { Link } from 'react-router-dom';
import Meta from 'antd/lib/card/Meta';
import { useCookies } from 'react-cookie';
import Loader from '../utils/Loader';
import Search from 'antd/lib/input/Search';
import getProxy from '../../Proxy';

export const Photo= (props) => {
    const [photoData, setPhotoData] = useState([]);
    const [useData, setUseData] = useState([]);
    const [loading, setLoading] = useState(null);
    const [collapsed, setCollapsed] = useState(false);
    const [cookies, setCookie, removeCookie] = useCookies(['userId']);
    const [nftNumber, setNftNumber] = useState(0);
    const [imageNumber, setImageNumber] = useState(0);
    const [videoNumber, setVideoNumber] = useState(0);

    const onCollapse = (collapsed) => {
        setCollapsed(collapsed)
    }

    const { Header, Content, Sider } = Layout;
    const imageFileList = [ "jouk", "donggyu", "hyeonhee", "sangbong", "yul"];
    const apiUrl = getProxy(4100) + "/api/nft-agent/tokenListOf";
    const tokenUrl = getProxy(4200) + "/api/erc20/balanceOf";
    
    let userTkn = cookies.userToken;

    const toBase64 = (arr) => {
      let img = new Buffer.from(arr).toString("base64");
      return img;
    }
    
    const render = () => {
      const result = [];
      let size = 5;
      for(let i = 0; i < imageFileList.length; i++) {
        if(imageFileList[i] != cookies.user_Id){
          result.push(<img key={i} src={"/images/" + imageFileList[i] + ".png"} style={{width: '45px', height: '45px', position: 'absolute', left: size}}/>)
          size += 30;
        }
      }
      return result;
    }
    
    useEffect(async() => {
      const callNftData = async() => {
        try {
          setLoading(true);
          await axios.post(apiUrl,{
            owner: cookies.user_Id
          }).then((res) => {
            res.data.allTokensInfo.map(async(result, idx) => {
              let imgData = await toBase64(result.dataBuffer);
              res.data.allTokensInfo[idx].imageFile = imgData;
          })
          let imageFileList = res.data.allTokensInfo;
          setUseData(imageFileList);
          setNftNumber(imageFileList.length);
          let imageList = imageFileList.filter(res => res.dataExt === 'jpg' 
                                                    || res.dataExt === 'png' 
                                                    || res.dataExt === 'jpeg' 
                                                    || res.dataExt === 'svg');
          setImageNumber(imageList.length);
          setVideoNumber(imageFileList.length - imageList.length);
          setPhotoData(imageList);
        })
      }catch(e){
        console.log(e);
      }
      setLoading(false);
    }

    const getTokenBalance = async() => {
      try {
        await axios.post(tokenUrl, {
          owner: cookies.user_Id
        }).then((res) => {
          setCookie("userToken", res.data.balance);
          userTkn = cookies.userToken;
        })
      } catch(e) {
        console.log(e);
      }
    }
    
    getTokenBalance();
    callNftData()
    }, []);

    if (loading) return( <Loader type="spin" color="#87ceeb" message={"Loading to my photo NFT"} /> )

    return(
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
              <div style={{display:'inline-block', width: '80%', height:'100%', textAlign:'center'}}>
                <div style={{width: '84%', display: 'inline-block'}}>
                  <h2 style={{textAlign: 'left', marginTop:'30px'}}> My Collection </h2>
                  <hr/>
                  <br/>
                  <div style={{display: 'inline-block', width: "100%"}}>
                    <div style={{display: 'inline-block', width: "29%" , float:'left'}}>
                      <div style={{position: '-webkit-sticky', position: 'sticky',top: '0px', height: '450px' , marginTop: '5%', textAlign: 'center', width: '100%'}}>
                        <div className="prifileBox" style={{background: '#BDBDBD', width: '150px', height: '150px', borderRadius: '70%', display:'block', margin: 'auto'}}>
                          <img src={"/images/" + cookies.userPhoto} className="profile" style={{width: '100%', height: '100%', objectFit: 'cover'}}/>
                        </div>
                        <div style={{marginTop:'25px', width:'100%', }}>
                          <div style={{fontSize:'45px'}}>  
                            <div style={{color: "#2a3434", verticalAlign:'center', display:'inline-block'}}>  
                              <p style={{display:'inline-block', float:'left'}}>@{cookies.user_Id}  </p>
                              <p style={{border: "solid 2px #a5a7a7", display:'inline-block', verticalAlign: 'middle', fontSize: "20px", padding: '7px 20px', borderRadius: '10px', marginBottom:'10px', cursor: "pointer", marginLeft: '10px'}}> Follow </p> 
                            </div>
                          </div>
                        <div style={{display: 'flex', fontSize: '30px', color: '#2a3434', fontWeight: 'bold'}}>
                          <div style={{flex: '1'}}>
                            572
                          </div>
                          <div style={{flex: '1'}}>
                            1,119
                          </div>
                          <div style={{flex: '1'}}>
                            845
                          </div>
                        </div>
                        <div style={{display: 'flex', fontSize: '20px', color: '#a5a7a7', fontWeight: 'bold'}}>
                          <div style={{flex: '1'}}>
                            Following
                          </div>
                          <div style={{flex: '1'}}>
                            Followers
                          </div>
                          <div style={{flex: '1'}}>
                            Likes
                          </div>
                        </div>
                        <div style={{color: "#2a3434", fontWeight:"bold", fontSize: '20px', textAlign: 'left', marginLeft: '15px'}}> Followed By  </div>
                          <div style={{width: '100%', height: '100%', textAlign:'left', marginLeft: '10px'}}>
                            {render()}
                          </div>
                        <div style={{color: '#a5a7a7', textAlign: 'left', fontSize:'20px', marginLeft: '15px', fontWeight: 'bold', cursor: 'pointer', marginBottom: '10px', marginTop:'50px'}}> View All </div>
                          <hr/>
                          <div style={{textAlign: 'left'}}>
                            <h2>Token 
                              <span> {userTkn} NHC</span>
                            </h2> 
                            <p>Latest Transaction Hash</p>
                            <p style={{border: "solid 1px #a5a7a7", display:'inline-block', verticalAlign: 'middle', fontSize: "20px", padding: '7px 20px', borderRadius: '0.5rem', marginBottom:'10px', cursor: "pointer", }}> 0xff7e1c61758a1efbed9f5f5c0c984491... </p> 
                            <p style={{border: "solid 1px #a5a7a7", display:'inline-block', verticalAlign: 'middle', fontSize: "20px", padding: '7px 20px', borderRadius: '0.5rem', marginBottom:'10px', cursor: "pointer", }}> 0xdff494676fd7b8a17a1a84f2f617ea5b... </p> 
                            <p style={{border: "solid 1px #a5a7a7", display:'inline-block', verticalAlign: 'middle', fontSize: "20px", padding: '7px 20px', borderRadius: '0.5rem', marginBottom:'10px', cursor: "pointer", }}> 0xff1a84f2f6758a1efbed9f5f5c0758a1e... </p> 
                          </div>
                          <hr/>
                          <div style={{textAlign: 'left'}}>
                            <h2 style={{fontSize: '30px', fontWeight:'bold'}}>Collection 
                              <span style={{fontSize: '25px', fontWeight:'normal', marginLeft: '25px'}}>total {nftNumber} artworks</span>
                            </h2>
                            <div style={{color:'#2a3434', fontSize:'25px', fontWeight:'bold'}}> 
                              <Link to={{pathname: '/NFT/photo'}} > 
                                <span style={{color:'#2a3434',width: '100px', display:'inline-block', textAlign:'center'}}>{imageNumber}</span> 
                              </Link> 
                              <Link to={{pathname: '/NFT/video'}}> 
                                <span style={{width: '100px',color:'#2a3434',display:'inline-block', textAlign:'center'}}>{videoNumber}</span>
                              </Link> 
                            </div>
                            <div style={{color:'#a5a7a7', fontSize: '25px', fontWeight:'bold'}}> 
                              <Link to={{pathname: '/NFT/photo'}}> 
                                <span style={{color:'#a5a7a7',width: '100px', display: 'inline-block', textAlign:'center'}}>Picture</span> 
                              </Link> 
                              <Link to={{pathname: '/NFT/video'}} > 
                                <span style={{color:'#a5a7a7',width: '100px', display:'inline-block', textAlign:'center'}} >Video</span> 
                              </Link> 
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div style={{width: "69%", float: 'right'}}> 
                      <List
                        grid={{
                        gutter: 0,
                        xs: 3,
                        sm: 2,
                        md: 3,
                        lg: 3,
                        xl: 3,
                        xxl: 3,
                      }}
                      dataSource={photoData}
                      renderItem={item=> (
                        <Link to ={{
                          pathname: '/detail',
                          state: {item}
                        }}>
                          <List.Item className="card_object">
                            <Card
                              cover={
                                <img src={"data:image/"+item.dataExt+";base64," + toBase64(item.dataBuffer)} alt="NFT" height="300px;" width="200px"/>
                              }
                              style={{textAlign: 'left'}}
                            >
                              <Meta title={item.tokenDescription} />
                              <Avatar src={"/images/" + cookies.userPhoto} 
                                style={{margin: '2%'}}
                              /> 
                              <span className="nftowner"> @{item.tokenOwner} </span>
                            </Card>
                            <div className="purchaseinfo" >
                                <div className="information"> 
                                  <span className="bid"> Current Bid </span>
                                </div>
                                <div className="realdata">
                                  <span className="bid">{item.tokenPrice} NHC</span> 
                                </div>
                            </div>
                          </List.Item>
                        </Link>
                      )}
                    />
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
export default Photo;
