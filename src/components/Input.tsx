import React, { useEffect, useState } from 'react';
import { ConfigProvider, InputNumber, Select, theme } from 'antd';

import type { TableProps } from 'antd';
import {useDispatch, useSelector} from 'react-redux'
import { AppDispatch, RootState } from '../store/store';
import { FaMoneyBillAlt } from 'react-icons/fa';
import { InputState, setCurrency, setIncome } from '../slices/inputSlice';

export function ValueInput() {          
  const dispatch = useDispatch<AppDispatch>();
  const input: InputState = useSelector((state: RootState) => state.input);   

  const [prefix, setPrefix] = useState<string>('')
  const { darkAlgorithm } = theme;   
  
  const onChange = (e) => {
    console.log("e", e)
    dispatch(setIncome(e))
  }

  const handleChange = (e) => {
    console.log("e", e)
    dispatch(setCurrency(e))
  }

  useEffect(() => {
    console.log("change", input.currency)
    setPrefix(input.currency);
  }, [input.currency]);
  
  const getFormat = (value: string) => {
    return `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }

  return (
    <div>
      <ConfigProvider theme={{algorithm: darkAlgorithm}}>
        <div className='flex'>

          <Select
            defaultValue="€"
            style={{ width: 120 }}
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