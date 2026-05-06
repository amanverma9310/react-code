import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import{ SHIMMER_COUNT, TOP_RATED_MIN} from "../utils/constants";
import{ForkIcon, CartIcon, SearchIcon, FilterIcon, StarIcon, ClockIcon} from "../icons/Icons";
import {ShimmerCard, ShimmerGrid} from "./Shimmer";
import {RestaurantCard, RestaurantGrid} from "./RestaurantCard";
import Header from "./Header";
import {MOCK_RESTAURANTS} from "../utils/mockData";
import {CUISINE_FILTERS} from "../utils/constants";
import Footer from "./Footer";




// Simulates a real network fetch — shows shimmer for 1.2 s then resolves
function simulateFetch() {
  return new Promise((resolve) => {
    setTimeout(() => resolve(MOCK_RESTAURANTS), 500);
  });
}

// ─── SVG ICONS ────────────────────────────────────────────────────────────────




// ─── HERO SECTION ─────────────────────────────────────────────────────────────
function HeroSection({ searchQuery, onSearchChange, onClearSearch }) {
  return (
    <section className="hero">
      <p className="hero-eyebrow">🍽 Fresh &amp; Fast Delivery</p>
      <h1 className="hero-title">
        Discover <span className="hero-accent">Flavours</span>
        <br />
        Delivered to You
      </h1>
      <p className="hero-sub">
        Explore 24 cuisines from the best kitchens, delivered hot and fresh.
      </p>

      <div className="search-wrapper">
        <span className="search-icon-wrap">
          <SearchIcon />
        </span>
        <input
          type="text"
          className="search-input"
          placeholder="Search restaurants, cuisines, dishes…"
          value={searchQuery}
          onChange={onSearchChange}
          aria-label="Search restaurants"
        />
        {searchQuery && (
          <button className="search-clear" onClick={onClearSearch} aria-label="Clear search">
            ✕
          </button>
        )}
      </div>
    </section>
  );
}

// ─── FILTER BAR ───────────────────────────────────────────────────────────────
function FilterBar({ activeFilter, topRatedOnly, onCuisineClick, onTopRatedClick }) {
  return (
    <section className="filter-bar">
      <div className="cuisine-filters">
        {CUISINE_FILTERS.map((cuisine) => (
          <button
            key={cuisine}
            className={`filter-chip ${activeFilter === cuisine ? "active" : ""}`}
            onClick={() => onCuisineClick(cuisine)}
          >
            {cuisine}
          </button>
        ))}
      </div>

      <button
        className={`top-rated-btn ${topRatedOnly ? "active" : ""}`}
        onClick={onTopRatedClick}
      >
        <FilterIcon />
        {topRatedOnly ? "Show All" : "Top Rated ★ 4.5+"}
      </button>
    </section>
  );
}

function ResultsCount({ count }) {
  return (
    <p className="results-count">
      Showing {count} restaurant{count !== 1 ? "s" : ""}
    </p>
  );
}

// ─── LOADING STATE ────────────────────────────────────────────────────────────
function LoadingState() {
  return <ShimmerGrid />;
}

// ─── ERROR STATE ──────────────────────────────────────────────────────────────
function ErrorState({ message, onRetry }) {
  return (
    <div className="state-box">
      <span className="state-emoji">⚠️</span>
      <p className="state-title">Something went wrong</p>
      <p className="state-msg">{message}</p>
      <button className="action-btn" onClick={onRetry}>Retry</button>
    </div>
  );
}

// ─── EMPTY STATE ──────────────────────────────────────────────────────────────
function EmptyState({ onClear }) {
  return (
    <div className="state-box">
      <span className="state-emoji">🔍</span>
      <p className="state-title">No results found</p>
      <p className="state-msg">Try a different search or remove filters.</p>
      <button className="action-btn" onClick={onClear}>Clear Filters</button>
    </div>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────


// ─── BODY (Main State Manager) ────────────────────────────────────────────────
function Body() {
  const [allRestaurants, setAllRestaurants] = useState([]);
  const [displayList,    setDisplayList]    = useState([]);
  const [searchQuery,    setSearchQuery]    = useState("");
  const [isLoading,      setIsLoading]      = useState(true);
  const [error,          setError]          = useState(null);
  const [topRatedOnly,   setTopRatedOnly]   = useState(false);
  const [activeFilter,   setActiveFilter]   = useState("All");

  // ── Load restaurant data on mount (simulates an API call with 1.2 s delay)
  useEffect(() => {
    async function loadRestaurants() {
      try {
        setIsLoading(true);
        setError(null);
        const data = await simulateFetch();
        setAllRestaurants(data);
        setDisplayList(data);
      } catch (err) {
        setError(err.message || "Something went wrong.");
      } finally {
        setIsLoading(false);
      }
    }

    loadRestaurants();
  }, []);

  // ── Re-filter whenever search / topRated / raw data changes
  useEffect(() => {
    let filtered = [...allRestaurants];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (r) =>
          r.name?.toLowerCase().includes(q)    ||
          r.cuisine?.toLowerCase().includes(q) ||
          r.tags?.some((t) => t.toLowerCase().includes(q))
      );
    }

    if (topRatedOnly) {
      filtered = filtered.filter((r) => r.rating >= TOP_RATED_MIN);
    }

    setDisplayList(filtered);
  }, [searchQuery, topRatedOnly, allRestaurants]);

  // ── Handlers
  function handleSearchChange(e) {
    setSearchQuery(e.target.value);
    setActiveFilter("All");
  }

  function handleClearSearch() {
    setSearchQuery("");
    setTopRatedOnly(false);
    setActiveFilter("All");
  }

  function handleTopRatedClick() {
    setTopRatedOnly((prev) => !prev);
    setSearchQuery("");
    setActiveFilter("All");
  }

  function handleCuisineClick(cuisine) {
    setActiveFilter(cuisine);
    setSearchQuery(cuisine === "All" ? "" : cuisine);
    setTopRatedOnly(false);
  }

  return (
    <main className="main">
      <HeroSection
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        onClearSearch={handleClearSearch}
      />

      <FilterBar
        activeFilter={activeFilter}
        topRatedOnly={topRatedOnly}
        onCuisineClick={handleCuisineClick}
        onTopRatedClick={handleTopRatedClick}
      />

      {!isLoading && !error && displayList.length > 0 && (
        <ResultsCount count={displayList.length} />
      )}

      {isLoading && <LoadingState />}

      {!isLoading && error && (
        <ErrorState message={error} onRetry={() => window.location.reload()} />
      )}

      {!isLoading && !error && displayList.length === 0 && (
        <EmptyState onClear={handleClearSearch} />
      )}

      {!isLoading && !error && displayList.length > 0 && (
        <RestaurantGrid restaurants={displayList} />
      )}
    </main>
  );
}

// ─── APP ─────────────────────────────────────────────────────────────────────
function App() {
  return (
    <div className="app">
      <Header cartCount={0} />
      <Body />
      <Footer />
    </div>
  );
}

// ─── ENTRY POINT ──────────────────────────────────────────────────────────────
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);