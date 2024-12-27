import React, { useEffect, useState } from 'react';
import { useMeasure } from "@uidotdev/usehooks";
import { MiniChart } from 'react-tradingview-embed';

export function ChartWidget({symbol}: {symbol: string}) {
  const [ref, { width, height }] = useMeasure();  

  return (        
    <div ref={ref}>        
      <MiniChart widgetProps={{height: height || 150, width: width || 300, symbol}} />                
    </div>
  )
}