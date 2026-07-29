import { useRef, useState, useEffect } from "react";
import { User, ImageUp, Trash } from "lucide-react";
import Button from "../Button";
import PropTypes from "prop-types";

ImageSelector.propTypes = {
  image: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  setImage: PropTypes.func.isRequired,
  onRemoveImage: PropTypes.func.isRequired,
};

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
          <Button
            variant="icon"
            className="absolute -bottom-1 -right-8"
            onClick={handleRemoveImage}
          >
            <div className="w-8 h-8 text-emerald-800 bg-white border border-emerald-800 hover:bg-emerald-800 hover:text-white rounded-full flex items-center justify-center">
              <Trash />
            </div>
          </Button>
        </div>
      ) : (
        <Button variant="icon" onClick={onChooseFile} className="mt-5">
          <div className="w-20 h-20 flex items-center justify-center bg-gray-300 rounded-full relative">
            <User className="text-emerald-800" size={30} />

            <div className="w-8 h-8 text-emerald-800 bg-white border border-emerald-800 hover:bg-emerald-800 hover:text-white flex items-center justify-center bg-primary rounded-full absolute -bottom-1 -right-1">
              <ImageUp />
            </div>
          </div>
        </Button>
      )}
    </div>
  );
}
