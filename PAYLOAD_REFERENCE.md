# 🎯 Quick Reference: Request/Response Payloads

This is a quick copy-paste reference for implementing your Spring Boot backend.

---

## 📤 REQUEST PAYLOADS (What Frontend Sends)

### Add Item to Cart
**Endpoint:** `POST /api/cart/{userId}/items`
```json
{
  "productId": 1,
  "quantity": 2
}
```

---

### Update Item Quantity
**Endpoint:** `PUT /api/cart/{userId}/items/{itemId}`
```json
{
  "quantity": 5
}
```

---

### Checkout (Create Order)
**Endpoint:** `POST /api/orders/checkout/{userId}`

**With Card Payment:**
```json
{
  "fullName": "Juan Dela Cruz",
  "address": "123 Main Street, Barangay Example",
  "city": "Manila",
  "postal": "1000",
  "paymentMethod": "card",
  "card": "4111111111111111"
}
```

**With COD:**
```json
{
  "fullName": "Juan Dela Cruz",
  "address": "123 Main Street, Barangay Example",
  "city": "Manila",
  "postal": "1000",
  "paymentMethod": "cod",
  "card": null
}
```

---

### Update Order Status
**Endpoint:** `PUT /api/orders/{orderId}/status`

**Mark as Delivered:**
```json
{
  "status": "Delivered"
}
```

**Mark as Not Received:**
```json
{
  "status": "Not Received"
}
```

---

## 📥 RESPONSE PAYLOADS (What Backend Should Return)

### Get All Products
**Endpoint:** `GET /api/products`
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
  },
  {
    "id": 2,
    "name": "Denim Jacket",
    "category": "Women",
    "subcategory": "Oversized Street Denim",
    "price": 1499.00,
    "tag": "Trending",
    "description": "Layer-ready denim jacket with an oversized street look.",
    "stock": 50,
    "active": true
  }
]
```

---

### Get User's Cart
**Endpoint:** `GET /api/cart/{userId}`
```json
{
  "id": 1,
  "userId": 1,
  "totalAmount": 2697.00,
  "status": "OPEN",
  "items": [
    {
      "id": 1,
      "product": {
        "id": 1,
        "name": "Graphic Tee",
        "price": 599.00,
        "category": "Men",
        "subcategory": "Everyday Comfort Tee",
        "description": "Soft cotton tee designed for all-day wear."
      },
      "quantity": 2,
      "price": 599.00
    },
    {
      "id": 2,
      "product": {
        "id": 2,
        "name": "Denim Jacket",
        "price": 1499.00,
        "category": "Women",
        "subcategory": "Oversized Street Denim"
      },
      "quantity": 1,
      "price": 1499.00
    }
  ],
  "createdAt": "2025-12-08T10:00:00",
  "updatedAt": "2025-12-08T10:30:00"
}
```

**Important:**
- Each `item` MUST have a nested `product` object
- `totalAmount` should be calculated server-side
- Return updated cart after every operation

---

### Get User's Orders
**Endpoint:** `GET /api/orders/user/{userId}`
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
          "price": 599.00,
          "category": "Men"
        },
        "quantity": 2,
        "price": 599.00
      },
      {
        "id": 2,
        "product": {
          "id": 2,
          "name": "Denim Jacket",
          "price": 1499.00,
          "category": "Women"
        },
        "quantity": 1,
        "price": 1499.00
      }
    ],
    "createdAt": "2025-12-08T11:00:00"
  },
  {
    "id": 2,
    "orderSummary": "Running Shorts x3",
    "paymentMethod": "cod",
    "total": 1497.00,
    "status": "Delivered",
    "items": [
      {
        "id": 3,
        "product": {
          "id": 5,
          "name": "Running Shorts",
          "price": 499.00,
          "category": "New Arrivals"
        },
        "quantity": 3,
        "price": 499.00
      }
    ],
    "createdAt": "2025-12-07T15:30:00"
  }
]
```

**Important:**
- Sort by `createdAt` DESC (newest first)
- Each order item needs nested `product` object
- Include all order fields

---

### Checkout Success Response
**Endpoint:** `POST /api/orders/checkout/{userId}`
```json
{
  "id": 3,
  "orderSummary": "Graphic Tee x1, Cargo x2",
  "paymentMethod": "cod",
  "total": 1797.00,
  "status": "Shipping",
  "fullName": "Maria Santos",
  "address": "456 Side Street, Quezon City",
  "city": "Quezon City",
  "postal": "1100",
  "items": [
    {
      "id": 1,
      "product": {
        "id": 1,
        "name": "Graphic Tee",
        "price": 599.00
      },
      "quantity": 1,
      "price": 599.00
    },
    {
      "id": 2,
      "product": {
        "id": 12,
        "name": "Cargo",
        "price": 599.00
      },
      "quantity": 2,
      "price": 599.00
    }
  ],
  "createdAt": "2025-12-08T12:00:00"
}
```

