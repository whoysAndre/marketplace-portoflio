export interface ProductDashboard {
  id: number;
  slug: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  tags: string[];
  isActive: boolean,
}