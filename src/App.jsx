import { Routes, Route, Link } from "react-router-dom";

function Home() { return <h1>Market Street Salon</h1>; }
function Services() { return <h1>Services</h1>; }
function Contact() { return <h1>Contact</h1>; }

export default function App() {
  return (
    <>
      <nav style={{ display:"flex", gap:16, padding:16 }}>
        <Link to="/">Home</Link>
        <Link to="/services">Services</Link>
        <Link to="/contact">Contact</Link>
      </nav>

      <main style={{ padding:16 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
    </>
  );
}