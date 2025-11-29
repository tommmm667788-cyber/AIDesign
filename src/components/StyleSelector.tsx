import { STYLES } from '../constants';
import type { DesignStyle } from '../types';
import { CheckCircle2 } from 'lucide-react';

interface StyleSelectorProps {
  selectedStyle: DesignStyle | null;
  onSelectStyle: (style: DesignStyle) => void;
}

const StyleSelector = ({ selectedStyle, onSelectStyle }: StyleSelectorProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">2. Chọn phong cách thiết kế</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {STYLES.map((style) => (
          <div 
            key={style.id}
            onClick={() => onSelectStyle(style.id)}
            className={`relative group cursor-pointer rounded-xl overflow-hidden border-2 transition-all duration-300 ${
              selectedStyle === style.id 
                ? 'border-indigo-600 ring-2 ring-indigo-100 shadow-lg' 
                : 'border-transparent hover:border-gray-200 shadow'
            }`}
          >
            <div className="aspect-[4/3] relative">
              <img 
                src={style.image} 
                alt={style.name} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className={`absolute inset-0 bg-black/40 transition-opacity ${selectedStyle === style.id ? 'opacity-20' : 'opacity-40 group-hover:opacity-30'}`} />
              
              {selectedStyle === style.id && (
                <div className="absolute top-2 right-2 bg-white text-indigo-600 rounded-full p-1 shadow-md">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
              )}
            </div>
            <div className="p-3 bg-white">
              <h4 className={`font-medium truncate ${selectedStyle === style.id ? 'text-indigo-700' : 'text-gray-900'}`}>
                {style.name}
              </h4>
              <p className="text-xs text-gray-500 line-clamp-2 mt-1">
                {style.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StyleSelector;