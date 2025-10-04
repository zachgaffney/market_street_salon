import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, NavLink, useLocation, Navigate } from "react-router-dom";
import { site, stylists } from "./siteConfig";
import { Home as HomeIcon, Scissors, Mail } from "lucide-react";



/* Scroll to top on route change */
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);
  return null;
}

/* Shared nav links */
function NavLinks({ onClick }) {
  const base =
    "group relative flex items-center gap-2 px-1 transition-colors";

  const underline =
    "after:content-[''] after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-full after:rounded-full after:bg-neutral-900 after:origin-left after:transition-transform after:duration-300";

  return (
    <>
      <NavLink
        to="/"
        end
        onClick={onClick}
        className={({ isActive }) =>
          `${base} ${underline} ${
            isActive
              ? "text-neutral-900 after:scale-x-100 after:opacity-100"
              : "text-neutral-600 hover:text-neutral-800 after:scale-x-0 after:opacity-0 group-hover:after:scale-x-100 group-hover:after:opacity-100"
          }`
        }
      >
        <HomeIcon className="w-4 h-4" />
        <span>Home</span>
      </NavLink>

      <NavLink
        to="/stylists"
        onClick={onClick}
        className={({ isActive }) =>
          `${base} ${underline} ${
            isActive
              ? "text-neutral-900 after:scale-x-100 after:opacity-100"
              : "text-neutral-600 hover:text-neutral-800 after:scale-x-0 after:opacity-0 group-hover:after:scale-x-100 group-hover:after:opacity-100"
          }`
        }
      >
        <Scissors className="w-4 h-4" />
        <span>Stylists</span>
      </NavLink>

      <NavLink
        to="/contact"
        onClick={onClick}
        className={({ isActive }) =>
          `${base} ${underline} ${
            isActive
              ? "text-neutral-900 after:scale-x-100 after:opacity-100"
              : "text-neutral-600 hover:text-neutral-800 after:scale-x-0 after:opacity-0 group-hover:after:scale-x-100 group-hover:after:opacity-100"
          }`
        }
      >
        <Mail className="w-4 h-4" />
        <span>Contact</span>
      </NavLink>
    </>
  );
}



/* ---------- Pages ---------- */

function Home() {
  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900">
      {/* HERO */}
      <section className="relative w-full h-screen flex items-center justify-center text-center text-white">
        {/* background image */}
        <div
          className="absolute inset-0 bg-center bg-cover"
          style={{ backgroundImage: "url(/images/hero.jpg)" }}
        />
        {/* overlay */}
        <div className="absolute inset-0 bg-black/70" />
        {/* content */}
        <div className="relative z-10 px-6 md:px-10 flex flex-col items-center text-center h-full justify-center">
          <h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight drop-shadow-lg max-w-3xl md:max-w-4xl lg:max-w-5xl break-words"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Where style, confidence and artistry come together.
          </h1>

          <p className="mt-4 max-w-xl md:max-w-2xl text-lg md:text-xl lg:text-2xl text-white/90">
            Step into Market Street Salon, where expert stylists bring out your best look.
          </p>

          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            <Link
              to="/stylists"
              className="rounded-2xl px-6 py-3 border border-white/60 text-sm font-medium hover:bg-white/10"
            >
              Meet Your Stylist
            </Link>
            <Link
              to="/contact"
              className="rounded-2xl px-6 py-3 bg-white/90 text-black text-sm font-medium hover:bg-white"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}


