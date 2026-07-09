import dayjs from "dayjs";
import { Link } from "react-router";
import { Trash2, Pencil } from "lucide-react";
import { useAuth } from "../../context/auth/useAuth";

export default function NewsCard({
  item,
  onDelete,
  onEdit,
  hideBtn,
  isDeleteNewsLoading,
}) {
  const { user } = useAuth();
  const displayManageBtn = (user.user_role === "ADMIN") & !hideBtn;

  return (
    <div className="bg-white p-3 shadow rounded mt-1 flex flex-col gap-3">
      <div className="flex flex-row justify-between items-start">
        <p className="font-semibold">{item?.title}</p>
        {displayManageBtn ? (
          <button
            onClick={() => onEdit(item?.id)}
            className="text-gray-700"
            disabled={!displayManageBtn}
          >
            <Pencil size={20} />
          </button>
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
          <button
            onClick={() => onDelete(item?.id)}
            className="text-gray-700"
            disabled={!displayManageBtn || isDeleteNewsLoading}
          >
            <Trash2 size={20} />
          </button>
        ) : null}
      </div>
    </div>
  );
}
