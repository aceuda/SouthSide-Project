# 📡 API Endpoints Reference

This document lists all the API endpoints your React frontend is calling. Use this to implement the Spring Boot backend controllers.

---

## 🛍️ Products API

### Get All Products
```
GET /api/products
```
**Used by:** `MenuPage.js` (line 27)

**Response:**
```json
[
  {
    "id": 1,
    "name": "Graphic Tee",
    "category": "Men",
    "subcategory": "Everyday Comfort Tee",
    "price": 599.00,
    "tag": "New",
    "description": "Soft cotton tee designed for all-day wear.",
    "stock": 100,
    "active": true
  }
]
```

---

## 🛒 Cart API

### Get User's Cart
```
GET /api/cart/{userId}
```
**Used by:** `CartContext.js` `fetchCart()` (line 17)

**Response:**
```json
{
  "id": 1,
  "userId": 1,
  "totalAmount": 1500.00,
  "status": "OPEN",
  "items": [
    {
      "id": 1,
      "product": {
        "id": 1,
        "name": "Graphic Tee",
        "price": 599.00,
        "category": "Men",
        "subcategory": "Everyday Comfort Tee"
      },
      "quantity": 2,
      "price": 599.00
    }
  ],
  "createdAt": "2025-12-08T10:00:00",
  "updatedAt": "2025-12-08T10:30:00"
}
```

---

### Add Item to Cart
```
POST /api/cart/{userId}/items
```
**Used by:** `CartContext.js` `addToCart()` (line 31), called from `MenuPage.js` (line 47)

**Request Body:**
```json
{
  "productId": 1,
  "quantity": 1
}
```

**Response:** Same as "Get User's Cart" (updated cart object)

---

### Update Item Quantity
```
PUT /api/cart/{userId}/items/{itemId}
```
**Used by:** `CartContext.js` `updateQuantity()` (line 56), called from `CartPage.js` (line 50, 56)

**Request Body:**
```json
{
  "quantity": 3
}
```

**Response:** Same as "Get User's Cart" (updated cart object)

**Note:** If quantity is 0 or negative, item should be removed.

---

### Remove Item from Cart
```
DELETE /api/cart/{userId}/items/{itemId}
```
**Used by:** `CartContext.js` `removeItem()` (line 78), called from `CartPage.js` (line 68)

**Response:** Same as "Get User's Cart" (updated cart object with item removed)

---

### Clear Cart
```
DELETE /api/cart/{userId}/clear
```
**Used by:** `CartContext.js` `clearCart()` (line 95), called from `CartPage.js` (line 90)

**Response:** Empty cart object
```json
{
  "id": 1,
  "userId": 1,
  "totalAmount": 0.00,
  "status": "OPEN",
  "items": [],
  "createdAt": "2025-12-08T10:00:00",
  "updatedAt": "2025-12-08T11:00:00"
}
```

---

## 📦 Orders API

### Checkout (Create Order from Cart)
```
POST /api/orders/checkout/{userId}
```
**Used by:** `CartContext.js` `checkout()` (line 109), called from `CheckoutPage.js` (line 48)

**Request Body:**
```json
{
  "fullName": "Juan Dela Cruz",
  "address": "123 Main Street",
  "city": "Manila",
  "postal": "1000",
  "paymentMethod": "card",
  "card": "4111111111111111"
}
```

**Or for COD:**
```json
{
  "fullName": "Juan Dela Cruz",
  "address": "123 Main Street",
  "city": "Manila",
  "postal": "1000",
  "paymentMethod": "cod",
  "card": null
}
```

**Response:**
```json
{
  "id": 1,
  "userId": 1,
  "orderSummary": "Graphic Tee x2, Denim Jacket x1",
  "paymentMethod": "card",
  "total": 2697.00,
  "status": "Shipping",
  "fullName": "Juan Dela Cruz",
  "address": "123 Main Street",
  "city": "Manila",
  "postal": "1000",
  "items": [
    {
      "id": 1,
      "product": {
        "id": 1,
        "name": "Graphic Tee",
        "price": 599.00
      },
      "quantity": 2,
      "price": 599.00
    },
    {
      "id": 2,
      "product": {
        "id": 2,
        "name": "Denim Jacket",
        "price": 1499.00
      },
      "quantity": 1,
      "price": 1499.00
    }
  ],
  "createdAt": "2025-12-08T11:00:00"
}
```

**Backend Logic:**
1. Get user's cart
2. Create order from cart items
3. Set order status to "Shipping"
4. Clear or mark cart as completed
5. Return order object

---

### Get User's Orders
```
GET /api/orders/user/{userId}
```
**Used by:** `OrdersPage.js` (line 16)

**Response:**
```json
[
  {
    "id": 1,
    "orderSummary": "Graphic Tee x2, Denim Jacket x1",
    "paymentMethod": "card",
    "total": 2697.00,
    "status": "Shipping",
    "items": [
      {
        "id": 1,
        "product": {
          "id": 1,
          "name": "Graphic Tee",
          "price": 599.00
        },
        "quantity": 2,
        "price": 599.00
      }
    ],
    "createdAt": "2025-12-08T11:00:00"
  }
]
```

