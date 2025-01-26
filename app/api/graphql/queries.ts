import { gql } from "@apollo/client";

export const GET_USER_INFO = gql`
  query User($userId: String!) {
    User(id: $userId) {
      id
      name
      email
      emailVerified
      image
      role
      isTwoFactorEnabled
      userAddresses {
        id
        type
        address1
        address2
        state
        city
        postcode
        country
      }
      wishList {
        id
        wishedItems {
          product {
            name
            category {
              name
            }
            subcategory {
              name
            }
          }
        }
      }
      orders {
        id
        paymentStatus
        items {
          quantity
          subtotal
          price
          product {
            name
          }
        }
      }
      phoneNumber
    }
  }
`;

export const GET_USERS_ADDRESS = gql`
  query UserAddress($userId: String!) {
    User(id: $userId) {
      userAddresses {
        id
        userId
        type
        address1
        address2
        state
        city
        postcode
        country
      }
    }
  }
`;

export const GET_USERS = gql`
  query Users {
    Users {
      id
      name
      email
      emailVerified
      phoneNumber
      image
      password
      role
      isTwoFactorEnabled
      userAddresses {
        id
        userId
        type
        address1
        address2
        state
        city
        postcode
        country
      }
      wishList {
        wishedItems {
          product {
            name
          }
        }
      }
      orders {
        id
      }
    }
  }
`;

export const GET_USER = gql`
  query User($userId: String!) {
    User(id: $userId) {
      name
      email
      phoneNumber
      image
      role
      isTwoFactorEnabled
    }
  }
`;

export const GET_USER_ADDRESSES = gql`
  query UserAddresses {
    UserAddresses {
      id
      userId
      type
      address1
      address2
      state
      city
      postcode
      country
      createdAt
      updatedAt
    }
  }
`;

export const GET_USER_ADDRESS = gql`
  query UserAddress($userAddressId: String!) {
    UserAddress(id: $userAddressId) {
      id
      userId
      type
      address1
      address2
      state
      city
      postcode
      country
      createdAt
      updatedAt
    }
  }
`;

export const GET_CATEGORIES = gql`
  query ProductCategories {
    productCategories {
      id
      name
      thumbnail
      filters
      subcategories {
        name
        products {
          id
          name
          regularPrice
          discount
          offerPrice
        }
      }
      createdAt
      updatedAt
    }
  }
`;

export const GET_CATEGORY = gql`
  query ProductCategory($productCategoryId: ID!) {
    productCategory(id: $productCategoryId) {
      id
      name
      thumbnail
      subcategories {
        id
        name
        products {
          id
          name
          regularPrice
          discount
          offerPrice
        }
      }
    }
  }
`;

export const GET_PRODUCTS = gql`
  query Products {
    Products {
      id
      name
      sku
      images
      detailsImages
      regularPrice
      discount
      offerPrice
      stock
      status
      tags
      details
      createdAt
      updatedAt
      flexibleData
      category {
        id
        name
      }
      subcategory {
        id
        name
      }
    }
  }
`;

export const GET_PRODUCT = gql`
  query Product($productId: String!) {
    Product(id: $productId) {
      id
      name
      sku
      images
      detailsImages
      regularPrice
      discount
      offerPrice
      stock
      status
      tags
      details
      createdAt
      updatedAt
      category {
        id
        name
      }
      subcategory {
        id
        name
      }
      flexibleData
    }
  }
`;

export const GET_NEWSLETTERSUBSCRIBERS = gql`
  query NewsletterSubscribers {
    NewsletterSubscribers {
      id
      email
      subscribedAt
    }
  }
`;

export const GET_NEWSLETTERSUBSCRIBER = gql`
  query NewsletterSubscriber($email: String!) {
    NewsletterSubscriber(email: $email) {
      email
      subscribedAt
    }
  }
`;

export const GET_MESSAGES = gql`
  query Messages {
    Messages {
      id
      name
      email
      subject
      message
      createdAt
    }
  }
`;

export const GET_MESSAGE = gql`
  query Message($messageId: String!) {
    Message(id: $messageId) {
      name
      email
      subject
      message
      createdAt
    }
  }
`;

export const GET_BLOGPOSTS = gql`
  query BlogPosts {
    blogPosts {
      id
      title
      content
      thumbnail
      createdAt
      updatedAt
    }
  }
`;
export const GET_BLOGPOST = gql`
  query BlogPost($blogPostId: String!) {
    blogPost(id: $blogPostId) {
      id
      title
      content
      thumbnail
      createdAt
      updatedAt
    }
  }
`;

export const GET_ORDERS = gql`
  query Orders {
    Orders {
      id
      user {
        id
        name
        phoneNumber
        email
      }
      deliveryAddress
      paymentMethod
      paymentStatus
      status
      discountAmount
      totalPrice
      deliveryCharge
      totalPayable
      deliveryDate
      trackingNumber
      notes
      createdAt
      updatedAt
      items {
        id
        quantity
        price
        subtotal
        product {
          name
          sku
          category {
            name
          }
          subcategory {
            name
          }
        }
      }
    }
  }
`;
export const GET_ORDER = gql`
  query Order($orderId: String!) {
    Order(id: $orderId) {
      id
      userId
      status
      total
      createdAt
      updatedAt
      orderItems {
        id
        orderId
        productId
        quantity
        price
        createdAt
        updatedAt
        product {
          id
          name
          sku
          images
          detailsImages
          regularPrice
          discount
          offerPrice
          stock
          status
          tags
        }
      }
    }
  }
`;
