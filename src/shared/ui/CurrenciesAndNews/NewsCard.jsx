import dayjs from "dayjs";
import { Link } from "react-router";
import TrashIcon from "../Icons/TrashIcon";
import PencilIcon from "../Icons/PencilIcon";
import { useAuth } from "../../context/auth/useAuth";
import Button from "../Button";
import DialogModal from "../DialogModal";
import DeleteAlert from "../DeleteAlert";
import PropTypes from "prop-types";

NewsCard.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    published_at: PropTypes.string.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  isHideBtn: PropTypes.bool,
  isDeleteNewsLoading: PropTypes.bool.isRequired,
  deleteNewsId: PropTypes.string,
  setDeleteNewsId: PropTypes.func,
};

export default function NewsCard({
  item,
  onDelete,
  onEdit,
  isHideBtn,
  isDeleteNewsLoading,
  deleteNewsId,
  setDeleteNewsId,
}) {
  const { user } = useAuth();
  const isDisplayManageBtn = user?.user_role === "ADMIN" && !isHideBtn;

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-row justify-between items-center">
        <h4 className="text-slate-900 font-medium text-balance text-lg">
          {item?.title}
        </h4>

        {isDisplayManageBtn ? (
          <div className="max-w-16">
            <Button
              variant="icon"
              onClick={() => onEdit(item?.id)}
              disabled={!isDisplayManageBtn}
            >
              <div className="border border-emerald-800 hover:bg-emerald-800 text-emerald-800 hover:text-white p-2 rounded-full">
                <PencilIcon className="w-5 h-5" />
              </div>
            </Button>
          </div>
        ) : null}
      </div>

      <p
        className={`line-clamp-2 text-base text-cyan-950 text-pretty ${isDisplayManageBtn && "max-w-9/10"}`}
      >
        {item?.content}
      </p>

      <div className="flex gap-1 items-center mt-2 text-cyan-950 text-sm">
        <span>Published at:</span>
        <p className="font-medium">
          {dayjs(item?.published_at).format("DD-MM-YYYY")}
        </p>
      </div>

      <div className="mt-4 flex items-center text-center justify-between">
        <Link
          to={`/news/${item?.id}`}
          className="text-gray-600 hover:underline text-base whitespace-nowrap"
        >
          View more
        </Link>

        {isDisplayManageBtn ? (
          <div className="max-w-16">
            <Button
              variant="icon"
              onClick={() => setDeleteNewsId(item?.id)}
              disabled={!isDisplayManageBtn || isDeleteNewsLoading}
            >
              <div className="border border-emerald-800 hover:bg-red-600 hover:border-red-600 text-emerald-800 hover:text-white p-2 rounded-full">
                <TrashIcon className="w-5 h-5" />
              </div>
            </Button>
          </div>
        ) : null}
      </div>

      <DialogModal
        isOpen={deleteNewsId === item.id}
        onClose={() => setDeleteNewsId(null)}
        title="Delete news"
      >
        <DeleteAlert
          message="Are you sure you want to delete news?"
          onDelete={() => onDelete(item?.id)}
          onClose={() => setDeleteNewsId(null)}
          isLoading={isDeleteNewsLoading}
        />
      </DialogModal>
    </div>
  );
}
