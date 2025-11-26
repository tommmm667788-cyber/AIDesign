import { DesignStyle } from './types';
import type { StyleOption } from './types';

export const STYLES: StyleOption[] = [
  {
    id: DesignStyle.MODERN,
    name: 'Hiện đại (Modern)',
    description: 'Đường nét sạch sẽ, bảng màu trung tính, ưu tiên công năng.',
    image: 'https://picsum.photos/400/300?random=1',
  },
  {
    id: DesignStyle.MINIMALIST,
    name: 'Tối giản (Minimalist)',
    description: 'Ít đồ đạc, không gian thoáng đãng, tập trung vào sự đơn giản.',
    image: 'https://picsum.photos/400/300?random=2',
  },
  {
    id: DesignStyle.SCANDINAVIAN,
    name: 'Bắc Âu (Scandinavian)',
    description: 'Ấm cúng, gỗ sáng màu, nhiều ánh sáng tự nhiên.',
    image: 'https://picsum.photos/400/300?random=3',
  },
  {
    id: DesignStyle.JAPANDI,
    name: 'Japandi',
    description: 'Sự kết hợp tinh tế giữa Nhật Bản và Bắc Âu.',
    image: 'https://picsum.photos/400/300?random=4',
  },
  {
    id: DesignStyle.INDUSTRIAL,
    name: 'Công nghiệp (Industrial)',
    description: 'Tường gạch trần, kim loại đen, phong cách mạnh mẽ.',
    image: 'https://picsum.photos/400/300?random=5',
  },
  {
    id: DesignStyle.LUXURY,
    name: 'Sang trọng (Luxury)',
    description: 'Vật liệu cao cấp, đá cẩm thạch, vàng kim, lộng lẫy.',
    image: 'https://picsum.photos/400/300?random=6',
  },
  {
    id: DesignStyle.BOHEMIAN,
    name: 'Bohemian',
    description: 'Tự do, nhiều họa tiết, màu sắc rực rỡ, cây xanh.',
    image: 'https://picsum.photos/400/300?random=7',
  },
  {
    id: DesignStyle.CLASSIC,
    name: 'Cổ điển (Classic)',
    description: 'Chi tiết cầu kỳ, đối xứng, vẻ đẹp vượt thời gian.',
    image: 'https://picsum.photos/400/300?random=8',
  },
];

export const ROOM_TYPES = [
  { value: 'Living Room', label: 'Phòng Khách' },
  { value: 'Bedroom', label: 'Phòng Ngủ' },
  { value: 'Kitchen', label: 'Nhà Bếp' },
  { value: 'Bathroom', label: 'Phòng Tắm' },
  { value: 'Home Office', label: 'Phòng Làm Việc' },
  { value: 'Dining Room', label: 'Phòng Ăn' },
];

export const ROOM_AREAS = [
  { value: 'Small (< 12m2)', label: 'Nhỏ (< 12m²)' },
  { value: 'Medium (12-25m2)', label: 'Vừa (12 - 25m²)' },
  { value: 'Large (25-50m2)', label: 'Lớn (25 - 50m²)' },
  { value: 'Extra Large (> 50m2)', label: 'Rất Lớn (> 50m²)' },
];