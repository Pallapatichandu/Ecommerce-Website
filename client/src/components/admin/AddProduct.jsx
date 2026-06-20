import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { createProduct } from "../../redux/slices/adminSlice";

const AddProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);

  const [productData, setProductData] = useState({
    title: "",
    description: "",
    price: "",
    discount: "",
    category: "",
    stock: "",
    images: [],
    highlights: [""],
    variants: [],
  });

  /* =========================================
     BASIC FIELD CHANGE
  ========================================= */
  const handleChange = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  /* =========================================
     IMAGE UPLOAD
  ========================================= */
  const handleImageUpload = (e) => {
    setProductData({ ...productData, images: [...e.target.files] });
  };

  /* =========================================
     HIGHLIGHTS
  ========================================= */
  const handleHighlightChange = (index, value) => {
    const updated = [...productData.highlights];
    updated[index] = value;
    setProductData({ ...productData, highlights: updated });
  };

  const addHighlight = () => {
    setProductData({ ...productData, highlights: [...productData.highlights, ""] });
  };

  const removeHighlight = (index) => {
    setProductData({
      ...productData,
      highlights: productData.highlights.filter((_, i) => i !== index),
    });
  };

  /* =========================================
     VARIANTS
     Each variant row = one option
     e.g. { type: "Storage", value: "256GB", price: "134900", stock: "50" }
     e.g. { type: "Color",   value: "Black Titanium", price: "134900", stock: "20" }

     IMPORTANT: price here = FULL price for this variant (not extra cost)
  ========================================= */
  const handleVariantChange = (index, field, value) => {
    const updated = [...productData.variants];
    updated[index] = { ...updated[index], [field]: value };
    setProductData({ ...productData, variants: updated });
  };

  const addVariant = () => {
    setProductData({
      ...productData,
      variants: [...productData.variants, { type: "", value: "", price: "", stock: "" }],
    });
  };

  const removeVariant = (index) => {
    setProductData({
      ...productData,
      variants: productData.variants.filter((_, i) => i !== index),
    });
  };

  /* =========================================
     SUBMIT
  ========================================= */
  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("title", productData.title);
      formData.append("description", productData.description);
      formData.append("price", productData.price);
      formData.append("discount", productData.discount || 0);
      formData.append("category", productData.category);
      formData.append("stock", productData.stock);

      /* HIGHLIGHTS — filter empty */
      const filteredHighlights = productData.highlights.filter((h) => h.trim() !== "");
      formData.append("highlights", JSON.stringify(filteredHighlights));

      /* VARIANTS — filter incomplete rows */
      const filteredVariants = productData.variants.filter(
        (v) => v.type && v.value && v.price
      );
      formData.append("variants", JSON.stringify(filteredVariants));

      /* IMAGES */
      productData.images.forEach((image) => formData.append("images", image));

      await dispatch(createProduct({ formData, token: userInfo.token })).unwrap();

      toast.success("Product Added Successfully");
      navigate("/admin/products");

    } catch (error) {
      toast.error(
        typeof error === "string" ? error : error?.message || "Failed To Add Product"
      );
    }
  };

  /* =========================================
     VARIANT TYPE OPTIONS
  ========================================= */
  const variantTypes = ["Color", "Size", "RAM", "Storage", "Weight", "Material", "Pack"];

  return (
    <div className="container-fluid py-4">

      <div className="mb-4">
        <h2 className="fw-bold">Add Product</h2>
        <p className="text-muted">Fill all details carefully. Variant price = full price for that option.</p>
      </div>

      <div className="card border-0 shadow-sm p-4" style={{ borderRadius: "20px" }}>
        <form onSubmit={submitHandler}>

          {/* =========================================
             BASIC INFO
          ========================================= */}
          <div className="row">

            <div className="col-md-6 mb-4">
              <label className="form-label fw-semibold">Product Title *</label>
              <input type="text" name="title" value={productData.title}
                onChange={handleChange} className="form-control" required
                placeholder="e.g. iPhone 15 Pro Max" />
            </div>

            <div className="col-md-6 mb-4">
              <label className="form-label fw-semibold">Category *</label>
              <input type="text" name="category" value={productData.category}
                onChange={handleChange} className="form-control" required
                placeholder="e.g. Smartphones" />
            </div>

            <div className="col-md-4 mb-4">
              <label className="form-label fw-semibold">
                Base Price * 
                <span className="text-muted fw-normal ms-1" style={{ fontSize: "12px" }}>
                  (lowest variant price or actual price)
                </span>
              </label>
              <div className="input-group">
                <span className="input-group-text">₹</span>
                <input type="number" name="price" value={productData.price}
                  onChange={handleChange} className="form-control" required
                  placeholder="134900" min="0" />
              </div>
            </div>

            <div className="col-md-4 mb-4">
              <label className="form-label fw-semibold">
                Discount %
                <span className="text-muted fw-normal ms-1" style={{ fontSize: "12px" }}>
                  (optional, 0–90)
                </span>
              </label>
              <div className="input-group">
                <input type="number" name="discount" value={productData.discount}
                  onChange={handleChange} className="form-control"
                  placeholder="0" min="0" max="90" />
                <span className="input-group-text">%</span>
              </div>
            </div>

            <div className="col-md-4 mb-4">
              <label className="form-label fw-semibold">
                Stock *
                <span className="text-muted fw-normal ms-1" style={{ fontSize: "12px" }}>
                  (total / base stock)
                </span>
              </label>
              <input type="number" name="stock" value={productData.stock}
                onChange={handleChange} className="form-control" required
                placeholder="100" min="0" />
            </div>

            <div className="col-12 mb-4">
              <label className="form-label fw-semibold">Description *</label>
              <textarea rows="4" name="description" value={productData.description}
                onChange={handleChange} className="form-control" required
                placeholder="Describe the product features, specs, etc." />
            </div>

          </div>

          {/* =========================================
             IMAGES
          ========================================= */}
          <div className="mb-5">
            <h5 className="fw-bold mb-3">Product Images *</h5>
            <input type="file" multiple accept="image/*"
              className="form-control" onChange={handleImageUpload} required />
            {productData.images.length > 0 && (
              <div className="row mt-3">
                {Array.from(productData.images).map((image, index) => (
                  <div className="col-md-2 col-4 mb-3" key={index}>
                    <img src={URL.createObjectURL(image)} alt="preview"
                      className="img-fluid rounded"
                      style={{ height: "100px", width: "100%", objectFit: "cover" }} />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* =========================================
             HIGHLIGHTS
          ========================================= */}
          <div className="mb-5">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div>
                <h5 className="fw-bold m-0">Highlights</h5>
                <small className="text-muted">Key features shown as bullet points on product page</small>
              </div>
              <button type="button" onClick={addHighlight} className="btn btn-dark btn-sm px-3">
                + Add
              </button>
            </div>
            {productData.highlights.map((highlight, index) => (
              <div key={index} className="d-flex gap-2 mb-2">
                <input type="text" value={highlight}
                  onChange={(e) => handleHighlightChange(index, e.target.value)}
                  className="form-control" placeholder={`Highlight ${index + 1} — e.g. A17 Pro chip`} />
                {productData.highlights.length > 1 && (
                  <button type="button" onClick={() => removeHighlight(index)}
                    className="btn btn-outline-danger btn-sm px-3">✕</button>
                )}
              </div>
            ))}
          </div>

          
          <div className="mb-5">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <div>
                <h5 className="fw-bold m-0">Product Variants</h5>
                <small className="text-muted">
                  Each row = one option. Price = <strong>full price</strong> for that variant (not extra cost).
                </small>
              </div>
              <button type="button" onClick={addVariant} className="btn btn-dark btn-sm px-3">
                + Add Variant
              </button>
            </div>

            {productData.variants.length === 0 && (
              <div className="alert alert-info mt-3" style={{ borderRadius: "12px" }}>
                No variants added. Click <strong>"+ Add Variant"</strong> to add Storage, Color, Size options etc.
                <br />
                <small>If no variants, product will use the base price above.</small>
              </div>
            )}

            {/* HEADER ROW */}
            {productData.variants.length > 0 && (
              <div className="row mb-2 px-1">
                <div className="col-md-3"><small className="text-muted fw-semibold">Type</small></div>
                <div className="col-md-3"><small className="text-muted fw-semibold">Value</small></div>
                <div className="col-md-3">
                  <small className="text-muted fw-semibold">
                    Full Price (₹)
                    <span className="text-danger ms-1">*</span>
                  </small>
                </div>
                <div className="col-md-2"><small className="text-muted fw-semibold">Stock</small></div>
                <div className="col-md-1"></div>
              </div>
            )}

            {productData.variants.map((variant, index) => (
              <div key={index} className="row mb-3 align-items-center">

                {/* TYPE */}
                <div className="col-md-3">
                  <select value={variant.type}
                    onChange={(e) => handleVariantChange(index, "type", e.target.value)}
                    className="form-select">
                    <option value="">Select Type</option>
                    {variantTypes.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>

                {/* VALUE */}
                <div className="col-md-3">
                  <input type="text" placeholder="e.g. 256GB / Black Titanium / XL"
                    value={variant.value}
                    onChange={(e) => handleVariantChange(index, "value", e.target.value)}
                    className="form-control" />
                </div>

                {/* PRICE — full price */}
                <div className="col-md-3">
                  <div className="input-group">
                    <span className="input-group-text">₹</span>
                    <input type="number" placeholder="134900"
                      value={variant.price}
                      onChange={(e) => handleVariantChange(index, "price", e.target.value)}
                      className="form-control" min="0" />
                  </div>
                </div>

                {/* STOCK */}
                <div className="col-md-2">
                  <input type="number" placeholder="Stock"
                    value={variant.stock}
                    onChange={(e) => handleVariantChange(index, "stock", e.target.value)}
                    className="form-control" min="0" />
                </div>

                {/* REMOVE */}
                <div className="col-md-1">
                  <button type="button" onClick={() => removeVariant(index)}
                    className="btn btn-outline-danger w-100">✕</button>
                </div>

              </div>
            ))}

            {/* LIVE PREVIEW of entered variants */}
            {productData.variants.filter((v) => v.type && v.value && v.price).length > 0 && (
              <div className="mt-4 p-3" style={{
                background: "#f8fafc", borderRadius: "12px", border: "1px solid #e5e7eb"
              }}>
                <p className="fw-semibold mb-2" style={{ fontSize: "13px" }}>Preview on product page:</p>
                <div className="d-flex flex-wrap gap-2">
                  {[...new Set(productData.variants.filter((v) => v.type && v.value && v.price).map((v) => v.type))].map((type) => (
                    <div key={type} className="me-4">
                      <small className="text-muted fw-semibold d-block mb-1">{type}</small>
                      <div className="d-flex gap-2 flex-wrap">
                        {productData.variants
                          .filter((v) => v.type === type && v.value && v.price)
                          .map((v, i) => (
                            <span key={i} style={{
                              padding: "6px 14px", borderRadius: "8px",
                              border: "1.5px solid #d1d5db", background: "#fff",
                              fontSize: "13px", fontWeight: "600",
                            }}>
                              {v.value}
                              <span style={{ color: "#16a34a", fontSize: "11px", marginLeft: "6px" }}>
                                ₹{Number(v.price).toLocaleString("en-IN")}
                              </span>
                            </span>
                          ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* SUBMIT */}
          <div className="d-flex gap-3">
            <button type="submit" className="btn btn-dark px-5 py-3 fw-semibold"
              style={{ borderRadius: "12px" }}>
              Add Product
            </button>
            <button type="button" onClick={() => navigate("/admin/products")}
              className="btn btn-outline-secondary px-5 py-3 fw-semibold"
              style={{ borderRadius: "12px" }}>
              Cancel
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default AddProduct;