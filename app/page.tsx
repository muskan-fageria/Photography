import React from "react";
import Navbar from "@/components/Navbar";
import Gallery from "@/components/Gallery";
import BookSessionForm from "@/components/BookSessionForm";
import RevealSection from "@/components/RevealSection";
import { ArrowDown, Calendar, Clock, Image as ImageIcon, MapPin, Mail, Compass } from "lucide-react";

const Instagram = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#f5ebe0] selection:bg-[#c59b27] selection:text-[#0a0a0a]">
      {/* Navigation */}
      <Navbar />

      {/* SECTION A: HERO */}
      <section
        id="home"
        className="relative h-screen w-full flex items-center justify-center overflow-hidden"
      >
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1607190074257-dd4b7af0309f?auto=format&fit=crop&q=80&w=1920"
            alt="Dramatic Editorial Heritage Indian Wedding Portrait"
            className="w-full h-full object-cover brightness-[0.35] scale-[1.01]"
          />
          {/* Dark Overlay Vignette */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0a0a]/30 to-[#0a0a0a]" />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-6 max-w-5xl">
          <RevealSection delay={0.2} yOffset={50}>
            <span className="text-xs md:text-sm tracking-[0.4em] uppercase text-warmGold mb-4 block font-medium">
              Fine Art & Heritage Photographer
            </span>
          </RevealSection>

          <RevealSection delay={0.4} yOffset={60}>
            <h1 className="font-serif italic text-6xl md:text-8xl lg:text-9xl tracking-[0.1em] text-[#f5ebe0] mb-8 font-light select-none">
              Kavya Sen
            </h1>
          </RevealSection>

          <RevealSection delay={0.6} yOffset={40}>
            <p className="text-sm md:text-base tracking-[0.25em] text-[#f5ebe0]/80 font-light max-w-xl mx-auto uppercase mb-12">
              Capturing heritage and modern romance.
            </p>
          </RevealSection>

          <RevealSection delay={0.8} yOffset={20}>
            <a
              href="#portfolio"
              className="inline-flex items-center justify-center w-12 h-12 rounded-full border border-warmGold/30 hover:border-warmGold text-warmGold bg-[#0a0a0a]/50 backdrop-blur-sm transition-all duration-500 hover:scale-110 group"
              aria-label="Scroll to Portfolio"
            >
              <ArrowDown className="w-4 h-4 transition-transform duration-500 group-hover:translate-y-1" />
            </a>
          </RevealSection>
        </div>

        {/* Scroll indicator side marker (Editorial style) */}
        <div className="absolute bottom-12 left-12 hidden lg:flex items-center gap-4 text-[10px] tracking-[0.3em] uppercase text-softCream/40 select-none">
          <span className="w-8 h-[1px] bg-softCream/20" />
          Scroll to Explore
        </div>
      </section>

      {/* SECTION B: PORTFOLIO GALLERY */}
      <section id="portfolio" className="py-24 md:py-36 px-6 md:px-12 max-w-7xl mx-auto relative">
        <div className="absolute -left-20 top-40 w-80 h-80 rounded-full bg-warmGold/5 blur-[120px] pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 md:mb-28 gap-6">
          <RevealSection yOffset={35}>
            <span className="text-xs tracking-[0.3em] uppercase text-warmGold mb-3 block font-medium">
              The Captured Chronicles
            </span>
            <h2 className="font-serif italic text-4xl md:text-6xl text-softCream font-light">
              Selected Works
            </h2>
          </RevealSection>

          <RevealSection delay={0.2} yOffset={20}>
            <p className="text-sm text-softCream/50 max-w-md leading-relaxed font-light">
              A curated anthology of human connection, architecture, and quiet editorial pauses. Every frame is composed to elevate life into art.
            </p>
          </RevealSection>
        </div>

        {/* Asymmetric Gallery Wrapper */}
        <RevealSection delay={0.2} yOffset={30}>
          <Gallery />
        </RevealSection>
      </section>

      {/* SECTION C: ABOUT */}
      <section id="about" className="py-24 md:py-36 bg-[#0c0c0c] border-y border-white/[0.02] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            {/* About Photo (Left) */}
            <div className="lg:col-span-5">
              <RevealSection yOffset={50}>
                <div className="relative aspect-[3/4] w-full max-w-md mx-auto overflow-hidden border border-warmGold/10 p-2 bg-studioBlack">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=1000"
                    alt="Kavya Sen - Luxury Heritage Photographer"
                    className="w-full h-full object-cover brightness-[0.75] transition-all duration-700 hover:brightness-[0.9] hover:scale-[1.02]"
                  />
                </div>
              </RevealSection>
            </div>

            {/* About Narrative (Right) */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              <RevealSection delay={0.2} yOffset={40}>
                <span className="text-xs tracking-[0.3em] uppercase text-warmGold mb-4 block font-medium">
                  The Lens & The Narrative
                </span>
                <h2 className="font-serif italic text-4xl md:text-5xl text-softCream font-light mb-8 leading-tight">
                  Chasing natural luminance, preserving real human connections.
                </h2>
              </RevealSection>

              <RevealSection delay={0.3} yOffset={30} className="space-y-6 text-sm md:text-base text-softCream/70 font-light leading-relaxed">
                <p>
                  I believe that the best photographs are not staged; they are summoned. My work exists at the delicate intersection of royal Indian heritage art direction and contemporary editorial storytelling. Whether documenting a grand wedding celebration in a Rajasthan palace or capturing the silent presence of a handloom saree portrait, my aim is to preserve timeless heirlooms.
                </p>
                <p>
                  Based in Mumbai, capturing stories across India and globally. Over the last decade, I have collaborated with luxury designers, cultural curators, and private couples to produce archives that serve as tangible landmarks for the memories we hold closest.
                </p>
                <p>
                  Every commission is approached with a bespoke lens—tailoring ambient light, medium format digital, and analog elements to honor your unique legacy.
                </p>
              </RevealSection>

              {/* Signature details */}
              <RevealSection delay={0.4} yOffset={25} className="mt-10 flex items-center gap-6">
                <div>
                  <h4 className="font-serif italic text-2xl text-warmGold font-medium">
                    Kavya Sen
                  </h4>
                  <span className="text-[10px] tracking-widest uppercase text-softCream/40 block mt-1">
                    Founder & Principal Artist
                  </span>
                </div>
                <div className="h-10 w-[1px] bg-warmGold/20" />
                <div className="flex gap-4">
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noreferrer"
                    className="text-softCream/60 hover:text-warmGold transition-colors duration-300"
                    aria-label="Instagram Profile"
                  >
                    <Instagram className="w-4 h-4" />
                  </a>
                  <a
                    href="#portfolio"
                    className="text-softCream/60 hover:text-warmGold transition-colors duration-300"
                    aria-label="Portfolio Index"
                  >
                    <Compass className="w-4 h-4" />
                  </a>
                </div>
              </RevealSection>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION D: SERVICES */}
      <section id="services" className="py-24 md:py-36 px-6 md:px-12 max-w-7xl mx-auto relative">
        <div className="absolute -right-20 top-40 w-80 h-80 rounded-full bg-warmGold/5 blur-[120px] pointer-events-none" />

        <div className="text-center max-w-xl mx-auto mb-20 md:mb-28">
          <RevealSection yOffset={30}>
            <span className="text-xs tracking-[0.3em] uppercase text-warmGold mb-3 block font-medium">
              Curated Offerings
            </span>
            <h2 className="font-serif italic text-4xl md:text-5xl text-softCream font-light mb-6">
              Photography Sessions
            </h2>
            <div className="w-12 h-[1px] bg-warmGold/30 mx-auto" />
          </RevealSection>
        </div>

        {/* Services Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {/* Card 1 */}
          <RevealSection delay={0.1} yOffset={45} className="flex">
            <div className="w-full bg-[#0d0d0d] border border-white/[0.03] hover:border-warmGold/20 p-8 md:p-10 flex flex-col justify-between transition-all duration-500 hover:shadow-[0_15px_40px_rgba(0,0,0,0.6)] group">
              <div>
                <div className="flex items-center justify-between mb-8">
                  <span className="text-[10px] tracking-[0.2em] uppercase text-warmGold font-semibold">
                    01 / HERITAGE PORTRAITS
                  </span>
                  <ImageIcon className="w-4 h-4 text-softCream/30 group-hover:text-warmGold transition-colors duration-500" />
                </div>
                <h3 className="font-serif italic text-3xl text-softCream mb-4 font-light">
                  Royal Heritage Portraiture
                </h3>
                <p className="text-xs text-softCream/50 leading-relaxed font-light mb-8">
                  A studio or location session focusing on traditional draping, classic lighting, cultural jewelry, and high-end fine art retouching.
                </p>
                <ul className="space-y-3 text-xs text-softCream/70 font-light border-t border-white/[0.04] pt-6 mb-12">
                  <li className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-warmGold/60" /> 2.5 Hours Session Duration
                  </li>
                  <li className="flex items-center gap-2">
                    <ImageIcon className="w-3.5 h-3.5 text-warmGold/60" /> 20 Hand-Retouched Edits
                  </li>
                  <li className="flex items-center gap-2">
                    <Compass className="w-3.5 h-3.5 text-warmGold/60" /> Traditional Styling Consultation
                  </li>
                </ul>
              </div>
              <div>
                <div className="text-xs uppercase tracking-widest text-softCream/40 mb-1">
                  Starting From
                </div>
                <div className="font-serif text-3xl text-warmGold italic">₹75,000</div>
              </div>
            </div>
          </RevealSection>

          {/* Card 2 */}
          <RevealSection delay={0.2} yOffset={45} className="flex">
            <div className="w-full bg-[#0d0d0d] border border-white/[0.03] hover:border-warmGold/20 p-8 md:p-10 flex flex-col justify-between transition-all duration-500 hover:shadow-[0_15px_40px_rgba(0,0,0,0.6)] group relative">
              {/* Highlight Border */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-warmGold/35" />
              <div>
                <div className="flex items-center justify-between mb-8">
                  <span className="text-[10px] tracking-[0.2em] uppercase text-warmGold font-semibold">
                    02 / WEDDINGS
                  </span>
                  <Calendar className="w-4 h-4 text-softCream/30 group-hover:text-warmGold transition-colors duration-500" />
                </div>
                <h3 className="font-serif italic text-3xl text-softCream mb-4 font-light">
                  Luxury Destination
                </h3>
                <p className="text-xs text-softCream/50 leading-relaxed font-light mb-8">
                  Complete cinematic coverage for grand destination nuptials, specializing in royal rituals and intimate family heirlooms.
                </p>
                <ul className="space-y-3 text-xs text-softCream/70 font-light border-t border-white/[0.04] pt-6 mb-12">
                  <li className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-warmGold/60" /> Multi-Day Custom Scheduling
                  </li>
                  <li className="flex items-center gap-2">
                    <ImageIcon className="w-3.5 h-3.5 text-warmGold/60" /> Digital & Medium Format Film
                  </li>
                  <li className="flex items-center gap-2">
                    <Compass className="w-3.5 h-3.5 text-warmGold/60" /> Hand-Crafted Linen Box & Prints
                  </li>
                </ul>
              </div>
              <div>
                <div className="text-xs uppercase tracking-widest text-softCream/40 mb-1">
                  Starting From
                </div>
                <div className="font-serif text-3xl text-warmGold italic">₹3,50,000</div>
              </div>
            </div>
          </RevealSection>

          {/* Card 3 */}
          <RevealSection delay={0.3} yOffset={45} className="flex">
            <div className="w-full bg-[#0d0d0d] border border-white/[0.03] hover:border-warmGold/20 p-8 md:p-10 flex flex-col justify-between transition-all duration-500 hover:shadow-[0_15px_40px_rgba(0,0,0,0.6)] group">
              <div>
                <div className="flex items-center justify-between mb-8">
                  <span className="text-[10px] tracking-[0.2em] uppercase text-warmGold font-semibold">
                    03 / FESTIVE & CULTURAL
                  </span>
                  <Compass className="w-4 h-4 text-softCream/30 group-hover:text-warmGold transition-colors duration-500" />
                </div>
                <h3 className="font-serif italic text-3xl text-softCream mb-4 font-light">
                  Festive Commissions
                </h3>
                <p className="text-xs text-softCream/50 leading-relaxed font-light mb-8">
                  High-profile documentations for luxury design houses, classical music/dance festivals, and private heritage celebrations.
                </p>
                <ul className="space-y-3 text-xs text-softCream/70 font-light border-t border-white/[0.04] pt-6 mb-12">
                  <li className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-warmGold/60" /> Bespoke Event Scheduling
                  </li>
                  <li className="flex items-center gap-2">
                    <ImageIcon className="w-3.5 h-3.5 text-warmGold/60" /> High-Speed Private Server Vault
                  </li>
                  <li className="flex items-center gap-2">
                    <Compass className="w-3.5 h-3.5 text-warmGold/60" /> Express Editorial Delivery
                  </li>
                </ul>
              </div>
              <div>
                <div className="text-xs uppercase tracking-widest text-softCream/40 mb-1">
                  Starting From
                </div>
                <div className="font-serif text-3xl text-warmGold italic">₹1,20,000</div>
              </div>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* SECTION E: BOOK A SESSION */}
      <section id="book" className="py-24 md:py-36 bg-[#080808] border-t border-white/[0.02] relative overflow-hidden">
        <div className="absolute -left-20 bottom-0 w-80 h-80 rounded-full bg-warmGold/5 blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
            {/* Form Details (Left) */}
            <div className="lg:col-span-5 flex flex-col justify-center">
              <RevealSection yOffset={35}>
                <span className="text-xs tracking-[0.3em] uppercase text-warmGold mb-3 block font-medium">
                  Secure Your Frame
                </span>
                <h2 className="font-serif italic text-4xl md:text-5xl text-softCream font-light mb-8 leading-tight">
                  Let us preserve your legacy.
                </h2>
              </RevealSection>

              <RevealSection delay={0.2} yOffset={30}>
                <p className="text-sm text-softCream/60 leading-relaxed font-light mb-12 max-w-md">
                  Inquiries are vetted individually to guarantee absolute aesthetic dedication and scheduling luxury. Complete the reservation log and we will outline your session coordinates.
                </p>
              </RevealSection>

              {/* Office Details */}
              <RevealSection delay={0.3} yOffset={25} className="space-y-6">
                <div className="flex items-start gap-4">
                  <MapPin className="w-4 h-4 text-warmGold mt-1" />
                  <div>
                    <h4 className="text-xs uppercase tracking-widest text-softCream font-semibold">
                      Studio Coordinates
                    </h4>
                    <p className="text-xs text-softCream/50 mt-1 font-light">
                      Heritage Block, Colaba Causeway, Mumbai, MH
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Mail className="w-4 h-4 text-warmGold mt-1" />
                  <div>
                    <h4 className="text-xs uppercase tracking-widest text-softCream font-semibold">
                      Electronic Mail
                    </h4>
                    <p className="text-xs text-softCream/50 mt-1 font-light">
                      inquire@kavyasen.com
                    </p>
                  </div>
                </div>
              </RevealSection>
            </div>

            {/* Booking Form (Right) */}
            <div className="lg:col-span-7">
              <RevealSection delay={0.2} yOffset={45}>
                <BookSessionForm />
              </RevealSection>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 bg-studioBlack border-t border-white/[0.01]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <span className="font-serif italic text-lg tracking-widest text-warmGold font-medium">
              KAVYA
            </span>
            <span className="text-[10px] tracking-widest text-softCream/30 uppercase">
              / © {new Date().getFullYear()}
            </span>
          </div>

          <div className="text-[10px] tracking-[0.2em] uppercase text-softCream/40 font-light">
            Crafted for Cinematic Artistry & Spatial Presence
          </div>

          <div className="flex gap-6">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="text-xs uppercase tracking-widest text-softCream/50 hover:text-warmGold transition-colors duration-300"
            >
              Instagram
            </a>
            <a
              href="https://vsco.co"
              target="_blank"
              rel="noreferrer"
              className="text-xs uppercase tracking-widest text-softCream/50 hover:text-warmGold transition-colors duration-300"
            >
              VSCO
            </a>
            <a
              href="https://pinterest.com"
              target="_blank"
              rel="noreferrer"
              className="text-xs uppercase tracking-widest text-softCream/50 hover:text-warmGold transition-colors duration-300"
            >
              Pinterest
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
