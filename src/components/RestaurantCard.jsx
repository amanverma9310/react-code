import {StarIcon, ClockIcon} from "../icons/icons";
export function RestaurantCard({ restaurant }) {
  const {
    name            = "Unknown",
    image           = "",
    cuisine         = "International",
    rating          = 4.0,
    prepTimeMinutes = 10,
    cookTimeMinutes = 20,
    difficulty      = "",
    mealType        = "",
    tags            = [],
  } = restaurant;

  const totalMins    = prepTimeMinutes + cookTimeMinutes;
  const deliveryTime = `${totalMins}–${totalMins + 10} mins`;
  const cuisineLabel = cuisine || tags[0] || "Various";
  const ratingColor  = rating >= 4.5 ? "#4ade80" : rating >= 4.0 ? "#facc15" : "#fb923c";

  function handleImgError(e) {
    e.target.src =
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=500&q=80";
  }

  return (
    <div className="restaurant-card">
      {difficulty && (
        <span className={`difficulty-badge diff-${difficulty.toLowerCase()}`}>
          {difficulty}
        </span>
      )}
      {mealType && <span className="meal-pill">{mealType}</span>}

      <div className="card-img-wrapper">
        <img
          src={image}
          alt={name}
          className="card-img"
          loading="lazy"
          onError={handleImgError}
        />
        <div className="card-img-overlay" />
      </div>

      <div className="card-body">
        <h3 className="card-title" title={name}>{name}</h3>
        <p className="card-cuisine">{cuisineLabel} Cuisine</p>
        <div className="card-meta">
          <span className="meta-badge" style={{ color: ratingColor }}>
            <StarIcon /> {Number(rating).toFixed(1)}
          </span>
          <span className="meta-badge time-badge">
            <ClockIcon /> {deliveryTime}
          </span>
        </div>
      </div>
    </div>
  );
}

// ─── RESTAURANT GRID ──────────────────────────────────────────────────────────
export function RestaurantGrid({ restaurants }) {
  return (
    <div className="restaurant-grid">
      {restaurants.map((r) => (
        <RestaurantCard key={r.id} restaurant={r} />
      ))}
    </div>
  );
}
