import { createPortal } from "react-dom";
import { X } from "lucide-react";
import Button from "./Button";
import PropTypes from "prop-types";

DialogModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default function DialogModal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-md mx-4 p-6 animate-in fade-in zoom-in duration-200">
        <Button
          onClick={onClose}
          variant="icon"
          iconColor="text-red-500"
          className="absolute top-4 right-0 text-gray-400 hover:text-gray-600 active:text-gray-700"
        >
          <X className="w-6 h-6" />
        </Button>
        <h2 className="text-xl md:text-2xl font-medium text-slate-900 mb-6 max-w-[85%]">
          {title}
        </h2>
        <div>{children}</div>
      </div>
    </div>,
    document.body,
  );
}
