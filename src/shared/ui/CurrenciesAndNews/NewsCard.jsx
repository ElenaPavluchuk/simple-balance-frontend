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
    <div className="bg-white flex flex-col gap-3  p-6  rounded-2xl shadow-md border-l-4 border-rose-300 transition-all duration-300 hover:shadow-lg hover:translate-y-0.5 ">
      <div className="flex flex-row justify-between items-start">
        <p className="font-semibold">{item?.title}</p>
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

      <p className="line-clamp-2">{item?.content}</p>
      <p className="italic text-sm">
        {dayjs(item?.published_at).format("DD-MM-YYYY")}
      </p>

      <div className="flex flex-row justify-between items-end">
        <Link to={`/news/${item?.id}`} className="italic underline mt-5">
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
    </div>
  );
}
