import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteTransFromRedux,
  updateTransInRedux,
} from "../../../app/providers/redux/slices/transesSlice";

export function useTransActions() {
  const transes = useSelector((state) => state.transes.value);
  const dispatch = useDispatch();
  const [editingTrans, setEditingTrans] = useState(null);

  const deleteTrans = (id) => {
    dispatch(deleteTransFromRedux(id));
  };

  const editTrans = (trans) => {
    setEditingTrans(trans);
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditingTrans((prev) => ({ ...prev, [name]: value }));
  };

  const saveUpdateTrans = () => {
    if (!editingTrans) return;

    const { id, name, amount, category, date } = editingTrans;

    dispatch(
      updateTransInRedux({
        id,
        name: name.trim(),
        amount: Number(amount),
        category,
        date,
      }),
    );

    setEditingTrans(null);
  };

  const cancelUpdateTrans = () => {
    setEditingTrans(null);
  };

  return {
    transes,
    editingTrans,
    deleteTrans,
    editTrans,
    handleEditInputChange,
    saveUpdateTrans,
    cancelUpdateTrans,
  };
}

// TODO: хранить просто в shared, а не в lib
