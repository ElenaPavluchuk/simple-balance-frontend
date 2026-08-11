import { useState } from "react";
import { X, Check } from "lucide-react";
import { newsValidate, clearFieldError } from "../../../utils/validate";
import Input from "../../Input";
import Button from "../../Button";
import PropTypes from "prop-types";

EditNewsForm.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
  }),
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  isUpdateNewsLoading: PropTypes.bool.isRequired,
};

export default function EditNewsForm({
  item,
  onSave,
  onCancel,
  isUpdateNewsLoading,
}) {
  const [newTitle, setNewTitle] = useState(item.title);
  const [newContent, setNewContent] = useState(item.content);
  const [validateErrors, setValidateErrors] = useState({});

  const handleTitleChange = (e) => {
    setNewTitle(e);
    clearFieldError("title", setValidateErrors);
  };

  const handleContentChange = (e) => {
    setNewContent(e);
    clearFieldError("content", setValidateErrors);
  };

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
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <div>
        <Input
          value={newTitle}
          onChange={handleTitleChange}
          placeholder="Add title"
        />
        {validateErrors.title && (
          <p className="text-red-500 italic text-xs mt-1">
            {validateErrors.title}
          </p>
        )}
      </div>

      <div>
        <Input
          value={newContent}
          onChange={handleContentChange}
          placeholder="Add content"
          multiline
          rows={6}
        />
        {validateErrors.content && (
          <p className="text-red-500 italic text-xs mt-1">
            {validateErrors.content}
          </p>
        )}
      </div>

      <div className="flex justify-around mt-3">
        <Button type="submit" variant="icon" disabled={isUpdateNewsLoading}>
          <Check className="text-emerald-700 hover:opacity-80 transition-opacity" />
        </Button>

        <Button
          onClick={onCancel}
          variant="icon"
          disabled={isUpdateNewsLoading}
        >
          <X className="text-gray-600 hover:opacity-80 transition-opacity" />
        </Button>
      </div>
    </form>
  );
}
