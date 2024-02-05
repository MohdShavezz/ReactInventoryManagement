import React, { useState, useEffect } from "react";
import axios from "axios";

const Product = ({ catName }) => {
  const [data, setData] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [page, setPage] = useState(1); // Current page
  const [totalPages, setTotalPages] = useState(1);

  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const openEditModal = (product) => {
    setCurrentProduct(product);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };
  useEffect(() => {
    const fetchData = async () => {
      const limitPages = 2;
      try {
        const response = await axios.get(
          `https://dummyjson.com/products/category/${catName}?limit=${limitPages}&skip=${
            (page - 1) * limitPages
          }`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setData(response.data.products);
        setTotalPages(Math.ceil(response.data.total / limitPages));
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, [catName, page]);

  useEffect(() => {
    // Filter products based on search query
    const filteredProducts = data.filter((product) =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredData(filteredProducts);
  }, [searchQuery, data]);

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };
  return (
    <div style={{ width: "80%" }}>
       {isEditModalOpen && (
        <EditModal product={currentProduct} onClose={closeEditModal} />
      )}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          // marginTop: "4rem",
        }}
      >
        
        <h2>Products</h2>
        <input
          type="text"
          style={{
            height: "2.5rem",
            width: "30%",
            height: "2.5rem",
            background: "white",
            border: "1px solid black",
            borderRadius: "10px",
            paddingLeft: ".5rem",
            color: "black",
          }}
          placeholder="search product"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {localStorage.getItem("token") && (
          <button
          style={{height:'2.5rem',background:"maroon"}}
            onClick={() => {
              localStorage.removeItem("token");
              window.location.reload();
            }}
          >
            Logout
          </button>
        )}
      </div>

      {filteredData.length === 0 ? (
        <p style={{ textAlign: "center", width: "150vh" }}>
          No products found.
        </p>
      ) : (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
          {filteredData.map((product) => (
            <div
              key={product.id}
              style={{
                border: "1px solid #ccc",
                padding: "10px",
                borderRadius: "5px",
                width: "calc(50% - 20px)",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h4>{product.title}</h4>

                {localStorage.getItem("token") && (
                  <h4
                    style={{
                      padding: "2px 20px",
                      background: "lawngreen",
                      borderRadius: "10px",
                      cursor: "pointer",
                    }}
                    onClick={() => openEditModal(product)} // Open edit modal on click
                  >
                    Edit
                  </h4>
                )}
              </div>
              <div style={{ display: "flex" }}>
                <div>
                  <p>Description: {product.description}</p>
                  <p>Price: ${product.price}</p>
                  <p>Rating: {product.rating}</p>
                  <p>Stock: {product.stock}</p>
                </div>
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  style={{ width: "50%" }}
                />
              </div>
              <div>
                {product.images.map((im, ind) => (
                  <img
                    key={ind}
                    src={im}
                    alt={im}
                    style={{ maxWidth: "100px", maxHeight: "100px" }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      <div style={{ marginTop: "1rem", textAlign: "center" }}>
        <button onClick={handlePrevPage} disabled={page === 1}>
          Previous
        </button>
        <span style={{ margin: "0 1rem" }}>
          Page {page} of {totalPages}
        </span>
        <button onClick={handleNextPage} disabled={page === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Product;

const EditModal = ({ product, onClose }) => {
  const [formData, setFormData] = useState({
    title: product.title || "",
    description: product.description || "",
    price: product.price || 0,
    rating: product.rating || 0,
    stock: product.stock || 0,
  });
  const handleClose = () => {
    onClose();
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    const updatedProduct = {
      title: formData.title,
      description: formData.description,
      price: parseFloat(formData.price),
      rating: parseFloat(formData.rating),
      stock: parseInt(formData.stock),
      // Add more fields if needed
    };

    console.log("Product Id to update", product.id);
    console.log("before update", updatedProduct);
    axios
      .put(`https://dummyjson.com/products/${product.id}`, updatedProduct)
      .then((response) => {
        handleClose();
        console.log("after update:", response.data);
        alert("Product Updated Succesfully!!!");
      })
      .catch((error) => {
        console.error("Error updating product:", error);
      });
  };
  return (
    <div className="modal" style={{ height: "100vh" }}>
      <div className="modal-content" style={{ width: "60%",margin: "auto",border: "1px solid",padding: "2rem",borderRadius:'10px',marginTop:'6rem'}}>
        <span className="close" onClick={handleClose} style={{fontWeight:'bold',color:'red'}}>
          X
        </span>
        <h2>Edit Product</h2>
        {product && (
          <form onSubmit={handleSubmit}>
            <div>
              <label>Title:</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Description:</label>
              <input
                type="text"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Price:</label><br />
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Rating:</label><br />
              <input
                type="number"
                name="rating"
                value={formData.rating}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Stock:</label><br />
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                required
              />
            </div> <br />
            <button type="submit" style={{background:'maroon'}}>Save</button>
          </form>
        )}
      </div>
    </div>
  );
};
