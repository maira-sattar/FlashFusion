const SALT_ROUNDS = process.env.SALT_ROUNDS || 5;

//   id: number | string;
//   title: string;
//   sub_title: string;
//   web_home_page_id: number | string;
//   deal_product_id: number | string | null;
//   created_at: string | null;
//   updated_at: string | null;
//   card_img: {
//     id: number | string;
//     url: string;
//     image_type: string;
//   };
//   deal_products: null;
// };
// export type TProductCard = {
//   id: number | string;
//   title: string;
//   slug: string;
//   description: string;
//   category_id: number | string;
//   discount_id: number | string | null;
//   discount_datetime_start: string | null;
//   discount_datetime_end: string | null;
//   is_active: number | boolean;
//   out_of_stock: number;
//   deleted_at: null;
//   created_at: string | null;
//   updated_at: string | null;
//   currency: string;
//   is_liked_by_user: boolean;
//   pivot: {
//     web_home_page_id: number | string;
//     product_id: number | string;
//     created_at: string | null;
//     updated_at: string | null;
//   };
//   category: TProductCategory;
//   product_serving_sizes: TProductServingSize[];
//   images: TImage[];
//   discount: null;
// };
