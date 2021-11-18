import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { Breadcrumb, Layout } from 'antd';

import { SideMenu } from '../SideMenu';
import { MainHeader } from '../header';
import { MainFooter } from '../Footer';


export const Video= (props) => {
    const { Header, Content, Sider } = Layout;
    const [collapsed, setCollapsed] = useState(false);
    const onCollapse = (collapsed) => {
        setCollapsed(collapsed)
    }
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
        <div>
            으앵ㅇ으앵
        </div>
         </Content>
         <MainFooter />
       </Layout>
     </Layout>
        
           
        </>
    )

}


export default Video;