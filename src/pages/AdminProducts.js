import React, { useEffect, useState } from "react";
import "../css/AdminProducts.css";

const AdminProducts = () => {
    const [products, setProducts] = useState([]);
    const [editingProduct, setEditingProduct] = useState(null);
    const [sortCategory, setSortCategory] = useState("all");
    const [imagePreview, setImagePreview] = useState("");

    const categoryOptions = [
        "New Arrivals",
        "Men",
        "Women",
        "Kids",
        "Accessories",
    ];

    const emptyForm = {
        name: "",
        category: "",
        subtitle: "",
        price: "",
        badge: "",
        description: "",
        image: "",
        quantity: 0
    };

    const [form, setForm] = useState(emptyForm);

    // Load products
    const loadProducts = () => {
        fetch("http://localhost:8080/api/products")
            .then((res) => res.json())
            .then((data) => {
                console.log("Loaded products:", data);
                setProducts(data);
            })
            .catch((err) => {
                console.error("Error loading products:", err);
            });
    };

    useEffect(() => {
        loadProducts();
    }, []);

    // Handle input change
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // Handle file upload
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result;
                setForm({ ...form, image: base64String });
                setImagePreview(base64String);
            };
            reader.readAsDataURL(file);
        }
    };

    // CREATE product
    const createProduct = () => {
        console.log("Creating product:", form);
        fetch("http://localhost:8080/api/products", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
        })
            .then((res) => {
                console.log("Create response status:", res.status);
                return res.json();
            })
            .then((data) => {
                console.log("Created product:", data);
                loadProducts();
                setForm(emptyForm);
                setImagePreview("");
            })
            .catch((err) => {
                console.error("Error creating product:", err);
                alert("Failed to create product: " + err.message);
            });
    };

    // UPDATE product
    const updateProduct = () => {
        fetch(`http://localhost:8080/api/products/${editingProduct.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
        }).then(() => {
            loadProducts();
            setForm(emptyForm);
            setEditingProduct(null);
            setImagePreview("");
        });
    };

    // DELETE product
    const deleteProduct = (id) => {
        fetch(`http://localhost:8080/api/products/${id}`, {
            method: "DELETE",
        }).then(() => loadProducts());
    };

    return (
        <div className="admin-container">
            {/* FORM */}
            <div className="admin-form-card">
                <h1>Admin Product Manager</h1>
                <h2>{editingProduct ? "Edit Product" : "Add Product"}</h2>

                <input name="name" placeholder="Product Name" value={form.name} onChange={handleChange} />
                <label className="admin-input-label">
                    Category
                    <select name="category" value={form.category} onChange={handleChange}>
                        <option value="">Select a category</option>
                        {categoryOptions.map((cat) => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                </label>
                <input name="subtitle" placeholder="Subtitle" value={form.subtitle} onChange={handleChange} />
                <input name="price" placeholder="Price" value={form.price} onChange={handleChange} />
                <input name="quantity" placeholder="quantity" value={form.quantity} onChange={handleChange} />
                <input name="badge" placeholder="Badge" value={form.badge} onChange={handleChange} />

                <label className="admin-input-label">
                    Product Image
                    <input type="file" accept="image/*" onChange={handleFileChange} />
                </label>
                {(imagePreview || form.image) && (
                    <div className="admin-image-preview">
                        <img src={imagePreview || form.image} alt="Product preview" />
                    </div>
                )}

                <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} />

                {editingProduct ? (
                    <button onClick={updateProduct}>Update</button>
                ) : (
                    <button onClick={createProduct}>Add Product</button>
                )}
            </div>

            {/* PRODUCT LIST */}
            <div className="admin-product-list">
                <div className="admin-product-list-header">
                    <h2>Products</h2>
                    <div className="admin-sort-row">
                        <label>
                            Sort by category
                            <select value={sortCategory} onChange={(e) => setSortCategory(e.target.value)}>
                                <option value="all">All</option>
                                {categoryOptions.map((cat) => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </label>
                    </div>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Badge</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {(sortCategory === "all" ? products : products.filter((p) => p.category === sortCategory)).map((p) => (
                            <tr key={p.id}>
                                <td>{p.name}</td>
                                <td>{p.category}</td>
                                <td>₱{p.price}</td>
                                <td>{p.quantity}</td>
                                <td>{p.badge}</td>
                                <td>
                                    <button onClick={() => { setEditingProduct(p); setForm(p); }}>
                                        Edit
                                    </button>
                                    <button onClick={() => deleteProduct(p.id)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default AdminProducts;
