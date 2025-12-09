# 🚀 Backend Setup & Connection Guide

## ✅ What Has Been Done

Your React frontend is now **fully connected** to the Spring Boot backend! Here's what was implemented:

### 1. **CartContext.js** - Complete Backend Integration
- ✅ Fetches cart from `/api/cart/{userId}` on mount
- ✅ `addToCart(productId, quantity)` → POST to `/api/cart/{userId}/items`
- ✅ `updateQuantity(itemId, quantity)` → PUT to `/api/cart/{userId}/items/{itemId}`
- ✅ `removeItem(itemId)` → DELETE to `/api/cart/{userId}/items/{itemId}`
- ✅ `clearCart()` → DELETE to `/api/cart/{userId}/clear`
- ✅ `checkout(data)` → POST to `/api/orders/checkout/{userId}`
- ✅ Loading states and error handling

### 2. **CartPage.js** - Enhanced with Backend
- ✅ Shows loading state while fetching cart
- ✅ Displays items from backend (with product details)
- ✅ Quantity +/- buttons that update backend
- ✅ Remove item button
- ✅ Clear cart button
- ✅ Real-time total calculation from backend

### 3. **CheckoutPage.js** - Backend Checkout
- ✅ Uses `checkout()` from CartContext
- ✅ Sends proper payload: `fullName`, `address`, `city`, `postal`, `paymentMethod`, `card`
- ✅ Shows submitting state
- ✅ Redirects to `/orders` after successful checkout
- ✅ Cart automatically cleared by backend

### 4. **MenuPage.js** - Backend Add to Cart
- ✅ Calls `addToCart(productId, 1)` with product ID (not whole object)
- ✅ Shows "Adding..." state while processing
- ✅ Success/error alerts

### 5. **OrdersPage.js** - Already Connected ✓
- ✅ Fetches orders from `/api/orders/user/{userId}`
- ✅ Updates order status
- ✅ Deletes orders

---

## 🛠️ Backend Setup Steps

### Prerequisites
1. **MySQL Server** running on `localhost:3306`
2. **Java 17+** installed
3. **Maven** installed

### Step 1: Create the Database

Open **MySQL Workbench** or MySQL CLI and run:

```sql
CREATE DATABASE IF NOT EXISTS southside_apparel
  DEFAULT CHARACTER SET utf8mb4
  DEFAULT COLLATE utf8mb4_unicode_ci;
```

### Step 2: Run the Schema SQL

In MySQL Workbench:
1. File → Open SQL Script
2. Navigate to: `c:\Users\aceucchi\Desktop\project_southside\db\southside_schema.sql`
3. Click the lightning bolt ⚡ to execute
4. Verify tables created: `users`, `admins`, `product`, `cart`, `cart_item`, `orders`
5. Verify 12 products seeded in `product` table

### Step 3: Set Up Spring Boot Backend

Since you don't have a Spring Boot module yet, create one using Spring Initializr:

**Option A: Using PowerShell (Recommended)**

```powershell
cd C:\Users\aceucchi\Desktop\project_southside

# Download Spring Boot starter
$params = @{
  type         = 'maven-project'
  language     = 'java'
  bootVersion  = '3.3.5'
  packaging    = 'jar'
  groupId      = 'com.aceuda'
  artifactId   = 'backend'
  name         = 'backend'
  description  = 'SouthSide Apparel Backend'
  packageName  = 'com.aceuda.southside'
  dependencies = 'web,data-jpa,mysql,validation'
}
Invoke-WebRequest -Uri https://start.spring.io/starter.zip -Method Post -Body $params -OutFile backend.zip

# Extract
Expand-Archive backend.zip -DestinationPath .
Remove-Item backend.zip
```

**Option B: Manual via Web Browser**
1. Go to https://start.spring.io
2. Select:
   - Project: Maven
   - Language: Java
   - Spring Boot: 3.3.5
   - Group: `com.aceuda`
   - Artifact: `backend`
   - Package name: `com.aceuda.southside`
   - Dependencies: **Spring Web**, **Spring Data JPA**, **MySQL Driver**, **Validation**
