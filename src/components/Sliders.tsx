import React, { useState } from 'react';
import { ConfigProvider, Slider } from 'antd';
import { cyan, magenta, gold, volcano } from '@ant-design/colors';
import { Category, setValues } from '../slices/categorySlice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';

export function Sliders() {

  const dispatch = useDispatch<AppDispatch>();
  const categories = useSelector((state: RootState) => state.categories);      
  
  const onChange = (value: number[], idx: number) => {
    // Make first or last fixed
    if(idx === 0 && value[0] !== 0) return 
    if(idx === categories.length - 1 && value[1] !== 100) return

    // const _categories = [...categories];
    const _categories = JSON.parse(JSON.stringify(categories));
    _categories[idx].value = value;
    if(idx > 0) {
      _categories[idx - 1].value = [_categories[idx - 1].value[0], value[0]];
    }
    if(idx < categories.length - 1) {
      _categories[idx + 1].value = [value[1], _categories[idx + 1].value[1]];
    }
    dispatch(setValues(_categories))    
  };
    
  return (
    <div>      

      {categories.map((c: Category, i: number) => (
        <div key={i}>
          <ConfigProvider key={i} theme={
            {components: {
              Slider: { 
                handleColor: c.color[2], 
                handleActiveColor: c.color[5],
                dotActiveBorderColor: c.color[2],
                trackBg: c.color[2], 
                trackHoverBg: c.color[3],              
                }
              }
            }} >
            <h1>{c.label} : {(c.value[1] - c.value[0])}%</h1>        
            <Slider 
              range
              onChange={(e) => onChange(e, i)}
              value={c.value}
              min={0}
              max={100}
            />
          </ConfigProvider>
        </div>
        ))}
    </div>
  )
}