import { useState } from 'react';
import { Download } from 'lucide-react';

interface ResultViewProps {
  originalImage: string;
  generatedImage: string;
}

const ResultView: React.FC<ResultViewProps> = ({ originalImage, generatedImage }) => {
  const [activeTab, setActiveTab] = useState<'generated' | 'original' | 'compare'>('generated');

  const downloadImage = () => {
    const link = document.createElement('a');
    link.href = generatedImage;
    link.download = 'ai-interior-design.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-semibold text-gray-900">Kết quả thiết kế</h3>
        <div className="flex bg-gray-100 p-1 rounded-lg text-sm">
          <button
            onClick={() => setActiveTab('original')}
            className={`px-3 py-1.5 rounded-md transition-all ${activeTab === 'original' ? 'bg-white shadow text-gray-900 font-medium' : 'text-gray-500 hover:text-gray-700'}`}
          >
            Ảnh gốc
          </button>
          <button
            onClick={() => setActiveTab('generated')}
            className={`px-3 py-1.5 rounded-md transition-all ${activeTab === 'generated' ? 'bg-white shadow text-gray-900 font-medium' : 'text-gray-500 hover:text-gray-700'}`}
          >
            Thiết kế AI
          </button>
          <button
            onClick={() => setActiveTab('compare')}
            className={`px-3 py-1.5 rounded-md transition-all ${activeTab === 'compare' ? 'bg-white shadow text-gray-900 font-medium' : 'text-gray-500 hover:text-gray-700'}`}
          >
            So sánh
          </button>
        </div>
      </div>

      <div className="relative w-full aspect-video bg-gray-900 rounded-xl overflow-hidden shadow-2xl group">
        {activeTab === 'original' && (
          <img src={originalImage} alt="Original" className="w-full h-full object-contain" />
        )}
        {activeTab === 'generated' && (
          <img src={generatedImage} alt="Generated" className="w-full h-full object-contain" />
        )}
        {activeTab === 'compare' && (
          <div className="flex w-full h-full">
             <div className="w-1/2 h-full relative border-r border-white/20">
                <img src={originalImage} alt="Original" className="w-full h-full object-cover" />
                <div className="absolute bottom-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded">Trước</div>
             </div>
             <div className="w-1/2 h-full relative">
                <img src={generatedImage} alt="Generated" className="w-full h-full object-cover" />
                <div className="absolute bottom-2 right-2 bg-indigo-600/80 text-white text-xs px-2 py-1 rounded">Sau</div>
             </div>
          </div>
        )}
        
        {activeTab === 'generated' && (
            <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button 
                onClick={downloadImage}
                className="p-2 bg-white text-gray-900 rounded-lg shadow hover:bg-gray-50 transition-colors"
                title="Tải ảnh xuống"
            >
                <Download className="w-5 h-5" />
            </button>
            </div>
        )}
      </div>
    </div>
  );
};

export default ResultView;