3. Click **GENERATE**
4. Extract to `C:\Users\aceucchi\Desktop\project_southside\backend\`

### Step 4: Configure Application Properties

Create/edit `backend/src/main/resources/application.properties`:

```properties
# Database Configuration
spring.datasource.url=jdbc:mysql://localhost:3306/southside_apparel?useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=UTC
spring.datasource.username=root
spring.datasource.password=asd123456
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# JPA/Hibernate
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect
spring.jpa.properties.hibernate.format_sql=true

# CORS Configuration (Allow React frontend)
spring.web.cors.allowed-origins=http://localhost:3000
spring.web.cors.allowed-methods=GET,POST,PUT,DELETE,OPTIONS
spring.web.cors.allowed-headers=*
spring.web.cors.allow-credentials=true

# Server Port
server.port=8080
```

### Step 5: Create Java Entities

You need to create entity classes matching your database tables. Here's the structure:

**File:** `backend/src/main/java/com/aceuda/southside/entity/User.java`

```java
package com.aceuda.southside.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;
    
    private String username;
    private String email;
    private String password;
    
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    
    // Getters and setters
}
```

**File:** `backend/src/main/java/com/aceuda/southside/entity/Product.java`

```java
package com.aceuda.southside.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "product")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long productId;
    
    private String name;
    private String category;
    private String subcategory;
    private BigDecimal price;
    private String tag;
    
    @Column(columnDefinition = "TEXT")
    private String description;
    
    private Integer stock;
    private Boolean active;
    
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    
    // Getters and setters
}
```

**File:** `backend/src/main/java/com/aceuda/southside/entity/Cart.java`

```java
package com.aceuda.southside.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "cart")
public class Cart {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long cartId;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;
    
    private BigDecimal totalAmount;
    private String status;
    
    @OneToMany(mappedBy = "cart", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<CartItem> items = new ArrayList<>();
    
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    
    // Getters and setters
}
```

**File:** `backend/src/main/java/com/aceuda/southside/entity/CartItem.java`

```java
package com.aceuda.southside.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "cart_item")
public class CartItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long cartItemId;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cart_id")
    private Cart cart;
    
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "product_id")
    private Product product;
    
    private Integer quantity;
    private BigDecimal itemTotal;
    
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    
    // Getters and setters
}
```

**File:** `backend/src/main/java/com/aceuda/southside/entity/Order.java`

```java
package com.aceuda.southside.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long orderId;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cart_id")
    private Cart cart;
    
    @Column(columnDefinition = "TEXT")
    private String orderSummary;
    
    private String paymentMethod;
    private BigDecimal total;
    
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    
    // Getters and setters
}
```

### Step 6: Create Repositories

Create repository interfaces for database access:

**File:** `backend/src/main/java/com/aceuda/southside/repository/ProductRepository.java`

```java
package com.aceuda.southside.repository;

import com.aceuda.southside.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {
}
```

Similarly create for: `UserRepository`, `CartRepository`, `CartItemRepository`, `OrderRepository`

### Step 7: Create REST Controllers

**File:** `backend/src/main/java/com/aceuda/southside/controller/ProductController.java`

```java
package com.aceuda.southside.controller;

import com.aceuda.southside.entity.Product;
import com.aceuda.southside.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "http://localhost:3000")
public class ProductController {
    
    @Autowired
    private ProductRepository productRepository;
    
    @GetMapping
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }
    
    @GetMapping("/{id}")
    public Product getProductById(@PathVariable Long id) {
        return productRepository.findById(id).orElseThrow();
    }
}
```

You'll also need to create:
- `CartController` with endpoints: GET/POST/PUT/DELETE for cart operations
- `OrderController` with checkout and order management endpoints

### Step 8: Run the Backend

```powershell
cd backend
mvn spring-boot:run
```

Backend should start on `http://localhost:8080`

