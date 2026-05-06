import {SHIMMER_COUNT} from "../utils/constants";



export function ShimmerCard() {
  return (
    <div className="shimmer-card">
      <div className="shimmer-img shimmer-anim" />
      <div className="shimmer-body">
        <div className="shimmer-line long   shimmer-anim" />
        <div className="shimmer-line medium shimmer-anim" />
        <div className="shimmer-row">
          <div className="shimmer-line short shimmer-anim" />
          <div className="shimmer-line short shimmer-anim" />
        </div>
      </div>
    </div>
  );
}

export function ShimmerGrid() {
  return (
    <div className="restaurant-grid">
      {Array.from({ length: SHIMMER_COUNT }).map((_, i) => (
        <ShimmerCard key={i} />
      ))}
    </div>
  );
}