**Important:**
- Set initial status to `"Shipping"`
- Calculate and return `total`
- Clear or close the user's cart
- Generate `orderSummary` string

---

## 🎨 Frontend Component Usage

### How CartPage Uses Cart Data
```javascript
// Expects this structure:
items.map((item) => (
  <div>
    <h3>{item.product.name}</h3>        // ← Nested product
    <p>₱{item.price}</p>                // ← Item price
    <p>Qty: {item.quantity}</p>         // ← Quantity
    <p>Subtotal: ₱{item.price * item.quantity}</p>
  </div>
))
```

### How OrdersPage Uses Order Data
```javascript
// Expects this structure:
orders.map((order) => (
  <div>
    <h3>Order #{order.id}</h3>
    <p>{new Date(order.createdAt).toLocaleDateString()}</p>
    <p>Status: {order.status}</p>       // ← Must be exact: "Shipping", "Delivered", "Not Received"
    <p>Total: ₱{order.total}</p>
    {order.items.map((item) => (
      <div>
        <span>{item.product.name}</span> // ← Nested product
        <span>Qty: {item.quantity}</span>
        <span>₱{item.price}</span>
      </div>
    ))}
  </div>
))
```

---

## 🔑 Key Points for Backend Implementation

### 1. **Nested Product Object**
Both cart items and order items need the full product details:
```java
@ManyToOne(fetch = FetchType.EAGER)  // ← Must be EAGER
@JoinColumn(name = "product_id")
private Product product;
```

### 2. **Calculate Totals Server-Side**
```java
// Cart total
cart.setTotalAmount(
  cart.getItems().stream()
    .map(item -> item.getPrice().multiply(BigDecimal.valueOf(item.getQuantity())))
    .reduce(BigDecimal.ZERO, BigDecimal::add)
);

// Order total
order.setTotal(/* calculate from cart items */);
```

### 3. **Order Status Values**
Frontend expects these exact strings:
- `"Shipping"` (default for new orders)
- `"Delivered"` (when user confirms receipt)
- `"Not Received"` (when user reports issue)
- `"Processing"` (optional)

### 4. **Order Summary String**
Generate a readable summary:
```java
String orderSummary = order.getItems().stream()
  .map(item -> item.getProduct().getName() + " x" + item.getQuantity())
  .collect(Collectors.joining(", "));
// Result: "Graphic Tee x2, Denim Jacket x1"
```

### 5. **Checkout Process**
1. Get user's open cart
2. Create order from cart items
3. Copy shipping info from request
4. Set status to "Shipping"
5. Generate order summary
6. Save order
7. Close or delete cart
8. Return order with items

### 6. **CORS Configuration**
Every controller needs:
```java
@CrossOrigin(origins = "http://localhost:3000")
```

Or global config:
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
                    .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                    .allowedHeaders("*");
            }
        };
    }
}
```

---

## 🧪 Testing with cURL

### Add to Cart
```bash
curl -X POST http://localhost:8080/api/cart/1/items \
  -H "Content-Type: application/json" \
  -d '{"productId": 1, "quantity": 2}'
```

### Get Cart
```bash
curl http://localhost:8080/api/cart/1
```

### Update Quantity
```bash
curl -X PUT http://localhost:8080/api/cart/1/items/1 \
  -H "Content-Type: application/json" \
  -d '{"quantity": 5}'
```

### Checkout
```bash
curl -X POST http://localhost:8080/api/orders/checkout/1 \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Test User",
    "address": "123 Test St",
    "city": "Manila",
    "postal": "1000",
    "paymentMethod": "cod",
    "card": null
  }'
```

### Get Orders
```bash
curl http://localhost:8080/api/orders/user/1
```

---

## 📋 Validation Rules

### Add to Cart
- `productId`: required, must exist in products table
- `quantity`: required, must be > 0

### Update Quantity
- `quantity`: required, must be >= 0 (0 = remove item)

### Checkout
- `fullName`: required, not blank
- `address`: required, not blank
- `city`: required, not blank
- `postal`: required, not blank
- `paymentMethod`: required, must be "card" or "cod"
- `card`: required if paymentMethod is "card", nullable if "cod"

### Update Status
- `status`: required, must be valid status string

---

## ✅ Quick Implementation Checklist

Backend must:
- [ ] Return nested `product` object in cart/order items
- [ ] Calculate `totalAmount` for cart server-side
- [ ] Calculate `total` for orders server-side
- [ ] Set order status to "Shipping" on checkout
- [ ] Generate `orderSummary` string
- [ ] Clear/close cart after successful checkout
- [ ] Sort orders by `createdAt` DESC
- [ ] Enable CORS for `http://localhost:3000`
- [ ] Use EAGER fetching for product in cart/order items
- [ ] Return updated cart after add/update/remove operations

---

**Copy this file for quick reference while building your Spring Boot controllers! 🚀**
