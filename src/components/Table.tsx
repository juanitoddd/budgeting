import React, { useState } from 'react';
import { ConfigProvider, Table, theme } from 'antd';

import type { TableProps } from 'antd';
import { useDispatch, useSelector} from 'react-redux'
import { AppDispatch, RootState } from '../../store/store';
import { Category } from '../slices/categorySlice';
import { InputState } from '../slices/inputSlice';

export function ValueTable() {          
  // const dispatch = useDispatch<AppDispatch>();
  const categories = useSelector((state: RootState) => state.categories);
  const input: InputState = useSelector((state: RootState) => state.input);  
  const { darkAlgorithm } = theme; 

  const columns: TableProps<Category>['columns'] = [
    {
      title: 'Purpose',
      dataIndex: 'label',
      key: 'label',
      render: (text) => <a>{text}</a>,
    },    
    {
      title: 'Percentage', 
      key: 'percentage',
      render: (_, record) => (<div>{(record.value[1] - record.value[0])}%</div>)
    },
    {
      title: 'Value', 
      key: 'value',      
      render: (_, record) => (<div>{(record.value[1] - record.value[0]) * input.income / 100}</div>)
    }
  ];

  const data: Category[] = categories;  
    
  return (
    <div>
      <ConfigProvider theme={{algorithm: darkAlgorithm}}>
        <Table<Category> columns={columns} dataSource={data} bordered pagination={false} />
      </ConfigProvider>
    </div>
  )
}