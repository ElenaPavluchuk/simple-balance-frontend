import { useRef, useState, useEffect } from "react";
import { User, ImageUp, Trash } from "lucide-react";

export default function ImageSelector({ image, setImage, onRemoveImage }) {
  const inputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(image || null);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      const preview = URL.createObjectURL(file);
      setPreviewUrl(preview);
      onRemoveImage(false);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setPreviewUrl(null);
    onRemoveImage(true);
  };

  const onChooseFile = () => {
    inputRef.current.click();
  };

  return (
    <div className="flex justify-center">
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleImageChange}
        className="hidden"
      />
      {image ? (
        <div className="relative rounded-full border-2">
          <img
            src={previewUrl}
            alt="profile photo"
            className="w-20 h-20 rounded-full object-cover"
          />
          <button
            type="button"
            className="w-8 h-8 flex items-center justify-center text-white bg-red-400 rounded-full absolute -bottom-1 -right-1"
            onClick={handleRemoveImage}
          >
            <Trash />
          </button>
        </div>
      ) : (
        <div className="w-20 h-20 flex items-center justify-center bg-gray-300 rounded-full relative">
          <User className="text-emerald-800" />
          <button
            type="button"
            className="w-8 h-8 flex items-center justify-center bg-primary rounded-full absolute -bottom-1 -right-1"
            onClick={onChooseFile}
          >
            <ImageUp className="text-emerald-800" />
          </button>
        </div>
      )}
    </div>
  );
}
