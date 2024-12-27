import React, { useEffect, useState } from 'react';
import { ConfigProvider, InputNumber, Select, theme } from 'antd';

import {useDispatch, useSelector} from 'react-redux'
import { AppDispatch, RootState } from '../store/store';
import { InputState, setCurrency, setIncome } from '../slices/inputSlice';

export function ValueInput() {          
  const dispatch = useDispatch<AppDispatch>();
  const input: InputState = useSelector((state: RootState) => state.input);   

  const [prefix, setPrefix] = useState<string>('')
  const { darkAlgorithm } = theme;   
  
  const onChange = (e) => {    
    dispatch(setIncome(e))
  }

  const handleChange = (e) => {
    console.log("e", e)
    dispatch(setCurrency(e))
  }

  useEffect(() => {    
    setPrefix(input.currency);
  }, [input.currency]);
  
  const getFormat = (value: string) => {
    return `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }

  return (
    <div>
      <ConfigProvider theme={{algorithm: darkAlgorithm}}>
        <h1 className="text-lg mb-2 font-bold text-2xl">Monthly Income Total</h1>
        <div className='flex'>
          <Select
            size="large" 
            defaultValue="€"
            style={{ width: 100 }}
            onChange={handleChange}
            options={[
              { value: '$', label: 'Dollar $' },
              { value: '€', label: 'Euro €' },
            ]}
          />
          <InputNumber
            style={{ width: '300px' }} 
            formatter={(value) => getFormat(value)}
            parser={(value) => value?.replace(/\$\s?|(,*)/g, '') as unknown as number}
            size="large" 
            prefix={prefix} 
            onChange={onChange} 
            />
        </div>
      </ConfigProvider>
    </div>
  )
}