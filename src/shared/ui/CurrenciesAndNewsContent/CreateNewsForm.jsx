import { useState } from "react";
import { newsValidate, clearFieldError } from "../../utils/validate";

export default function CreateNewsForm({ onSave, isLoading }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [validateErrors, setValidateErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = newsValidate({ title, content });
    setValidateErrors(errors);

    if (Object.keys(errors).length) return;

    const data = {
      title: title.trim(),
      content: content.trim(),
    };

    onSave(data);

    setTitle("");
    setContent("");
    setValidateErrors({});
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded shadow flex flex-col p-5 gap-4 w-md"
    >
      <h3 className="font-semibold text-center">Add News</h3>
      <label>
        Titile:
        <input
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
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
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
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
      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-rose-400 text-white rounded py-2 mt-8"
      >
        {isLoading ? "Loading..." : "Add news"}
      </button>
    </form>
  );
}