**Note:** Orders should be sorted by `createdAt` DESC (newest first)

---

### Update Order Status
```
PUT /api/orders/{orderId}/status
```
**Used by:** `OrdersPage.js` `handleOrderReceived()` (line 50), `handleOrderNotReceived()` (line 71)

**Request Body:**
```json
{
  "status": "Delivered"
}
```

**Or:**
```json
{
  "status": "Not Received"
}
```

**Response:** Updated order object
```json
{
  "id": 1,
  "orderSummary": "Graphic Tee x2",
  "paymentMethod": "card",
  "total": 1198.00,
  "status": "Delivered",
  "items": [...],
  "createdAt": "2025-12-08T11:00:00"
}
```

---

### Delete Order
```
DELETE /api/orders/{orderId}
```
**Used by:** `OrdersPage.js` `handleDeleteOrder()` (line 95)

**Response:** 
- Status: `204 No Content` or `200 OK`
- No body needed

---

## 🔐 Expected User ID

Currently hardcoded in frontend:
- `CartContext.js`: `const userId = 1;` (line 9)
- `OrdersPage.js`: `const userId = 1;` (line 13)

**TODO:** Replace with actual authenticated user ID from JWT/session

---

## 🎯 Backend Controller Structure

Here's the recommended Spring Boot controller structure:

### ProductController.java
```java
@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "http://localhost:3000")
public class ProductController {
    @GetMapping
    public List<Product> getAllProducts();
    
    @GetMapping("/{id}")
    public Product getProductById(@PathVariable Long id);
}
```

### CartController.java
```java
@RestController
@RequestMapping("/api/cart")
@CrossOrigin(origins = "http://localhost:3000")
public class CartController {
    @GetMapping("/{userId}")
    public Cart getCart(@PathVariable Long userId);
    
    @PostMapping("/{userId}/items")
    public Cart addItem(@PathVariable Long userId, @RequestBody AddItemRequest request);
    
    @PutMapping("/{userId}/items/{itemId}")
    public Cart updateQuantity(@PathVariable Long userId, @PathVariable Long itemId, @RequestBody UpdateQuantityRequest request);
    
    @DeleteMapping("/{userId}/items/{itemId}")
    public Cart removeItem(@PathVariable Long userId, @PathVariable Long itemId);
    
    @DeleteMapping("/{userId}/clear")
    public Cart clearCart(@PathVariable Long userId);
}
```

### OrderController.java
```java
@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "http://localhost:3000")
public class OrderController {
    @PostMapping("/checkout/{userId}")
    public Order checkout(@PathVariable Long userId, @RequestBody CheckoutRequest request);
    
    @GetMapping("/user/{userId}")
    public List<Order> getUserOrders(@PathVariable Long userId);
    
    @PutMapping("/{orderId}/status")
    public Order updateStatus(@PathVariable Long orderId, @RequestBody UpdateStatusRequest request);
    
    @DeleteMapping("/{orderId}")
    public ResponseEntity<Void> deleteOrder(@PathVariable Long orderId);
}
```

---

## 📋 Request/Response DTOs

### AddItemRequest
```java
public class AddItemRequest {
    private Long productId;
    private Integer quantity;
    // getters, setters
}
```

### UpdateQuantityRequest
```java
public class UpdateQuantityRequest {
    private Integer quantity;
    // getters, setters
}
```

### CheckoutRequest
```java
public class CheckoutRequest {
    private String fullName;
    private String address;
    private String city;
    private String postal;
    private String paymentMethod; // "card" or "cod"
    private String card; // nullable
    // getters, setters
}
```

### UpdateStatusRequest
```java
public class UpdateStatusRequest {
    private String status; // "Delivered", "Not Received", etc.
    // getters, setters
}
```

---

## 🧪 Testing with Postman/cURL

### Test Get Products
```bash
curl http://localhost:8080/api/products
```

### Test Add to Cart
```bash
curl -X POST http://localhost:8080/api/cart/1/items \
  -H "Content-Type: application/json" \
  -d '{"productId": 1, "quantity": 2}'
```

### Test Get Cart
```bash
curl http://localhost:8080/api/cart/1
```

### Test Checkout
```bash
curl -X POST http://localhost:8080/api/orders/checkout/1 \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Juan Dela Cruz",
    "address": "123 Main St",
    "city": "Manila",
    "postal": "1000",
    "paymentMethod": "cod",
    "card": null
  }'
```

---

## ⚠️ Important Notes

1. **CORS**: All controllers need `@CrossOrigin(origins = "http://localhost:3000")`
2. **Error Handling**: Return proper HTTP status codes (400, 404, 500)
3. **Validation**: Validate request bodies with `@Valid` and constraints
4. **Transactions**: Use `@Transactional` for cart/order operations
5. **Eager/Lazy Loading**: Cart items should eagerly load product details
6. **Total Calculation**: Backend should calculate `totalAmount` and `itemTotal`

---

## 🎯 Next: Implement These in Spring Boot

Use this reference to build your:
1. Service layer (business logic)
2. Repository layer (already done with JPA)
3. Controller layer (REST endpoints)
4. DTO classes (request/response objects)

The frontend is ready and waiting for these endpoints! 🚀
