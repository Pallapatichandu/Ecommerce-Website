import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleProduct, addProductReview, fetchRelatedProducts } from "../../redux/slices/productSlice";
import { addToCart, removeFromCart } from "../../redux/slices/cartSlice";
import { addToWishlist, fetchWishlist, deleteWishlist } from "../../redux/slices/wishlistSlice";
import ProductCard from "../../components/products/ProductCard";
import toast from "react-hot-toast";
import { FaHeart, FaShoppingCart, FaStar, FaBolt, FaShieldAlt, FaTruck, FaCheck } from "react-icons/fa";
import ProductImages from "../../components/products/ProductImages";
import RelatedProducts from "../../components/products/RelatedProducts";
import ReviewCard from "../../components/products/ReviewCard";


/* =========================================
   COLOR NAME → CSS COLOR MAP
========================================= */
const COLOR_MAP = {
  "black": "#1a1a1a",
  "black titanium": "#2c2c2c",
  "midnight": "#1c1c2e",
  "white": "#f5f5f5",
  "white titanium": "#e8e8e8",
  "starlight": "#f2ede4",
  "silver": "#c0c0c0",
  "natural titanium": "#b5a99a",
  "blue": "#2563eb",
  "deep purple": "#4b0082",
  "pacific blue": "#21363e",
  "sierra blue": "#a2c4d8",
  "sky blue": "#87ceeb",
  "navy": "#001f5b",
  "blue titanium": "#4a6fa5",
  "green": "#16a34a",
  "midnight green": "#1c3a2f",
  "alpine green": "#4a7c59",
  "forest green": "#228b22",
  "mint": "#98ff98",
  "red": "#dc2626",
  "product red": "#e3000b",
  "pink": "#ec4899",
  "rose gold": "#b76e79",
  "coral": "#ff6b6b",
  "purple": "#7c3aed",
  "yellow": "#fbbf24",
  "gold": "#d4a017",
  "orange": "#f97316",
  "gray": "#6b7280",
  "graphite": "#41424c",
  "space gray": "#4a4a4a",
  "space black": "#1c1c1e",
  "titanium": "#878681",
  "brown": "#92400e",
  "tan": "#d2b48c",
};

const getColorStyle = (colorName) => {
  const key = colorName?.toLowerCase().trim();
  const color = COLOR_MAP[key];
  if (!color) return { background: "#d1d5db" };
  return { background: color };
};

