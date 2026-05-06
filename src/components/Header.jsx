import { ForkIcon, CartIcon } from "../icons/Icons";
// ─── HEADER ───────────────────────────────────────────────────────────────────
function Header({ cartCount }) {
  return (
    <header className="header">
      <div className="header-inner">
        <a href="/" className="logo">
          <span className="logo-icon">
            <ForkIcon />
          </span>
          Fork<span className="logo-accent">Dash</span>
        </a>

        <nav className="nav">
          <a href="/"       className="nav-link active">Home</a>
          <a href="#offers" className="nav-link">Offers</a>
          <a href="#about"  className="nav-link">About</a>
          <a href="#cart"   className="nav-cart">
            <CartIcon />
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </a>
        </nav>
      </div>
    </header>
  );
}
export default Header;