function StylistsPage() {
  // filter out any stylist where services contain "owner"
  // Helpers (add near the top of StylistsPage)
const isHolly = (s) => /holly/i.test(String(s.name || ""));
const putInMiddle = (arr, predicate) => {
  const idx = arr.findIndex(predicate);
  if (idx < 0) return arr;
  const list = [...arr];
  const [item] = list.splice(idx, 1);
  const mid = Math.floor(list.length / 2);
  list.splice(mid, 0, item);
  return list;
};

  const visibleStylists = stylists.filter(
    (s) => !/owner/i.test(String(s.services || ""))
  );

  // Then split them based on Vagaro booking
  const withBooking = visibleStylists.filter(
    (s) => Boolean(s.booking) || /vagaro\.com/i.test(String(s.contact || ""))
  );
  const withoutBooking = visibleStylists.filter((s) => !withBooking.includes(s));
  const orderedStylists = [...withBooking, ...withoutBooking];

  const getBookingUrl = (s) =>
    s.booking
      ? s.booking
      : /vagaro\.com/i.test(String(s.contact || "")) 
        ? s.contact 
        : null;

  return (
    <main className="min-h-screen bg-neutral-50 text-neutral-900">
      <div className="max-w-6xl mx-auto px-4 py-20">
      {/* --- Unified stylist grid (Holly centered, softer style) --- */}
{/* --- Stylists Hero Section --- */}
<section className="relative py-20 px-6 overflow-hidden">
  {/* Background hero image */}
  <div
    className="absolute inset-0 bg-center bg-cover"
    style={{ backgroundImage: "url('/images/transition.jpg')" }} // swap with your stylist/bg image
  />
  {/* Overlay for readability */}
  <div className="absolute inset-0 bg-white/0 backdrop-blur-sm" />

  {/* Content */}
  <div className="relative max-w-6xl mx-auto">
   {/* Heading - full width to match grid */}
<div className="mb-12">
  <div className="w-full rounded-2xl border border-neutral-200 bg-white/90 px-6 py-6 text-center shadow-md">
    <h2
      className="text-3xl md:text-4xl font-bold tracking-tight text-neutral-900"
      style={{ fontFamily: "'Playfair Display', serif" }}
    >
      Meet Our Stylists
    </h2>
    <p className="mt-3 text-neutral-700">
      Every stylist at Market Street Salon brings their own artistry, warmth,
      and dedication to helping you look and feel your best.
    </p>
  </div>
</div>


    {/* Stylist grid (from our unified version w/ Holly in the middle) */}
    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
{orderedStylists.map((s) => {
        const url = getBookingUrl(s);
        const holly = isHolly(s);
        const isNonVagaroContact =
          s.contact && !/vagaro\.com/i.test(String(s.contact || ""));

        return (
          <article
            key={s.name}
            className="group rounded-2xl border border-neutral-200 bg-white/90 backdrop-blur-sm p-6 text-center transition-all hover:shadow-md"
          >
            <div className="flex justify-center">
             <img
  src={s.photo}
  alt={`${s.name} — ${s.services}`}
  className={`w-36 h-36 rounded-full object-cover shadow-lg transition-transform duration-300 hover:scale-105 ${
    holly
      ? "border-4 border-pink-400 ring-4 ring-pink-100"
      : ""
  }`}
/>

            </div>

            <h3 className="mt-4 text-lg font-semibold">{s.name}</h3>
            <p className="text-neutral-600">{s.services}</p>

            <div className="mt-5">
              {holly && url && (
                <a
  href={url}
  target="_blank"
  rel="noreferrer"
  className="inline-block rounded-full bg-pink-400 px-6 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-pink-500 hover:shadow-lg transition-all"
>
  Book with Holly
</a>

              )}

              {!holly && isNonVagaroContact && (
                <a
                  href={
                    String(s.contact).startsWith("mailto:") ||
                    String(s.contact).startsWith("tel:") ||
                    String(s.contact).startsWith("http")
                      ? s.contact
                      : String(s.contact).includes("@")
                      ? `mailto:${s.contact}`
                      : `tel:${String(s.contact).replace(/[^\d+]/g, "")}`
                  }
                  className="inline-block rounded-full border border-neutral-300 px-5 py-2 text-sm font-medium hover:bg-neutral-50 transition-colors"
                >
                  Contact
                </a>
              )}
            </div>
          </article>
        );
      })}
    </div>
  </div>
</section>

      </div>

      <Footer />
    </main>
  );
}


