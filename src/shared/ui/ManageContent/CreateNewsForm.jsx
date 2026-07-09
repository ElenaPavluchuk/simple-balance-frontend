import { useState } from "react";
import { newsValidate, clearFieldError } from "../../utils/validate";
import Input from "../Input";
import Button from "../Button";
import PropTypes from "prop-types";

CreateNewsForm.propTypes = {
  onSave: PropTypes.func.isRequired,
  isCreateLoading: PropTypes.bool.isRequired,
};

export default function CreateNewsForm({ onSave, isCreateLoading }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [validateErrors, setValidateErrors] = useState({});

  const handleTitleChange = (e) => {
    setTitle(e);
    clearFieldError("title", setValidateErrors);
  };

  const handleContentChange = (e) => {
    setContent(e);
    clearFieldError("content", setValidateErrors);
  };

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
      className="bg-white rounded shadow flex flex-col p-5 gap-4 w-full h-full"
    >
      <h3 className="font-semibold text-center">Add News</h3>
      <div>
        <Input
          value={title}
          onChange={handleTitleChange}
          placeholder="Add title"
          label="Titile:"
        />
        {validateErrors.title && (
          <p className="text-red-500 italic text-md">{validateErrors.title}</p>
        )}
      </div>

      <div>
        <Input
          value={content}
          onChange={handleContentChange}
          placeholder="Add content"
          multiline
          rows={14}
        />
        {validateErrors.content && (
          <p className="text-red-500 italic text-md">
            {validateErrors.content}
          </p>
        )}
      </div>

      <Button
        type="submit"
        disabled={isCreateLoading}
        variant="primary"
        className="mt-auto"
      >
        {isCreateLoading ? "Loading..." : "Add news"}
      </Button>
    </form>
  );
}
