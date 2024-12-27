import React, { useEffect, useState } from 'react';
import { ConfigProvider, Progress, ProgressProps, Slider, SliderSingleProps, Space } from 'antd';
import { cyan, magenta, gold, volcano } from '@ant-design/colors';
import { useMeasure } from "@uidotdev/usehooks";
import { Category, setValues } from '../slices/categorySlice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { InputState } from '../slices/inputSlice';

export function Sliders() {

  const dispatch = useDispatch<AppDispatch>();
  const categories = useSelector((state: RootState) => state.categories);
  const input: InputState = useSelector((state: RootState) => state.input);
  
  const [ref, { width, height }] = useMeasure();
  
  // Store the size of bars
  const [bars, setBars] = useState<number[][]>([])
  
  const [progress, setProgress] = useState<number[]>([])
  
  useEffect(() => {        
    const _bars = categories.map((category: Category) => [category.value[0] * (width || 0) / 100, category.value[1] * (width || 0) / 100])
    setBars(_bars);     
  }, [width, height, categories]);

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

  const formatter: NonNullable<SliderSingleProps['tooltip']>['formatter'] = (value) => `${value}%`;
  
  const progressGradient: ProgressProps['strokeColor'] = {
    '0%': '#1677ff',    
    '100%': '#52c41a',
  };

  const progressFormatter = (p: number | undefined): string => {
    if(!p) return '0%'
    return `${Math.round(p)}%`    
  }

  const getRelativePercentage = (c: Category): number => c.spent * 100 / (input.income * (c.value[1] - c.value[0]) / 100)

  const getItemNominal = (c: Category): number => input.income * (c.value[1] - c.value[0]) / 100

  return (
    <div ref={ref}>
      {categories.map((c: Category, i: number) => (
        <div key={i} className="mb-5">
          <ConfigProvider key={i} theme={
            {components: 
              {
                Slider: {
                  railBg: "rgba(0, 0, 0, 1)"
                  // handleColor: c.color[2], 
                  // handleActiveColor: c.color[5],
                  // dotActiveBorderColor: c.color[2],
                  // trackBg: c.color[2], 
                  // trackHoverBg: c.color[3],              
                },
                Progress: {
                  colorText: '#fff',
                  remainingColor: 'rgba(190, 190, 190, 0.3)'
                }
              }
            }} >
            <div className="flex w-full justify-between mb-2">
              <div><span className='font-bold text-xl'>{c.label}</span> <Space /> {(c.value[1] - c.value[0])}%</div>              
              <div className='font-bold text-xl'>{c.spent} {input.currency} / {getItemNominal(c)} {input.currency}</div>              
            </div>            
            <Slider
              style={{margin: '0px 5px'}}
              range
              tooltip={{ formatter }}
              onChange={(e) => onChange(e, i)}
              value={c.value}
              min={0}
              max={100}
            />
            {width && height && input.income ? 
              <div className="relative" style={{left: bars[i][0], width: (bars[i][1] - bars[i][0])}}>                
                {c.spent <= (input.income * ((c.value[1] - c.value[0]) / 100)) ?
                  <Progress
                    strokeColor={progressGradient}
                    size="small" 
                    format={(percent) => progressFormatter(percent)}
                    percent={getRelativePercentage(c)} 
                    status={'active'} 
                    percentPosition={{ align: 'center', type: 'outer' }} />
                  :
                  <Progress                    
                    size="small" 
                    format={() => `${getRelativePercentage(c)}%`}
                    percent={100} 
                    status={'exception'} 
                    percentPosition={{ align: 'center', type: 'outer' }} />
                }                               
              </div>
              : null            
            }
          </ConfigProvider>
        </div>
        ))}
    </div>
  )
}