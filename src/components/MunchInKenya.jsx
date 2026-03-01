import { useState, useEffect } from "react";

const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Sans:wght@300;400;500;600&family=Bebas+Neue&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --cream: #FDF6EC; --rust: #C84B2F; --amber: #E8952A;
  --charcoal: #1C1C1C; --warm-gray: #6B5E52; --sage: #7A8C6E;
  --light-rust: #F5E8E0;
}

body { font-family: 'DM Sans', sans-serif; background: var(--cream); color: var(--charcoal); overflow-x: hidden; }

.nav {
  position: fixed; top: 0; left: 0; right: 0; z-index: 1000;
  display: flex; align-items: center; justify-content: space-between;
  padding: 0 3rem; height: 75px;
  background: rgba(253,246,236,0.95); backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(200,75,47,0.12); transition: all 0.3s;
}
.nav.scrolled { height: 62px; box-shadow: 0 4px 30px rgba(28,28,28,0.1); }
.logo { display: flex; align-items: center; gap: 10px; text-decoration: none; }
.logo-icon { width: 42px; height: 42px; border-radius: 50%; background: var(--rust); display: flex; align-items: center; justify-content: center; font-size: 20px; box-shadow: 0 3px 12px rgba(200,75,47,0.35); }
.logo-text { font-family: 'Playfair Display', serif; font-size: 1.5rem; }
.logo-text .r { color: var(--rust); } .logo-text .b { color: var(--charcoal); }
.nav-links { display: flex; align-items: center; gap: 2.5rem; }
.nav-link { text-decoration: none; color: var(--warm-gray); font-size: 0.88rem; font-weight: 500; letter-spacing: 0.04em; text-transform: uppercase; position: relative; transition: color 0.2s; }
.nav-link::after { content: ''; position: absolute; bottom: -4px; left: 0; right: 0; height: 2px; background: var(--rust); transform: scaleX(0); transition: transform 0.25s; }
.nav-link:hover { color: var(--rust); } .nav-link:hover::after { transform: scaleX(1); }
.nav-actions { display: flex; align-items: center; gap: 1rem; }
.search-bar { display: flex; align-items: center; gap: 8px; background: white; border: 1.5px solid rgba(200,75,47,0.2); border-radius: 50px; padding: 8px 16px; transition: all 0.2s; }
.search-bar:focus-within { border-color: var(--rust); box-shadow: 0 0 0 3px rgba(200,75,47,0.1); }
.search-bar input { border: none; outline: none; font-family: 'DM Sans', sans-serif; font-size: 0.85rem; width: 160px; background: transparent; }
.btn { cursor: pointer; border: none; font-family: 'DM Sans', sans-serif; font-weight: 600; border-radius: 50px; transition: all 0.2s; }
.btn-primary { background: var(--rust); color: white; padding: 10px 24px; font-size: 0.9rem; }
.btn-primary:hover { background: #a83a20; transform: translateY(-1px); box-shadow: 0 6px 20px rgba(200,75,47,0.4); }
.btn-secondary { background: transparent; color: var(--rust); padding: 9px 22px; font-size: 0.9rem; border: 2px solid var(--rust); }
.btn-secondary:hover { background: var(--rust); color: white; }
.btn-lg { padding: 16px 40px; font-size: 1rem; }
.cart-btn { position: relative; background: var(--amber); color: white; border: none; width: 42px; height: 42px; border-radius: 50%; cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 1.1rem; transition: all 0.2s; box-shadow: 0 3px 12px rgba(232,149,42,0.4); }
.cart-btn:hover { transform: scale(1.08); }
.cart-badge { position: absolute; top: -4px; right: -4px; background: var(--rust); color: white; font-size: 0.65rem; font-weight: 700; width: 18px; height: 18px; border-radius: 50%; display: flex; align-items: center; justify-content: center; }

/* HERO */
.hero { min-height: 100vh; display: grid; grid-template-columns: 1fr 1fr; align-items: center; padding: 75px 3rem 0 4rem; position: relative; overflow: hidden; }
.hero-bg { position: absolute; inset: 0; background: linear-gradient(135deg, var(--cream) 55%, var(--light-rust) 100%); z-index: 0; }
.hero-decor { position: absolute; right: 0; top: 0; bottom: 0; width: 52%; border-radius: 50% 0 0 50%; background: linear-gradient(180deg, #1C1C1C 0%, #2d1a10 100%); z-index: 0; }
.hero-content { position: relative; z-index: 1; padding-right: 3rem; }
.hero-badge { display: inline-flex; align-items: center; gap: 8px; background: rgba(200,75,47,0.12); border: 1px solid rgba(200,75,47,0.25); color: var(--rust); padding: 6px 16px; border-radius: 50px; font-size: 0.78rem; font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase; margin-bottom: 1.5rem; animation: fadeUp 0.6s ease both; }
.hero-title { font-family: 'Playfair Display', serif; font-size: clamp(3rem,5vw,5rem); line-height: 1.05; font-weight: 900; color: var(--charcoal); margin-bottom: 1.2rem; animation: fadeUp 0.7s 0.1s ease both; }
.hero-title .accent { color: var(--rust); font-style: italic; }
.hero-sub { font-size: 1.05rem; color: var(--warm-gray); line-height: 1.7; margin-bottom: 2rem; max-width: 420px; animation: fadeUp 0.7s 0.2s ease both; }
.hero-actions { display: flex; gap: 1rem; margin-bottom: 2.5rem; animation: fadeUp 0.7s 0.3s ease both; }
.hero-stats { display: flex; gap: 2rem; animation: fadeUp 0.7s 0.4s ease both; }
.stat-num { font-family: 'Bebas Neue', sans-serif; font-size: 2.2rem; color: var(--rust); line-height: 1; }
.stat-label { font-size: 0.75rem; color: var(--warm-gray); font-weight: 500; letter-spacing: 0.05em; text-transform: uppercase; }
.hero-img-area { position: relative; z-index: 1; display: flex; align-items: center; justify-content: center; }
.hero-img-wrap { position: relative; width: 100%; max-width: 540px; animation: floatIn 0.9s 0.2s ease both; }
.hero-img-placeholder { width: 100%; height: 520px; border-radius: 24px 24px 80px 24px; background: linear-gradient(135deg, #3d2515 0%, #6b3a20 50%, #c84b2f 100%); display: flex; flex-direction: column; align-items: center; justify-content: center; font-size: 8rem; gap: 1rem; box-shadow: 0 30px 80px rgba(0,0,0,0.4); }
.hero-img-placeholder p { font-family: 'Playfair Display', serif; color: rgba(255,255,255,0.7); font-size: 1.2rem; }
.float-card { position: absolute; background: white; border-radius: 16px; padding: 12px 16px; box-shadow: 0 12px 40px rgba(0,0,0,0.15); display: flex; align-items: center; gap: 10px; }
.float-card.left { left: -60px; top: 30%; animation: float 3s ease-in-out infinite; }
.float-card.br { right: -20px; bottom: 15%; animation: float 3s 1s ease-in-out infinite; }
.fc-icon { font-size: 1.8rem; }
.fc-title { font-size: 0.78rem; font-weight: 600; color: var(--charcoal); }
.fc-sub { font-size: 0.7rem; color: var(--warm-gray); }

/* MARQUEE */
.marquee { background: var(--rust); color: white; padding: 14px 0; overflow: hidden; border-top: 3px solid var(--amber); border-bottom: 3px solid var(--amber); }
.marquee-track { display: flex; white-space: nowrap; animation: marquee 20s linear infinite; }
.marquee-item { display: inline-flex; align-items: center; gap: 12px; font-family: 'Bebas Neue', sans-serif; font-size: 1.1rem; letter-spacing: 0.08em; padding: 0 2rem; }
.marquee-dot { width: 6px; height: 6px; background: var(--amber); border-radius: 50%; flex-shrink: 0; }

/* SECTIONS */
.section { padding: 6rem 4rem; }
.section-header { text-align: center; margin-bottom: 3.5rem; }
.section-header.left { text-align: left; }
.section-tag { display: inline-block; color: var(--rust); font-size: 0.75rem; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; margin-bottom: 0.7rem; }
.section-tag.light { color: var(--amber); }
.section-title { font-family: 'Playfair Display', serif; font-size: clamp(2rem,3.5vw,3rem); color: var(--charcoal); line-height: 1.15; }
.section-title.light { color: white; }
.section-title em { color: var(--rust); font-style: italic; }
.section-title.light em { color: var(--amber); }
.section-sub { color: var(--warm-gray); margin-top: 0.8rem; font-size: 1rem; max-width: 500px; margin-left: auto; margin-right: auto; }

/* CATEGORIES */
.cat-grid { display: grid; grid-template-columns: repeat(6,1fr); gap: 1rem; }
.cat-card { background: white; border-radius: 20px; padding: 1.5rem 1rem; text-align: center; cursor: pointer; border: 2px solid transparent; transition: all 0.25s; box-shadow: 0 2px 12px rgba(0,0,0,0.06); }
.cat-card:hover, .cat-card.active { border-color: var(--rust); transform: translateY(-4px); box-shadow: 0 12px 30px rgba(200,75,47,0.15); }
.cat-card.active { background: var(--light-rust); }
.cat-icon { font-size: 2.2rem; margin-bottom: 0.6rem; display: block; }
.cat-name { font-size: 0.82rem; font-weight: 600; color: var(--charcoal); }
.cat-count { font-size: 0.72rem; color: var(--warm-gray); margin-top: 3px; }

/* RESTAURANTS */
.restaurants { background: white; }
.filters-bar { display: flex; gap: 0.7rem; flex-wrap: wrap; margin-bottom: 2.5rem; align-items: center; }
.filter-label { font-size: 0.82rem; color: var(--warm-gray); font-weight: 600; }
.chip { padding: 8px 18px; border-radius: 50px; border: 1.5px solid rgba(107,94,82,0.25); background: transparent; font-family: 'DM Sans', sans-serif; font-size: 0.82rem; font-weight: 500; cursor: pointer; transition: all 0.2s; color: var(--warm-gray); }
.chip:hover { border-color: var(--rust); color: var(--rust); }
.chip.active { background: var(--rust); color: white; border-color: var(--rust); }
.rest-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 1.8rem; }
.rest-card { border-radius: 20px; overflow: hidden; background: var(--cream); box-shadow: 0 4px 20px rgba(0,0,0,0.07); transition: all 0.3s; cursor: pointer; position: relative; }
.rest-card:hover { transform: translateY(-6px); box-shadow: 0 20px 50px rgba(0,0,0,0.13); }
.rest-img { height: 200px; position: relative; }
.rest-img-bg { height: 100%; display: flex; align-items: center; justify-content: center; font-size: 4rem; }
.rest-badge { position: absolute; top: 12px; left: 12px; background: var(--rust); color: white; font-size: 0.7rem; font-weight: 700; padding: 4px 10px; border-radius: 50px; text-transform: uppercase; }
.rest-fav { position: absolute; top: 12px; right: 12px; width: 32px; height: 32px; background: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.9rem; cursor: pointer; transition: transform 0.2s; border: none; box-shadow: 0 2px 8px rgba(0,0,0,0.12); }
.rest-fav:hover { transform: scale(1.15); }
.rest-body { padding: 1.2rem 1.4rem; }
.rest-name { font-family: 'Playfair Display', serif; font-size: 1.2rem; font-weight: 700; margin-bottom: 0.4rem; }
.rest-meta { display: flex; gap: 1rem; margin-bottom: 0.8rem; }
.rest-meta span { font-size: 0.78rem; color: var(--warm-gray); }
.rest-tags { display: flex; gap: 0.4rem; flex-wrap: wrap; margin-bottom: 0.9rem; }
.rest-tag { background: var(--light-rust); color: var(--rust); border-radius: 50px; padding: 3px 10px; font-size: 0.7rem; font-weight: 600; }
.rest-footer { display: flex; align-items: center; justify-content: space-between; border-top: 1px solid rgba(0,0,0,0.07); padding-top: 0.9rem; }
.rest-fee { font-size: 0.78rem; color: var(--sage); font-weight: 600; }
.rest-btn { background: var(--charcoal); color: white; border: none; border-radius: 50px; padding: 7px 16px; font-family: 'DM Sans', sans-serif; font-size: 0.78rem; font-weight: 600; cursor: pointer; transition: all 0.2s; }
.rest-btn:hover { background: var(--rust); }
.center { text-align: center; margin-top: 2.5rem; }

/* HOW IT WORKS */
.how-section { background: var(--charcoal); }
.how-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 2rem; position: relative; }
.how-grid::before { content: ''; position: absolute; top: 3rem; left: 12.5%; right: 12.5%; height: 2px; background: linear-gradient(90deg, var(--rust), var(--amber)); z-index: 0; }
.how-card { text-align: center; position: relative; z-index: 1; padding: 1rem; }
.how-num { width: 60px; height: 60px; border-radius: 50%; background: var(--rust); display: flex; align-items: center; justify-content: center; font-size: 1.6rem; margin: 0 auto 1.2rem; box-shadow: 0 0 0 6px rgba(200,75,47,0.2); }
.how-title { font-family: 'Playfair Display', serif; font-size: 1.15rem; margin: 0.5rem 0; color: white; }
.how-desc { font-size: 0.85rem; color: rgba(255,255,255,0.55); line-height: 1.6; }

/* PROMO */
.promo-wrap { padding: 4rem; background: white; }
.promo-banner { background: linear-gradient(135deg, var(--rust) 0%, #a83a20 60%, #6b2010 100%); border-radius: 28px; padding: 4rem; position: relative; overflow: hidden; display: grid; grid-template-columns: 1fr auto; align-items: center; gap: 2rem; }
.promo-bg-text { position: absolute; right: -20px; top: 50%; transform: translateY(-50%); font-family: 'Bebas Neue', sans-serif; font-size: 16rem; color: rgba(255,255,255,0.05); line-height: 1; pointer-events: none; white-space: nowrap; }
.promo-content { position: relative; z-index: 1; }
.promo-tag { color: var(--amber); font-size: 0.75rem; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; margin-bottom: 0.8rem; }
.promo-title { font-family: 'Playfair Display', serif; font-size: 2.5rem; color: white; line-height: 1.1; margin-bottom: 1rem; }
.promo-sub { color: rgba(255,255,255,0.75); font-size: 1rem; margin-bottom: 1.8rem; }
.promo-btn { background: white; color: var(--rust); border: none; border-radius: 50px; padding: 14px 32px; font-family: 'DM Sans', sans-serif; font-weight: 700; cursor: pointer; font-size: 0.95rem; transition: all 0.2s; }
.promo-btn:hover { background: var(--amber); color: white; transform: translateY(-2px); }
.promo-code { display: flex; flex-direction: column; align-items: center; background: rgba(255,255,255,0.1); border: 2px dashed rgba(255,255,255,0.3); border-radius: 20px; padding: 2rem 2.5rem; position: relative; z-index: 1; min-width: 220px; }
.promo-code-label { color: rgba(255,255,255,0.6); font-size: 0.75rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 0.5rem; }
.promo-code-val { font-family: 'Bebas Neue', sans-serif; font-size: 3rem; color: white; letter-spacing: 0.05em; }
.promo-code-sub { color: rgba(255,255,255,0.6); font-size: 0.75rem; margin-top: 0.3rem; }

/* TESTIMONIALS */
.testi-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 1.8rem; }
.testi-card { background: white; border-radius: 20px; padding: 2rem; box-shadow: 0 4px 20px rgba(0,0,0,0.06); position: relative; overflow: hidden; }
.testi-card::before { content: '"'; position: absolute; top: -10px; right: 20px; font-family: 'Playfair Display', serif; font-size: 8rem; color: var(--light-rust); line-height: 1; pointer-events: none; }
.testi-stars { color: var(--amber); font-size: 0.9rem; margin-bottom: 1rem; letter-spacing: 2px; }
.testi-text { font-size: 0.92rem; line-height: 1.7; color: var(--warm-gray); margin-bottom: 1.5rem; position: relative; z-index: 1; }
.testi-author { display: flex; align-items: center; gap: 12px; }
.testi-avatar { width: 44px; height: 44px; border-radius: 50%; background: var(--light-rust); display: flex; align-items: center; justify-content: center; font-size: 1.3rem; border: 2px solid var(--rust); flex-shrink: 0; }
.testi-name { font-weight: 600; font-size: 0.9rem; color: var(--charcoal); }
.testi-loc { font-size: 0.75rem; color: var(--warm-gray); }

/* APP */
.app-section { background: white; padding: 4rem; }
.app-inner { background: linear-gradient(135deg, #1C1C1C 0%, #2d1a10 100%); border-radius: 28px; padding: 4rem; display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: center; }
.app-tag { color: var(--amber); font-size: 0.75rem; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; margin-bottom: 1rem; }
.app-title { font-family: 'Playfair Display', serif; font-size: 2.5rem; color: white; line-height: 1.15; margin-bottom: 1.2rem; }
.app-title em { color: var(--amber); font-style: italic; }
.app-sub { color: rgba(255,255,255,0.6); font-size: 1rem; line-height: 1.7; margin-bottom: 2rem; }
.app-badges { display: flex; gap: 1rem; }
.app-badge { background: white; color: var(--charcoal); border-radius: 12px; padding: 10px 20px; display: flex; align-items: center; gap: 10px; cursor: pointer; transition: all 0.2s; border: none; font-family: 'DM Sans', sans-serif; }
.app-badge:hover { background: var(--amber); transform: translateY(-2px); }
.app-badge-icon { font-size: 1.6rem; }
.app-badge-sub { font-size: 0.65rem; color: var(--warm-gray); }
.app-badge-name { font-size: 0.9rem; font-weight: 700; }
.app-phones { display: flex; gap: 1rem; justify-content: center; align-items: flex-end; }
.phone-mock { background: linear-gradient(180deg, #2d1a10 0%, #4a2515 100%); border-radius: 28px; padding: 8px; border: 2px solid rgba(255,255,255,0.1); width: 160px; box-shadow: 0 20px 50px rgba(0,0,0,0.4); }
.phone-screen { background: var(--cream); border-radius: 22px; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 280px; font-size: 3rem; gap: 0.5rem; }
.phone-screen p { font-size: 0.65rem; color: var(--warm-gray); font-weight: 600; text-align: center; padding: 0 0.5rem; }
.phone-tall { height: 320px; }

/* FOOTER */
.footer { background: var(--charcoal); color: white; padding: 5rem 4rem 2rem; }
.footer-grid { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 3rem; margin-bottom: 3rem; }
.footer-logo-text { font-family: 'Playfair Display', serif; font-size: 1.6rem; display: block; margin-bottom: 1rem; }
.footer-desc { color: rgba(255,255,255,0.5); font-size: 0.88rem; line-height: 1.7; margin-bottom: 1.5rem; }
.footer-socials { display: flex; gap: 0.8rem; }
.social-btn { width: 36px; height: 36px; border-radius: 50%; border: 1px solid rgba(255,255,255,0.2); display: flex; align-items: center; justify-content: center; font-size: 0.85rem; cursor: pointer; transition: all 0.2s; background: transparent; color: white; }
.social-btn:hover { background: var(--rust); border-color: var(--rust); transform: translateY(-2px); }
.footer-col-title { font-family: 'Playfair Display', serif; font-size: 1.05rem; margin-bottom: 1.2rem; color: white; }
.footer-link { display: block; color: rgba(255,255,255,0.5); font-size: 0.85rem; text-decoration: none; margin-bottom: 0.6rem; transition: color 0.2s; }
.footer-link:hover { color: var(--amber); }
.footer-bottom { border-top: 1px solid rgba(255,255,255,0.1); padding-top: 1.5rem; display: flex; justify-content: space-between; color: rgba(255,255,255,0.35); font-size: 0.8rem; }

/* ANIMATIONS */
@keyframes fadeUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
@keyframes floatIn { from { opacity:0; transform:translateX(30px); } to { opacity:1; transform:translateX(0); } }
@keyframes float { 0%,100% { transform:translateY(0); } 50% { transform:translateY(-10px); } }
@keyframes marquee { from { transform:translateX(0); } to { transform:translateX(-50%); } }

@media (max-width: 1100px) {
  .cat-grid { grid-template-columns: repeat(3,1fr); }
  .rest-grid { grid-template-columns: repeat(2,1fr); }
  .footer-grid { grid-template-columns: 1fr 1fr; }
}
@media (max-width: 860px) {
  .nav-links { display: none; }
  .hero { grid-template-columns: 1fr; padding-top: 100px; }
  .hero-decor { display: none; }
  .hero-img-area { display: none; }
  .section { padding: 4rem 2rem; }
  .how-grid { grid-template-columns: repeat(2,1fr); }
  .how-grid::before { display: none; }
  .promo-banner { grid-template-columns: 1fr; }
  .testi-grid { grid-template-columns: 1fr; }
  .app-inner { grid-template-columns: 1fr; }
  .app-phones { display: none; }
  .footer-grid { grid-template-columns: 1fr; }
}
@media (max-width: 560px) {
  .cat-grid { grid-template-columns: repeat(2,1fr); }
  .rest-grid { grid-template-columns: 1fr; }
  .search-bar { display: none; }
  .promo-wrap, .app-section { padding: 2rem; }
  .promobanner { padding: 2rem; }
}
`;

const restaurants = [
  { name: "Nyama Choma Palace", tags: ["Kenyan","BBQ","Local"], rating: 4.8, reviews: 312, delivery: 30, fee: "Free Delivery", badge: "Popular", color: "#C84B2F", emoji: "🍖" },
  { name: "Nairobi Spice Garden", tags: ["Indian","Vegetarian","Spicy"], rating: 4.6, reviews: 198, delivery: 25, fee: "KES 99", badge: "New", color: "#7A8C6E", emoji: "🌶️" },
  { name: "Mama's Kitchen", tags: ["Ugali","Traditional","Stews"], rating: 4.9, reviews: 522, delivery: 20, fee: "Free Delivery", badge: "Top Rated", color: "#E8952A", emoji: "🍲" },
  { name: "Coastal Swahili Bites", tags: ["Swahili","Seafood","Pilau"], rating: 4.7, reviews: 285, delivery: 35, fee: "KES 150", badge: null, color: "#1C3A5F", emoji: "🦐" },
  { name: "The Burger Lab", tags: ["Burgers","Fast Food","Shakes"], rating: 4.5, reviews: 415, delivery: 15, fee: "KES 99", badge: "Fast", color: "#C84B2F", emoji: "🍔" },
  { name: "Tusker Rooftop Grill", tags: ["Continental","BBQ","Drinks"], rating: 4.8, reviews: 267, delivery: 40, fee: "Free Delivery", badge: null, color: "#6B5E52", emoji: "🥩" },
];

const categories = [
  { icon: "🍖", name: "BBQ & Nyama", count: "42+" },
  { icon: "🍔", name: "Burgers", count: "38+" },
  { icon: "🌮", name: "Street Food", count: "55+" },
  { icon: "🍛", name: "Rice Dishes", count: "30+" },
  { icon: "🥗", name: "Healthy", count: "24+" },
  { icon: "🍕", name: "Pizza", count: "18+" },
];

const testimonials = [
  { text: "MunchInKenya changed my lunch breaks forever! The variety of restaurants is unmatched and delivery is always on time.", name: "Amina Wanjiku", location: "Westlands, Nairobi", stars: 5, emoji: "👩🏾" },
  { text: "Found my favourite nyama choma spot through this app. The reviews are genuine and the ordering process is smooth.", name: "Brian Otieno", location: "Kilimani, Nairobi", stars: 5, emoji: "👨🏾" },
  { text: "Best food delivery in Nairobi hands down. Love the promo codes and how easy it is to track my order!", name: "Fatuma Hassan", location: "Parklands, Nairobi", stars: 4, emoji: "👩🏾‍🦱" },
];

const howSteps = [
  { icon: "📍", title: "Set Your Location", desc: "Enter your delivery address or allow location access for nearby restaurants" },
  { icon: "🍽️", title: "Browse & Choose", desc: "Explore menus from hundreds of local restaurants and pick your favourites" },
  { icon: "💳", title: "Place & Pay", desc: "Checkout securely via M-Pesa, card, or cash on delivery" },
  { icon: "🚴", title: "Track & Enjoy", desc: "Follow your rider in real-time and enjoy hot food at your door" },
];

const marqueeItems = ["🍖 Nyama Choma","🌮 Street Bites","🍛 Pilau & Rice","🍔 Gourmet Burgers","🥗 Healthy Bowls","🦐 Coastal Seafood","☕ Kenyan Tea","🍕 Wood-fired Pizza"];
const filters = ["All","Top Rated","Free Delivery","Fast Delivery","New"];

export default function MunchInKenya() {
  const [scrolled, setScrolled] = useState(false);
  const [activeCat, setActiveCat] = useState(0);
  const [activeFilter, setActiveFilter] = useState("All");
  const [favorites, setFavorites] = useState([]);
  const [cartCount, setCartCount] = useState(2);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const toggleFav = (i) => setFavorites(p => p.includes(i) ? p.filter(x => x !== i) : [...p, i]);
  const addToCart = () => setCartCount(c => c + 1);

  return (
    <>
      <style>{STYLES}</style>

      {/* NAV */}
      <nav className={`nav ${scrolled ? "scrolled" : ""}`}>
        <a href="#" className="logo">
          <div className="logo-icon">🍽️</div>
          <div className="logo-text"><span className="r">Fork</span><span className="b">And Knife</span></div>
        </a>
        <div className="nav-links">
          {["Home","Restaurants","Cuisines","Deals","Contacts"].map(l => (
            <a key={l} href="#" className="nav-link">{l}</a>
          ))}
        </div>
        <div className="nav-actions">
          <div className="search-bar">
            <span>🔍</span>
            <input type="text" placeholder="Search restaurants..." />
          </div>
          <button className="btn btn-secondary">Login</button>
          <button className="btn btn-primary">Sign Up</button>
          <button className="cart-btn" onClick={addToCart}>
            🛒
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-bg" />
        <div className="hero-decor" />
        <div className="hero-content">
          <div className="hero-badge">🔥 Kenya's #1 Food Delivery Platform</div>
          <h1 className="hero-title">
            Authentic <span className="accent">Kenyan</span><br />
            Flavours at<br />Your Doorstep
          </h1>
          <p className="hero-sub">From smoky nyama choma to fragrant pilau — discover hundreds of local restaurants and get your favourite meals delivered fast.</p>
          <div className="hero-actions">
            <button className="btn btn-primary btn-lg" onClick={addToCart}>Order Now 🚀</button>
            <button className="btn btn-secondary btn-lg">Browse Menus</button>
          </div>
          <div className="hero-stats">
            {[["500+","Restaurants"],["30min","Avg Delivery"],["50K+","Happy Customers"]].map(([n,l]) => (
              <div key={l}><div className="stat-num">{n}</div><div className="stat-label">{l}</div></div>
            ))}
          </div>
        </div>
        <div className="hero-img-area">
          <div className="hero-img-wrap">
            <div className="hero-img-placeholder"><span>🍽️</span><p>Delicious Food Awaits</p></div>
            <div className="float-card left">
              <div className="fc-icon">⚡</div>
              <div><div className="fc-title">Express Delivery</div><div className="fc-sub">As fast as 20 mins</div></div>
            </div>
            <div className="float-card br">
              <div className="fc-icon">⭐</div>
              <div><div className="fc-title">4.9 Rating</div><div className="fc-sub">50,000+ reviews</div></div>
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="marquee">
        <div className="marquee-track">
          {[...marqueeItems,...marqueeItems].map((item,i) => (
            <span key={i} className="marquee-item"><span className="marquee-dot" />{item}</span>
          ))}
        </div>
      </div>

      {/* CATEGORIES */}
      <section className="section">
        <div className="section-header">
          <div className="section-tag">🍴 Browse by Type</div>
          <h2 className="section-title">What Are You <em>Craving Today?</em></h2>
          <p className="section-sub">Explore hundreds of restaurants across all your favourite cuisine types</p>
        </div>
        <div className="cat-grid">
          {categories.map((c,i) => (
            <div key={i} className={`cat-card ${activeCat===i?"active":""}`} onClick={() => setActiveCat(i)}>
              <span className="cat-icon">{c.icon}</span>
              <div className="cat-name">{c.name}</div>
              <div className="cat-count">{c.count} places</div>
            </div>
          ))}
        </div>
      </section>

      {/* RESTAURANTS */}
      <section className="section restaurants">
        <div className="section-header left">
          <div className="section-tag">🏪 Featured Restaurants</div>
          <h2 className="section-title">Top Picks in <em>Nairobi</em></h2>
        </div>
        <div className="filters-bar">
          <span className="filter-label">Filter by:</span>
          {filters.map(f => (
            <button key={f} className={`chip ${activeFilter===f?"active":""}`} onClick={() => setActiveFilter(f)}>{f}</button>
          ))}
        </div>
        <div className="rest-grid">
          {restaurants.map((r,i) => (
            <div key={i} className="rest-card">
              <div className="rest-img">
                <div className="rest-img-bg" style={{background:`linear-gradient(135deg,${r.color}22,${r.color}66)`}}>
                  <span style={{fontSize:"4rem"}}>{r.emoji}</span>
                </div>
                {r.badge && <span className="rest-badge">{r.badge}</span>}
                <button className="rest-fav" onClick={() => toggleFav(i)}>{favorites.includes(i)?"❤️":"🤍"}</button>
              </div>
              <div className="rest-body">
                <div className="rest-name">{r.name}</div>
                <div className="rest-meta">
                  <span>⭐ {r.rating} ({r.reviews})</span>
                  <span>🕐 {r.delivery} min</span>
                </div>
                <div className="rest-tags">{r.tags.map((t,j) => <span key={j} className="rest-tag">{t}</span>)}</div>
                <div className="rest-footer">
                  <span className="rest-fee">{r.fee}</span>
                  <button className="rest-btn" onClick={addToCart}>Order Now</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="center">
          <button className="btn btn-secondary btn-lg">View All Restaurants</button>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="section how-section">
        <div className="section-header">
          <div className="section-tag light">✨ Simple Process</div>
          <h2 className="section-title light">How <em>MunchInKenya</em> Works</h2>
        </div>
        <div className="how-grid">
          {howSteps.map((s,i) => (
            <div key={i} className="how-card">
              <div className="how-num">{s.icon}</div>
              <div className="how-title">{s.title}</div>
              <div className="how-desc">{s.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* PROMO */}
      <div className="promo-wrap">
        <div className="promo-banner">
          <div className="promo-bg-text">MUNCH</div>
          <div className="promo-content">
            <div className="promo-tag">🎉 Limited Time Offer</div>
            <h2 className="promo-title">Get 30% Off Your<br />First Order Today!</h2>
            <p className="promo-sub">New to MunchInKenya? Use the promo code at checkout and enjoy a massive discount on your first meal delivery.</p>
            <button className="promo-btn">Claim Your Discount</button>
          </div>
          <div className="promo-code">
            <div className="promo-code-label">Use Promo Code</div>
            <div className="promo-code-val">MUNCH30</div>
            <div className="promo-code-sub">Valid until end of month</div>
          </div>
        </div>
      </div>

      {/* TESTIMONIALS */}
      <section className="section">
        <div className="section-header">
          <div className="section-tag">💬 Customer Love</div>
          <h2 className="section-title">What Nairobi is <em>Saying About Us</em></h2>
        </div>
        <div className="testi-grid">
          {testimonials.map((t,i) => (
            <div key={i} className="testi-card">
              <div className="testi-stars">{"★".repeat(t.stars)}{"☆".repeat(5-t.stars)}</div>
              <p className="testi-text">{t.text}</p>
              <div className="testi-author">
                <div className="testi-avatar">{t.emoji}</div>
                <div>
                  <div className="testi-name">{t.name}</div>
                  <div className="testi-loc">📍 {t.location}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* APP */}
      <div className="app-section">
        <div className="app-inner">
          <div>
            <div className="app-tag">📱 Mobile App</div>
            <h2 className="app-title">Order Faster With the <em>MunchInKenya App</em></h2>
            <p className="app-sub">Track your orders live, save your favourite restaurants, unlock exclusive app-only deals, and pay instantly with M-Pesa integration.</p>
            <div className="app-badges">
              {[["🍎","Download on the","App Store"],["🤖","Get it on","Google Play"]].map(([icon,sub,name]) => (
                <button key={name} className="app-badge">
                  <span className="app-badge-icon">{icon}</span>
                  <div><div className="app-badge-sub">{sub}</div><div className="app-badge-name">{name}</div></div>
                </button>
              ))}
            </div>
          </div>
          <div className="app-phones">
            <div className="phone-mock"><div className="phone-screen"><span>🍔</span><p>Browse Menus</p></div></div>
            <div className="phone-mock"><div className="phone-screen phone-tall"><span>🚴</span><p>Live Tracking</p></div></div>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-grid">
          <div>
            <span className="footer-logo-text"><span style={{color:"var(--rust)"}}>Munch</span><span>InKenya</span></span>
            <p className="footer-desc">Kenya's leading food delivery platform connecting food lovers with the best local restaurants across Nairobi and beyond.</p>
            <div className="footer-socials">
              {["𝕏","f","in","▶"].map((s,i) => <button key={i} className="social-btn">{s}</button>)}
            </div>
          </div>
          {[
            ["Company", ["About Us","Careers","Press","Blog","Partners"]],
            ["Help", ["FAQ","Track Order","Contact Us","Terms","Privacy Policy"]],
            ["Cities", ["Nairobi","Mombasa","Kisumu","Nakuru","Eldoret"]],
          ].map(([title, links]) => (
            <div key={title}>
              <div className="footer-col-title">{title}</div>
              {links.map(l => <a key={l} href="#" className="footer-link">{l}</a>)}
            </div>
          ))}
        </div>
        <div className="footer-bottom">
          <span>© 2025 MunchInKenya. All rights reserved.</span>
          <span>Made with ❤️ in Nairobi, Kenya 🇰🇪</span>
        </div>
      </footer>
    </>
  );
}