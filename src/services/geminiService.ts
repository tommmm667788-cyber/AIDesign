import { GoogleGenAI } from "@google/genai";
import { DesignStyle, RoomContext } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Analyzes the room image and provides design suggestions in Vietnamese.
 */
export const analyzeRoom = async (imageBase64: string, context?: RoomContext): Promise<string> => {
  try {
    const cleanBase64 = imageBase64.replace(/^data:image\/(png|jpeg|jpg|webp);base64,/, '');

    let contextPrompt = "";
    if (context) {
      contextPrompt = `Thông tin bổ sung từ người dùng: Đây là ${context.roomType} với diện tích khoảng ${context.area}.`;
    }

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: 'image/jpeg',
              data: cleanBase64
            }
          },
          {
            text: `Bạn là một kiến trúc sư nội thất chuyên nghiệp. Hãy phân tích bức ảnh căn phòng này.
            ${contextPrompt}
            
            Hãy thực hiện các bước sau:
            1. Đánh giá tỷ lệ không gian hiện tại dựa trên diện tích đã cung cấp (nếu có) và các vật thể trong ảnh.
            2. Nhận xét về bố cục: Đồ đạc có đang quá to hay quá nhỏ so với phòng không? Lối đi có thuận tiện không?
            3. Đề xuất 3 cải tiến cụ thể để tối ưu hóa không gian (Ví dụ: Với phòng nhỏ, hãy gợi ý nội thất đa năng hoặc treo tường).
            4. Gợi ý 1 phong cách thiết kế phù hợp nhất giúp căn phòng trông rộng rãi và thẩm mỹ hơn.
            
            Trả lời ngắn gọn, thực tế, tập trung vào giải pháp không gian.`
          }
        ]
      }
    });

    return response.text || "Không thể phân tích hình ảnh. Vui lòng thử lại.";
  } catch (error) {
    console.error("Error analyzing room:", error);
    throw new Error("Lỗi khi kết nối với AI để phân tích.");
  }
};

/**
 * Generates a new design for the room based on the selected style using Image Generation models.
 */
export const generateRoomDesign = async (
  imageBase64: string,
  style: DesignStyle,
  context?: RoomContext,
  customPrompt?: string
): Promise<string> => {
  try {
    const cleanBase64 = imageBase64.replace(/^data:image\/(png|jpeg|jpg|webp);base64,/, '');

    // Build a more spatial-aware prompt
    let scaleInstruction = "Ensure furniture proportions are realistic.";
    if (context?.area.includes('Small')) {
      scaleInstruction = "This is a small room. Use compact furniture, avoid overcrowding, maximize floor space, use light colors to expand perception of space. Ensure furniture is not oversized.";
    } else if (context?.area.includes('Large')) {
      scaleInstruction = "This is a large room. Use substantial furniture pieces to anchor the space, create distinct zones, avoid the room feeling empty.";
    }

    const prompt = `Redesign this interior room in the style of ${style}.
    Room Context: ${context?.roomType || 'Interior room'}, Size: ${context?.area || 'Standard'}.
    
    CRITICAL SPATIAL INSTRUCTIONS:
    1. Keep existing structural elements (walls, windows, ceiling height, floor perspective) exactly as is.
    2. ${scaleInstruction}
    3. Ensure accurate depth perception and realistic relative scale between objects.
    
    Aesthetics:
    Change furniture, textures, and lighting to match ${style}.
    High quality, photorealistic, 4k resolution, architectural visualization.
    
    ${customPrompt ? `User Requirement: ${customPrompt}` : ''}`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: 'image/jpeg',
              data: cleanBase64
            }
          },
          {
            text: prompt
          }
        ]
      }
    });

    let generatedImageBase64 = '';
    
    if (response.candidates && response.candidates.length > 0) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          generatedImageBase64 = part.inlineData.data;
          break;
        }
      }
    }

    if (!generatedImageBase64) {
      throw new Error("AI không trả về hình ảnh nào. Vui lòng thử lại.");
    }

    return `data:image/png;base64,${generatedImageBase64}`;

  } catch (error) {
    console.error("Error generating design:", error);
    throw new Error("Lỗi khi tạo thiết kế mới. Vui lòng thử lại.");
  }
};