function ContactPage() {
  return (
    <main className="min-h-screen bg-neutral-50 text-neutral-900">
      <div className="max-w-5xl mx-auto px-4 py-24">
        <h1 className="text-2xl md:text-3xl font-semibold">Contact</h1>
        <div className="mt-4 text-neutral-700 space-y-1">
          <div><strong>Phone:</strong> {site.phone}</div>
          <div><strong>Address:</strong> {site.address}</div>
        </div>
        <div className="mt-6">
          <a
            href={site.bookingUrl || "#"}
            className="inline-block rounded-2xl px-5 py-3 bg-black text-white text-sm hover:opacity-90"
          >
            Book Now
          </a>
        </div>
      </div>
      <Footer />
    </main>
  );
}

/* ---------- Layout bits ---------- */

function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b border-neutral-200">
      {/* Top bar: full-width with light edge padding */}
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 py-4 flex items-center">
        {/* Left: logo tight to the edge, but never touching */}
        <Link to="/" className="text-4xl font-['Great_Vibes',cursive] shrink-0">
          {site.name}
        </Link>

        {/* Desktop nav right-aligned and tight to the edge */}
        <nav className="hidden md:flex ml-auto gap-8 lg:gap-10 text-md">
          <NavLinks />
        </nav>

        {/* Mobile button on the far right */}
        <button
          className="md:hidden ml-auto inline-flex items-center rounded-xl border px-3 py-2 text-sm"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen(v => !v)}
        >
          {open ? 'Close' : 'Menu'}
        </button>
      </div>

      {/* Mobile drawer */}
      <div
        className={[
          "md:hidden bg-white border-t border-neutral-200 overflow-hidden transition-all duration-300",
          open ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
        ].join(" ")}
      >
        <div className="px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 py-3 grid gap-3 text-md">
          <NavLinks onClick={() => setOpen(false)} />
        </div>
      </div>
    </header>
  );
}



function Footer() {
  const street = "732 Market St";
  const cityState = "Kirkland, WA 98033";
  const phone = "(425) 828-4959";
  const email = "mahagonymirage5@yahoo.com";

  return (
    <footer className="bg-white text-neutral-900 border-t border-neutral-200">
      {/* Centered, not edge-to-edge like header */}
      <div className="max-w-6xl mx-auto px-6 lg:px-8 py-8 grid grid-cols-1 sm:grid-cols-3 gap-10">
        
        {/* Location (left) */}
        <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
          <h3 className="text-lg font-semibold">Location</h3>
          <p className="mt-2 text-base">{street}</p>
          <p className="text-base">{cityState}</p>
        </div>

        {/* Contact (center) */}
        <div className="flex flex-col items-center text-center">
          <h3 className="text-lg font-semibold">Contact</h3>
          <p className="mt-2 text-base">
            Phone:{" "}
            <a
              href={`tel:${phone.replace(/[^0-9]/g, "")}`}
              className="hover:underline"
            >
              {phone}
            </a>
          </p>
          <p className="text-base">
            Email:{" "}
            <a href={`mailto:${email}`} className="hover:underline">
              {email}
            </a>
          </p>
        </div>

        {/* Follow Us (right) */}
        <div className="flex flex-col items-center sm:items-end text-center sm:text-right">
          <h3 className="text-lg font-semibold">Follow Us</h3>
          <a
            href="https://www.facebook.com/people/Market-St-Salon-Kirkland/61576782331444"
            target="_blank"
            rel="noreferrer"
            className="inline-block mt-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
              className="h-10 w-10 text-[#1877F2] hover:opacity-80"
            >
              <path d="M22.675 0h-21.35C.597 0 0 .597 0 
              1.325v21.351C0 23.403.597 24 1.325 
              24h11.494v-9.294H9.691v-3.622h3.128V8.413c0-3.1 
              1.893-4.788 4.659-4.788 1.325 0 2.464.099 
              2.795.143v3.24l-1.918.001c-1.505 0-1.796.716-1.796 
              1.765v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.403 
              24 24 23.403 24 22.676V1.325C24 .597 
              23.403 0 22.675 0z" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}









/* ---------- App (with routing) ---------- */

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-neutral-50 text-neutral-900">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/stylists" element={<StylistsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          {/* Fallback to home for unknown routes */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}
