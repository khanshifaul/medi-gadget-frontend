# MediGadget Platform

Welcome to the MediGadget Platform, a multi-service e-commerce platform designed for the sale of medical gadgets and ambulance booking services. This platform integrates modern web technologies to provide a seamless user experience.

## Table of Contents

- [Features](#features)
- [Technology Stack](#technology-stack)
- [Installation](#installation)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [License](#license)

## Features

- **User Registration and Login**: Secure authentication with email and social media accounts.
- **Product Browsing and Purchase**: Browse, filter, and purchase medical gadgets.
- **Ambulance Booking**: Search and book available ambulances based on location.
- **Responsive Design**: Accessible on both web and mobile devices.
- **Secure Transactions**: Integrated payment gateway for secure financial transactions.

## Technology Stack

- **Frontend**: React, Next.js
- **Backend**: Node.js, Apollo Server
- **Database**: PostgreSQL via Prisma
- **State Management**: Redux Toolkit
- **Validation**: Zod
- **Email Services**: Nodemailer
- **Authentication**: NextAuth.js

## Installation

To set up the MediGadget platform locally, follow these steps:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/khanshifaul/medigadget.git
   cd medigadget
   ```
2. **Install Dependencies**:
   ```bash
   npm install
   ```
3. **Configure Environment Variables**:

   Create a .env file in the root directory and set the necessary environment variables.

   ```bash
   DATABASE_URL=your_database_url
   NEXTAUTH_URL=your_nextauth_url
   NEXTAUTH_SECRET=your_nextauth_secret
   ```

4. **Run the Development Server:**:
   ```bash
   npm run dev
   ```
5. **Access the Application:**

   Open your web browser and navigate to http://localhost:3000 to access the MediGadget platform.

6. **Build for Production:**

   Run the following command to build the application for production:

   ```bash
   npm run build
   ```

## Usage

- **User Registration and Login**:
- **Product Browsing and Purchase**:
- **Ambulance Booking**:

## API Documentation

For detailed API documentation, refer to the [API Documentation](API_DOCS.md).

## Contributing

Contributions are welcome! Please follow the [Contributing Guidelines](CONTRIBUTING.md) for details on how to contribute to this project.

## License

This project is licensed under the [MIT License](LICENSE).

---
