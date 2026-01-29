import { Link } from "react-router-dom";
import Header from "./Header";
function Home() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <section className="hero-section text-center text-white">
        <div className="container-fluid">
          <h1 className="display-4 fw-bold mb-3"> Welcome to FitStudio</h1>
          <p className="mb-4">Transform Your Body, Transform Your Life</p>
          <Link className="btn btn-warning me-2" to="/register">
            Get Started
          </Link>
          <Link className="btn btn-warning" to="/login">
            Login
          </Link>
        </div>
      </section>

      <main className="container-fluid py-5 flex-grow-1">
        <h2 className="text-center mb-4">Our Services</h2>

        <div className="row g-4 justify-content-center">
          <div className="col-md-3">
            <div className="border rounded shadow-sm p-4 text-center h-100 bg-white">
              <h5>Personal Training</h5>
              <p>One-on-one sessions with certified trainers.</p>
            </div>
          </div>

          <div className="col-md-3">
            <div className="border rounded shadow-sm p-4 text-center h-100 bg-white">
              <h5>Group Classes</h5>
              <p>Energetic group workouts for all levels.</p>
            </div>
          </div>

          <div className="col-md-3">
            <div className="border rounded shadow-sm p-4 text-center h-100 bg-white">
              <h5>Nutrition Plans</h5>
              <p>Nutrition plans tailored to your goals.</p>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-dark text-white py-3 mt-auto">
        <div className="container-fluid text-center">
          <small>© 2026 FitStudio. All rights reserved</small>
        </div>
      </footer>
    </div>
  );
}

export default Home;
