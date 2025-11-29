import React from 'react';
import { Lightbulb, Loader2 } from 'lucide-react';

interface SuggestionBoxProps {
  suggestion: string | null;
  loading: boolean;
  onAnalyze: () => void;
}

const SuggestionBox: React.FC<SuggestionBoxProps> = ({ suggestion, loading, onAnalyze }) => {
  return (
    <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-6 border border-amber-100 shadow-sm">
      <div className="flex items-start gap-4">
        <div className="bg-amber-100 p-3 rounded-full shrink-0">
          <Lightbulb className="w-6 h-6 text-amber-600" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Góc tư vấn AI</h3>
          
          {!suggestion && !loading && (
            <div>
              <p className="text-gray-600 mb-4 text-sm">
                Bạn chưa biết chọn phong cách nào? Hãy để AI phân tích căn phòng và đưa ra gợi ý chuyên nghiệp.
              </p>
              <button
                onClick={onAnalyze}
                className="px-4 py-2 bg-white border border-amber-200 text-amber-700 text-sm font-medium rounded-lg hover:bg-amber-50 transition-colors shadow-sm"
              >
                Phân tích & Gợi ý
              </button>
            </div>
          )}

          {loading && (
            <div className="flex items-center gap-2 text-amber-700 text-sm">
              <Loader2 className="w-4 h-4 animate-spin" />
              Đang quan sát và suy nghĩ...
            </div>
          )}

          {suggestion && (
            <div className="prose prose-sm prose-amber max-w-none text-gray-700">
              <div className="whitespace-pre-line">{suggestion}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SuggestionBox;
