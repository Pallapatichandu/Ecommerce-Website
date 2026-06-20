import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FaSearch,
  FaMobileAlt,
  FaTshirt,
  FaLaptop,
  FaShoePrints,
  FaTags,
  FaRedo,
} from "react-icons/fa";
// FaRedo still used in empty state "Clear Filters" button
import api from "../../services/api";
import { fetchProducts } from "../../redux/slices/productSlice";
import ProductCard from "../../components/products/ProductCard";
import Loader from "../../components/common/Loader";

/* ─── Category list ─────────────────────────────────────── */
const CATEGORIES = [
  { name: "mobile",      icon: <FaMobileAlt /> },
  { name: "cloths",      icon: <FaTshirt />    },
  { name: "electronics", icon: <FaLaptop />    },
  { name: "shoes",       icon: <FaShoePrints /> },
  { name: "fashion",     icon: <FaTags />      },
];

const PAGE_SIZE = 8;

/* ═══════════════════════════════════════════════════════════
   HOME COMPONENT
════════════════════════════════════════════════════════════ */
const Home = () => {
  const dispatch = useDispatch();

  /* ── Filter state ────────────────────────────────────── */
  const [keyword,  setKeyword]  = useState("");
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sort,     setSort]     = useState("");

  /* ── Pagination / results state ──────────────────────── */
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [visibleCount,     setVisibleCount]     = useState(PAGE_SIZE);

  /* ── Redux store ─────────────────────────────────────── */
  const { products, loading, error } = useSelector((s) => s.products);

  /* ── Fetch all products on mount ─────────────────────── */
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  /* ── Real-time filter fetch ──────────────────────────── */
  useEffect(() => {
    const fetchFiltered = async () => {
      try {
        let url = "/products";

        if (keyword)              url = `/products/search?keyword=${keyword}`;
        else if (category)        url = `/products/category/${category}`;
        else if (minPrice || maxPrice)
          url = `/products/price/filter?min=${minPrice || 0}&max=${maxPrice || 1_000_000}`;

        const { data } = await api.get(url);
        let result = data;

        if (keyword)
          result = result.filter((p) =>
            p.title.toLowerCase().includes(keyword.toLowerCase())
          );

        if (category)
          result = result.filter(
            (p) => p.category.toLowerCase() === category.toLowerCase()
          );

        result = result.filter(
          (p) =>
            p.price >= (minPrice || 0) &&
            p.price <= (maxPrice || 1_000_000)
        );

        setFilteredProducts(result);
      } catch (err) {
        console.error(err);
      }
    };

    fetchFiltered();
  }, [keyword, category, minPrice, maxPrice]);

  /* ── Reset visible count when filters change ─────────── */
  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [keyword, category, minPrice, maxPrice, sort]);

  /* ── Build display list ──────────────────────────────── */
  const isFiltered = keyword || category || minPrice || maxPrice;
  let displayProducts = isFiltered ? [...filteredProducts] : [...products];

  /* Sorting */
  const sorters = {
    low:  (a, b) => a.price - b.price,
    high: (a, b) => b.price - a.price,
    az:   (a, b) => a.title.localeCompare(b.title),
    za:   (a, b) => b.title.localeCompare(a.title),
  };
  if (sorters[sort]) displayProducts.sort(sorters[sort]);

  /* ── Helpers ─────────────────────────────────────────── */
  const resetFilters = () => {
    setKeyword("");
    setCategory("");
    setMinPrice("");
    setMaxPrice("");
    setSort("");
  };

  const loadMore = () => setVisibleCount((prev) => prev + PAGE_SIZE);

  const progressPct =
    displayProducts.length > 0
      ? Math.round(
          (Math.min(visibleCount, displayProducts.length) /
            displayProducts.length) *
            100
        )
      : 0;

  /* ══════════════════════════════════════════════════════
     RENDER
  ═══════════════════════════════════════════════════════ */
  return (
    <div style={{ background: "#f3f4f6", minHeight: "100vh" }}>

      {/* ── Top Header ─────────────────────────────────── */}
      <div className="container pt-5 pb-3">
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
          <div>
            <h1 className="fw-bold mb-1" style={{ fontSize: "40px", color: "#111827" }}>
              Discover Products
            </h1>
            <p className="text-muted mb-0" style={{ fontSize: "16px" }}>
              Explore Trending Fashion, Electronics, Shoes &amp; More
            </p>
          </div>

          {/* Product count badge */}
          <div
            className="bg-white shadow-sm px-4 py-3 text-center"
            style={{ borderRadius: "18px", minWidth: "120px" }}
          >
            <h5 className="fw-bold mb-0" style={{ color: "#2563eb" }}>
              {displayProducts.length}+
            </h5>
            <small className="text-muted">Products Available</small>
          </div>
        </div>
      </div>

      {/* ── Filter Card ────────────────────────────────── */}
      <div className="container mb-5">
        <div className="card border-0 shadow-lg p-4" style={{ borderRadius: "24px" }}>

          {/* Row 1: Search bar — centered */}
          <div className="mb-3 d-flex justify-content-center">
            <div style={{ width: "100%", maxWidth: "500px", position: "relative" }}>
              <FaSearch
                className="position-absolute"
                style={{ top: "50%", transform: "translateY(-50%)", left: "18px", color: "#9ca3af", fontSize: "15px" }}
              />
              <input
                type="text"
                placeholder="Search products..."
                className="form-control form-control-lg"
                style={{
                  borderRadius: "50px",
                  paddingLeft: "48px",
                  height: "56px",
                  border: "1.5px solid #e5e7eb",
                  fontSize: "15px",
                  transition: "border-color 0.2s",
                }}
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
            </div>
          </div>

          {/* Row 2: Category chips */}
          <div className="d-flex flex-wrap gap-2 justify-content-center">
            {/* All */}
            <button
              className={`btn ${category === "" ? "btn-dark" : "btn-outline-dark"}`}
              style={{ borderRadius: "30px", fontWeight: "500", padding: "8px 20px" }}
              onClick={() => setCategory("")}
            >
              All
            </button>

            {CATEGORIES.map((cat) => (
              <button
                key={cat.name}
                className={`btn ${category === cat.name ? "btn-primary" : "btn-outline-primary"}`}
                style={{
                  borderRadius: "30px",
                  fontWeight: "500",
                  padding: "8px 20px",
                  display: "flex",
                  alignItems: "center",
                  gap: "7px",
                }}
                onClick={() => setCategory(cat.name)}
              >
                {cat.icon}
                {cat.name.charAt(0).toUpperCase() + cat.name.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Products Section ───────────────────────────── */}
      <div className="container pb-5">

        {/* Section header */}
        <div className="mb-4">
          <h3 className="fw-bold mb-1">Trending Products</h3>
          <p className="text-muted mb-0">Best products picked for you</p>
        </div>

        {/* Loading */}
        {loading && <Loader text="Loading Products..." />}

        {/* Error */}
        {error && <div className="alert alert-danger">{error}</div>}

        {/* Product grid */}
        {!loading && !error && (
          <>
            <div className="row g-4">
              {displayProducts.length > 0 ? (
                displayProducts
                  .slice(0, visibleCount)
                  .map((product) => (
                    <ProductCard key={product._id} product={product} />
                  ))
              ) : (
                <div className="col-12 text-center py-5">
                  <h4 className="text-muted">No Products Found</h4>
                  <button className="btn btn-outline-primary mt-3" onClick={resetFilters}>
                    <FaRedo className="me-2" />
                    Clear Filters
                  </button>
                </div>
              )}
            </div>

            {/* Load more */}
            {displayProducts.length > visibleCount && (
              <div className="row mt-5">
                <div className="col-12">
                  <div
                    className="card border-0 shadow-sm mx-auto text-center p-4"
                    style={{ maxWidth: "480px", borderRadius: "20px" }}
                  >
                    <h6 className="fw-bold mb-1">
                      Showing {Math.min(visibleCount, displayProducts.length)} of{" "}
                      {displayProducts.length} Products
                    </h6>

                    <div className="progress mt-3 mb-4" style={{ height: "8px" }}>
                      <div
                        className="progress-bar bg-primary"
                        role="progressbar"
                        style={{ width: `${progressPct}%` }}
                        aria-valuenow={progressPct}
                        aria-valuemin={0}
                        aria-valuemax={100}
                      />
                    </div>

                    <button
                      className="btn btn-primary px-5 py-2"
                      style={{ borderRadius: "50px", fontWeight: "600" }}
                      onClick={loadMore}
                    >
                      View More ({displayProducts.length - visibleCount} remaining)
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Home;