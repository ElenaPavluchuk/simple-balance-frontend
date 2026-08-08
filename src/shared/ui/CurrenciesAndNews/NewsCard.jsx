import dayjs from "dayjs";
import { Link } from "react-router";
import { Trash2, Pencil } from "lucide-react";
import { useAuth } from "../../context/auth/useAuth";
import Button from "../Button";
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
  hideBtn: PropTypes.bool,
  isDeleteNewsLoading: PropTypes.bool.isRequired,
};

export default function NewsCard({
  item,
  onDelete,
  onEdit,
  hideBtn,
  isDeleteNewsLoading,
}) {
  const { user } = useAuth();
  const displayManageBtn = (user?.user_role === "ADMIN") & !hideBtn;

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-row justify-between items-start">
        <h4 className="text-slate-900 font-medium text-balance text-lg">
          {item?.title}
        </h4>
        {displayManageBtn ? (
          <Button
            variant="icon"
            onClick={() => onEdit(item?.id)}
            className="text-gray-700"
            disabled={!displayManageBtn}
          >
            <Pencil size={20} />
          </Button>
        ) : null}
      </div>

      <p className="line-clamp-2 text-base text-cyan-950 text-pretty">
        {item?.content}
      </p>

      <div className="flex gap-1 items-center mt-2 text-cyan-950 text-sm">
        <span>Published at:</span>
        <p className="font-medium">
          {dayjs(item?.published_at).format("DD-MM-YYYY")}
        </p>
      </div>

      <Link
        to={`/news/${item?.id}`}
        className="text-gray-600 hover:underline text-base whitespace-nowrap mt-5"
      >
        View more
      </Link>

      {displayManageBtn ? (
        <Button
          variant="icon"
          onClick={() => onDelete(item?.id)}
          className="text-gray-700"
          disabled={!displayManageBtn || isDeleteNewsLoading}
        >
          <Trash2 size={20} />
        </Button>
      ) : null}
    </div>
  );
}
