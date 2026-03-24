import { X, Check } from "lucide-react";
import { useState, useEffect } from "react";
import CreatableSelect from "react-select/creatable";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";

export default function EditingTransactionCard({
  transaction,
  onCancel,
  onSave,
}) {
  const [title, setTitle] = useState(transaction.title);
  const [amount, setAmount] = useState(transaction.amount);
  const [date, setDate] = useState(transaction.date);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categoryOptions, setCategoryOptions] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await axiosInstance.get(
          API_PATHS.TRANSACTIONS.GET_CATEGORIES_BY_TYPE(transaction.type),
        );

        const normolizedOptions = response?.data?.map((o) => ({
          label: o.name,
          value: o.id,
        }));

        setCategoryOptions(normolizedOptions || []);

        setSelectedCategory(
          normolizedOptions?.find((o) => o.value === transaction.category_id),
        );
      } catch (err) {
        console.error(err);
      }
    };

    getCategories();
  }, [transaction]);

  const handleSave = () => {
    onSave({
      ...transaction,
      title,
      amount: parseFloat(amount),
      date,
      categoryId: selectedCategory?.value || null,
      categoryName: selectedCategory?.__isNew__
        ? selectedCategory.label
        : undefined,
    });
  };

  return (
    <>
      <div className="w-full">
        <div className="flex justify-between items-center ">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="title"
            autoComplete="off"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="amount"
            type="number"
            min="0.01"
            step="0.01"
            autoComplete="off"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <div className="flex justify-between items-center mt-2 text-sm text-gray-500 ">
          <div className="w-full">
            <CreatableSelect
              isClearable
              value={selectedCategory}
              options={categoryOptions}
              onChange={setSelectedCategory}
            />
          </div>
          <input
            value={date}
            onChange={(e) => setDate(e.target.value)}
            type="date"
            placeholder="date"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
      </div>
      <div className="flex gap-4 items-start">
        <button onClick={handleSave} size={4}>
          <Check className="text-gray-700" />
        </button>
        <button onClick={onCancel} size={4}>
          <X className="text-gray-700" />
        </button>
      </div>
    </>
  );
}
