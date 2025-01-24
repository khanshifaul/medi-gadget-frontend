export const typeDefs = `#graphql
# Custom scalar types
scalar JSON
scalar DateTime

# Enum for User Role
enum UserRole {
  ADMIN
  USER
}

# Enum for Product Status
enum ProductStatus {
  ACTIVE
  DISCONTINUED
}

# Enum for Payment Method
enum PaymentMethod {
  CASH_ON_DELIVERY
  CREDIT_CARD
  DEBIT_CARD
  UPI
  BANK_TRANSFER
  WALLET
}

# Enum for Payment Status
enum PaymentStatus {
  PENDING
  PAID
  FAILED
  REFUNDED
}

# Enum for Order Status
enum OrderStatus {
  PENDING
  PROCESSING
  SHIPPED
  IN_TRANSIT
  DELIVERED
  RETURN_REQUESTED
  RETURNED
  CANCELED
  FAILED
  REFUNDED
}

# Enum for Discount Type
enum DiscountType {
  PERCENTAGE
  FLAT
}

# Enum for Coupon Status
enum CouponStatus {
  ACTIVE
  EXPIRED
  INACTIVE
}

# Enum for Ambulance Status
enum AmbulanceStatus {
  AVAILABLE
  BUSY
  OUT_OF_SERVICE
}

# Enum for Booking Status
enum BookingStatus {
  PENDING
  CONFIRMED
  COMPLETED
  CANCELED
}

# User Model
type User {
  id: String!
  name: String!
  email: String!
  emailVerified: DateTime
  phoneNumber: String
  image: String
  password: String
  role: UserRole
  isTwoFactorEnabled: Boolean
  userAddresses: [UserAddress!]
  cart: Cart
  wishList: WishList
  orders: [Order!]
  reviews: [Review!]
  ambulanceBooking: [AmbulanceBooking!]
}

# TwoFactorConfirmation Model
type TwoFactorConfirmation {
  id: String!
  userId: String!
  user: User!
}

# Cart Model
type Cart {
  id: String!
  userId: String
  sessionId: String
  totalItems: Int
  totalAmount: Float
  items: [CartItem!]
  createdAt: DateTime!
  updatedAt: DateTime!
}

# CartItem Model
type CartItem {
  id: String!
  cartId: String
  productId: String!
  quantity: Int!
  price: Float!
  subtotal: Float!
  createdAt: DateTime!
  updatedAt: DateTime!
}

# Product Model
type Product {
  id: String!
  name: String!
  sku: String!
  images: [String!]
  detailsImages: [String!]
  regularPrice: Float!
  discount: Float!
  offerPrice: Float!
  stock: Int!
  status: ProductStatus
  tags: [String!]
  details: String
  createdAt: DateTime!
  updatedAt: DateTime!
  category: ProductCategory!
  subcategory: ProductSubCategory!
  flexibleData: JSON
}

# ProductVariant Model
type ProductVariant {
  id: String!
  productId: String!
  product: Product!
  name: String!
  price: Float!
  stock: Int!
  sku: String
  createdAt: DateTime!
  updatedAt: DateTime!
}

# ProductCategory Model
type ProductCategory {
  id: String!
  name: String!
  thumbnail: String
  filters: JSON
  subcategories: [ProductSubCategory!]
  products: [Product!]
  createdAt: DateTime!
  updatedAt: DateTime!
}

# ProductSubCategory Model
type ProductSubCategory {
  id: String!
  name: String!
  categoryId: String!
  filters: JSON
  products: [Product!]
  createdAt: DateTime!
  updatedAt: DateTime!
}

# Order Model
type Order {
  id: String!
  userId: String!
  deliveryAddress: String!
  paymentMethod: PaymentMethod!
  paymentStatus: PaymentStatus!
  status: OrderStatus!
  items: [OrderItem!]!
  couponId: String
  coupon: Coupon
  discountAmount: Float!
  totalPrice: Float!
  deliveryCharge: Float!
  totalPayable: Float!
  deliveryDate: DateTime
  trackingNumber: String
  notes: String
  createdAt: DateTime!
  updatedAt: DateTime!
  user: User!
}

# OrderItem Model
type OrderItem {
  id: String!
  orderId: String
  productId: String!
  product: Product
  quantity: Int!
  price: Float!
  subtotal: Float!
  order: Order
}

# Coupon Model
type Coupon {
  id: String!
  code: String!
  description: String
  discountType: DiscountType!
  discountValue: Float!
  minimumOrderAmount: Float
  usageLimit: Int
  usedCount: Int!
  startDate: DateTime!
  endDate: DateTime
  status: CouponStatus!
  createdAt: DateTime!
  updatedAt: DateTime!
  Order: [Order!]!
}

# Review Model
type Review {
  id: String!
  userId: String!
  productId: String!
  rating: Int!
  comment: String
  createdAt: DateTime!
  updatedAt: DateTime!
  user: User!
  product: Product!
}

# AmbulanceService Model
type AmbulanceService {
  id: String!
  name: String!
  licensePlate: String!
  driverName: String
  driverContact: String
  status: AmbulanceStatus!
  capacity: Int!
  ratePerKm: Float!
  baseCharge: Float!
  location: String!
  bookings: [AmbulanceBooking!]!
  createdAt: DateTime!
  updatedAt: DateTime!
}

# AmbulanceBooking Model
type AmbulanceBooking {
  id: String!
  userId: String
  ambulanceId: String!
  status: BookingStatus!
  bookingTime: DateTime!
  ambulance: AmbulanceService!
  user: User
}

# WishedItem Model
type WishedItem {
  id: String!
  productId: String!
  product: Product!
  createdAt: DateTime!
  wishlistId: String
  wishList: WishList
}

# WishList Model
type WishList {
  id: String!
  userId: String!
  wishedItems: [WishedItem!]!
  createdAt: DateTime!
  updatedAt: DateTime!
  user: User!
}

# UserAddress Model
type UserAddress {
  id: String!
  userId: String!
  type: UserAddressType!
  address1: String!
  address2: String
  state: String!
  city: String!
  postcode: Int!
  country: String!
  user: User!
}

# Enum for User Address Type
enum UserAddressType {
  HOME
  OFFICE
  OTHER
}

# EmailVerificationToken Model
type EmailVerificationToken {
  id: String!
  email: String!
  token: String!
  expires: DateTime!
}

# PasswordResetToken Model
type PasswordResetToken {
  id: String!
  email: String!
  token: String!
  expires: DateTime!
}

# TwoFactorToken Model
type TwoFactorToken {
  id: String!
  email: String!
  token: String!
  expires: DateTime!
}

# Messages Model
type Messages {
  id: String!
  name: String!
  email: String!
  subject: String
  message: String!
  createdAt: DateTime!
}

# NewsletterSubscriber Model
type NewsletterSubscriber {
  id: String!
  email: String!
  subscribedAt: DateTime
}
# BlogPost Model
type BlogPost {
  id: ID!
  title: String!
  content: String!
  thumbnail: String!
  createdAt: DateTime!
  updatedAt: DateTime!
}

type Query {
  # User Queries
  User(id: String!): User
  Users: [User!]!

  # UserAddress Queries
  UserAddress(id: String!): UserAddress
  UserAddresses: [UserAddress!]!
  
  # Product Queries
  Product(id: String!): Product
  Products: [Product!]!
  
  # ProductCategory
  productCategory(id: ID!): ProductCategory
  productCategories: [ProductCategory!]!
  
  # ProductSubCategory
  productSubCategory(id: ID!): ProductSubCategory
  productSubCategories: [ProductSubCategory!]!
  
  # Order Queries
  Order(id: String!): Order
  Orders: [Order!]!

  # Cart Queries
  Cart(id: String!): Cart
  Carts: [Cart!]
  
  # AmbulanceService Queries
  AmbulanceService(id: String!): AmbulanceService
  AmbulanceServices: [AmbulanceService!]!
  
  # WishList Queries
  WishList(id: String!): WishList
  WishLists: [WishList!]!
  
  # Review Queries
  Review(id: String!): Review
  Reviews: [Review!]!

  # Coupon Queries
  Coupon(id: String!): Coupon
  Coupons: [Coupon!]!
  
  # Messages Queries
  Message(id: String!): Messages
  Messages: [Messages!]!
  
  # NewsletterSubscriber Queries
  NewsletterSubscriber(email:String!): NewsletterSubscriber
  NewsletterSubscribers: [NewsletterSubscriber!]

  # TwoFactor Confirmation Queries
  TwoFactorConfirmation(id: String!): TwoFactorConfirmation

  # EmailVerificationToken Queries
  EmailVerificationToken(email: String!): EmailVerificationToken

  # BlogPost Queries
  blogPosts: [BlogPost!]
  blogPost(id: ID!): BlogPost
}

input OrderItemInput {
  productId: String!
  quantity: Int!
  price: Float!
}

input AddOrderInput {
  userId: String!
  deliveryAddress: String!
  paymentMethod: PaymentMethod!
  items: [OrderItemInput!]!
  couponId: String
  discountAmount: Float!
  deliveryCharge: Float!
  notes: String
}


type Mutation {
  # User Mutations
  addUser(name: String!, email: String!, password: String!, role: UserRole, isTwoFactorEnabled: Boolean): User
  updateUser(id: String!, name: String, email: String, phoneNumber: String, password: String, role: UserRole, isTwoFactorEnabled: Boolean): User
  deleteUser(id: String!): Boolean

  # UserAddress Mutations
  addUserAddress(userId: String!, type: UserAddressType!, address1: String!, address2: String, state: String!, city: String!, postcode: Int!, country: String!): UserAddress
  updateUserAddress(id: String!, type: UserAddressType, address1: String, address2: String, state: String, city: String, postcode: Int, country: String): UserAddress
  deleteUserAddress(id: String!): Boolean

  # ProductCategory Mutations
  addProductCategory(name: String!, thumbnail: String, filters: JSON): ProductCategory
  updateProductCategory(id: String!, name: String, thumbnail: String, filters: JSON): ProductCategory
  deleteProductCategory(id: String!): Boolean

  # ProductSubCategory Mutations
  addProductSubCategory(name: String!, categoryId: String!, filters: JSON): ProductSubCategory
  updateProductSubCategory(id: String!, name: String, filters: JSON): ProductSubCategory
  deleteProductSubCategory(id: String!): Boolean

  # Product Mutations
  addProduct(name: String!, sku: String!, images: [String!], detailsImages: [String!], regularPrice: Float!, discount: Float!, offerPrice: Float!, stock: Int!, status: ProductStatus, tags: [String!], details: String, categoryId: String!, subcategoryId: String!, flexibleData: JSON): Product
  
  updateProduct( id: String!, name: String, sku: String, images: [String!], detailsImages: [String!], regularPrice: Float, discount: Float, offerPrice: Float, stock: Int, status: ProductStatus, tags: [String!], details: String, categoryId: String, subcategoryId: String, flexibleData: JSON): Product

  deleteProduct(id: String!): Boolean

  # Cart Mutations
  addCart(userId: String, sessionId: String, totalItems: Int, totalAmount: Float): Cart
  updateCart(id: String!, totalItems: Int, totalAmount: Float): Cart
  deleteCart(id: String!): Boolean

  # CartItem Mutations
  addCartItem(cartId: String!, productId: String!, quantity: Int!, price: Float!): CartItem
  updateCartItem(id: String!, quantity: Int, price: Float): CartItem
  deleteCartItem(id: String!): Boolean

  # Order Mutations
  addOrder(input: AddOrderInput!): Order!
  createOrderFromCart(userId: String!, cartId: String!, deliveryAddress: String!, paymentMethod: PaymentMethod!, couponId: String): Order
  updateOrderStatus(id: String!, status: OrderStatus!): Order
  deleteOrder(id: String!): Boolean


  # Messages Mutations
  addMessage(name: String!, email: String!, subject: String, message: String!): Messages
  updateMessage(id: String!, name: String, email: String, subject: String, message: String): Messages
  deleteMessage(id: String!): Boolean
  
  # NewsletterSubscriber Mutations
  addNewsletterSubscriber(email: String!): NewsletterSubscriber
  deleteNewsletterSubscriber(id: String!): Boolean

  # BlogPost Mutations
  addBlogPost(title: String!, content: String!, thumbnail: String!): BlogPost
  updateBlogPost(id: ID!, title: String, content: String, thumbnail: String): BlogPost
  deleteBlogPost(id: ID!): BlogPost

}`;
