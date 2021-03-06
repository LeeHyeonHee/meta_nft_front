import React, { useState } from "react";
import { Menu, Icon } from 'antd';
import { MENU_INFO } from '../../constants'
import SubMenu from "antd/lib/menu/SubMenu";

const MENU = {
  메인페이지: { '메인페이지' : MENU_INFO.Main.path },
  NFT: {
    '그림': MENU_INFO.NFT_Photo.path,
    '영상': MENU_INFO.NFT_Video.path
  }
}

export const SideMenu = (props) => {
  const [ nowPage, setNowPage ] = useState("menu1");
  return (
    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
      {Object.keys(MENU).map((key, i) => {
        let classIndex = `menu${i+1}`;
        return(
          <SubMenu
            key={classIndex}
            title={<span>{key}</span>}
          >
            {Object.keys(MENU[key]).map((innerKey) => {
              return(
                <Menu.Item key={innerKey}> 
                  <a href={MENU[key][innerKey]}> {innerKey} </a>
                </Menu.Item>
              );
            })}
          </SubMenu>  
        )})}
      </Menu>
  )
}