import {
  AmbulanceBooking,
  AmbulanceService,
  BlogPost,
  Cart,
  Coupon,
  Messages,
  NewsletterSubscriber,
  Order,
  OrderItem,
  Product,
  ProductCategory,
  ProductSubCategory,
  ProductVariant,
  Review,
  User,
  UserAddress,
  WishedItem,
  WishList,
} from "@prisma/client";

// Define missing types
type BookingStatus = "PENDING" | "CONFIRMED" | "COMPLETED" | "CANCELED";
type AmbulanceStatus = "AVAILABLE" | "BUSY" | "OUT_OF_SERVICE";
type DiscountType = "PERCENTAGE" | "FLAT";
type CouponStatus = "ACTIVE" | "EXPIRED" | "INACTIVE";
type PaymentMethod =
  | "CASH_ON_DELIVERY"
  | "CREDIT_CARD"
  | "BKASH"
  | "NAGAD"
  | "ROCKET";
type PaymentStatus = "PENDING" | "PAID" | "FAILED" | "REFUNDED";
type OrderStatus =
  | "PENDING"
  | "PROCESSING"
  | "SHIPPED"
  | "IN_TRANSIT"
  | "DELIVERED"
  | "RETURN_REQUESTED"
  | "RETURNED";
type ProductStatus = "ACTIVE" | "DISCONTINUED";
type UserRole = "ADMIN" | "USER";
export type UserAddressType = "HOME" | "OFFICE" | "OTHER";
type JsonValue =
  | string
  | number
  | boolean
  | null
  | { [key: string]: JsonValue }
  | JsonValue[];

// Update interfaces with correct types
export interface IAmbulanceBooking extends AmbulanceBooking {
  userId: string;
  ambulanceId: string;
  pickupLocation: string;
  dropLocation: string;
  distanceInKm: number;
  estimatedCost: number;
  status: BookingStatus;
  scheduledAt: Date;
  completedAt: Date;
}

export interface IAmbulanceService extends AmbulanceService {
  name: string;
  licensePlate: string;
  driverName: string;
  driverContact: string;
  status: AmbulanceStatus;
  capacity: number;
  ratePerKm: number;
  baseCharge: number;
  location: string;
}

export interface ICart extends Cart {
  userId: string;
  sessionId: string;
  totalItems: number;
  totalAmount: number;
}

export interface ICoupon extends Coupon {
  code: string;
  description: string;
  discountType: DiscountType;
  discountValue: number;
  minimumOrderAmount: number;
  usageLimit: number;
  usedCount: number;
  startDate: Date;
  endDate: Date;
  status: CouponStatus;
}

export interface IMessages extends Messages {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface IOrder extends Order {
  id: string;
  user: IUser;
  deliveryAddress: string;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  status: OrderStatus;
  items: IOrderItem[];
  couponId: string;
  discountAmount: number;
  totalPrice: number;
  deliveryCharge: number;
  totalPayable: number;
  deliveryDate: Date;
  trackingNumber: string;
  notes: string;
}

export interface IOrderItem extends OrderItem {
  orderId: string;
  product: IProduct;
  quantity: number;
  price: number;
  subtotal: number;
}

export interface IProduct extends Product {
  id: string;
  name: string;
  sku: string;
  images: string[];
  detailsImages: string[];
  regularPrice: number;
  discount: number;
  offerPrice: number;
  stock: number;
  status: ProductStatus;
  tags: string[];
  details: string;
  flexibleData: string;
  category: IProductCategory;
  subcategory: IProductSubCategory;
}

export interface IProductCategory extends ProductCategory {
  name: string;
  thumbnail: string;
  filters: JsonValue;
  subcategories: IProductSubCategory[];
}

export interface IProductSubCategory extends ProductSubCategory {
  name: string;
  filters: JsonValue;
  categoryId: string;
  products: IProduct[];
}

export interface IProductVariant extends ProductVariant {
  productId: string;
  name: string;
  price: number;
  stock: number;
  sku: string;
}

export interface IReview extends Review {
  userId: string;
  productId: string;
  rating: number;
  comment: string;
}

export interface IUser extends User {
  name: string;
  email: string;
  phoneNumber: string;
  emailVerified: Date;
  image: string;
  password: string;
  role: UserRole;
  isTwoFactorEnabled: boolean;
  userAddresses: IUserAddress[];
}

export interface IUserAddress extends UserAddress {
  userId: string;
  type: UserAddressType;
  address1: string;
  address2: string;
  city: string;
  state: string;
  postcode: number;
  country: string;
}

export interface IWishedItem extends WishedItem {
  productId: string;
}

export interface IWishList extends WishList {
  wishedItems: IWishedItem[];
}

export interface INewsletterSubscriber extends NewsletterSubscriber {
  email: string;
  subscribedAt: Date;
}

export interface IBlogPost extends BlogPost {
  title: string;
  content: string;
  thumbnail: string;
  createdAt: Date;
}
