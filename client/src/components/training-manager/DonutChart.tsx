import { useMemo, useState } from "react";

const RADIUS = 80; // bán kính vòng
const STROKE = 28; // độ dày vòng

export type DonutItem = {
  label: string;
  value: number;
  color: string;
};

type DonutChartProps = {
  title: string;
  items: DonutItem[];
};

type Segment = {
  length: number;
  offset: number;
  color: string;
};

function DonutChart({ title, items }: DonutChartProps) {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const total = useMemo(
    () => items.reduce((sum, it) => sum + it.value, 0) || 1,
    [items]
  );

  const circumference = useMemo(() => 2 * Math.PI * RADIUS, []);

  const segments: Segment[] = useMemo(() => {
    let offsetAcc = 0;
    return items.map((item) => {
      const length = (item.value / total) * circumference;
      const seg: Segment = {
        length,
        offset: offsetAcc,
        color: item.color,
      };
      offsetAcc += length;
      return seg;
    });
  }, [items, total, circumference]);

  const activeItem = hoverIndex !== null ? items[hoverIndex] ?? null : null;

  return (
    <div className="chart-box">
      <div className="donut-wrapper">
        <svg className="donut-svg" viewBox="0 0 210 210">
          {/* quay -90 độ để bắt đầu ở trên đỉnh như design */}
          <g transform="rotate(-90 105 105)">
            {segments.map((seg, index) => {
              const isActive = hoverIndex === index;
              const radius = RADIUS + (isActive ? 2 : 0); // nổi lên nhẹ
              const strokeWidth = isActive ? STROKE + 4 : STROKE;

              // nếu value = 0 thì bỏ qua, khỏi vẽ
              if (seg.length <= 0) return null;

              return (
                <circle
                  key={index}
                  cx={105}
                  cy={105}
                  r={radius}
                  fill="none"
                  stroke={seg.color}
                  strokeWidth={strokeWidth}
                  strokeDasharray={`${seg.length} ${circumference}`}
                  strokeDashoffset={-seg.offset}
                  style={{
                    cursor: "pointer",
                    transition: "all 0.2s ease-out",
                  }}
                  onMouseEnter={() => setHoverIndex(index)}
                  onMouseLeave={() => setHoverIndex(null)}
                />
              );
            })}
          </g>
        </svg>

        {/* % ở giữa + tooltip đen bên cạnh */}
        {activeItem && (
          <>
            <div className="donut-center">
              {/* <span>{activeItem.value}%</span> */}
            </div>
            <div className="donut-tooltip">
              {activeItem.label}: {activeItem.value}%
            </div>
          </>
        )}
      </div>

      <h4 className="chart-title">{title}</h4>

      {/* legend, hover vào cũng sync với vòng */}
      <div className="legend">
        {items.map((item, index) => (
          <div
            key={item.label}
            className="legend-row"
            onMouseEnter={() => setHoverIndex(index)}
            onMouseLeave={() => setHoverIndex(null)}
          >
            <span className="dot" style={{ backgroundColor: item.color }} />
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DonutChart;
