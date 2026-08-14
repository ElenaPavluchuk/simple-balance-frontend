import { useState } from "react";
import { newsValidate, clearFieldError } from "../../../utils/validate";
import Input from "../../Input";
import Button from "../../Button";
import Card from "../../Card";
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
    <Card>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <h3 className="text-lg text-slate-900 font-medium text-center mb-2">
          Add news
        </h3>

        <div>
          <Input value={title} onChange={handleTitleChange} label="Titile" />
          {validateErrors.title && (
            <p className="text-red-500 italic text-xs mt-1">
              {validateErrors.title}
            </p>
          )}
        </div>

        <div>
          <Input
            value={content}
            onChange={handleContentChange}
            label="Content"
            isMultiline
            rows={14}
          />
          {validateErrors.content && (
            <p className="text-red-500 italic text-xs mt-1">
              {validateErrors.content}
            </p>
          )}
        </div>

        <Button
          type="submit"
          disabled={isCreateLoading}
          variant="primary"
          className="mt-8"
        >
          {isCreateLoading ? "Loading..." : "Add news"}
        </Button>
      </form>
    </Card>
  );
}
