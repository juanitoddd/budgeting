import { Responsive, WidthProvider } from "react-grid-layout";
import { Ranges } from "./Ranges";

const ResponsiveGridLayout = WidthProvider(Responsive);

export function MainGrid() {
  // {lg: layout1, md: layout2, ...}
  const layout = [
    { i: "a", x: 0, y: 0, w: 8, h: 3, static: true },
    { i: "b", x: 8, y: 0, w: 4, h: 3, static: true}
  ];

  const layouts = {lg: layout, md: layout};
  const generalClass = "bg-gray-800 text-white p-2"
  return (
    <ResponsiveGridLayout
      className="layout"
      layouts={layouts}
      breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
      cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
    >
      <div className={generalClass} key="a">
        <Ranges />
      </div>
      <div className={generalClass} key="b">B</div>      
    </ResponsiveGridLayout>
  );
}