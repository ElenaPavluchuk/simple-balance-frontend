import { useState } from "react";
import { X, Check } from "lucide-react";
import { newsValidate, clearFieldError } from "../../utils/validate";
import Input from "../Input";
import Button from "../Button";
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
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded shadow flex flex-col p-5 gap-4 w-full mt-5"
    >
      <h3>Edit news</h3>
      <div>
        <Input
          value={newTitle}
          onChange={handleTitleChange}
          placeholder="Add title"
          label="Title:"
        />
        {validateErrors.title && (
          <p className="text-red-500 italic text-">{validateErrors.title}</p>
        )}
      </div>

      <div>
        <Input
          value={newContent}
          onChange={handleContentChange}
          placeholder="Add content"
          label="Content:"
          multiline
          rows={6}
        />
        {validateErrors.content && (
          <p className="text-red-500 italic text-md">
            {validateErrors.content}
          </p>
        )}
      </div>

      <div className="flex gap-5 justify-around">
        <Button type="submit" variant="icon" disabled={isUpdateNewsLoading}>
          <Check className="text-green-700 hover:opacity-80 transition-opacity" />
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
