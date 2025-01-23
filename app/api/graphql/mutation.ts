import { gql } from "@apollo/client";

export const ADD_NEWSLETTERSUBSCRIBER = gql`
  mutation AddNewsletterSubscriber($email: String!) {
    addNewsletterSubscriber(email: $email) {
      id
      email
      subscribedAt
    }
  }
`;

export const DELETE_NEWSLETTERSUBSCRIBER = gql`
  mutation DeleteNewsletterSubscriber($deleteNewsletterSubscriberId: String!) {
    deleteNewsletterSubscriber(id: $deleteNewsletterSubscriberId)
  }
`;

export const ADD_PRODUCT = gql`
  mutation AddProduct(
    $name: String!
    $sku: String!
    $regularPrice: Float!
    $discount: Float!
    $offerPrice: Float!
    $stock: Int!
    $categoryId: String!
    $subcategoryId: String!
    $images: [String!]
    $detailsImages: [String!]
    $status: ProductStatus
    $tags: [String!]
    $details: String
    $flexibleData: JSON
  ) {
    addProduct(
      name: $name
      sku: $sku
      regularPrice: $regularPrice
      discount: $discount
      offerPrice: $offerPrice
      stock: $stock
      categoryId: $categoryId
      subcategoryId: $subcategoryId
      images: $images
      detailsImages: $detailsImages
      status: $status
      tags: $tags
      details: $details
      flexibleData: $flexibleData
    ) {
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
    }
  }
`;

export const DELETE_PRODUCT = gql`
  mutation DeleteProduct($deleteProductId: String!) {
    deleteProduct(id: $deleteProductId)
  }
`;

export const ADD_PRODUCT_CATEGORY = gql`
  mutation AddProductCategory($name: String!, $thumbnail: String) {
    addProductCategory(name: $name, thumbnail: $thumbnail) {
      id
      name
      thumbnail
    }
  }
`;

export const DELETE_PRODUCT_CATEGORY = gql`
  mutation DeleteProductCategory($deleteProductCategoryId: String!) {
    deleteProductCategory(id: $deleteProductCategoryId)
  }
`;

export const ADD_PRODUCT_SUBCATEGORY = gql`
  mutation AddProductSubCategory($name: String!, $categoryId: String!) {
    addProductSubCategory(name: $name, categoryId: $categoryId) {
      id
      name
    }
  }
`;

export const DELETE_PRODUCT_SUBCATEGORY = gql`
  mutation DeleteProductSubCategory($deleteProductSubCategoryId: String!) {
    deleteProductSubCategory(id: $deleteProductSubCategoryId)
  }
`;

export const UPDATE_USER_INFO = gql`
  mutation UpdateUser(
    $updateUserId: String!
    $name: String
    $email: String
    $isTwoFactorEnabled: Boolean
    $phoneNumber: String
  ) {
    updateUser(
      id: $updateUserId
      name: $name
      email: $email
      isTwoFactorEnabled: $isTwoFactorEnabled
      phoneNumber: $phoneNumber
    ) {
      name
      email
      isTwoFactorEnabled
      phoneNumber
    }
  }
`;

export const UPDATE_USER_PASSWORD = gql`
  mutation UpdateUser($updateUserId: String!, $password: String) {
    updateUser(id: $updateUserId, password: $password) {
      id
      name
    }
  }
`;

export const UPDATE_USER_ADDRESS = gql`
  mutation UpdateUserAddress(
    $updateUserAddressId: String!
    $address1: String
    $address2: String
    $state: String
    $city: String
    $postcode: Int
    $country: String
  ) {
    updateUserAddress(
      id: $updateUserAddressId
      address1: $address1
      address2: $address2
      state: $state
      city: $city
      postcode: $postcode
      country: $country
    ) {
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
`;

export const ADD_BLOGPOST = gql`
  mutation AddBlogPost(
    $title: String!
    $content: String!
    $thumbnail: String!
  ) {
    addBlogPost(title: $title, content: $content, thumbnail: $thumbnail) {
      id
      title
      content
      thumbnail
      createdAt
      updatedAt
    }
  }
`;

export const UPDATE_BLOGPOST = gql`
  mutation UpdateBlogPost(
    $updateBlogPostId: String!
    $title: String
    $content: String
    $thumbnail: String
  ) {
    updateBlogPost(
      id: $updateBlogPostId
      title: $title
      content: $content
      thumbnail: $thumbnail
    ) {
      id
      title
      content
      thumbnail
      createdAt
      updatedAt
    }
  }
`;
export const DELETE_BLOGPOST = gql`
  mutation DeleteBlogPost($deleteBlogPostId: String!) {
    deleteBlogPost(id: $deleteBlogPostId)
  }
`;
export const ADD_MESSAGE = gql`
  mutation AddMessage(
    $name: String!
    $email: String!
    $subject: String!
    $message: String
  ) {
    addMessage(
      name: $name
      email: $email
      subject: $subject
      message: $message
    ) {
      id
      name
      email
      subject
      message
      createdAt
    }
  }
`;
export const DELETE_MESSAGE = gql`
  mutation DeleteMessage($deleteMessageId: String!) {
    deleteMessage(id: $deleteMessageId)
  }
`;

export const ADD_USER_ADDRESS = gql`
  mutation AddUserAddress(
    $userId: String!
    $type: UserAddressType!
    $address1: String!
    $state: String!
    $city: String!
    $postcode: Int!
    $country: String!
    $address2: String
  ) {
    addUserAddress(
      userId: $userId
      type: $type
      address1: $address1
      state: $state
      city: $city
      postcode: $postcode
      country: $country
      address2: $address2
    ) {
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
`;

export const ADD_ORDER = gql`
  mutation AddOrder($input: AddOrderInput!) {
    addOrder(input: $input) {
      id
    }
  }
`;

export const DELETE_ORDER = gql`
  mutation DeleteOrder($deleteOrderId: String!) {
    deleteOrder(id: $deleteOrderId)
  }
`;
export const UPDATE_ORDER_STATUS = gql`
  mutation UpdateOrderStatus(
    $updateOrderStatusId: String!
    $status: OrderStatus!
  ) {
    updateOrderStatus(id: $updateOrderStatusId, status: $status) {
      id
      status
    }
  }
`;
