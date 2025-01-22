import * as z from "zod";

// User Schema
export const UserSchema = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  email: z.string().email().optional(),
  emailVerified: z.date().optional(),
  image: z.string().optional(),
  password: z.string().optional(),
  role: z.enum(["ADMIN", "USER"]).default("USER"),
  isTwoFactorEnabled: z.boolean().default(false),
});

// Account Schema
export const AccountSchema = z.object({
  id: z.string().optional(),
  userId: z.string(),
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().optional(),
  access_token: z.string().optional(),
  expires_at: z.number().optional(),
  token_type: z.string().optional(),
  scope: z.string().optional(),
  id_token: z.string().optional(),
  session_state: z.string().optional(),
});

// VerificationToken Schema
export const VerificationTokenSchema = z.object({
  id: z.string().optional(),
  email: z.string(),
  token: z.string(),
  expires: z.date(),
});

// PasswordResetToken Schema
export const PasswordResetTokenSchema = z.object({
  id: z.string().optional(),
  email: z.string(),
  token: z.string(),
  expires: z.date(),
});

// TwoFactorToken Schema
export const TwoFactorTokenSchema = z.object({
  id: z.string().optional(),
  email: z.string(),
  token: z.string(),
  expires: z.date(),
});

// TwoFactorConfirmation Schema
export const TwoFactorConfirmationSchema = z.object({
  id: z.string().optional(),
  userId: z.string(),
});

// UserAddress Schema
export const UserAddressSchema = z.object({
  id: z.string().optional(),
  userId: z.string(),
  type: z.enum(["Home", "Office"]).default("Home"),
  address1: z.string(),
  address2: z.string().optional(),
  state: z.string(),
  city: z.string(),
  postcode: z.number(),
  country: z.string(),
});

// NewsletterSubscriber Schema
export const NewsletterSubscriberSchema = z.object({
  id: z.string().optional(),
  email: z.string().email(),
  subscribedAt: z.date().optional(),
});

// Messages Schema
export const MessagesSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  email: z.string().email(),
  subject: z.string().optional(),
  message: z.string(),
  createdAt: z.date().optional(),
});

// Product Schema
export const ProductSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  sku: z.string().optional(),
  images: z.array(z.string()),
  detailsImages: z.array(z.string()),
  regularPrice: z.number(),
  discount: z.number(),
  offerPrice: z.number(),
  stock: z.number().default(0),
  status: z.enum(["ACTIVE", "DISCONTINUED"]).default("ACTIVE"),
  tags: z.array(z.string()),
  details: z.string().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  categoryId: z.string(),
  subcategoryId: z.string().optional(),
});

// ProductVariant Schema
export const ProductVariantSchema = z.object({
  id: z.string().optional(),
  productId: z.string(),
  name: z.string(),
  price: z.number(),
  stock: z.number().default(0),
  sku: z.string().optional(),
});

// ProductCategory Schema
export const ProductCategorySchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  filters: z.any().optional(),
});

// ProductSubCategory Schema
export const ProductSubCategorySchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  categoryId: z.string(),
});

// Cart Schema
export const CartSchema = z.object({
  id: z.string().optional(),
  userId: z.string().optional(),
  sessionId: z.string().optional(),
  totalItems: z.number().default(0),
  totalAmount: z.number().default(0),
});

// CartItem Schema
export const CartItemSchema = z.object({
  id: z.string().optional(),
  cartId: z.string().optional(),
  productId: z.string(),
  quantity: z.number(),
  price: z.number(),
  subtotal: z.number(),
});

// Order Schema
export const OrderSchema = z.object({
  id: z.string().optional(),
  userId: z.string(),
  deliveryAddress: z.string(),
  paymentMethod: z
    .enum([
      "CASH_ON_DELIVERY",
      "CREDIT_CARD",
      "DEBIT_CARD",
      "UPI",
      "BANK_TRANSFER",
      "WALLET",
    ])
    .default("CASH_ON_DELIVERY"),
  paymentStatus: z
    .enum(["PENDING", "PAID", "FAILED", "REFUNDED"])
    .default("PENDING"),
  status: z
    .enum([
      "PENDING",
      "PROCESSING",
      "SHIPPED",
      "IN_TRANSIT",
      "DELIVERED",
      "RETURN_REQUESTED",
      "RETURNED",
      "CANCELED",
      "FAILED",
      "REFUNDED",
    ])
    .default("PENDING"),
});

// OrderItem Schema
export const OrderItemSchema = z.object({
  id: z.string().optional(),
  orderId: z.string().optional(),
  productId: z.string(),
  quantity: z.number().default(1),
  price: z.number(),
  subtotal: z.number().default(0),
});

// WishList Schema
export const WishListSchema = z.object({
  id: z.string().optional(),
  userId: z.string(),
});

// WishedItem Schema
export const WishedItemSchema = z.object({
  id: z.string().optional(),
  productId: z.string(),
});

// Coupon Schema
export const CouponSchema = z.object({
  id: z.string().optional(),
  code: z.string(),
  description: z.string().optional(),
  discountType: z.enum(["PERCENTAGE", "FLAT"]).default("PERCENTAGE"),
  discountValue: z.number().default(0),
  minimumOrderAmount: z.number().optional(),
  usageLimit: z.number().optional(),
  usedCount: z.number().default(0),
  startDate: z.date(),
  endDate: z.date().optional(),
  status: z.enum(["ACTIVE", "EXPIRED", "INACTIVE"]).default("ACTIVE"),
});

// Review Schema
export const ReviewSchema = z.object({
  id: z.string().optional(),
  userId: z.string(),
  productId: z.string(),
  rating: z.number(),
  comment: z.string().optional(),
});

// AmbulanceService Schema
export const AmbulanceServiceSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  licensePlate: z.string(),
  driverName: z.string().optional(),
  driverContact: z.string().optional(),
  status: z.enum(["AVAILABLE", "BUSY", "OUT_OF_SERVICE"]).default("AVAILABLE"),
  capacity: z.number(),
  ratePerKm: z.number(),
  baseCharge: z.number().default(0),
  location: z.string(),
});

// AmbulanceBooking Schema
export const AmbulanceBookingSchema = z.object({
  id: z.string().optional(),
  userId: z.string().optional(),
  ambulanceId: z.string(),
  pickupLocation: z.string(),
  dropLocation: z.string(),
  distanceInKm: z.number(),
  estimatedCost: z.number(),
  status: z
    .enum(["PENDING", "CONFIRMED", "COMPLETED", "CANCELED"])
    .default("PENDING"),
  scheduledAt: z.date().optional(),
  completedAt: z.date().optional(),
});

// Login Schema
export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  rememberMe: z.boolean().default(false),
  twoFactorCode: z.string().optional(),
});

// Register Schema
export const RegisterSchema = z
  .object({
    name: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(6),
    confirmPassword: z.string().min(6),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

// Password Reset Schema
export const PasswordResetSchema = z.object({
  email: z.string().email(),
});

// Settings Schema
export const SettingsSchema = z.object({
  name: z.string().optional(),
  email: z.string().email().optional(),
  password: z.string().min(6).optional(),
  currentPassword: z.string().optional(),
  isTwoFactorEnabled: z.boolean().default(false),
});

// NewPassword Schema
export const NewPasswordSchema = z
  .object({
    currentPassword: z.string().min(6),
    newPassword: z.string().min(6),
    confirmPassword: z.string().min(6),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });
