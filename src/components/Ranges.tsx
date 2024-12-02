import React, { useState } from 'react';
import { ConfigProvider, Slider } from 'antd';
import { cyan, magenta, gold, volcano } from '@ant-design/colors';

const categories: any[] = [
  {id:'fixed', label:'Fixed costs', color: cyan, value:[0,50]}, 
  {id:'savings', label:'Savings', color: magenta, value:[50,60]}, 
  {id:'investment', label:'Investment', color: gold, value:[60,70]}, 
  {id:'free', label:'Free guilt spending', color: volcano, value:[70,100]}
]

export function Ranges() {
  const onChange = (value: number | number[], index: number) => {
    console.log('onChange: ', value, index);
  };
  
  // const { useToken } = antdTheme
  // const { token: theme } = useToken() 
  return (
    <div>
      {categories.map((category, i) => (
        <ConfigProvider theme={
          {components: {
            Slider: { 
              handleColor: category.color[2], 
              handleActiveColor: category.color[5],
              dotActiveBorderColor: category.color[2],
              trackBg: category.color[2], 
              trackHoverBg: category.color[3],              
              }
            }
          }} >
          <div>{category.label}</div>
          <Slider onChange={(e) => onChange(e, i)} range defaultValue={category.value} />
        </ConfigProvider>
      ))}
    </div>
  )
}