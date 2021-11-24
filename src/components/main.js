import React, { useEffect, useState } from 'react';
import { Layout, List, Card, Avatar, Checkbox, Input, Button, Pagination } from "antd";
import "../css/main.css";
import "antd/dist/antd.css"
import axios from "axios";
import { MainFooter } from './Footer';
import { MainHeader } from './header';
import Icon from '@ant-design/icons';
import Loader from './utils/Loader';
import { useCookies } from 'react-cookie';
import { Link } from 'react-router-dom';
import filetype from "file-type";
import Search from 'antd/lib/input/Search';
import getProxy from "../Proxy";

const { Content } = Layout;

const { Meta } = Card;

const HeartSvg = () => (
  <svg width="1em" height="1em" fill="currentColor" viewBox="0 0 1024 1024">
    <path d="M923 283.6c-13.4-31.1-32.6-58.9-56.9-82.8-24.3-23.8-52.5-42.4-84-55.5-32.5-13.5-66.9-20.3-102.4-20.3-49.3 0-97.4 13.5-139.2 39-10 6.1-19.5 12.8-28.5 20.1-9-7.3-18.5-14-28.5-20.1-41.8-25.5-89.9-39-139.2-39-35.5 0-69.9 6.8-102.4 20.3-31.4 13-59.7 31.7-84 55.5-24.4 23.9-43.5 51.7-56.9 82.8-13.9 32.3-21 66.6-21 101.9 0 33.3 6.8 68 20.3 103.3 11.3 29.5 27.5 60.1 48.2 91 32.8 48.9 77.9 99.9 133.9 151.6 92.8 85.7 184.7 144.9 188.6 147.3l23.7 15.2c10.5 6.7 24 6.7 34.5 0l23.7-15.2c3.9-2.5 95.7-61.6 188.6-147.3 56-51.7 101.1-102.7 133.9-151.6 20.7-30.9 37-61.5 48.2-91 13.5-35.3 20.3-70 20.3-103.3 0.1-35.3-7-69.6-20.9-101.9z" />
  </svg>
);



const toBase64 = (arr) => {
    let a = new Buffer.from(arr).toString("base64");
    return a;
  }
const Base64 = async (arr) => {
  let a =  new Buffer.from(arr);
  let fileType = await filetype.fromBuffer(a);

  return [fileType.ext, a.toString('base64')];
}
  
const HeartIcon = props => <Icon component={HeartSvg} {...props} />


export const Main = (props) => {
  
  const [loading, setLoading] = useState(null);
  const [nftData, setNftData] = useState([]);
  const [cookies, setCookie, removeCookie] = useCookies(['userId']);
  const apiUrl = getProxy(4100) + "/api/nft-agent/getAllTokensInfo";
  const tokenUrl = getProxy(4200) + "/api/erc20/balanceOf";

  useEffect(async() => {

    const getTokenBalance = async() => {
      try {
        await axios.post(tokenUrl, {
          owner: cookies.user_Id
        }).then((res) => {
          setCookie("userToken", res.data.balance);
        })
      } catch(e) {
        console.log(e);
      }
    }

    const callNftData = async() => {
      try{
        setLoading(true);
        await axios.get(apiUrl).then(async(res) => {
          res.data.allTokensInfo.map(async(result, idx) => {
            let imgData = await Base64(result.dataBuffer);
            res.data.allTokensInfo[idx].type = imgData[0];
            res.data.allTokensInfo[idx].imageFile = imgData[1];

          })
          setNftData(res.data.allTokensInfo); 
        });
      }catch(e){
        console.log(e);
        // throw (e);
      }
      setLoading(false);
    } 

    getTokenBalance();
    callNftData();
  }, []);

  
  if (loading) return( <Loader type="spin" color="#87ceeb" message={"Loading to NFT"} />);


  return(

    <Layout style={{ minHeight: '120vh' }}>
      <Layout>
        <MainHeader/>
          <Content style={{ margin: '0 16px' }}>
            <div style={{width: '100%', height: '100%', textAlign: 'center'}}> 
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
                  <div >
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
                  <Button style={{width:'93%', textAlign: 'center', marginTop:'10px', marginLeft: '10px', marginBottom: '10px'}}  disabled>
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
                <div style={{display:'inline-block', width: '80%', height:'100%'}}>
                  <div style={{width: '84%', display: 'inline-block'}}>
                    <h2 style={{textAlign: 'left', marginTop: '30px'}}>
                      {/* <HeartIcon style={{color: 'hotpink'}} /> */}
                    Hot artworks   </h2>
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
                        dataSource={nftData}
                        renderItem={item => (
                          <Link to ={{
                              pathname: '/detail',
                              state: {item}
                          }}> 
                          <List.Item className="card_object">
                            {(item.dataExt === 'png'
                              || item.dataExt === 'jpeg'
                              || item.dataExt === 'jpg'
                              || item.dataExt === 'bmp'
                              || item.dataExt === 'svg')
                            &&
                              <Card 
                                cover = {
                                  <img src={`data:image/${item.dataExt};base64,${toBase64(item.dataBuffer)}`} alt="NFT" height="350px;" />
                                  // <img src={"data:image/"+item.type+";base64," + item.imageFile} alt="NFT" height="350px;"/>
                                  // <img src= "data:image/png;base64,"/>
                                }
                                style={{textAlign: 'left'}}
                              >
                                <Meta title={item.tokenDescription} />
                                <Avatar src={"/images/" + item.tokenOwner + ".png"} 
                                  style={{margin: '2%'}}
                                  /> 
                                <span className="nftowner"> @{item.tokenOwner} </span>
                              </Card>
                            }
                            {!(item.dataExt === 'png'
                              || item.dataExt === 'jpeg'
                              || item.dataExt === 'jpg'
                              || item.dataExt === 'bmp'
                              || item.dataExt === 'svg')
                            &&
                              <Card 
                                cover = {
                                  <video src={"data:video/"+item.dataExt+";base64," + toBase64(item.dataBuffer)} alt="NFT" height="350px;" autoPlay loop muted />
                                  // <img src={"data:image/"+item.dataExt+";base64," + toBase64(item.dataBuffer)} alt="NFT" height="350px;"/>
                                  // <img src={"data:image/"+item.type+";base64," + item.imageFile} alt="NFT" height="350px;"/>
                                  // <img src= "data:image/png;base64,"/>
                                }
                                style={{textAlign: 'left'}}
                              >
                                <Meta title={item.tokenDescription} />
                                <Avatar src={"/images/" + item.tokenOwner + ".png"}
                                  style={{margin: '2%'}}
                                  /> 
                                <span className="nftowner"> @{item.tokenOwner} </span>
                                
                                    {/* <Card title= "Current bid"> 2312313</Card> */}
                              </Card>
                            }
                                <div className="purchaseinfo" >
                                  <div className="information"> <span className="bid"> Current Bid </span>   </div>
                                  <div className="realdata"><span className="bid">{item.tokenPrice} NHC</span> </div>
                                </div>
                          </List.Item>
                          </Link>
                        )}
                      /> {/* <Pagination defaultCurrent={1} total={50} pageSize={9}/> */}
                    </div>
                  </div>
                </div>
              </div>
            </Content>
          <MainFooter />
        </Layout>
      </Layout>
    )
  }
export default Main;







