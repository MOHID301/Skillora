function Navbar() {
    return (
        <header className="navbar">
            <div className="navbar-container">

                <a href="/" className="logo">
                    Skill<span>ora</span>
                </a>

                <nav className="nav-links">
                    <a href="#services">Services</a>
                    <a href="#products">Products</a>
                    <a href="#articles">Articles</a>
                    <a href="#categories">Categories</a>
                </nav>

                <div className="nav-actions">
                    <button className="login-btn">
                        Log in
                    </button>

                    <button className="signup-btn">
                        Join Skillora
                    </button>
                </div>

            </div>
        </header>
    );
}

export default Navbar;