import NewsCard from "./NewsCard";
import EditNewsForm from "../ManageContent/NewsTab/EditNewsForm";
import Card from "../Card";
import PropTypes from "prop-types";

NewsList.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    published_at: PropTypes.string.isRequired,
  }).isRequired,
  onDelete: PropTypes.func,
  isEdit: PropTypes.bool,
  onEdit: PropTypes.func,
  onSave: PropTypes.func,
  onCancel: PropTypes.func,
  hideBtn: PropTypes.bool,
  isDeleteNewsLoading: PropTypes.bool,
  isUpdateNewsLoading: PropTypes.bool,
  deleteNewsId: PropTypes.string,
  setDeleteNewsId: PropTypes.func,
};

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
  deleteNewsId,
  setDeleteNewsId,
}) {
  return (
    <Card>
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
          deleteNewsId={deleteNewsId}
          setDeleteNewsId={setDeleteNewsId}
        />
      )}
    </Card>
  );
}
