import dayjs from "dayjs";
import { Link } from "react-router";
import { Trash2, Pencil } from "lucide-react";

export default function NewsList({ item, onDelete }) {
  return (
    <li>
      <div className="bg-white p-3 shadow rounded mt-1 flex flex-col gap-3">
        <div className="flex flex-row justify-between items-start">
          <p className="font-semibold">{item?.title}</p>
          <Pencil className="text-gray-700" size={20} />
        </div>
        <p className="line-clamp-2">{item?.content}</p>
        <p className="italic text-sm">
          {dayjs(item?.published_at).format("DD-MM-YYYY")}
        </p>
        <div className="flex flex-row justify-between items-end">
          <Link to={`/news/${item?.id}`} className="italic underline mt-5">
            View more
          </Link>
          <Trash2
            onClick={() => onDelete(item?.id)}
            className="text-gray-700"
            size={20}
          />
        </div>
      </div>
    </li>
  );
}
