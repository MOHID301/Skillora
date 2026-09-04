import Navbar from "../components/Navbar";

function Home() {
    return (
        <>
            <Navbar />

            <main>
                <section className="hero">
                    <div className="container hero-content">

                        <div className="hero-text">

                            <div className="hero-badge">
                                <span className="badge-dot"></span>
                                The marketplace for modern skills
                            </div>

                            <h1>
                                Find the right
                                <span> skills.</span>
                                <br />
                                Get things done.
                            </h1>

                            <p>
                                Discover talented freelancers,
                                unique products, useful services
                                and ideas — all in one place.
                            </p>

                            <div className="search-box">

                                <input
                                    type="text"
                                    placeholder="Search for services, products or articles..."
                                />

                                <button>
                                    Search
                                </button>

                            </div>

                        </div>

                    </div>
                </section>
            </main>
        </>
    );
}

export default Home;