Check logs for:
```
Tomcat started on port(s): 8080 (http)
Started BackendApplication in X.XXX seconds
```

---

## 🧪 Testing the Integration

### 1. Test Products API
Open browser: http://localhost:8080/api/products
- Should return JSON array of 12 products

### 2. Test Frontend Cart Flow

1. **Start React app:**
   ```powershell
   cd C:\Users\aceucchi\Desktop\project_southside
   npm start
   ```

2. **Test Add to Cart:**
   - Go to http://localhost:3000/shop
   - Click "Add to Cart" on any product
   - Check browser console for API call
   - Check Network tab: should see POST to `/api/cart/1/items`

3. **Test Cart Page:**
   - Go to http://localhost:3000/cart
   - Should see items from backend
   - Test quantity +/- buttons
   - Test remove button

4. **Test Checkout:**
   - Fill in shipping form
   - Select payment method
   - Click "Place Order"
   - Should redirect to `/orders`

5. **Test Orders Page:**
   - Should see the order you just placed
   - Test status update buttons
   - Test delete button

---

## 🔍 Debugging Tips

### Backend Not Starting?
- Check MySQL is running: `mysql -u root -p`
- Verify database exists: `SHOW DATABASES;`
- Check `application.properties` credentials

### CORS Errors?
Add to your controller:
```java
@CrossOrigin(origins = "http://localhost:3000")
```

Or create a global CORS config:
```java
@Configuration
public class WebConfig {
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/api/**")
                    .allowedOrigins("http://localhost:3000")
                    .allowedMethods("GET", "POST", "PUT", "DELETE")
                    .allowedHeaders("*");
            }
        };
    }
}
```

### Cart Not Loading?
- Check browser console for errors
- Check Network tab for failed requests
- Verify backend logs: `spring.jpa.show-sql=true` shows SQL queries

### Products Not Showing?
- Verify products table has data: `SELECT * FROM product;`
- Check `/api/products` endpoint directly in browser
- Ensure `active = 1` for products

---

## 📊 Database Verification

Check your data in MySQL Workbench:

```sql
-- Check products
SELECT * FROM product;

-- Check cart for user 1
SELECT c.*, ci.*, p.name 
FROM cart c
LEFT JOIN cart_item ci ON c.cart_id = ci.cart_id
LEFT JOIN product p ON ci.product_id = p.product_id
WHERE c.user_id = 1;

-- Check orders for user 1
SELECT * FROM orders o
JOIN cart c ON o.cart_id = c.cart_id
WHERE c.user_id = 1;
```

---

## 🎉 Success Checklist

- [ ] MySQL server running
- [ ] Database `southside_apparel` created
- [ ] Tables and products seeded
- [ ] Spring Boot backend running on port 8080
- [ ] `/api/products` returns 12 products
- [ ] React frontend running on port 3000
- [ ] Can add products to cart
- [ ] Cart page shows items with quantity controls
- [ ] Checkout creates order in database
- [ ] Orders page shows order history
- [ ] Can update order status
- [ ] Can delete orders

---

## 📝 Next Steps (Optional Enhancements)

1. **User Authentication**
   - Replace hardcoded `userId = 1` with real auth
   - Add JWT tokens
   - Protect endpoints

2. **Image Upload**
   - Add image URLs to products
   - Upload product images
   - Display in frontend

3. **Order Tracking**
   - Add shipping status updates
   - Email notifications
   - Tracking numbers

4. **Admin Dashboard**
   - Manage products
   - View all orders
   - Update inventory

5. **Payment Integration**
   - Stripe/PayPal for card payments
   - Real payment processing

---

## 🆘 Need Help?

If you encounter issues:
1. Check backend console logs
2. Check browser console (F12)
3. Check Network tab for failed API calls
4. Verify MySQL data with queries above
5. Ensure all ports are correct (3000 for React, 8080 for Spring Boot, 3306 for MySQL)

---

**Your frontend is now fully wired to connect with the backend!** Just need to set up the Spring Boot backend following the steps above.
