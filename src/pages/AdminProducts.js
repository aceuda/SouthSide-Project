import React, { useEffect, useState } from "react";
import "../css/AdminProducts.css";

const AdminProducts = () => {
    const [products, setProducts] = useState([]);
    const [editingProduct, setEditingProduct] = useState(null);

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
            .then((data) => setProducts(data));
    };

    useEffect(() => {
        loadProducts();
    }, []);

    // Handle input change
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // CREATE product
    const createProduct = () => {
        fetch("http://localhost:8080/api/products", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
        }).then(() => {
            loadProducts();
            setForm(emptyForm);
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
            <h1>Admin Product Manager</h1>

            {/* FORM */}
            <div className="admin-form-card">
                <h2>{editingProduct ? "Edit Product" : "Add Product"}</h2>

                <input name="name" placeholder="Product Name" value={form.name} onChange={handleChange} />
                <input name="category" placeholder="Category" value={form.category} onChange={handleChange} />
                <input name="subtitle" placeholder="Subtitle" value={form.subtitle} onChange={handleChange} />
                <input name="price" placeholder="Price" value={form.price} onChange={handleChange} />
                <input name="quantity" placeholder="quantity" value={form.quantity} onChange={handleChange} />
                <input name="badge" placeholder="Badge" value={form.badge} onChange={handleChange} />
                <input name="image" placeholder="Image URL" value={form.image} onChange={handleChange} />
                <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} />

                {editingProduct ? (
                    <button onClick={updateProduct}>Update</button>
                ) : (
                    <button onClick={createProduct}>Add Product</button>
                )}
            </div>

            {/* PRODUCT LIST */}
            <div className="admin-product-list">
                <h2>Products</h2>
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
                        {products.map((p) => (
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
