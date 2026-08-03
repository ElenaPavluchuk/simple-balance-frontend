export default function CustomLegend({ payload }) {
  return (
    <div className="flex flex-wrap justify-center gap-2 mt-4 space-x-6">
      {payload.map((entry, index) => (
        <div key={`legend-${index}`} className="flex items-center sapce-x-2">
          <div
            className="w-2.5 h-2.5 rounded-full mr-1"
            style={{ backgroundColor: entry.payload.color }}
          ></div>
          <span className="text-xs font-medium text-cyan-900">
            {entry.value}
          </span>
        </div>
      ))}
    </div>
  );
}
