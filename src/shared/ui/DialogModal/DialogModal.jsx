import { createPortal } from "react-dom";
import { X } from "lucide-react";
import Button from "../Button/Button";

export default function DialogModal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* background */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* modal */}
      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-md mx-4 p-6 animate-in fade-in zoom-in duration-200">
        <Button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
        >
          <X className="w-6 h-6" />
        </Button>
        <h2 className="text-2xl font-bold mb-6">{title}</h2>
        <div>{children}</div>
      </div>
    </div>,
    document.body
  );
}
