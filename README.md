# 🌊 DripIt - E-Commerce Platform

![DripIt Banner](/client/src/assets/HomeScreenshot.png)  

DripIt is a modern e-commerce platform built with a MERN stack (MongoDB, Express, React, Node.js) that provides seamless shopping experiences with secure payments, user authentication, and cloud-based media management.

## ✨ Features

- **User Authentication** 🔒  
  Secure login with JWT and bcrypt password hashing
- **Cloudinary Integration** ☁️  
  Image uploads and management for product listings
- **PayPal Payment Processing** 💳  
  Secure checkout with PayPal integration
- **RESTful API** 🌐  
  Well-structured backend with Express and MongoDB
- **Modern UI** 🎨  
  Responsive React frontend for optimal user experience
- **Admin Dashboard** 📊  
  Manage products, orders, and users with ease

## 🚀 Technologies Used

### 🩵Backend
![Node.js](https://img.shields.io/badge/Node.js-18-green)
![Express](https://img.shields.io/badge/Express-4.21-lightgrey)
![MongoDB](https://img.shields.io/badge/MongoDB-8.8-green)
![JWT](https://img.shields.io/badge/JWT-Auth-orange)

### 🩵Frontend
![React](https://img.shields.io/badge/React-18-blue)
![Vite](https://img.shields.io/badge/Vite-Build-yellow)

### Services
![Cloudinary](https://img.shields.io/badge/Cloudinary-CDN-blue)
![PayPal](https://img.shields.io/badge/PayPal-Payment-blue)

### Development Tools
![Nodemon](https://img.shields.io/badge/Nodemon-Dev_Server-green)
![Dotenv](https://img.shields.io/badge/Dotenv-Environment-grey)

## 📦 Installation

| Step | Description                        | Command |
|------|------------------------------------|---------|
| 1.   | **Clone Repo and Navigate**        | ```git clone https://github.com/your-username/dripit.git``` && ```cd dripit``` |
| 2.   | **Install Backend Dependencies**   | ```npm install``` |
| 3.   | **Install Frontend Dependencies**  | ```npm install --prefix client``` |
| 4.   | **Create `.env` File**             | ```MONGODB_URI=your_mongodb_connection_string```, ```JWT_SECRET=your_jwt_secret_key```, ```CLOUDINARY_CLOUD_NAME=your_cloudinary_name```, ```CLOUDINARY_API_KEY=your_cloudinary_key```, ```CLOUDINARY_API_SECRET=your_cloudinary_secret```, ```PAYPAL_CLIENT_ID=your_paypal_client_id```, ```PAYPAL_CLIENT_SECRET=your_paypal_secret``` |


## 🛠️ Usage

| Mode             | Description                                      | Command |
|------------------|--------------------------------------------------|---------|
| Development      | **Start Backend (nodemon)**                      | ```npm run dev``` |
|                  | **Start Frontend (from /client)**                | ```cd client<br>npm run dev``` |
| Production Build | **Build Optimized Frontend**                     | ```run build``` |
|                  | **Start Production Server**                      | ```npm start``` |

# 🛠️ API & Structure

## 🌐 API Endpoints

| 🛣️ Endpoint        | 🔧 Method | 📄 Description           |
|--------------------|-----------|---------------------------|
| `/api/users`       | POST      | Register new user         |
| `/api/users/auth`  | POST      | Authenticate user         |
| `/api/products`    | GET       | Get all products          |
| `/api/orders`      | POST      | Create new order          |
| `/api/upload`      | POST      | Upload product images     |

## 📁 Project Structure

```text
dripit/
├── client/          # ⚛️ React frontend
│   ├── public/
│   ├── src/
│   └── ...          
│
├── server/          # 🚀 Express backend
│   ├── config/      # ⚙️ Configuration files
│   ├── controllers/ # 🧠 Route controllers
│   ├── models/      # 🗃️ MongoDB models
│   ├── routes/      # 🧭 API routes
│   ├── utils/       # 🛠️ Helper functions
│   └── server.js    # 🧩 Main server file
│
├── .env.example     # 🔐 Environment variables template
├── package.json     # 📦 Project dependencies
└── README.md        # 📝 Project documentation
```


## 📸 Screenshots

| 🖼️ View              | Image |
|----------------------|-------|
| Home Page            | ![Home](https://via.placeholder.com/300x200.png?text=Home+Page) |
| Product Page         | ![Product](https://via.placeholder.com/300x200.png?text=Product+Page) |
| Checkout             | ![Checkout](https://via.placeholder.com/300x200.png?text=Checkout) |
| User Profile         | ![User](https://via.placeholder.com/300x200.png?text=User+Profile) |
| Admin Dashboard      | ![Admin](https://via.placeholder.com/300x200.png?text=Admin+Dashboard) |
| Mobile View          | ![Mobile](https://via.placeholder.com/300x200.png?text=Mobile+View) |

---

## 🤝 Contributing

We welcome contributions! Here's how to get started:

```bash
# 1. Fork the project

# 2. Create your feature branch
git checkout -b feature/AmazingFeature

# 3. Commit your changes
git commit -m 'Add some AmazingFeature'

# 4. Push to the branch
git push origin feature/AmazingFeature

# 5. Open a pull request 🚀
```

## 📜 License
This project is licensed under the ISC License. See the LICENSE file for more details.

## 🧑‍💻 Developed by ```Robbie Ncube```
