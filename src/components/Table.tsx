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
      title: 'Spent', 
      key: 'spent',
      dataIndex: 'spent',
      render: (text) => <a>{text} {input.currency}</a>,
    },
    {
      title: 'Target', 
      key: 'target',      
      render: (_, record) => (<div>{(record.value[1] - record.value[0]) * input.income / 100} {input.currency}</div>)
    }
  ];

  const data: Category[] = categories;

  const getRowClass = (record: Category): string => {    
    if( record.spent > (input.income * ((record.value[1] - record.value[0]) / 100) )) {
      return 'bg-red-950'
    }
    if( record.spent === (input.income * ((record.value[1] - record.value[0]) / 100) )) {
      return 'bg-green-900'
    }
    return ''
  }
    
  return (
    <div>
      <ConfigProvider theme={{algorithm: darkAlgorithm}}>
        <Table<Category> rowClassName={(record) => getRowClass(record)} columns={columns} dataSource={data} bordered pagination={false} />
      </ConfigProvider>
    </div>
  )
}