const isLightColor = (colorName) => {
  const lightColors = [
    "white", "white titanium", "starlight", "silver", "natural titanium",
    "sierra blue", "sky blue", "mint", "pink", "rose gold", "yellow", "gold", "tan",
  ];
  return lightColors.includes(colorName?.toLowerCase().trim());
};

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();


  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");

  /* =========================================
     selectedVariants = { Storage: {...}, Color: {...} }
     Each type stores the full variant object including price
  ========================================= */
  const [selectedVariants, setSelectedVariants] = useState({});

  const { singleProduct, relatedProducts = [], loading, error } = useSelector((state) => state.products);
  const { userInfo } = useSelector((state) => state.auth);
  const { wishlistItems = [] } = useSelector((state) => state.wishlist);
  const { cartItems = [] } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(fetchSingleProduct(id));
    dispatch(fetchRelatedProducts(id));
    if (userInfo) dispatch(fetchWishlist(userInfo.token));
  }, [dispatch, id, userInfo]);



  useEffect(() => {
    setSelectedVariants({});
  }, [id]);



  /* =========================================
     PRICE LOGIC — Real-world multi-variant

     How Flipkart/Amazon actually works:
     - Each variant type is INDEPENDENT — Storage has its own prices,
       Color has its own prices
     - When user selects a combination, we find the variant that matches
       ALL selected types and use that price
     - If no exact combination found, use the LAST selected variant's price
       (most recently clicked = user's intent)
     - If no variant selected → base price with discount

     Example data structure in DB:
       variants: [
         { type: "Storage", value: "256GB", price: 134900 },
         { type: "Storage", value: "512GB", price: 154900 },
         { type: "Color",   value: "Black Titanium", price: 134900 },
         { type: "Color",   value: "White Titanium", price: 136900 },
         { type: "Color",   value: "Blue Titanium",  price: 139900 },
       ]

     When user picks 512GB + Blue Titanium:
       → No single variant has both, so we use the LAST clicked price
       → But if your backend stores combined variants (one row per combo),
         it will find the exact match

     This handles BOTH data structures automatically.
  ========================================= */
  const selectedVariantList =
    Object.values(selectedVariants);

  /* Full replacement variants */
  const replacementPrice =

    selectedVariantList.find(

      variant =>

        ["Storage", "Variant"]

          .includes(variant.type)

    )?.price

    ||

    singleProduct?.price

    ||

    0;

  /* Extra variants */
  const extraPrice =

    selectedVariantList

      .filter(

        variant =>

          !["Storage", "Variant"]

            .includes(variant.type)

      )

      .reduce(

        (sum, variant) =>

          sum +

          Number(variant.price || 0),

        0

      );

  const finalPrice =

    Number(replacementPrice)

    +

    Number(extraPrice);

  const hasVariantSelected =
    selectedVariantList.length > 0;

  const showStrikethrough =
    selectedVariantList.length === 0 &&
    singleProduct?.discount > 0;
  /* =========================================
     LAST SELECTED TYPE — for UX hint
     Shows which type's price is currently driving the display
  ========================================= */
  const [lastSelectedType, setLastSelectedType] = useState(null);

  const handleVariantSelect = (variant) => {
    setLastSelectedType(variant.type);
    setSelectedVariants((prev) => ({
      ...prev,
      [variant.type]: {
        type: variant.type,
        value: variant.value,
        price: variant.price,
        stock: variant.stock,
      },
    }));
  };

  /* CART CHECK */
  const cartItem = cartItems.find((item) => {
    const cartProduct = item.product || item;
    return cartProduct?._id === singleProduct?._id;
  });
  const isCarted = !!cartItem;

  /* WISHLIST CHECK */
  const wishlistItem = wishlistItems.find((item) => {
    const wishlistProduct = item.product || item;
    return wishlistProduct?._id === singleProduct?._id;
  });
  const isWishlisted = !!wishlistItem;

  /* CART HANDLER */
  const addToCartHandler = async () => {
    if (!userInfo) { toast.error("Please Login"); return; }
    try {
      if (cartItem) {
        await dispatch(removeFromCart({ id: cartItem._id, token: userInfo.token }));
        toast.success("Removed From Cart");
      } else {
        await dispatch(addToCart({
          productId: singleProduct._id,
          quantity: 1,
          variants: Object.values(selectedVariants),
          token: userInfo.token,
        }));
        toast.success("Added To Cart");
      }
    } catch (error) {
      toast.error("Something Went Wrong");
    }
  };

  /* WISHLIST HANDLER */
  const wishlistHandler = async () => {
    if (!userInfo) { toast.error("Please Login"); return; }
    try {
      if (wishlistItem) {
        await dispatch(deleteWishlist({ id: wishlistItem._id, token: userInfo.token }));
        toast.success("Removed From Wishlist");
      } else {
        await dispatch(addToWishlist({ productId: singleProduct._id, token: userInfo.token }));
        toast.success("Added To Wishlist");
      }
    } catch (error) {
      toast.error("Something Went Wrong");
    }
  };

  /* REVIEW HANDLER */
  const submitReviewHandler = async (e) => {
    e.preventDefault();
    if (!rating || !comment) { toast.error("Please Fill All Fields"); return; }
    try {
      const result = await dispatch(addProductReview({
        productId: id,
        reviewData: { rating, comment },
        token: userInfo.token,
      }));
      if (result?.error) { toast.error(result.payload); return; }
      toast.success("Review Added Successfully");
      setRating(""); setComment("");
      dispatch(fetchSingleProduct(id));
    } catch (error) {
      toast.error("Something Went Wrong");
    }
  };

  if (loading) return (
    <div className="text-center py-5">
      <div className="spinner-border text-dark" role="status" />
    </div>
  );

  if (error) return (
    <div className="container py-5">
      <div className="alert alert-danger">{error}</div>
    </div>
  );

  return (
    <div className="container py-5" style={{ background: "#f8fafc", minHeight: "100vh" }}>
      {singleProduct && (
        <>
          <div className="row g-5">

            {/* LEFT — Images */}
            {/* LEFT — Images */}

            <div className="col-lg-6">

              <ProductImages

                images={
                  singleProduct?.images || []
                }

              />

            </div>

            {/* RIGHT — Details */}
            <div className="col-lg-6">

              <span className="badge bg-dark px-3 py-2 mb-3">{singleProduct.category}</span>

              <h1 className="fw-bold" style={{ fontSize: "42px", color: "#111827" }}>
                {singleProduct.title}
              </h1>

              {/* RATING */}
              <div className="d-flex align-items-center gap-2 mt-3">
                <div className="d-flex gap-1">
                  {[...Array(5)].map((_, index) => (
                    <FaStar key={index} color={index < Math.round(singleProduct.rating || 0) ? "#f59e0b" : "#d1d5db"} />
                  ))}
                </div>
                <span className="fw-bold">{singleProduct.rating?.toFixed(1) || "0.0"}</span>
                <span className="text-muted">({singleProduct.numReviews || 0} Reviews)</span>
              </div>

              {/* =========================================
                 PRICE SECTION
              ========================================= */}
              <div className="my-4">

                <div className="d-flex align-items-center gap-3 mb-2">

                  <h2 className="fw-bold text-dark m-0">
                    ₹{finalPrice?.toLocaleString("en-IN")}
                  </h2>

                  {showStrikethrough && (
                    <>
                      <h5 className="text-muted text-decoration-line-through m-0">
                        ₹{singleProduct.price?.toLocaleString("en-IN")}
                      </h5>

                      <span
                        className="badge bg-success"
                        style={{
                          fontSize: "14px",
                          padding: "8px 12px"
                        }}
                      >
                        {singleProduct.discount}% OFF
                      </span>
                    </>
                  )}

                </div>

                {selectedVariants["Storage"] && (
                  <p className="mb-1 text-primary fw-semibold">
                    Storage :
                    ₹{
                      Number(
                        selectedVariants["Storage"].price
                      ).toLocaleString("en-IN")
                    }
                  </p>
                )}

                {selectedVariants["Color"] && (
                  <p className="mb-1 text-success fw-semibold">
                    Color Extra :
                    ₹{
                      Number(
                        selectedVariants["Color"].price
                      ).toLocaleString("en-IN")
                    }
                  </p>
                )}

                {hasVariantSelected && (
                  <p
                    className="text-muted mb-0"
                    style={{ fontSize: "13px" }}
                  >
                    Price for :
                    {" "}
                    {selectedVariantList.map((v, i) => (
                      <span key={i}>
                        <strong>{v.value}</strong>
                        {i < selectedVariantList.length - 1
                          ? " + "
                          : ""}
                      </span>
                    ))}
                  </p>
                )}

                <p className="text-success fw-semibold mt-1">
                  Inclusive of all taxes
                </p>

              </div>

              {/* DESCRIPTION */}
              <p className="text-muted fs-5" style={{ lineHeight: "34px" }}>
                {singleProduct.description}
              </p>

              {/* =========================================
                 VARIANTS SECTION
                 Color type → colored circular swatches
                 Other types (Storage, RAM, Size) → pill buttons
              ========================================= */}
              {singleProduct?.variants?.length > 0 && (
                <div className="mt-4" style={{
                  background: "#fff", padding: "24px",
                  borderRadius: "16px", border: "1px solid #e5e7eb",
                }}>
                  <h5 className="fw-bold mb-4" style={{ color: "#111827" }}>Select Variant</h5>

                  {[...new Set(singleProduct.variants.map((v) => v.type))].map((type, index) => {
                    const variantsOfType = singleProduct.variants.filter((v) => v.type === type);
                    const isColorType = type.toLowerCase() === "color";
                    const selectedForType = selectedVariants[type];

                    return (
                      <div key={index} className="mb-4">

                        {/* TYPE LABEL ROW */}
                        <div className="d-flex align-items-center gap-2 mb-3">
                          <h6 className="fw-bold m-0" style={{ color: "#374151" }}>{type}</h6>
                          {selectedForType && (
                            <>
                              <span className="text-muted">:</span>
                              <span style={{ fontSize: "14px", color: "#111827", fontWeight: "600" }}>
                                {selectedForType.value}
                              </span>
                              <span style={{
                                fontSize: "13px", color: "#16a34a", fontWeight: "600",
                                background: "#f0fdf4", padding: "2px 10px", borderRadius: "20px",
                              }}>
                                ₹{Number(selectedForType.price).toLocaleString("en-IN")}
                              </span>
                            </>
                          )}
                        </div>

                        {/* COLOR SWATCHES */}
                        {isColorType ? (
                          <div className="d-flex flex-wrap gap-3">
                            {variantsOfType.map((variant, i) => {
                              const isSelected = selectedVariants[type]?.value === variant.value;
                              const colorStyle = getColorStyle(variant.value);
                              const lightColor = isLightColor(variant.value);
                              return (
                                <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
                                  {/* SWATCH CIRCLE */}
                                  <div
                                    onClick={() => handleVariantSelect(variant)}
                                    title={`${variant.value} — ₹${Number(variant.price).toLocaleString("en-IN")}`}
                                    style={{
                                      width: "44px", height: "44px", borderRadius: "50%",
                                      cursor: "pointer", ...colorStyle,
                                      border: isSelected
                                        ? "3px solid #111827"
                                        : lightColor ? "2px solid #d1d5db" : "2px solid transparent",
                                      boxShadow: isSelected
                                        ? "0 0 0 2px #fff, 0 0 0 4px #111827"
                                        : "0 2px 6px rgba(0,0,0,0.18)",
                                      display: "flex", alignItems: "center", justifyContent: "center",
                                      transition: "all 0.2s ease",
                                    }}
                                  >
                                    {isSelected && (
                                      <FaCheck size={14} color={lightColor ? "#111827" : "#ffffff"} />
                                    )}
                                  </div>
                                  {/* COLOR NAME BELOW SWATCH */}
                                  <span style={{
                                    fontSize: "11px", color: isSelected ? "#111827" : "#6b7280",
                                    fontWeight: isSelected ? "600" : "400",
                                    textAlign: "center", maxWidth: "60px", lineHeight: "1.3",
                                  }}>
                                    {variant.value}
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                        ) : (
                          /* STORAGE / RAM / SIZE BUTTONS */
                          <div className="d-flex flex-wrap gap-3">
                            {variantsOfType.map((variant, i) => {
                              const isSelected = selectedVariants[type]?.value === variant.value;
                              return (
                                <button
                                  key={i}
                                  type="button"
                                  onClick={() => handleVariantSelect(variant)}
                                  style={{
                                    minWidth: "90px",
                                    padding: "10px 16px",
                                    borderRadius: "10px",
                                    border: isSelected ? "2px solid #111827" : "1.5px solid #d1d5db",
                                    background: isSelected ? "#111827" : "#fff",
                                    color: isSelected ? "#fff" : "#374151",
                                    fontWeight: "600", fontSize: "14px",
                                    cursor: "pointer", transition: "all 0.2s ease",
                                    textAlign: "center",
                                  }}
                                >
                                  <div>{variant.value}</div>
                                  <div style={{
                                    fontSize: "12px", fontWeight: "500", marginTop: "3px",
                                    color: isSelected ? "#d1d5db" : "#16a34a",
                                  }}>
                                    ₹{Number(variant.price).toLocaleString("en-IN")}
                                  </div>
                                </button>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}

              {/* HIGHLIGHTS */}
              <div className="mt-4">
                <h5 className="fw-bold mb-3">Highlights</h5>
                <div className="d-flex flex-column gap-3">
                  {singleProduct.highlights?.map((item, index) => (
                    <div key={index} className="d-flex align-items-center gap-3">
                      <span style={{
                        width: "10px", height: "10px", background: "#2563eb",
                        borderRadius: "50%", flexShrink: 0,
                      }} />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* FEATURES */}
              <div className="row mt-5">
                <div className="col-4 text-center">
                  <FaTruck size={28} color="#2563eb" />
                  <p className="mt-2 fw-semibold">Fast Delivery</p>
                </div>
                <div className="col-4 text-center">
                  <FaShieldAlt size={28} color="#16a34a" />
                  <p className="mt-2 fw-semibold">Secure Product</p>
                </div>
                <div className="col-4 text-center">
                  <FaBolt size={28} color="#f59e0b" />
                  <p className="mt-2 fw-semibold">Premium Quality</p>
                </div>
              </div>

              {/* BUTTONS */}
              <div className="d-flex gap-3 mt-5 flex-wrap">
                <button onClick={addToCartHandler} className="btn px-5 py-3 fw-semibold"
                  style={{
                    borderRadius: "14px", background: isCarted ? "#16a34a" : "#111827",
                    color: "#fff", border: "none",
                  }}>
                  <FaShoppingCart /> {isCarted ? "Remove Cart" : "Add To Cart"}
                </button>
                <button onClick={wishlistHandler} className="btn px-5 py-3 fw-semibold"
                  style={{
                    borderRadius: "14px", background: isWishlisted ? "#dc2626" : "#fff",
                    color: isWishlisted ? "#fff" : "#dc2626", border: "2px solid #dc2626",
                  }}>
                  <FaHeart /> {isWishlisted ? "Wishlisted" : "Add Wishlist"}
                </button>
              </div>

            </div>
          </div>

          {/* WRITE A REVIEW */}
          <div className="mt-5">
            <div className="card border-0 p-4"
              style={{ borderRadius: "20px", background: "#ffffff", boxShadow: "0 6px 20px rgba(0,0,0,0.05)" }}>
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                  <h4 className="fw-bold m-0" style={{ color: "#111827" }}>Write A Review</h4>
                  <p className="text-muted small m-0 mt-1">Share your experience about this product</p>
                </div>
                <div className="badge bg-dark px-3 py-2" style={{ borderRadius: "12px" }}>Customer Feedback</div>
              </div>
              <form onSubmit={submitReviewHandler}>
                <div className="row">
                  <div className="col-md-4 mb-3">
                    <label className="form-label fw-semibold">Rating</label>
                    <select value={rating} onChange={(e) => setRating(e.target.value)}
                      className="form-select" style={{ height: "52px", borderRadius: "12px" }}>
                      <option value="">Select</option>
                      <option value="1">⭐ 1 Star</option>
                      <option value="2">⭐⭐ 2 Stars</option>
                      <option value="3">⭐⭐⭐ 3 Stars</option>
                      <option value="4">⭐⭐⭐⭐ 4 Stars</option>
                      <option value="5">⭐⭐⭐⭐⭐ 5 Stars</option>
                    </select>
                  </div>
                  <div className="col-md-8 mb-3">
                    <label className="form-label fw-semibold">Comment</label>
                    <textarea rows="2" value={comment} onChange={(e) => setComment(e.target.value)}
                      className="form-control" placeholder="Write your experience..."
                      style={{ borderRadius: "12px", resize: "none" }} />
                  </div>
                </div>
                <div className="text-end">
                  <button type="submit" className="btn px-4 py-2 fw-semibold"
                    style={{ borderRadius: "12px", background: "#111827", color: "#fff", border: "none" }}>
                    Submit Review
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* CUSTOMER REVIEWS */}
          <div className="mt-5">
            <h2 className="fw-bold mb-4">Customer Reviews</h2>
            {singleProduct.reviews?.length === 0 ? (

              <div className="alert alert-info">

                No Reviews Yet

              </div>

            ) : (

              singleProduct.reviews?.map(

                (review, index) => (

                  <ReviewCard

                    key={index}

                    review={review}

                  />

                )

              )

            )}
          </div>

          {/* RELATED PRODUCTS */}
          <RelatedProducts

            products={relatedProducts}

          />

        </>
      )}
    </div>
  );
};

export default ProductDetails;