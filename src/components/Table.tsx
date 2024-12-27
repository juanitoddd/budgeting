import React, { useState } from 'react';
import { ConfigProvider, Table, theme } from 'antd';

import type { TableColumnsType, TableProps } from 'antd';
import { useDispatch, useSelector} from 'react-redux'
import { AppDispatch, RootState } from '../../store/store';
import { Category, Item } from '../slices/categorySlice';
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
      width: 160,
      render: (text) => <span>{text}</span>,
    },        
    {
      title: 'Total', 
      key: 'spent',
      dataIndex: 'spent',      
      render: (_, record) => <div><span></span>{record.items.reduce((acc, cur) => acc + cur.value, 0)} {input.currency} <span>/</span> <span>{(record.value[1] - record.value[0]) * input.income / 100} {input.currency}</span></div>,
    },    
    {
      title: 'Percentage', 
      key: 'percentage',
      render: (_, record) => (<div>{(record.value[1] - record.value[0])}%</div>)
    },
  ];

  const data: Category[] = categories.map((_:Category, i: number) => ({..._, key: i.toString()}));

  const expandColumns = (index: number) => {
    // const category = categories[index];
    // const total = input.income * ((category.value[1] - category.value[0]) / 100)    
    const columns: TableColumnsType<Item> = [
      { dataIndex: 'label', key: 'label', width: 160},
      { dataIndex: 'value', key: 'value', render: (text) => `${text} ${input.currency}`},    
      { key: 'percentage', render: (_, record) => (<div>{`${input.income ? Math.round(record.value * 100 / input.income) : 0}`}%</div>) },
      // { key: 'percentage', render: (_, record) => (<div>{`${record.value}`}</div>) },
    ];
    return columns
  }  

  const expandDataSource = (index: number) => {    
    return categories[index].items.map<Item>((_: Item, i:number) => ({..._, key: i.toString()}))      
  }  

  const expandedRowRender = (record: Category, index: number) => (
    <div>    
      <Table<Item>
        showHeader={false}
        columns={expandColumns(index)}
        bordered
        dataSource={expandDataSource(index)}
        pagination={false}
      />
    </div>
  );

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
      <ConfigProvider theme={{
        algorithm: darkAlgorithm, 
        components: {
          Table: {
            headerBorderRadius: 0
          }
        }
      }}>
        <Table<Category> 
          rowClassName={(record) => getRowClass(record)} 
          columns={columns} 
          dataSource={data} 
          bordered
          pagination={false}
          size="small"
          expandable={{ expandedRowRender }}
        />
      </ConfigProvider>
    </div>
  )
}