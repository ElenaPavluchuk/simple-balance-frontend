import dayjs from "dayjs";
import { Link } from "react-router";

export default function NewsList({ item }) {
  return (
    <li>
      <div className="bg-white p-3 shadow rounded mt-1 flex flex-col gap-3">
        <div className="flex justify-between">
          <p className="font-semibold">{item?.title}</p>
          <Link to={`/news/${item?.id}`} className="italic underline">
            View more
          </Link>
        </div>
        <p className="line-clamp-2">{item?.content}</p>
        <p className="italic text-sm">
          {dayjs(item?.published_at).format("DD-MM-YYYY")}
        </p>
      </div>
    </li>
  );
}
