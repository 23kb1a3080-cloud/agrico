// AgriConnect Pure React JavaScript Style Engine
// Dynamically creates and injects complete stylesheet at runtime via JavaScript

export const injectAppStyles = () => {
  if (typeof document === 'undefined') return;
  if (document.getElementById('agriconnect-core-styles')) return;

  const styleEl = document.createElement('style');
  styleEl.id = 'agriconnect-core-styles';
  styleEl.textContent = `
    /* --- GLOBAL TOKENS & RESET --- */
    :root {
      --primary-green: #2e7d32;
      --dark-green: #1b5e20;
      --light-green: #4caf50;
      --leaf-green: #66bb6a;
      --sprout-green: #81c784;
      --pale-green: #e8f5e9;
      --accent-green: #a5d6a7;
      
      --bg-cream: #fbfaf5;
      --surface-cream: #f5f2e8;
      --card-cream: #ffffff;
      --border-cream: #e5dec9;
      --border-light: #ece7db;
      --warm-earth: #8d6e63;
      --gold-accent: #e6a100;

      --text-primary: #1e293b;
      --text-secondary: #475569;
      --text-muted: #64748b;
      --text-light: #94a3b8;
      --bg-white: #ffffff;
      --shadow-sm: 0 1px 3px rgba(46, 125, 50, 0.08), 0 1px 2px rgba(0, 0, 0, 0.04);
      --shadow-md: 0 4px 6px -1px rgba(46, 125, 50, 0.08), 0 2px 4px -1px rgba(0, 0, 0, 0.04);
      --shadow-lg: 0 10px 15px -3px rgba(46, 125, 50, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
      --shadow-xl: 0 20px 25px -5px rgba(27, 94, 32, 0.15), 0 10px 10px -5px rgba(0, 0, 0, 0.04);

      --status-pending: #f59e0b;
      --status-pending-bg: #fef3c7;
      --status-approved: #16a34a;
      --status-approved-bg: #dcfce7;
      --status-rejected: #dc2626;
      --status-rejected-bg: #fee2e2;
      --status-info: #0284c7;
      --status-info-bg: #e0f2fe;

      --font-main: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      --font-serif: 'Playfair Display', Georgia, serif;
      
      --radius-sm: 6px;
      --radius-md: 10px;
      --radius-lg: 16px;
      --radius-full: 9999px;
      --transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
      --max-width: 1280px;
    }

    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: var(--font-main);
      background-color: var(--bg-cream);
      color: var(--text-primary);
      line-height: 1.6;
      -webkit-font-smoothing: antialiased;
      min-height: 100vh;
    }
    a { color: inherit; text-decoration: none; }
    button, input, select, textarea { font-family: inherit; }

    .container {
      width: 100%;
      max-width: var(--max-width);
      margin: 0 auto;
      padding: 0 1.5rem;
    }
    .page-wrapper {
      min-height: calc(100vh - 72px - 280px);
      padding: 2rem 0;
    }
    h1, h2, h3, h4, h5, h6 {
      color: var(--dark-green);
      font-weight: 700;
      line-height: 1.3;
    }
    .heading-serif { font-family: var(--font-serif); }

    /* Buttons */
    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      padding: 0.65rem 1.25rem;
      font-size: 0.95rem;
      font-weight: 600;
      border-radius: var(--radius-md);
      cursor: pointer;
      border: 1px solid transparent;
      transition: var(--transition);
      white-space: nowrap;
    }
    .btn-primary {
      background-color: var(--primary-green);
      color: var(--bg-white);
      border-color: var(--primary-green);
    }
    .btn-primary:hover {
      background-color: var(--dark-green);
      border-color: var(--dark-green);
      transform: translateY(-1px);
      box-shadow: var(--shadow-md);
    }
    .btn-secondary {
      background-color: var(--surface-cream);
      color: var(--dark-green);
      border-color: var(--border-cream);
    }
    .btn-secondary:hover {
      background-color: #ede7d6;
      border-color: #d8cfb7;
    }
    .btn-outline {
      background-color: transparent;
      color: var(--primary-green);
      border-color: var(--primary-green);
    }
    .btn-outline:hover { background-color: var(--pale-green); }
    .btn-accent { background-color: #f59e0b; color: #ffffff; }
    .btn-accent:hover { background-color: #d97706; }
    .btn-danger { background-color: #dc2626; color: #ffffff; }
    .btn-danger:hover { background-color: #b91c1c; }
    .btn-sm { padding: 0.4rem 0.8rem; font-size: 0.85rem; }
    .btn-lg { padding: 0.85rem 1.75rem; font-size: 1.05rem; }
    .btn:disabled { opacity: 0.6; cursor: not-allowed; transform: none !important; }

    /* Badges */
    .badge {
      display: inline-flex;
      align-items: center;
      gap: 0.35rem;
      padding: 0.25rem 0.65rem;
      font-size: 0.75rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      border-radius: var(--radius-full);
    }
    .badge-organic {
      background-color: #dcfce7;
      color: #15803d;
      border: 1px solid #bbf7d0;
    }
    .badge-conventional {
      background-color: #e2e8f0;
      color: #475569;
      border: 1px solid #cbd5e1;
    }
    .badge-pending {
      background-color: var(--status-pending-bg);
      color: var(--status-pending);
    }
    .badge-approved {
      background-color: var(--status-approved-bg);
      color: var(--status-approved);
    }
    .badge-rejected {
      background-color: var(--status-rejected-bg);
      color: var(--status-rejected);
    }

    /* Cards */
    .card {
      background-color: var(--card-cream);
      border: 1px solid var(--border-cream);
      border-radius: var(--radius-lg);
      padding: 1.5rem;
      box-shadow: var(--shadow-sm);
      transition: var(--transition);
    }
    .card:hover { box-shadow: var(--shadow-md); }

    /* Forms */
    .form-group { margin-bottom: 1.25rem; }
    .form-label {
      display: block;
      font-size: 0.875rem;
      font-weight: 600;
      color: var(--text-primary);
      margin-bottom: 0.4rem;
    }
    .form-control {
      width: 100%;
      padding: 0.65rem 0.9rem;
      font-size: 0.95rem;
      border: 1px solid var(--border-cream);
      border-radius: var(--radius-md);
      background-color: var(--bg-white);
      color: var(--text-primary);
      transition: var(--transition);
    }
    .form-control:focus {
      outline: none;
      border-color: var(--primary-green);
      box-shadow: 0 0 0 3px rgba(46, 125, 50, 0.15);
    }
    .form-control::placeholder { color: var(--text-light); }

    /* Grid */
    .grid { display: grid; gap: 1.5rem; }
    .grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    .grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
    .grid-cols-4 { grid-template-columns: repeat(4, minmax(0, 1fr)); }

    @media (max-width: 1024px) {
      .grid-cols-4 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
      .grid-cols-3 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    }
    @media (max-width: 640px) {
      .grid-cols-4, .grid-cols-3, .grid-cols-2 { grid-template-columns: 1fr; }
      .page-wrapper { padding: 1.25rem 0; }
      .container { padding: 0 1rem; }
    }

    /* Tables */
    .table-container {
      width: 100%;
      overflow-x: auto;
      border: 1px solid var(--border-cream);
      border-radius: var(--radius-md);
      background: var(--bg-white);
    }
    .agri-table {
      width: 100%;
      border-collapse: collapse;
      text-align: left;
    }
    .agri-table th {
      background-color: var(--surface-cream);
      color: var(--dark-green);
      font-weight: 700;
      font-size: 0.85rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      padding: 0.85rem 1rem;
      border-bottom: 1px solid var(--border-cream);
    }
    .agri-table td {
      padding: 0.85rem 1rem;
      font-size: 0.9rem;
      border-bottom: 1px solid var(--border-light);
      color: var(--text-secondary);
    }
    .agri-table tr:last-child td { border-bottom: none; }
    .agri-table tr:hover td { background-color: #faf8f2; }

    /* --- NAVBAR --- */
    .navbar-header {
      position: sticky;
      top: 0;
      z-index: 100;
      background-color: var(--bg-white);
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
    }
    .navbar-topbar {
      background-color: var(--dark-green);
      color: #d1fae5;
      font-size: 0.8rem;
      padding: 0.4rem 0;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }
    .topbar-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 0.5rem;
    }
    .topbar-left {
      display: flex;
      align-items: center;
      gap: 1.25rem;
    }
    .topbar-badge {
      display: inline-flex;
      align-items: center;
      gap: 0.35rem;
      background: rgba(255, 255, 255, 0.15);
      padding: 0.15rem 0.5rem;
      border-radius: var(--radius-sm);
      font-weight: 600;
    }
    .role-switch-label {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-weight: 500;
      color: #ffffff;
    }
    .role-switch-select {
      background: #ffffff;
      color: var(--dark-green);
      border: 1px solid #a7f3d0;
      border-radius: var(--radius-sm);
      padding: 0.15rem 0.5rem;
      font-size: 0.8rem;
      font-weight: 700;
      cursor: pointer;
    }
    .navbar-main { padding: 0.75rem 0; }
    .navbar-container {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1.5rem;
    }
    .navbar-brand {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }
    .brand-logo-icon {
      width: 42px;
      height: 42px;
      background: linear-gradient(135deg, var(--primary-green), var(--dark-green));
      border-radius: var(--radius-md);
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 6px rgba(46, 125, 50, 0.2);
    }
    .brand-text { display: flex; flex-direction: column; }
    .brand-title {
      font-family: var(--font-serif);
      font-size: 1.4rem;
      font-weight: 700;
      color: var(--dark-green);
      line-height: 1.1;
    }
    .brand-title-accent { color: var(--light-green); }
    .brand-subtitle {
      font-size: 0.72rem;
      font-weight: 600;
      color: var(--text-muted);
      letter-spacing: 0.05em;
      text-transform: uppercase;
    }
    .navbar-links {
      display: flex;
      align-items: center;
      gap: 1.75rem;
    }
    .nav-link {
      font-size: 0.95rem;
      font-weight: 600;
      color: var(--text-secondary);
      transition: var(--transition);
      position: relative;
      padding: 0.25rem 0;
    }
    .nav-link:hover, .nav-link.active { color: var(--primary-green); }
    .nav-link.active::after {
      content: '';
      position: absolute;
      bottom: -4px;
      left: 0;
      width: 100%;
      height: 2px;
      background-color: var(--primary-green);
      border-radius: 2px;
    }
    .navbar-actions {
      display: flex;
      align-items: center;
      gap: 1rem;
    }
    .cart-btn {
      position: relative;
      background: var(--surface-cream);
      border: 1px solid var(--border-cream);
      padding: 0.55rem;
      border-radius: var(--radius-md);
      color: var(--dark-green);
      display: flex;
      align-items: center;
      justify-content: center;
      transition: var(--transition);
    }
    .cart-btn:hover {
      background: #ede8d8;
      transform: translateY(-1px);
    }
    .cart-badge {
      position: absolute;
      top: -6px;
      right: -6px;
      background-color: var(--primary-green);
      color: #ffffff;
      font-size: 0.7rem;
      font-weight: 700;
      width: 18px;
      height: 18px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .user-profile-menu, .auth-buttons {
      display: flex;
      align-items: center;
      gap: 0.65rem;
    }
    .mobile-toggle-btn {
      display: none;
      background: transparent;
      border: none;
      cursor: pointer;
      color: var(--dark-green);
      padding: 0.25rem;
    }
    .mobile-menu { display: none; }
    @media (max-width: 900px) {
      .navbar-links { display: none; }
      .mobile-toggle-btn { display: block; }
      .topbar-phone { display: none; }
      .mobile-menu {
        display: flex;
        flex-direction: column;
        padding: 1rem 1.5rem 1.5rem;
        background: var(--bg-white);
        border-top: 1px solid var(--border-light);
        gap: 0.75rem;
      }
      .mobile-nav-link {
        font-size: 1rem;
        font-weight: 600;
        color: var(--text-primary);
        padding: 0.5rem 0;
      }
      .mobile-auth-actions {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
      }
      .mobile-menu-divider {
        height: 1px;
        background: var(--border-light);
        margin: 0.5rem 0;
      }
    }

    /* --- FOOTER --- */
    .footer-root {
      background-color: #123016;
      color: #e2e8f0;
      padding: 3.5rem 0 1.5rem;
      margin-top: 4rem;
      border-top: 4px solid var(--primary-green);
    }
    .footer-container {
      display: flex;
      flex-direction: column;
      gap: 2.5rem;
    }
    .footer-grid {
      display: grid;
      grid-template-columns: 1.5fr 1fr 1fr 1.2fr;
      gap: 2.5rem;
    }
    .footer-brand {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      margin-bottom: 1rem;
    }
    .footer-logo {
      width: 36px;
      height: 36px;
      background-color: var(--primary-green);
      border-radius: var(--radius-sm);
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .footer-title {
      font-family: var(--font-serif);
      font-size: 1.35rem;
      font-weight: 700;
      color: #ffffff;
    }
    .footer-desc {
      font-size: 0.88rem;
      line-height: 1.6;
      color: #a7f3d0;
      margin-bottom: 1.25rem;
    }
    .kisan-helpline-card {
      display: flex;
      align-items: center;
      gap: 0.85rem;
      background: rgba(255, 255, 255, 0.08);
      border: 1px solid rgba(255, 255, 255, 0.15);
      border-radius: var(--radius-md);
      padding: 0.75rem 1rem;
    }
    .helpline-title {
      display: block;
      font-size: 0.75rem;
      color: #a7f3d0;
      text-transform: uppercase;
    }
    .helpline-number {
      font-size: 1.05rem;
      color: #ffffff;
      letter-spacing: 0.03em;
    }
    .footer-heading {
      color: #ffffff;
      font-size: 1rem;
      font-weight: 700;
      margin-bottom: 1.2rem;
      position: relative;
      padding-bottom: 0.4rem;
    }
    .footer-heading::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 30px;
      height: 2px;
      background-color: var(--light-green);
    }
    .footer-links {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 0.6rem;
    }
    .footer-links a {
      font-size: 0.88rem;
      color: #cbd5e1;
      transition: var(--transition);
    }
    .footer-links a:hover {
      color: #ffffff;
      padding-left: 4px;
    }
    .footer-compliance-text {
      font-size: 0.85rem;
      line-height: 1.5;
      color: #a7f3d0;
      display: flex;
      align-items: flex-start;
      gap: 0.5rem;
      margin-bottom: 1rem;
    }
    .footer-bottom {
      border-top: 1px solid rgba(255, 255, 255, 0.1);
      padding-top: 1.5rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 1rem;
      font-size: 0.82rem;
      color: #94a3b8;
    }
    @media (max-width: 900px) {
      .footer-grid { grid-template-columns: 1fr 1fr; gap: 2rem; }
    }
    @media (max-width: 600px) {
      .footer-grid { grid-template-columns: 1fr; }
      .footer-bottom { flex-direction: column; text-align: center; }
    }

    /* --- SIDEBAR --- */
    .dashboard-sidebar {
      width: 260px;
      background-color: var(--card-cream);
      border: 1px solid var(--border-cream);
      border-radius: var(--radius-lg);
      padding: 1.5rem 1rem;
      box-shadow: var(--shadow-sm);
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
      height: fit-content;
    }
    .sidebar-user-header {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding-bottom: 1rem;
      border-bottom: 1px solid var(--border-cream);
    }
    .sidebar-avatar {
      font-size: 1.8rem;
      background: var(--surface-cream);
      width: 44px;
      height: 44px;
      border-radius: var(--radius-md);
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .sidebar-user-name {
      font-size: 0.95rem;
      font-weight: 700;
      color: var(--dark-green);
      line-height: 1.2;
    }
    .sidebar-user-role {
      font-size: 0.75rem;
      color: var(--text-muted);
      font-weight: 600;
    }
    .sidebar-section-title {
      font-size: 0.72rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      font-weight: 700;
      color: var(--text-muted);
      margin-bottom: 0.5rem;
      padding-left: 0.5rem;
    }
    .sidebar-nav {
      display: flex;
      flex-direction: column;
      gap: 0.35rem;
    }
    .sidebar-link {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0.65rem 0.85rem;
      border-radius: var(--radius-md);
      font-size: 0.9rem;
      font-weight: 600;
      color: var(--text-secondary);
      transition: var(--transition);
      text-decoration: none;
    }
    .sidebar-link > span:first-of-type {
      display: flex;
      align-items: center;
      gap: 0.65rem;
    }
    .sidebar-link:hover {
      background-color: var(--surface-cream);
      color: var(--dark-green);
    }
    .sidebar-link.active {
      background-color: var(--pale-green);
      color: var(--dark-green);
      font-weight: 700;
    }
    @media (max-width: 850px) {
      .dashboard-sidebar { width: 100%; margin-bottom: 1.5rem; }
    }

    /* --- PRODUCT CARD --- */
    .product-card {
      background-color: var(--card-cream);
      border: 1px solid var(--border-cream);
      border-radius: var(--radius-lg);
      overflow: hidden;
      box-shadow: var(--shadow-sm);
      display: flex;
      flex-direction: column;
      transition: var(--transition);
      cursor: pointer;
    }
    .product-card:hover {
      transform: translateY(-4px);
      box-shadow: var(--shadow-lg);
      border-color: var(--sprout-green);
    }
    .product-image-wrapper {
      position: relative;
      width: 100%;
      height: 190px;
      background-color: var(--surface-cream);
      overflow: hidden;
    }
    .product-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s ease;
    }
    .product-card:hover .product-image { transform: scale(1.05); }
    .product-badge-overlay {
      position: absolute;
      top: 10px;
      left: 10px;
      z-index: 2;
    }
    .product-content {
      padding: 1.15rem;
      display: flex;
      flex-direction: column;
      flex-grow: 1;
    }
    .product-meta {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 0.4rem;
    }
    .product-category {
      font-size: 0.75rem;
      font-weight: 700;
      text-transform: uppercase;
      color: var(--warm-earth);
      letter-spacing: 0.05em;
    }
    .product-rating {
      display: flex;
      align-items: center;
      gap: 0.25rem;
      font-size: 0.82rem;
      font-weight: 700;
      color: var(--text-primary);
    }
    .product-rating small {
      color: var(--text-muted);
      font-weight: 400;
    }
    .product-title {
      font-size: 1rem;
      font-weight: 700;
      color: var(--text-primary);
      margin-bottom: 0.5rem;
      line-height: 1.35;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      min-height: 2.7em;
    }
    .product-farmer-info {
      display: flex;
      flex-direction: column;
      gap: 0.15rem;
      font-size: 0.8rem;
      color: var(--text-secondary);
      margin-bottom: 1rem;
      padding-bottom: 0.75rem;
      border-bottom: 1px dashed var(--border-light);
    }
    .farmer-name { font-weight: 600; color: var(--dark-green); }
    .farmer-loc {
      display: flex;
      align-items: center;
      gap: 0.25rem;
      color: var(--text-muted);
    }
    .product-footer {
      display: flex;
      align-items: baseline;
      justify-content: space-between;
      margin-bottom: 1rem;
      margin-top: auto;
    }
    .product-pricing { display: flex; align-items: baseline; }
    .price-symbol { font-size: 1rem; font-weight: 700; color: var(--dark-green); }
    .price-amount { font-size: 1.45rem; font-weight: 800; color: var(--dark-green); }
    .price-unit { font-size: 0.8rem; font-weight: 600; color: var(--text-muted); margin-left: 2px; }
    .product-stock-tag {
      font-size: 0.75rem;
      font-weight: 600;
      color: #15803d;
      background-color: #f0fdf4;
      padding: 0.2rem 0.5rem;
      border-radius: var(--radius-sm);
    }
    .product-card-actions {
      display: grid;
      grid-template-columns: 1.5fr 1fr;
      gap: 0.5rem;
    }
    .add-cart-btn { width: 100%; }
    .contact-farmer-btn { width: 100%; padding-left: 0.5rem; padding-right: 0.5rem; }

    /* --- MODAL --- */
    .modal-backdrop {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background-color: rgba(18, 48, 22, 0.6);
      backdrop-filter: blur(4px);
      z-index: 1000;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1.5rem;
      animation: fadeIn 0.2s ease-out;
    }
    .modal-container {
      background-color: var(--card-cream);
      border: 1px solid var(--border-cream);
      border-radius: var(--radius-lg);
      width: 100%;
      max-height: 90vh;
      display: flex;
      flex-direction: column;
      box-shadow: var(--shadow-xl);
      animation: slideUp 0.25s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .modal-header {
      padding: 1.25rem 1.5rem;
      border-bottom: 1px solid var(--border-cream);
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .modal-title { font-size: 1.15rem; color: var(--dark-green); font-weight: 700; }
    .modal-close-btn {
      background: transparent;
      border: none;
      cursor: pointer;
      color: var(--text-muted);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0.3rem;
      border-radius: var(--radius-sm);
      transition: var(--transition);
    }
    .modal-close-btn:hover { background-color: var(--surface-cream); color: var(--text-primary); }
    .modal-body { padding: 1.5rem; overflow-y: auto; }
    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
    @keyframes slideUp { from { transform: translateY(15px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }

    /* --- HOME PAGE --- */
    .home-root { display: flex; flex-direction: column; }
    .hero-section {
      background: linear-gradient(180deg, #f0f7ee 0%, var(--bg-cream) 100%);
      padding: 4.5rem 0 3.5rem;
      border-bottom: 1px solid var(--border-cream);
    }
    .hero-container {
      display: grid;
      grid-template-columns: 1.2fr 1fr;
      align-items: center;
      gap: 3.5rem;
    }
    .hero-pill {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      background-color: #dcfce7;
      color: #15803d;
      font-size: 0.82rem;
      font-weight: 700;
      padding: 0.35rem 0.85rem;
      border-radius: var(--radius-full);
      margin-bottom: 1.5rem;
      border: 1px solid #bbf7d0;
    }
    .hero-title {
      font-size: 2.85rem;
      color: var(--dark-green);
      line-height: 1.15;
      margin-bottom: 1.25rem;
      letter-spacing: -0.02em;
    }
    .hero-subtitle {
      font-size: 1.12rem;
      color: var(--text-secondary);
      line-height: 1.6;
      margin-bottom: 2rem;
    }
    .hero-cta-group { display: flex; gap: 1rem; margin-bottom: 2rem; flex-wrap: wrap; }
    .hero-trust-row { display: flex; gap: 1.5rem; flex-wrap: wrap; }
    .trust-item {
      display: flex;
      align-items: center;
      gap: 0.45rem;
      font-size: 0.85rem;
      font-weight: 600;
      color: var(--text-secondary);
    }
    .hero-image-card { position: relative; }
    .hero-main-img {
      width: 100%;
      height: 440px;
      object-fit: cover;
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow-xl);
      border: 4px solid var(--bg-white);
    }
    .hero-floating-card {
      position: absolute;
      bottom: -20px;
      left: -20px;
      background-color: var(--bg-white);
      padding: 1.25rem;
      border-radius: var(--radius-md);
      box-shadow: var(--shadow-lg);
      display: flex;
      align-items: center;
      gap: 1rem;
      max-width: 340px;
      border-left: 4px solid var(--primary-green);
    }
    .floating-icon {
      width: 44px;
      height: 44px;
      border-radius: 50%;
      background-color: var(--pale-green);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
    .hero-floating-card strong { display: block; font-size: 0.95rem; color: var(--dark-green); }
    .hero-floating-card p { font-size: 0.78rem; color: var(--text-muted); line-height: 1.4; margin: 0; }
    .stats-ticker-section { background-color: var(--dark-green); color: #ffffff; padding: 2.25rem 0; }
    .stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 2rem; text-align: center; }
    .stat-num { font-size: 2.25rem; font-weight: 800; color: #a7f3d0; font-family: var(--font-serif); }
    .stat-label { font-size: 0.88rem; font-weight: 600; color: #e2e8f0; text-transform: uppercase; letter-spacing: 0.05em; }
    .section-padding { padding: 4.5rem 0; }
    .section-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      margin-bottom: 2.5rem;
      flex-wrap: wrap;
      gap: 1.5rem;
    }
    .section-subtitle {
      font-size: 0.82rem;
      font-weight: 700;
      color: var(--primary-green);
      text-transform: uppercase;
      letter-spacing: 0.08em;
      display: block;
      margin-bottom: 0.35rem;
    }
    .section-title { font-size: 2.1rem; color: var(--dark-green); }
    .filter-tab-buttons {
      display: flex;
      background-color: var(--surface-cream);
      padding: 0.3rem;
      border-radius: var(--radius-md);
      border: 1px solid var(--border-cream);
      gap: 0.25rem;
    }
    .tab-btn {
      background: transparent;
      border: none;
      padding: 0.5rem 1rem;
      font-size: 0.88rem;
      font-weight: 600;
      color: var(--text-secondary);
      border-radius: var(--radius-sm);
      cursor: pointer;
      transition: var(--transition);
    }
    .tab-btn.active {
      background: var(--bg-white);
      color: var(--dark-green);
      box-shadow: var(--shadow-sm);
    }
    .center-cta-wrap { text-align: center; margin-top: 3rem; }
    .why-agriconnect-section {
      background-color: var(--surface-cream);
      border-top: 1px solid var(--border-cream);
      border-bottom: 1px solid var(--border-cream);
    }
    .text-center-heading { text-align: center; max-width: 650px; margin: 0 auto 3.5rem; }
    .features-grid .feature-card {
      background: var(--bg-white);
      padding: 2.25rem 1.75rem;
      border-radius: var(--radius-lg);
      border: 1px solid var(--border-cream);
      box-shadow: var(--shadow-sm);
      transition: var(--transition);
    }
    .feature-card:hover { transform: translateY(-5px); box-shadow: var(--shadow-md); }
    .feature-icon {
      width: 58px;
      height: 58px;
      border-radius: var(--radius-md);
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 1.5rem;
    }
    .bg-green-light { background-color: #dcfce7; }
    .bg-gold-light { background-color: #fef3c7; }
    .bg-blue-light { background-color: #e0f2fe; }
    .feature-card h3 { font-size: 1.2rem; margin-bottom: 0.75rem; }
    .feature-card p { font-size: 0.92rem; color: var(--text-secondary); line-height: 1.6; }
    .home-post-card { display: flex; flex-direction: column; }
    .home-post-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.75rem;
    }
    .home-post-crop-badge {
      display: inline-flex;
      align-items: center;
      gap: 0.35rem;
      font-size: 0.78rem;
      font-weight: 700;
      color: var(--dark-green);
      background-color: var(--pale-green);
      padding: 0.2rem 0.6rem;
      border-radius: var(--radius-sm);
    }
    .home-post-date { font-size: 0.8rem; color: var(--text-muted); }
    .home-post-title { font-size: 1.15rem; margin-bottom: 0.5rem; }
    .home-post-snippet { font-size: 0.9rem; color: var(--text-secondary); line-height: 1.5; margin-bottom: 1rem; }
    .home-post-img-preview {
      position: relative;
      height: 160px;
      border-radius: var(--radius-md);
      overflow: hidden;
      margin-bottom: 1rem;
    }
    .home-post-img-preview img { width: 100%; height: 100%; object-fit: cover; }
    .home-post-img-label {
      position: absolute;
      bottom: 8px;
      left: 8px;
      background: rgba(0, 0, 0, 0.75);
      color: #ffffff;
      font-size: 0.72rem;
      padding: 0.2rem 0.5rem;
      border-radius: var(--radius-sm);
    }
    .home-post-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 0.85rem;
      border-top: 1px solid var(--border-light);
      padding-top: 0.85rem;
      margin-top: auto;
    }
    .view-replies-link { color: var(--primary-green); font-weight: 700; }
    .bottom-cta-section { padding: 3rem 0; }
    .bottom-cta-card {
      background: linear-gradient(135deg, var(--dark-green) 0%, #2e7d32 100%);
      color: #ffffff;
      padding: 3.5rem;
      border-radius: var(--radius-lg);
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 2rem;
      flex-wrap: wrap;
      box-shadow: var(--shadow-xl);
    }
    .bottom-cta-text h2 { color: #ffffff; font-size: 2rem; margin-bottom: 0.5rem; }
    .bottom-cta-text p { color: #d1fae5; font-size: 1.05rem; }
    .bottom-cta-actions { display: flex; gap: 1rem; }
    @media (max-width: 900px) {
      .hero-container { grid-template-columns: 1fr; text-align: center; }
      .hero-pill, .hero-cta-group, .hero-trust-row { justify-content: center; }
      .hero-title { font-size: 2.2rem; }
      .hero-floating-card { position: static; margin-top: 1rem; max-width: 100%; }
      .stats-grid { grid-template-columns: repeat(2, 1fr); }
    }

    /* --- AUTH --- */
    .auth-page-root {
      min-height: calc(100vh - 120px);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 3rem 1.5rem;
      background: radial-gradient(circle at top right, #e8f5e9 0%, var(--bg-cream) 60%);
    }
    .auth-card {
      width: 100%;
      max-width: 540px;
      background: var(--bg-white);
      border: 1px solid var(--border-cream);
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow-lg);
      padding: 2.5rem;
    }
    .auth-header { text-align: center; margin-bottom: 2rem; }
    .auth-logo-badge {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 52px;
      height: 52px;
      background: var(--pale-green);
      border-radius: var(--radius-md);
      margin-bottom: 1rem;
    }
    .auth-title { font-size: 1.75rem; color: var(--dark-green); margin-bottom: 0.35rem; }
    .auth-subtitle { font-size: 0.9rem; color: var(--text-muted); }
    .auth-role-tabs {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 0.5rem;
      background: var(--surface-cream);
      padding: 0.35rem;
      border-radius: var(--radius-md);
      margin-bottom: 1.75rem;
      border: 1px solid var(--border-cream);
    }
    .role-tab-btn {
      background: transparent;
      border: none;
      padding: 0.65rem 0.5rem;
      font-size: 0.85rem;
      font-weight: 700;
      color: var(--text-secondary);
      border-radius: var(--radius-sm);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.35rem;
      transition: var(--transition);
    }
    .role-tab-btn.active {
      background: var(--bg-white);
      color: var(--dark-green);
      box-shadow: var(--shadow-sm);
    }
    .demo-credentials-pill {
      background: #f0fdf4;
      border: 1px dashed #86efac;
      border-radius: var(--radius-md);
      padding: 0.75rem 1rem;
      margin-bottom: 1.5rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 0.82rem;
    }
    .demo-credentials-text strong { display: block; color: #166534; }
    .demo-credentials-text span { color: #15803d; }
    .upload-dropzone {
      border: 2px dashed var(--border-cream);
      background: var(--surface-cream);
      padding: 1.5rem;
      border-radius: var(--radius-md);
      text-align: center;
      cursor: pointer;
      transition: var(--transition);
    }
    .upload-dropzone:hover {
      border-color: var(--primary-green);
      background: var(--pale-green);
    }
    .upload-file-info {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-top: 0.5rem;
      font-size: 0.85rem;
      color: var(--primary-green);
      font-weight: 600;
    }
    .auth-footer {
      margin-top: 1.75rem;
      text-align: center;
      font-size: 0.88rem;
      color: var(--text-secondary);
      border-top: 1px solid var(--border-light);
      padding-top: 1.25rem;
    }
    .auth-footer a { color: var(--primary-green); font-weight: 700; }

    /* --- FARMER DASHBOARD --- */
    .dashboard-layout { display: flex; gap: 2rem; align-items: flex-start; }
    .dashboard-main { flex-grow: 1; min-width: 0; display: flex; flex-direction: column; gap: 2rem; }
    .verification-status-banner {
      padding: 1.25rem 1.5rem;
      border-radius: var(--radius-lg);
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 1rem;
    }
    .banner-approved { background: #f0fdf4; border: 1px solid #bbf7d0; color: #166534; }
    .banner-pending { background: #fefce8; border: 1px solid #fef08a; color: #854d0e; }
    .banner-content { display: flex; align-items: center; gap: 1rem; }
    .banner-content h4 { color: inherit; font-size: 1.05rem; margin-bottom: 0.15rem; }
    .banner-content p { font-size: 0.85rem; color: inherit; opacity: 0.9; margin: 0; }
    .dashboard-stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.25rem; }
    .kpi-card {
      background: var(--bg-white);
      border: 1px solid var(--border-cream);
      border-radius: var(--radius-lg);
      padding: 1.25rem;
      box-shadow: var(--shadow-sm);
      display: flex;
      align-items: center;
      gap: 1rem;
    }
    .kpi-icon-wrap {
      width: 48px;
      height: 48px;
      border-radius: var(--radius-md);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
    .kpi-val { font-size: 1.5rem; font-weight: 800; color: var(--dark-green); line-height: 1.1; }
    .kpi-title { font-size: 0.78rem; font-weight: 600; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.04em; }
    .dashboard-section-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; }
    .dashboard-section-title { font-size: 1.25rem; color: var(--dark-green); }
    @media (max-width: 1024px) { .dashboard-stats-grid { grid-template-columns: repeat(2, 1fr); } }
    @media (max-width: 850px) {
      .dashboard-layout { flex-direction: column; }
      .dashboard-stats-grid { grid-template-columns: 1fr; }
    }

    /* --- MARKETPLACE --- */
    .marketplace-layout { display: flex; gap: 2rem; align-items: flex-start; }
    .marketplace-filter-sidebar {
      width: 280px;
      background: var(--card-cream);
      border: 1px solid var(--border-cream);
      border-radius: var(--radius-lg);
      padding: 1.5rem;
      box-shadow: var(--shadow-sm);
      display: flex;
      flex-direction: column;
      gap: 1.75rem;
      flex-shrink: 0;
    }
    .filter-title {
      font-size: 1.05rem;
      color: var(--dark-green);
      font-weight: 700;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid var(--border-light);
      padding-bottom: 0.75rem;
    }
    .filter-section-title {
      font-size: 0.82rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      font-weight: 700;
      color: var(--text-muted);
      margin-bottom: 0.75rem;
    }
    .radio-group, .checkbox-group { display: flex; flex-direction: column; gap: 0.5rem; }
    .filter-radio-label, .filter-checkbox-label {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.9rem;
      color: var(--text-secondary);
      cursor: pointer;
    }
    .marketplace-main { flex-grow: 1; min-width: 0; display: flex; flex-direction: column; gap: 1.5rem; }
    .marketplace-search-bar {
      display: flex;
      gap: 1rem;
      background: var(--bg-white);
      padding: 0.75rem 1rem;
      border: 1px solid var(--border-cream);
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow-sm);
      align-items: center;
    }
    .search-input-wrap { display: flex; align-items: center; gap: 0.5rem; flex-grow: 1; }
    .search-input-wrap input { border: none; outline: none; width: 100%; font-size: 0.95rem; }
    .search-sort-select {
      border: 1px solid var(--border-cream);
      border-radius: var(--radius-sm);
      padding: 0.4rem 0.6rem;
      font-size: 0.85rem;
      color: var(--text-secondary);
      background: var(--surface-cream);
    }
    .marketplace-results-info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 0.88rem;
      color: var(--text-muted);
    }
    @media (max-width: 850px) {
      .marketplace-layout { flex-direction: column; }
      .marketplace-filter-sidebar { width: 100%; }
    }

    /* --- PRODUCT DETAIL --- */
    .product-detail-layout {
      display: grid;
      grid-template-columns: 1fr 1.2fr;
      gap: 3rem;
      background: var(--bg-white);
      padding: 2.5rem;
      border-radius: var(--radius-lg);
      border: 1px solid var(--border-cream);
      box-shadow: var(--shadow-sm);
      margin-bottom: 2.5rem;
    }
    .detail-gallery { position: relative; }
    .detail-main-img {
      width: 100%;
      height: 420px;
      object-fit: cover;
      border-radius: var(--radius-md);
      border: 1px solid var(--border-light);
    }
    .detail-info { display: flex; flex-direction: column; }
    .detail-header { margin-bottom: 1.5rem; border-bottom: 1px solid var(--border-light); padding-bottom: 1rem; }
    .detail-category-row { display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.5rem; }
    .detail-title { font-size: 1.85rem; color: var(--dark-green); line-height: 1.25; margin-bottom: 0.75rem; }
    .detail-price-box {
      background: var(--surface-cream);
      padding: 1.25rem;
      border-radius: var(--radius-md);
      border: 1px solid var(--border-cream);
      margin-bottom: 1.5rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .detail-farmer-card {
      border: 1px solid var(--border-cream);
      border-radius: var(--radius-md);
      padding: 1.25rem;
      margin-bottom: 1.75rem;
      background: #fbfaf6;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .detail-purchase-row { display: flex; align-items: center; gap: 1rem; margin-top: auto; }
    .quantity-control {
      display: flex;
      align-items: center;
      border: 1px solid var(--border-cream);
      border-radius: var(--radius-md);
      background: var(--bg-white);
    }
    .qty-btn {
      background: transparent;
      border: none;
      width: 38px;
      height: 38px;
      font-size: 1.2rem;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .qty-val { width: 45px; text-align: center; font-weight: 700; }
    @media (max-width: 850px) {
      .product-detail-layout { grid-template-columns: 1fr; gap: 1.5rem; padding: 1.5rem; }
      .detail-main-img { height: 300px; }
    }

    /* --- COMMUNITY --- */
    .community-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
      flex-wrap: wrap;
      gap: 1rem;
    }
    .community-filters {
      display: flex;
      background: var(--surface-cream);
      padding: 0.35rem;
      border-radius: var(--radius-md);
      border: 1px solid var(--border-cream);
      gap: 0.25rem;
      flex-wrap: wrap;
    }
    .post-card {
      background: var(--bg-white);
      border: 1px solid var(--border-cream);
      border-radius: var(--radius-lg);
      padding: 1.75rem;
      box-shadow: var(--shadow-sm);
      display: flex;
      flex-direction: column;
      transition: var(--transition);
    }
    .post-card:hover { box-shadow: var(--shadow-md); border-color: var(--sprout-green); }
    .post-meta-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem; }
    .post-author-chip { display: flex; align-items: center; gap: 0.5rem; font-size: 0.85rem; color: var(--text-secondary); }
    .post-author-avatar {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: var(--pale-green);
      color: var(--dark-green);
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      font-size: 0.85rem;
    }
    .post-title { font-size: 1.25rem; color: var(--dark-green); margin-bottom: 0.5rem; line-height: 1.35; }
    .post-content { font-size: 0.95rem; color: var(--text-secondary); line-height: 1.6; margin-bottom: 1.25rem; }
    .post-disease-image-wrap {
      position: relative;
      border-radius: var(--radius-md);
      overflow: hidden;
      max-height: 280px;
      margin-bottom: 1.25rem;
      border: 1px solid var(--border-light);
    }
    .post-disease-image-wrap img { width: 100%; height: 100%; object-fit: cover; }
    .disease-tag-pill {
      position: absolute;
      top: 10px;
      left: 10px;
      background: rgba(220, 38, 38, 0.85);
      color: #ffffff;
      font-size: 0.75rem;
      font-weight: 700;
      padding: 0.2rem 0.6rem;
      border-radius: var(--radius-sm);
    }
    .post-footer-actions {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-top: 1px solid var(--border-light);
      padding-top: 1rem;
      font-size: 0.88rem;
      color: var(--text-muted);
    }

    /* --- CROP GUIDANCE --- */
    .advisory-card {
      background: var(--bg-white);
      border: 1px solid var(--border-cream);
      border-radius: var(--radius-lg);
      padding: 1.75rem;
      box-shadow: var(--shadow-sm);
      display: flex;
      flex-direction: column;
      gap: 1.25rem;
    }
    .advisory-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      border-bottom: 1px solid var(--border-light);
      padding-bottom: 1rem;
    }
    .advisory-crop-tag {
      font-size: 0.8rem;
      font-weight: 700;
      text-transform: uppercase;
      color: var(--primary-green);
      letter-spacing: 0.05em;
    }
    .advisory-title { font-size: 1.35rem; color: var(--dark-green); margin-top: 0.2rem; }
    .remedy-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem; }
    .remedy-box { padding: 1.15rem; border-radius: var(--radius-md); font-size: 0.9rem; line-height: 1.5; }
    .remedy-organic { background: #f0fdf4; border: 1px solid #bbf7d0; color: #166534; }
    .remedy-chemical { background: #fefce8; border: 1px solid #fef08a; color: #854d0e; }
    .remedy-title {
      font-size: 0.85rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      margin-bottom: 0.4rem;
      display: flex;
      align-items: center;
      gap: 0.4rem;
    }
    @media (max-width: 800px) { .remedy-grid { grid-template-columns: 1fr; } }

    /* --- MESSAGES --- */
    .messages-container {
      display: grid;
      grid-template-columns: 320px 1fr;
      height: 640px;
      background: var(--bg-white);
      border: 1px solid var(--border-cream);
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow-sm);
      overflow: hidden;
    }
    .conversations-sidebar {
      border-right: 1px solid var(--border-light);
      display: flex;
      flex-direction: column;
      background: var(--surface-cream);
    }
    .conversations-header { padding: 1.25rem; border-bottom: 1px solid var(--border-light); }
    .conversations-list { flex-grow: 1; overflow-y: auto; display: flex; flex-direction: column; }
    .conversation-item {
      padding: 1rem 1.25rem;
      display: flex;
      align-items: center;
      gap: 0.75rem;
      cursor: pointer;
      border-bottom: 1px solid var(--border-light);
      transition: var(--transition);
    }
    .conversation-item:hover, .conversation-item.active { background: var(--bg-white); }
    .conversation-avatar {
      width: 42px;
      height: 42px;
      border-radius: 50%;
      background: var(--pale-green);
      color: var(--dark-green);
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      flex-shrink: 0;
    }
    .chat-panel { display: flex; flex-direction: column; height: 100%; }
    .chat-header {
      padding: 1rem 1.5rem;
      border-bottom: 1px solid var(--border-light);
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: var(--bg-white);
    }
    .chat-messages-area {
      flex-grow: 1;
      overflow-y: auto;
      padding: 1.5rem;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      background: #fbfaf6;
    }
    .chat-bubble {
      max-width: 70%;
      padding: 0.85rem 1.15rem;
      border-radius: var(--radius-md);
      font-size: 0.92rem;
      line-height: 1.45;
      display: flex;
      flex-direction: column;
    }
    .bubble-me {
      align-self: flex-end;
      background: var(--primary-green);
      color: #ffffff;
      border-bottom-right-radius: 2px;
    }
    .bubble-other {
      align-self: flex-start;
      background: #ffffff;
      color: var(--text-primary);
      border: 1px solid var(--border-cream);
      border-bottom-left-radius: 2px;
    }
    .bubble-time { font-size: 0.7rem; margin-top: 0.35rem; opacity: 0.8; align-self: flex-end; }
    .chat-input-bar {
      padding: 1rem 1.5rem;
      border-top: 1px solid var(--border-light);
      background: var(--bg-white);
      display: flex;
      gap: 0.75rem;
    }
    @media (max-width: 850px) {
      .messages-container { grid-template-columns: 1fr; height: 600px; }
      .conversations-sidebar { display: none; }
    }

    /* --- ADMIN DASHBOARD --- */
    .admin-kpi-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.25rem; }
    @media (max-width: 1024px) { .admin-kpi-grid { grid-template-columns: repeat(2, 1fr); } }
    @media (max-width: 640px) { .admin-kpi-grid { grid-template-columns: 1fr; } }
  `;
  document.head.appendChild(styleEl);
};

