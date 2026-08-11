import PropTypes from "prop-types";

ContentTabs.propTypes = {
  activeTab: PropTypes.string.isRequired,
  setActiveTab: PropTypes.func.isRequired,
  tabs: PropTypes.object.isRequired,
};

export default function ContentTabs({ activeTab, setActiveTab, tabs }) {
  return (
    <div className="flex gap-8 mt-6 border-b border-gray-200 md:w-1/2">
      <button
        onClick={() => setActiveTab(tabs.NEWS)}
        className={`pb-2 text-sm font-medium ${
          activeTab === "News"
            ? "text-emerald-700 border-b-2 border-emerald-700"
            : "text-slate-500 hover:text-slate-800"
        }`}
      >
        {tabs.NEWS}
      </button>
      <button
        onClick={() => setActiveTab(tabs.EXCHANGE_RATES)}
        className={`pb-2 text-sm font-medium ${
          activeTab === "Exchange rates"
            ? "text-emerald-700 border-b-2 border-emerald-700"
            : "text-slate-500 hover:text-slate-800"
        }`}
      >
        {tabs.EXCHANGE_RATES}
      </button>
    </div>
  );
}
