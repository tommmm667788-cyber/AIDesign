import React, { useState, useCallback } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import Header from './components/Header';
import ImageUploader from './components/ImageUploader';
import StyleSelector from './components/StyleSelector';
import SuggestionBox from './components/SuggestionBox';
import ResultView from './components/ResultView';
import { DesignStyle, LoadingState, RoomContext } from './types';
import { ROOM_AREAS, ROOM_TYPES } from './constants';
import { analyzeRoom, generateRoomDesign } from './services/geminiService';
import { Wand2, RefreshCcw, ArrowRight, Trash2, PenLine, Ruler, LayoutTemplate } from 'lucide-react';

function App() {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<DesignStyle | null>(null);
  const [customPrompt, setCustomPrompt] = useState('');
  const [suggestion, setSuggestion] = useState<string | null>(null);
  
  // Room Context State
  const [roomType, setRoomType] = useState(ROOM_TYPES[0].value);
  const [roomArea, setRoomArea] = useState(ROOM_AREAS[1].value);

  // State for different loading processes
  const [analysisStatus, setAnalysisStatus] = useState<LoadingState>('idle');
  const [generationStatus, setGenerationStatus] = useState<LoadingState>('idle');

  const handleImageUpload = useCallback((base64: string) => {
    setOriginalImage(base64);
    setGeneratedImage(null);
    setSuggestion(null);
    setAnalysisStatus('idle');
    setGenerationStatus('idle');
    window.scrollTo({ top: 300, behavior: 'smooth' });
  }, []);

  const resetApp = () => {
    setOriginalImage(null);
    setGeneratedImage(null);
    setSelectedStyle(null);
    setSuggestion(null);
    setCustomPrompt('');
    setAnalysisStatus('idle');
    setGenerationStatus('idle');
    setRoomType(ROOM_TYPES[0].value);
    setRoomArea(ROOM_AREAS[1].value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getContext = (): RoomContext => ({
    roomType,
    area: roomArea
  });

  const handleAnalyze = async () => {
    if (!originalImage) return;
    
    setAnalysisStatus('analyzing');
    try {
      const result = await analyzeRoom(originalImage, getContext());
      setSuggestion(result);
      setAnalysisStatus('success');
    } catch (error) {
      setAnalysisStatus('error');
      toast.error('Không thể phân tích ảnh. Vui lòng thử lại.');
    }
  };

  const handleGenerate = async () => {
    if (!originalImage) {
      toast.error('Vui lòng tải ảnh lên trước.');
      return;
    }
    if (!selectedStyle) {
      toast.error('Vui lòng chọn một phong cách thiết kế.');
      return;
    }

    setGenerationStatus('generating');
    setGeneratedImage(null); // Clear previous result while generating

    try {
      const resultImage = await generateRoomDesign(
        originalImage, 
        selectedStyle, 
        getContext(),
        customPrompt
      );
      setGeneratedImage(resultImage);
      setGenerationStatus('success');
      
      // Scroll to result
      setTimeout(() => {
         window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
      }, 100);

    } catch (error) {
      setGenerationStatus('error');
      toast.error('Đã có lỗi xảy ra khi tạo ảnh. Vui lòng thử lại.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <Toaster position="top-center" />
      <Header />

      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        
        {/* Section 1: Upload */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">1. Tải lên ảnh phòng</h2>
            {originalImage && (
              <button 
                onClick={resetApp} 
                className="text-sm text-red-600 hover:text-red-700 flex items-center gap-1"
              >
                <Trash2 className="w-4 h-4" /> Xóa & Làm lại
              </button>
            )}
          </div>
          
          {!originalImage ? (
            <ImageUploader onImageUpload={handleImageUpload} />
          ) : (
            <div className="relative w-full max-w-2xl mx-auto aspect-video rounded-xl overflow-hidden shadow-lg bg-black">
              <img src={originalImage} alt="Room" className="w-full h-full object-contain" />
              <div className="absolute top-2 right-2 bg-black/60 text-white px-3 py-1 rounded-full text-sm backdrop-blur-sm">
                Ảnh hiện tại
              </div>
            </div>
          )}
        </section>

        {originalImage && (
          <div className="animate-fade-in space-y-10">
            
            {/* Section: Room Dimensions & Context */}
            <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-2 mb-4">
                <Ruler className="w-5 h-5 text-indigo-600" />
                <h3 className="text-lg font-semibold text-gray-900">Thông tin không gian</h3>
              </div>
              <p className="text-sm text-gray-500 mb-4">Giúp AI tính toán tỷ lệ nội thất chuẩn xác hơn.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <LayoutTemplate className="w-4 h-4" /> Loại phòng
                  </label>
                  <select 
                    value={roomType}
                    onChange={(e) => setRoomType(e.target.value)}
                    className="w-full p-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    {ROOM_TYPES.map(type => (
                      <option key={type.value} value={type.value}>{type.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <Ruler className="w-4 h-4" /> Diện tích ước tính
                  </label>
                  <select 
                    value={roomArea}
                    onChange={(e) => setRoomArea(e.target.value)}
                    className="w-full p-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    {ROOM_AREAS.map(area => (
                      <option key={area.value} value={area.value}>{area.label}</option>
                    ))}
                  </select>
                </div>
              </div>
            </section>

            {/* Section: AI Suggestions */}
            <SuggestionBox 
              suggestion={suggestion} 
              loading={analysisStatus === 'analyzing'} 
              onAnalyze={handleAnalyze} 
            />

            {/* Section 2: Style Selection */}
            <StyleSelector 
              selectedStyle={selectedStyle} 
              onSelectStyle={setSelectedStyle} 
            />

            {/* Section 3: Additional Controls */}
            <section className="space-y-4 max-w-3xl">
              <div className="flex items-center gap-2 mb-2">
                 <PenLine className="w-5 h-5 text-gray-700" />
                 <h3 className="text-lg font-semibold text-gray-900">Yêu cầu thêm (Tùy chọn)</h3>
              </div>
              <textarea
                value={customPrompt}
                onChange={(e) => setCustomPrompt(e.target.value)}
                placeholder="Ví dụ: Tôi muốn tường màu xanh ngọc, sàn gỗ sồi sáng màu, thêm một chậu cây lớn ở góc..."
                className="w-full p-4 bg-white rounded-xl border-gray-200 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                rows={3}
              />
            </section>

            {/* Action Button */}
            <div className="flex justify-center pt-4 pb-8">
              <button
                onClick={handleGenerate}
                disabled={generationStatus === 'generating' || !selectedStyle}
                className={`
                  group relative px-8 py-4 rounded-full text-lg font-semibold text-white shadow-xl transition-all transform hover:-translate-y-1
                  ${generationStatus === 'generating' || !selectedStyle 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:shadow-indigo-500/30'}
                `}
              >
                {generationStatus === 'generating' ? (
                  <div className="flex items-center gap-3">
                    <RefreshCcw className="w-6 h-6 animate-spin" />
                    <span>AI đang tính toán không gian...</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <Wand2 className="w-6 h-6" />
                    <span>Tạo thiết kế mới</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </div>
                )}
              </button>
            </div>

            {/* Result View */}
            {generatedImage && (
              <div className="pt-8 border-t border-gray-200">
                 <ResultView originalImage={originalImage} generatedImage={generatedImage} />
              </div>
            )}
          </div>
        )}
      </main>

      <footer className="bg-white border-t border-gray-200 mt-12 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-500 text-sm">
          <p>© 2024 AI Interior Designer. Powered by Google Gemini.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;