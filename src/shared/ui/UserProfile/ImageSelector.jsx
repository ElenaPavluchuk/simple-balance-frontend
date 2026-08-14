import { useRef, useState, useEffect } from "react";
import UserProfileIcon from "../Icons/UserProfileIcon";
import ImageIcon from "../Icons/ImageIcon";
import TrashIcon from "../Icons/TrashIcon";
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
        <div className="relative rounded-full border border-gray-400">
          <img
            src={previewUrl}
            alt="profile photo"
            className="p-6 rounded-full object-cover"
          />
          <Button
            variant="icon"
            className="absolute -bottom-1 -right-8"
            onClick={handleRemoveImage}
          >
            <div className="p-1 text-emerald-800 bg-white border border-emerald-800 hover:bg-red-600 hover:border-red-600 hover:text-white rounded-full flex items-center justify-center">
              <TrashIcon />
            </div>
          </Button>
        </div>
      ) : (
        <Button variant="icon" onClick={onChooseFile} className="mt-5">
          <div className="p-6 flex items-center justify-center bg-gray-300 rounded-full relative text-emerald-800">
            <UserProfileIcon className="w-8 h-8" />

            <div className="p-1 text-emerald-800 bg-white border border-emerald-800 hover:bg-emerald-800 hover:text-white flex items-center justify-center bg-primary rounded-full absolute -bottom-1 -right-1">
              <ImageIcon />
            </div>
          </div>
        </Button>
      )}
    </div>
  );
}
