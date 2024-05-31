import { ProductType } from '~/types/VariantType';

export type OrderType = {
   _id?: string;
   createdAt?: string;
   customerName?: string;
   customerPhone?: string;
   customerEmail?: string;
   customerAddress?: string;
   methodDelivery?: string;
   statusDelivery?: string;
   shippingFee?: number;
   imageDefault?: string;
   colorProducts?: string[];
   quantityProducts?: number[];
   sizeProducts?: string[];
   priceProducts?: number[];
   subtotal?: number;
   total?: number;
   products?: ProductType[];
};
