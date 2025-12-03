import AddTransModal from "../../shared/ui/AddTransModal/AddTransModal";
import { useSelector, useDispatch } from "react-redux";

export default function ExpensePage() {
  const transes = useSelector((state) => state.transes.value);
  return (
    <div className="flex flex-row gap-20">
      <AddTransModal />

      <div>
        <ul>
          {transes
            .filter((trans) => trans.type === "expense")
            .map((trans) => (
              <li className="flex flex-col gap-2">
                <div className="flex flex-row gap-20 mt-10">
                  <p>{trans.name}</p>
                  <p>{trans.amount}</p>
                </div>
                <div className="flex flex-row gap-20">
                  <p>{trans.category}</p>
                  <p>{trans.date}</p>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}
