"use client"

import { useState } from "react"
import ProductModal from "./ProductModal"

function ProductTable({ products, onEdit, onDelete }) {
  const [selectedProduct, setSelectedProduct] = useState(null)

  return (
    <>
      <table className="product-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Brand</th>
            <th>Price</th>
            <th>Rating</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>
                <img
                  src={product.thumbnail || "/placeholder.svg"}
                  alt={product.title}
                  className="product-thumbnail cursor-pointer"
                  onClick={() => setSelectedProduct(product)}
                />
              </td>
              <td>
                <button className="text-left hover:underline" onClick={() => setSelectedProduct(product)}>
                  {product.title}
                </button>
              </td>
              <td>{product.brand}</td>
              <td>
                ${product.price}
                {product.discountPercentage > 0 && (
                  <span className="discount">{Math.round(product.discountPercentage)}% OFF</span>
                )}
              </td>
              <td>{product.rating}</td>
              <td>
                <button className="edit-button" onClick={() => onEdit(product)}>
                  Edit
                </button>
                <button
                  className="delete-button"
                  onClick={() => {
                    if (window.confirm("Are you sure you want to delete this smartphone?")) {
                      onDelete(product.id)
                    }
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ProductModal
        product={selectedProduct}
        isOpen={selectedProduct !== null}
        onClose={() => setSelectedProduct(null)}
      />
    </>
  )
}

export default ProductTable

