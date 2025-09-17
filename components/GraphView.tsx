
import React, { useMemo, useState, useEffect } from 'react';

// Recharts is loaded from CDN, so we will access it via the window object inside the component.
declare const math: any;

interface GraphViewProps {
  func: string;
}

type PlotPoint = {
    x: number;
    y: number | null;
};

export const GraphView: React.FC<GraphViewProps> = ({ func }) => {
  const [Recharts, setRecharts] = useState<any>(null);

  useEffect(() => {
    // Poll to wait for the Recharts library to be loaded from the CDN.
    const intervalId = setInterval(() => {
      if ((window as any).Recharts) {
        setRecharts((window as any).Recharts);
        clearInterval(intervalId);
      }
    }, 100);

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);

  const data = useMemo(() => {
    if (!func) return [];
    
    const plotData: PlotPoint[] = [];
    const step = 0.1;
    const range = { min: -10, max: 10 };

    try {
        const node = math.parse(func);
        const code = node.compile();

        for (let x = range.min; x <= range.max; x += step) {
            const y = code.evaluate({ x: x });
            if (typeof y === 'number' && isFinite(y)) {
                plotData.push({ x: Number(x.toFixed(2)), y });
            } else {
                // To create gaps in the line for asymptotes etc.
                 plotData.push({ x: Number(x.toFixed(2)), y: null });
            }
        }
        return plotData;
    } catch(e) {
        console.error("Graphing error:", e);
        return [];
    }
  }, [func]);
  
  const domain = useMemo(() => {
    const yValues = data.map(d => d.y).filter(y => y !== null) as number[];
    if(yValues.length === 0) return [-10, 10];
    const min = Math.min(...yValues);
    const max = Math.max(...yValues);
    const padding = Math.max(1, (max-min) * 0.1);
    return [Math.floor(min - padding), Math.ceil(max + padding)];
  }, [data]);

  if (!Recharts) {
    return (
        <div className="bg-[#a0b89a] text-gray-800 font-mono rounded-sm p-1 h-32 w-full flex items-center justify-center">
            <p>Loading Chart...</p>
        </div>
    );
  }

  const { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } = Recharts;

  return (
    <div className="bg-[#a0b89a] text-gray-800 font-mono rounded-sm p-1 h-32 w-full">
      {data.length > 0 ? (
         <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 5, left: -25, bottom: -10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#888" />
                <XAxis dataKey="x" type="number" domain={[-10, 10]} tick={{fontSize: 10}} />
                <YAxis type="number" domain={domain} tick={{fontSize: 10}}/>
                <Tooltip 
                  labelStyle={{color: '#333'}} 
                  itemStyle={{color: '#0d6efd'}}
                  formatter={(value: number) => value.toFixed(2)}
                />
                <Line type="monotone" dataKey="y" stroke="#0d6efd" strokeWidth={2} dot={false} connectNulls={false} />
            </LineChart>
        </ResponsiveContainer>
      ) : (
          <div className="flex items-center justify-center h-full text-red-700 font-bold">
              INVALID FUNCTION
          </div>
      )}
    </div>
  );
};
