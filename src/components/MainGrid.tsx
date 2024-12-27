import { Responsive, WidthProvider } from "react-grid-layout";
import { Sliders } from "./Sliders";
import { ValueTable } from "./Table";
import { ValueInput } from "./Input";
import { MonthlyCalendar } from "./Calendar";
import { ChartWidget } from "./ChartWidget";

const ResponsiveGridLayout = WidthProvider(Responsive);

export function MainGrid() {
  // {lg: layout1, md: layout2, ...}
  const layout = [
    { i: "title", x: 0, y: 0, w: 3, h: 1, static: true },
    { i: "input", x: 3, y: 0, w: 6, h: 1, static: true },
    { i: "btc", x: 9, y: 0, w: 3, h: 1, static: true },
    // { i: "nvda", x: 8, y: 0, w: 2, h: 1, static: true },
    { i: "slider", x: 0, y: 1, w: 8, h: 3, static: true },
    { i: "table", x: 8, y: 1, w: 4, h: 3, static: true},
    { i: "calendar", x: 0, y: 4, w: 3, h: 2, static: true },
  ];

  const layouts = {lg: layout, md: layout};
  const generalClass = "bg-gray-800 text-white p-4"
  return (
    <ResponsiveGridLayout
      className="layout"
      layouts={layouts}
      breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
      cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
    >
      <div className={generalClass} key="title">        
        <div>Title</div>
      </div>
      <div className={generalClass} key="input">
        <ValueInput />
      </div>
      <div className="bg-gray-800" key="btc">
        {/* <ChartWidget symbol="btcusd" /> */}
        <div>Hello</div>
      </div>      
      <div className={generalClass} key="slider">
        <Sliders />
      </div>
      <div className={generalClass} key="table">
        <ValueTable />
      </div>     
      <div className={generalClass} key="calendar">
        <MonthlyCalendar />
      </div>      
    </ResponsiveGridLayout>
  );
}