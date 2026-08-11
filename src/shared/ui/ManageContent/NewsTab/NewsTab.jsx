import CreateNewsForm from "./CreateNewsForm";
import NewsList from "../../CurrenciesAndNews/NewsList";
import Loader from "../../Loader";
import Card from "../../Card";
import PropTypes from "prop-types";

NewsTab.propTypes = {
  isCreateNewsLoading: PropTypes.bool.isRequired,
  handleAddNews: PropTypes.func.isRequired,
  isGetNewsLoading: PropTypes.bool.isRequired,
  news: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
    }),
  ).isRequired,
  handleDeleteNews: PropTypes.func.isRequired,
  editNewsId: PropTypes.string,
  setEditNewsId: PropTypes.func.isRequired,
  handleSaveEdit: PropTypes.func.isRequired,
  handleCancelEdit: PropTypes.func.isRequired,
  isDeleteNewsLoading: PropTypes.bool.isRequired,
  isUpdateNewsLoading: PropTypes.bool.isRequired,
  deleteNewsId: PropTypes.string,
  setDeleteNewsId: PropTypes.func.isRequired,
};

export default function NewsTab({
  isCreateNewsLoading,
  handleAddNews,
  isGetNewsLoading,
  news,
  handleDeleteNews,
  editNewsId,
  setEditNewsId,
  handleSaveEdit,
  handleCancelEdit,
  isDeleteNewsLoading,
  isUpdateNewsLoading,
  deleteNewsId,
  setDeleteNewsId,
}) {
  return (
    <div className="flex flex-col lg:flex-row gap-8 lg:gap-5">
      <div className="flex-1">
        <CreateNewsForm
          isCreateLoading={isCreateNewsLoading}
          onSave={handleAddNews}
        />
      </div>

      <div className="flex-1">
        <p className="text-xl text-slate-900 font-medium">Our news</p>
        {isGetNewsLoading && (
          <div className="mt-3 min-h-50 flex items-center justify-center">
            <Loader />
          </div>
        )}

        {!isGetNewsLoading && news.length === 0 && (
          <Card className="mt-3 min-h-50 flex items-center justify-center">
            <p className="text-sm text-cyan-950">No news yet</p>
          </Card>
        )}

        <ul className="grid gap-4 mt-3">
          {news.map((item) => (
            <NewsList
              key={item?.id}
              item={item}
              onDelete={handleDeleteNews}
              isEdit={editNewsId === item?.id}
              onEdit={setEditNewsId}
              onSave={handleSaveEdit}
              onCancel={handleCancelEdit}
              isDeleteNewsLoading={isDeleteNewsLoading}
              isUpdateNewsLoading={isUpdateNewsLoading}
              deleteNewsId={deleteNewsId}
              setDeleteNewsId={setDeleteNewsId}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}
