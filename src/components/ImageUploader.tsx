import { useRef, type ChangeEvent, type DragEvent } from 'react';
import { Upload, Image as ImageIcon } from 'lucide-react';

interface ImageUploaderProps {
  onImageUpload: (base64: string) => void;
}

const ImageUploader = ({ onImageUpload }: ImageUploaderProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const processFile = (file: File) => {
    if (file.size > 5 * 1024 * 1024) {
      alert("Vui lòng chọn ảnh nhỏ hơn 5MB");
      return;
    }
    
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      onImageUpload(base64);
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  return (
    <div 
      className="w-full max-w-2xl mx-auto"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div 
        onClick={() => fileInputRef.current?.click()}
        className="border-2 border-dashed border-indigo-200 hover:border-indigo-400 bg-indigo-50/50 hover:bg-indigo-50 transition-all rounded-2xl p-12 flex flex-col items-center justify-center cursor-pointer text-center group"
      >
        <div className="bg-white p-4 rounded-full shadow-sm mb-4 group-hover:scale-110 transition-transform duration-300">
          <Upload className="w-8 h-8 text-indigo-600" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Tải lên ảnh căn phòng của bạn
        </h3>
        <p className="text-gray-500 mb-6 max-w-md">
          Kéo thả hoặc nhấn để chọn ảnh. Hỗ trợ JPG, PNG. Khuyến khích ảnh chụp góc rộng, rõ nét.
        </p>
        <button className="px-6 py-2.5 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors shadow-sm flex items-center gap-2">
          <ImageIcon className="w-4 h-4" />
          Chọn ảnh từ thư viện
        </button>
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleFileChange} 
          accept="image/*" 
          className="hidden" 
        />
      </div>
    </div>
  );
};

export default ImageUploader;