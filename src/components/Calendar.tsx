import React, { useEffect, useState } from 'react';
import { Calendar, CalendarProps, ConfigProvider, theme } from 'antd';

import {useDispatch, useSelector} from 'react-redux'
import { AppDispatch, RootState } from '../store/store';
import { InputState, setCurrency, setIncome } from '../slices/inputSlice';
import { Dayjs } from 'dayjs';

export function MonthlyCalendar() {          
  const dispatch = useDispatch<AppDispatch>();
  const input: InputState = useSelector((state: RootState) => state.input);

  const [prefix, setPrefix] = useState<string>('')
  const { darkAlgorithm } = theme;

  const onPanelChange = (value: Dayjs, mode: CalendarProps<Dayjs>['mode']) => {
    console.log(value.format('YYYY-MM-DD'), mode);
  };

  return (
    <div>
      <ConfigProvider theme={{algorithm: darkAlgorithm}}>        
        <Calendar fullscreen={false} onPanelChange={onPanelChange} />
      </ConfigProvider>
    </div>
  )
}