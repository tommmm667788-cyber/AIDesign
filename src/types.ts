
export const DesignStyle = {
    MODERN: 'Modern',
    MINIMALIST: 'Minimalist',
    SCANDINAVIAN: 'Scandinavian',
    INDUSTRIAL: 'Industrial',
    JAPANDI: 'Japandi',
    LUXURY: 'Luxury',
    BOHEMIAN: 'Bohemian',
    CLASSIC: 'Classic',
  } as const;
  
  export type DesignStyle = typeof DesignStyle[keyof typeof DesignStyle];
  
  export interface StyleOption {
    id: DesignStyle;
    name: string; // Vietnamese display name
    description: string;
    image: string;
  }
  
  export interface AnalysisResult {
    suggestions: string;
    suggestedStyle?: DesignStyle;
  }
  
  export interface RoomContext {
    roomType: string;
    area: string; // e.g., "Under 15m2", "15-30m2"
  }
  
  export type LoadingState = 'idle' | 'analyzing' | 'generating' | 'error' | 'success';
  