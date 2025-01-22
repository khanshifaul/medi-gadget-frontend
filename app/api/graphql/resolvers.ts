/* eslint-disable @typescript-eslint/no-explicit-any */
import { OrderItem } from "@prisma/client";
import { calculateDeliveryCharge, calculateDiscount } from "./helper";
import { Context } from "./route";
import { dateTimeScalar, jsonScalar } from "./scalar";
export const resolvers = {
  JSON: jsonScalar,
  DateTime: dateTimeScalar,

  Query: {
    // User Queries
    User: async (_: any, args: any, context: Context) => {
      return await context.db.user.findUnique({
        where: { id: args.id },
        include: {
          cart: { include: { items: true } },
          orders: true,
          userAddresses: true,
          wishList: true,
        },
      });
    },
    Users: async (_: any, args: any, context: Context) => {
      return await context.db.user.findMany({
        include: {
          cart: { include: { items: true } },
          orders: true,
          userAddresses: true,
          wishList: true,
        },
      });
    },

    // UserAddress Queries
    UserAddress: async (_: any, args: any, context: Context) => {
      return await context.db.userAddress.findUnique({
        where: { id: args.id },
      });
    },
    UserAddresses: async (_: any, args: any, context: Context) => {
      return await context.db.userAddress.findMany({ include: { user: true } });
    },

    // Product Queries
    Product: async (_: any, args: any, context: Context) => {
      return await context.db.product.findUnique({
        where: { id: args.id },
        include: { category: true, subcategory: true },
      });
    },
    Products: async (_: any, args: any, context: Context) => {
      return await context.db.product.findMany({
        include: {
          category: true,
          subcategory: true,
        },
      });
    },
    productCategory: {
      productSubCategories: async (
        parent: any,
        args: any,
        context: Context
      ) => {
        return await context.db.productSubCategory.findMany({
          where: {
            categoryId: parent.id,
          },
          include: {
            products: true,
          },
        });
      },
    },
    productCategories: async (_: any, args: any, context: Context) => {
      return await context.db.productCategory.findMany({
        include: {
          subcategories: {
            include: { products: true },
          },
        },
      });
    },
    productSubCategories: async (_: any, args: any, context: Context) => {
      return await context.db.productSubCategory.findMany({
        include: { products: true },
      });
    },

    // Order Queries
    Order: async (_: any, args: any, context: Context) => {
      return await context.db.order.findUnique({
        where: { id: args.id },
        include: {
          items: {
            include: {
              product: { include: { category: true, subcategory: true } },
            },
          },
          coupon: true,
          user: true,
        },
      });
    },
    Orders: async (_: any, args: any, context: Context) => {
      return await context.db.order.findMany({
        include: {
          items: {
            include: {
              product: { include: { category: true, subcategory: true } },
            },
          },
          coupon: true,
          user: true,
        },
      });
    },

    // Cart Queries
    Cart: async (_: any, args: any, context: Context) => {
      const cart = await context.db.cart.findUnique({
        where: { id: args.id },
        include: { items: true },
      });

      if (!cart) {
        throw new Error("Cart not found");
      }

      // Calculate totalItems and totalAmount
      const totalItems = cart.items.length;
      const totalAmount = cart.items.reduce(
        (sum, item) => sum + item.subtotal,
        0
      );

      return {
        ...cart,
        totalItems,
        totalAmount,
      };
    },

    Carts: async (_: any, args: any, context: Context) => {
      const carts = await context.db.cart.findMany({
        include: { items: true },
      });

      return carts.map((cart) => {
        // Calculate totalItems and totalAmount for each cart
        const totalItems = cart.items.length;
        const totalAmount = cart.items.reduce(
          (sum, item) => sum + item.subtotal,
          0
        );

        return {
          ...cart,
          totalItems,
          totalAmount,
        };
      });
    },

    // AmbulanceService Queries
    AmbulanceService: async (_: any, args: any, context: Context) => {
      return await context.db.ambulanceService.findUnique({
        where: { id: args.id },
      });
    },
    AmbulanceServices: async (_: any, args: any, context: Context) => {
      return await context.db.ambulanceService.findMany();
    },

    // WishList Queries
    WishList: async (_: any, args: any, context: Context) => {
      return await context.db.wishList.findMany({ where: { id: args.id } });
    },
    WishLists: async (_: any, args: any, context: Context) => {
      return await context.db.wishList.findMany();
    },

    // Review Queries
    Reviews: async (_: any, _args: any, context: Context) => {
      return await context.db.review.findMany();
    },
    Review: async (_: any, args: any, context: Context) => {
      return await context.db.review.findUnique({ where: { id: args.id } });
    },

    // Coupon Queries
    Coupon: async (_: any, args: any, context: Context) => {
      return await context.db.coupon.findUnique({ where: { id: args.id } });
    },
    Coupons: async (_: any, args: any, context: Context) => {
      return await context.db.coupon.findMany();
    },

    // Messages Queries
    Message: async (_: any, args: any, context: Context) => {
      return await context.db.messages.findUnique({ where: { id: args.id } });
    },
    Messages: async (_: any, args: any, context: Context) => {
      return await context.db.messages.findMany();
    },

    // NewsletterSubscriber Queries
    NewsletterSubscriber: async (_: any, args: any, context: Context) => {
      return await context.db.newsletterSubscriber.findUnique({
        where: { email: args.email },
      });
    },
    NewsletterSubscribers: async (_: any, args: any, context: Context) => {
      return await context.db.newsletterSubscriber.findMany();
    },

    // TwoFactor Confirmation Queries
    TwoFactorConfirmation: async (_: any, args: any, context: Context) => {
      return await context.db.twoFactorConfirmation.findUnique({
        where: { id: args.id },
      });
    },

    // Blog posts Queries
    blogPosts: async (_: any, __: any, context: Context) => {
      return await context.db.blogPost.findMany();
    },

    // Blog post Queries
    blogPost: async (_: any, args: any, context: Context) => {
      return await context.db.blogPost.findUnique({
        where: { id: args.id },
      });
    },
  },

  Mutation: {
    // User Mutations
    addUser: async (_: any, args: any, context: Context) => {
      return await context.db.user.create({
        data: {
          name: args.name,
          email: args.email,
          password: args.password,
          role: args.role,
          isTwoFactorEnabled: args.isTwoFactorEnabled,
        },
      });
    },
    updateUser: async (_: any, args: any, context: Context) => {
      return await context.db.user.update({
        where: { id: args.id },
        data: {
          name: args.name,
          email: args.email,
          password: args.password,
          role: args.role,
          isTwoFactorEnabled: args.isTwoFactorEnabled,
        },
      });
    },
    deleteUser: async (_: any, args: any, context: Context) => {
      await context.db.user.delete({
        where: { id: args.id },
      });
      return true;
    },

    // UserAddress Mutations
    addUserAddress: async (_: any, args: any, context: Context) => {
      return await context.db.userAddress.create({
        data: {
          userId: args.userId,
          type: args.type,
          address1: args.address1,
          address2: args.address2,
          state: args.state,
          city: args.city,
          postcode: args.postcode,
          country: args.country,
        },
      });
    },
    updateUserAddress: async (_: any, args: any, context: Context) => {
      return await context.db.userAddress.update({
        where: { id: args.id },
        data: {
          type: args.type,
          address1: args.address1,
          address2: args.address2,
          state: args.state,
          city: args.city,
          postcode: args.postcode,
          country: args.country,
        },
      });
    },
    deleteUserAddress: async (_: any, args: any, context: Context) => {
      await context.db.userAddress.delete({
        where: { id: args.id },
      });
      return true;
    },

    // ProductCategory Mutations
    addProductCategory: async (_: any, args: any, context: Context) => {
      return await context.db.productCategory.create({
        data: {
          name: args.name,
          thumbnail: args.thumbnail,
          filters: args.filters,
        },
      });
    },
    updateProductCategory: async (_: any, args: any, context: Context) => {
      return await context.db.productCategory.update({
        where: { id: args.id },
        data: {
          name: args.name,
          filters: args.filters,
        },
      });
    },
    deleteProductCategory: async (_: any, args: any, context: Context) => {
      await context.db.productCategory.delete({
        where: { id: args.id },
      });
      return true;
    },

    // ProductSubCategory Mutations
    addProductSubCategory: async (_: any, args: any, context: Context) => {
      return await context.db.productSubCategory.create({
        data: {
          name: args.name,
          categoryId: args.categoryId,
          filters: args.filters,
        },
      });
    },
    updateProductSubCategory: async (_: any, args: any, context: Context) => {
      return await context.db.productSubCategory.update({
        where: { id: args.id },
        data: {
          name: args.name,
          filters: args.filters,
        },
      });
    },
    deleteProductSubCategory: async (_: any, args: any, context: Context) => {
      await context.db.productSubCategory.delete({
        where: { id: args.id },
      });
      return true;
    },

    // Product Mutations
    addProduct: async (_: any, args: any, context: Context) => {
      return await context.db.product.create({
        data: {
          name: args.name,
          sku: args.sku,
          images: args.images,
          detailsImages: args.detailsImages,
          regularPrice: args.regularPrice,
          discount: args.discount,
          offerPrice: args.offerPrice,
          stock: args.stock,
          status: args.status,
          tags: args.tags,
          details: args.details,
          flexibleData: args.flexibleData,
          category: {
            connect: { id: args.categoryId },
          },
          subcategory: {
            connect: { id: args.subcategoryId },
          },
        },
      });
    },
    updateProduct: async (_: any, args: any, context: Context) => {
      return await context.db.product.update({
        where: { id: args.id },
        data: {
          name: args.name,
          sku: args.sku,
          images: args.images,
          detailsImages: args.detailsImages,
          regularPrice: args.regularPrice,
          discount: args.discount,
          offerPrice: args.offerPrice,
          stock: args.stock,
          status: args.status,
          tags: args.tags,
          details: args.details,
          flexibleData: args.flexibleData,
        },
      });
    },
    deleteProduct: async (_: any, args: any, context: Context) => {
      await context.db.product.delete({
        where: { id: args.id },
      });
      return true;
    },

    // Cart Mutations
    addCart: async (_: any, args: any, context: Context) => {
      return await context.db.cart.create({
        data: {
          userId: args.userId,
          sessionId: args.sessionId,
          totalItems: args.totalItems,
          totalAmount: args.totalAmount,
        },
      });
    },
    updateCart: async (_: any, args: any, context: Context) => {
      return await context.db.cart.update({
        where: { id: args.id },
        data: {
          totalItems: args.totalItems,
          totalAmount: args.totalAmount,
        },
      });
    },
    deleteCart: async (_: any, args: any, context: Context) => {
      await context.db.cart.delete({
        where: { id: args.id },
      });
      return true;
    },

    // CartItem Mutations
    addCartItem: async (_: any, args: any, context: Context) => {
      return await context.db.cartItem.create({
        data: {
          cartId: args.cartId,
          productId: args.productId,
          quantity: args.quantity,
          price: args.price,
          subtotal: args.quantity * args.price,
        },
      });
    },
    updateCartItem: async (_: any, args: any, context: Context) => {
      return await context.db.cartItem.update({
        where: { id: args.id },
        data: {
          quantity: args.quantity,
          price: args.price,
          subtotal: args.quantity * args.price,
        },
      });
    },
    deleteCartItem: async (_: any, args: any, context: Context) => {
      await context.db.cartItem.delete({
        where: { id: args.id },
      });
      return true;
    },

    // Order Mutations
    // Order Mutations
    addOrder: async (_: any, args: any, context: Context) => {
      const {
        userId,
        deliveryAddress,
        paymentMethod,
        items,
        couponId,
        discountAmount,
        deliveryCharge,
        notes,
      } = args.input;

      // Calculate total price and total payable
      const totalPrice = items.reduce(
        (sum: number, item: OrderItem) => sum + item.price * item.quantity,
        0
      );
      const totalPayable = totalPrice - discountAmount + deliveryCharge;

      // Create a new order
      const newOrder = await context.db.order.create({
        data: {
          userId,
          deliveryAddress,
          paymentMethod,
          paymentStatus: "PENDING",
          status: "PENDING",
          couponId,
          discountAmount,
          totalPrice,
          deliveryCharge,
          totalPayable,
          trackingNumber: null,
          notes,
          items: {
            create: items.map((item: any) => ({
              productId: item.productId,
              quantity: item.quantity,
              price: item.price,
              subtotal: item.price * item.quantity,
            })),
          },
        },
        include: { items: true },
      });

      return newOrder;
    },
    createOrderFromCart: async (_: any, args: any, context: Context) => {
      // Validate userId
      if (!args.userId || typeof args.userId !== "string") {
        throw new Error("A valid userId must be provided");
      }

      // Fetch the cart and its items
      const cart = await context.db.cart.findUnique({
        where: { id: args.cartId },
        include: { items: true },
      });

      if (!cart) {
        throw new Error("Cart not found");
      }

      // Calculate total price and total payable
      const totalPrice = cart.items.reduce(
        (sum, item) => sum + item.subtotal,
        0
      );
      const discountAmount = args.couponId
        ? await calculateDiscount(args.couponId, totalPrice)
        : 0;
      const deliveryCharge = calculateDeliveryCharge(cart.items);
      const totalPayable = totalPrice - discountAmount + deliveryCharge;

      // Create the order
      const order = await context.db.order.create({
        data: {
          userId: args.userId,
          deliveryAddress: args.deliveryAddress,
          paymentMethod: args.paymentMethod,
          paymentStatus: "PENDING", // Default payment status
          status: "PENDING", // Default order status
          discountAmount,
          totalPrice,
          deliveryCharge,
          totalPayable,
          items: {
            create: cart.items.map((item: any) => ({
              productId: item.productId,
              quantity: item.quantity,
              price: item.price,
              subtotal: item.subtotal,
            })),
          },
          couponId: args.couponId,
        },
        include: { items: true },
      });

      // Optionally, clear the cart after order creation
      await context.db.cartItem.deleteMany({ where: { cartId: args.cartId } });

      return order;
    },

    updateOrderStatus: async (_: unknown, args: any, context: Context) => {
      return await context.db.order.update({
        where: { id: args.id },
        data: {
          status: args.status,
        },
      });
    },

    // Messages Mutations
    addMessage: async (_: any, args: any, context: Context) => {
      return await context.db.messages.create({
        data: {
          name: args.name,
          email: args.email,
          subject: args.subject,
          message: args.message,
        },
      });
    },
    updateMessage: async (_: any, args: any, context: Context) => {
      return await context.db.messages.update({
        where: { id: args.id },
        data: {
          name: args.name,
          email: args.email,
          subject: args.subject,
          message: args.message,
        },
      });
    },
    deleteMessage: async (_: any, args: any, context: Context) => {
      await context.db.messages.delete({
        where: { id: args.id },
      });
      return true;
    },
    // NewsletterSubscriber Mutations
    addNewsletterSubscriber: async (_: any, args: any, context: Context) => {
      return await context.db.newsletterSubscriber.create({
        data: {
          email: args.email,
        },
      });
    },
    deleteNewsletterSubscriber: async (_: any, args: any, context: Context) => {
      await context.db.newsletterSubscriber.delete({
        where: { id: args.id },
      });
      return true;
    },

    // Add a new blog post
    addBlogPost: async (_: any, args: any, context: Context) => {
      return await context.db.blogPost.create({
        data: {
          title: args.title,
          content: args.content,
          thumbnail: args.thumbnail,
        },
      });
    },

    // Update an existing blog post
    updateBlogPost: async (_: any, args: any, context: Context) => {
      return await context.db.blogPost.update({
        where: { id: args.id },
        data: {
          title: args.title,
          content: args.content,
          thumbnail: args.thumbnail,
        },
      });
    },

    // Delete a blog post
    deleteBlogPost: async (_: any, args: any, context: Context) => {
      return await context.db.blogPost.delete({
        where: { id: args.id },
      });
    },
  },
};
