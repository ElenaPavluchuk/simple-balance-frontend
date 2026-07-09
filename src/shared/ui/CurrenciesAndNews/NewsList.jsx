import NewsCard from "./NewsCard";
import EditNewsForm from "../ManageContent/EditNewsForm";

export default function NewsList({
  item,
  onDelete,
  isEdit,
  onEdit,
  onSave,
  onCancel,
  hideBtn,
  isDeleteNewsLoading,
  isUpdateNewsLoading,
}) {
  return (
    <li>
      {isEdit ? (
        <EditNewsForm
          item={item}
          onSave={onSave}
          onCancel={onCancel}
          isUpdateNewsLoading={isUpdateNewsLoading}
        />
      ) : (
        <NewsCard
          item={item}
          onDelete={onDelete}
          onEdit={onEdit}
          hideBtn={hideBtn}
          isDeleteNewsLoading={isDeleteNewsLoading}
        />
      )}
    </li>
  );
}
