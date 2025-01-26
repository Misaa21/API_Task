"use client"

import { useState } from "react"

export default function ProductModal({ product, isOpen, onClose }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  if (!isOpen || !product) return null

  const styles = {
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.7)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1000,
    },
    modal: {
      position: "relative",
      backgroundColor: "white",
      padding: "20px",
      borderRadius: "8px",
      width: "90%",
      maxWidth: "800px",
      maxHeight: "90vh",
      overflow: "auto",
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "20px",
    },
    category: {
      color: "#666",
      fontSize: "14px",
      marginBottom: "4px",
    },
    title: {
      fontSize: "24px",
      margin: 0,
    },
    closeButton: {
      position: "absolute",
      right: "20px",
      top: "20px",
      background: "none",
      border: "none",
      fontSize: "24px",
      cursor: "pointer",
    },
    mainImage: {
      width: "100%",
      maxHeight: "400px",
      objectFit: "contain",
      marginBottom: "20px",
    },
    thumbnails: {
      display: "flex",
      gap: "10px",
      marginBottom: "20px",
    },
    thumbnail: {
      width: "60px",
      height: "60px",
      objectFit: "cover",
      cursor: "pointer",
      border: "2px solid transparent",
    },
    activeThumbnail: {
      border: "2px solid #0066cc",
    },
    price: {
      fontSize: "24px",
      color: "#0066cc",
      marginBottom: "10px",
    },
    discount: {
      display: "inline-block",
      padding: "4px 8px",
      backgroundColor: "#0066cc",
      color: "white",
      borderRadius: "4px",
      fontSize: "14px",
      marginLeft: "10px",
    },
    description: {
      marginBottom: "20px",
      lineHeight: "1.5",
    },
    rating: {
      marginBottom: "10px",
      fontSize: "16px",
    },
    closeButtonBottom: {
      width: "100%",
      padding: "10px",
      backgroundColor: "#0066cc",
      color: "white",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      marginTop: "20px",
    },
  }

  const images = [product.thumbnail, ...(Array.isArray(product.images) ? product.images : [])]

  const goToPreviousImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : images.length - 1))
  }

  const goToNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex < images.length - 1 ? prevIndex + 1 : 0))
  }

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <button style={styles.closeButton} onClick={onClose}>
          ×
        </button>

        <div style={styles.header}>
          <div>
            <div style={styles.category}>SMARTPHONES</div>
            <h2 style={styles.title}>{product.title}</h2>
          </div>
        </div>

        <div style={{ position: "relative", marginBottom: "20px" }}>
          <img src={images[currentImageIndex] || "/placeholder.svg"} alt={product.title} style={styles.mainImage} />
          <button
            onClick={goToPreviousImage}
            style={{
              position: "absolute",
              left: "10px",
              top: "50%",
              transform: "translateY(-50%)",
              background: "rgba(0, 0, 0, 0.5)",
              color: "white",
              border: "none",
              borderRadius: "50%",
              width: "40px",
              height: "40px",
              fontSize: "20px",
              cursor: "pointer",
            }}
          >
            &#8249;
          </button>
          <button
            onClick={goToNextImage}
            style={{
              position: "absolute",
              right: "10px",
              top: "50%",
              transform: "translateY(-50%)",
              background: "rgba(0, 0, 0, 0.5)",
              color: "white",
              border: "none",
              borderRadius: "50%",
              width: "40px",
              height: "40px",
              fontSize: "20px",
              cursor: "pointer",
            }}
          >
            &#8250;
          </button>
        </div>

        {product.images && (
          <div style={styles.thumbnails}>
            {images.map((img, index) => (
              <img
                key={index}
                src={img || "/placeholder.svg"}
                alt={`${product.title} view ${index + 1}`}
                style={{
                  ...styles.thumbnail,
                  ...(currentImageIndex === index ? styles.activeThumbnail : {}),
                }}
                onClick={() => setCurrentImageIndex(index)}
              />
            ))}
          </div>
        )}

        <div style={styles.price}>
          ${product.price}
          {product.discountPercentage > 0 && (
            <span style={styles.discount}>{Math.round(product.discountPercentage)}% OFF</span>
          )}
        </div>

        <div style={styles.rating}>Rating: {product.rating} / 5</div>

        <div style={styles.description}>{product.description}</div>

        <div>
          <strong>Brand:</strong> {product.brand}
        </div>

        <button style={styles.closeButtonBottom} onClick={onClose}>
          CLOSE
        </button>
      </div>
    </div>
  )
}

