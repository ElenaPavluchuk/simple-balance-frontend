export default function TotalCard({ icon, label, total, symbol, color }) {
  return (
    <div className="flex gap-6 bg-white p-6 rounded-2xl shadow-md shadow-gray-100 border border-gray-200/50">
      <div
        className={`w-14 h-14 flex items-center justify-center text-2xl text-white ${color} rounded-full drop-shadow-xl`}
      >
        {icon}
      </div>
      <div>
        <h6 className="text-sm text-gray-500 mb-1"> {label}</h6>
        <div className="flex flex-row gap-2">
          <p className="text-xl">{symbol}</p>
          <p className="text-xl">{total}</p>
        </div>
      </div>
    </div>
  );
}
