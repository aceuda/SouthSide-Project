# Backend Image Field Fix

## Problem
The `image` field in Product.java is a plain `String`, which maps to `VARCHAR(255)` in MySQL. Base64 images are much larger (typically 50KB-500KB), causing a 500 error when saving.

## Solution
Change the `image` field annotation to use `LONGTEXT`:

### In Product.java

**CHANGE THIS:**
```java
private String image;
```

**TO THIS:**
```java
@Column(columnDefinition = "LONGTEXT")
private String image;
```

### Complete Updated Product.java

```java
package southside.demo.models;

import jakarta.persistence.*;

@Entity
@Table(name = "products")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String category;
    private String subtitle;
    private Double price;
    private String badge;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(columnDefinition = "LONGTEXT")  // ✅ ADDED THIS
    private String image;

    private Integer quantity;
    
    // ======================
    // GETTERS
    // ======================

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getCategory() {
        return category;
    }

    public String getSubtitle() {
        return subtitle;
    }

    public Double getPrice() {
        return price;
    }

    public String getBadge() {
        return badge;
    }

    public String getDescription() {
        return description;
    }

    public String getImage() {
        return image;
    }

    public Integer getQuantity() {
        return quantity;
    }

    // ======================
    // SETTERS
    // ======================

    public void setId(Long id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public void setSubtitle(String subtitle) {
        this.subtitle = subtitle;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public void setBadge(String badge) {
        this.badge = badge;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }
}
```

## Steps After Making the Change

1. **Update Product.java** with the `@Column(columnDefinition = "LONGTEXT")` annotation
2. **Drop and recreate the products table** OR run this SQL migration:

```sql
ALTER TABLE products MODIFY COLUMN image LONGTEXT;
```

3. **Restart your Spring Boot backend**
4. **Try adding a product again** in the Admin Product Manager

## Alternative: Use URLs Instead

If you prefer not to store base64 in the database, you can:
1. Keep image as `VARCHAR(500)` 
2. Upload images to a cloud service (AWS S3, Cloudinary, etc.)
3. Store only the URL in the database

This is more scalable for production but requires setting up cloud storage.
