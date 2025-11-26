import { Sofa, Sparkles } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-indigo-600 p-2 rounded-lg">
            <Sofa className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-xl font-bold text-gray-900">AI Interior Designer</h1>
        </div>
        <div className="flex items-center gap-2 text-sm font-medium text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
          <Sparkles className="w-4 h-4" />
          <span>Powered by Gemini 2.5</span>
        </div>
      </div>
    </header>
  );
};

export default Header;