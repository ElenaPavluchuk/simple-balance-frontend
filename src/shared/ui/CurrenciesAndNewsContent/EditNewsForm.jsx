import { useState } from "react";
import { X, Check } from "lucide-react";
import { newsValidate, clearFieldError } from "../../utils/validate";

export default function EditNewsForm({ item, onSave, onCancel }) {
  const [newTitle, setNewTitle] = useState(item.title);
  const [newContent, setNewContent] = useState(item.content);
  const [validateErrors, setValidateErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = newsValidate({ title: newTitle, content: newContent });
    setValidateErrors(errors);

    if (Object.keys(errors).length) return;

    const data = {
      title: newTitle.trim(),
      content: newContent.trim(),
    };

    onSave(data);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded shadow flex flex-col p-5 gap-4 w-md mt-5"
    >
      <h3>Edit news</h3>
      <label>
        Titile:
        <input
          value={newTitle}
          onChange={(e) => {
            setNewTitle(e.target.value);
            clearFieldError("title", setValidateErrors);
          }}
          placeholder="Add title"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        {validateErrors.title && (
          <p className="text-red-500 italic text-">{validateErrors.title}</p>
        )}
      </label>

      <label>
        {" "}
        Content:
        <textarea
          value={newContent}
          onChange={(e) => {
            setNewContent(e.target.value);
            clearFieldError("content", setValidateErrors);
          }}
          placeholder="Add content"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 h-50"
        ></textarea>
        {validateErrors.content && (
          <p className="text-red-500 italic text-md">
            {validateErrors.content}
          </p>
        )}
      </label>

      <div className="flex gap-5 justify-around">
        <button
          type="submit"
          className="text-green-700 hover:opacity-80 transition-opacity"
        >
          <Check size={20} />
        </button>

        <button
          type="button"
          onClick={onCancel}
          className="text-red-700 hover:opacity-80 transition-opacity"
        >
          <X size={20} />
        </button>
      </div>
    </form>
  );
}
