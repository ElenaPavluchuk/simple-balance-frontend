import NewsCard from "./NewsCard";
import EditNewsForm from "./EditNewsForm";

export default function NewsList({
  item,
  onDelete,
  isEdit,
  onEdit,
  onSave,
  onCancel,
  hideBtn,
}) {
  return (
    <li>
      {isEdit ? (
        <EditNewsForm item={item} onSave={onSave} onCancel={onCancel} />
      ) : (
        <NewsCard
          item={item}
          onDelete={onDelete}
          onEdit={onEdit}
          hideBtn={hideBtn}
        />
      )}
    </li>
  );
}
