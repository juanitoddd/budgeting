import React, { useEffect, useState, useRef } from 'react';
import { ConfigProvider, Slider } from 'antd';
import { cyan, magenta, gold, volcano } from '@ant-design/colors';

interface Range {
  id: string,
  label: string,
  color: string[],
  value: number[]
}

export function Ranges() {
  

  // let defaultRanges: Range[] = [
  //   {id:'fixed', label:'Fixed costs', color: cyan, value:[0,50]}, 
  //   {id:'savings', label:'Savings', color: magenta, value:[50,60]}, 
  //   {id:'investment', label:'Investment', color: gold, value:[60,70]}, 
  //   {id:'free', label:'Free guilt spending', color: volcano, value:[70,100]}
  // ]

  const defaultRanges = useRef<Range[]>([
    {id:'fixed', label:'Fixed costs', color: cyan, value:[0,50]}, 
    {id:'savings', label:'Savings', color: magenta, value:[50,60]}, 
    {id:'investment', label:'Investment', color: gold, value:[60,70]}, 
    {id:'free', label:'Free guilt spending', color: volcano, value:[70,100]}
  ]);

  const [ranges, setRanges] = useState<Range[]>([...defaultRanges.current])
  const [drag, setDrag] = useState<string>('idle')

  const onChange = (value: number[], idx: number) => {
    setDrag('active')
    // Make first or last fixed
    if(idx === 0 && value[0] !== 0) return 
    if(idx === ranges.length - 1 && value[1] !== 100) return 

    // Which handle changes
    const prev = defaultRanges.current[idx].value    
    const delta = [prev[0] - value[0], prev[1] - value[1]]

    const _ranges = [...ranges]
    // console.log("🚀 ~ value:", value)
    // console.log("🚀 ~ delta:", delta)
    
    if(delta[0] !== 0 ) {
      if(idx > 0) _ranges[idx - 1].value[1] = value[0]
      console.log("Left", idx)
      // console.log("_range", _ranges[idx - 1])
    }

    if(delta[1] !== 0 ) {
      if(idx < ranges.length - 1) _ranges[idx + 1].value[0] = value[1]
      console.log("Right")
    }

    // console.log("🚀 ~ delta:", delta)
    // console.log('onChange: ', idx, value);
    _ranges[idx].value = value
    setRanges(_ranges);
  };

  useEffect(() => {
    if(drag === 'complete') {
      defaultRanges.current = ranges
      // setDrag('idle')
    }
  }, [drag]);

  const onChangeComplete = () => {
    setDrag('complete')
  };
    
  return (
    <div>
      {ranges.map((range, i) => (
        <ConfigProvider key={i} theme={
          {components: {
            Slider: { 
              handleColor: range.color[2], 
              handleActiveColor: range.color[5],
              dotActiveBorderColor: range.color[2],
              trackBg: range.color[2], 
              trackHoverBg: range.color[3],              
              }
            }
          }} >
          <div>{range.label} - ({range.value[0]},{range.value[1]})</div>
          <Slider 
            range
            onChange={(e) => onChange(e, i)} 
            onChangeComplete={() => onChangeComplete()} 
            value={range.value}
            min={0}
            max={100}
          />
        </ConfigProvider>
      ))}
    </div>
  )
}