import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { Breadcrumb, Layout } from 'antd';
import { SideMenu } from '../SideMenu';
import { MainHeader } from '../header';
import { MainFooter } from '../Footer';



export const Photo= (props) => {
    const [photoData, setPhotoData] = useState({});
    const [collapsed, setCollapsed] = useState(false);
    const onCollapse = (collapsed) => {
        setCollapsed(collapsed)
    }
    const getPhotoInfo = async () => {
        axios.get("/NFT/photo").then((res) => setPhotoData(res));
    }
    const { Header, Content, Sider } = Layout;
    useEffect(() => {
        getPhotoInfo();
    }, []);


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
                    <Breadcrumb.Item>그림</Breadcrumb.Item>
                </Breadcrumb>
            <div>
                으앵ㅇ으앵
                {console.log(photoData)}
            </div>
         </Content>
         <MainFooter />
       </Layout>
     </Layout>


           
        </>
    )

}

export default Photo;
