const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,300;0,400;0,600;0,700;1,300&family=DM+Sans:wght@300;400;500;600&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --ink: #0f1117;
    --ink-soft: #374151;
    --ink-muted: #6b7280;
    --cream: #faf8f4;
    --cream-dark: #f3f0ea;
    --gold: #d4a853;
    --gold-light: #f0d99a;
    --emerald: #1a7a5e;
    --emerald-light: #d1fae5;
    --rose: #c94040;
    --rose-light: #fde8e8;
    --azure: #2563a8;
    --azure-light: #dbeafe;
    --violet: #6c3ac9;
    --border: #e5e0d4;
    --shadow: 0 2px 16px rgba(15,17,23,0.08);
    --shadow-lg: 0 8px 40px rgba(15,17,23,0.12);
    --radius: 12px;
    --font-display: 'Fraunces', Georgia, serif;
    --font-body: 'DM Sans', system-ui, sans-serif;
  }

  body { font-family: var(--font-body); background: var(--cream); color: var(--ink); }

  .app { display: flex; height: 100vh; overflow: hidden; }

  /* SIDEBAR */
  .sidebar {
    width: 240px; background: var(--ink); color: white; display: flex;
    flex-direction: column; flex-shrink: 0; position: relative; z-index: 10;
    transition: width 0.3s ease;
  }
  .sidebar.collapsed { width: 68px; }
  .sidebar-logo {
    padding: 24px 20px 20px; border-bottom: 1px solid rgba(255,255,255,0.08);
    display: flex; align-items: center; gap: 12px;
  }
  .sidebar-logo-icon {
    width: 36px; height: 36px; background: var(--gold); border-radius: 8px;
    display: flex; align-items: center; justify-content: center; flex-shrink: 0;
    font-family: var(--font-display); font-size: 18px; color: var(--ink); font-weight: 700;
  }
  .sidebar-logo-text { font-family: var(--font-display); font-size: 16px; font-weight: 600; white-space: nowrap; }
  .sidebar-logo-sub { font-size: 10px; color: rgba(255,255,255,0.4); letter-spacing: 0.1em; text-transform: uppercase; }
  .sidebar-nav { flex: 1; padding: 16px 10px; display: flex; flex-direction: column; gap: 2px; }
  .nav-item {
    display: flex; align-items: center; gap: 12px; padding: 10px 12px; border-radius: 8px;
    cursor: pointer; transition: all 0.15s; color: rgba(255,255,255,0.55); font-size: 14px;
    font-weight: 500; white-space: nowrap; border: none; background: none; width: 100%; text-align: left;
  }
  .nav-item:hover { background: rgba(255,255,255,0.07); color: rgba(255,255,255,0.9); }
  .nav-item.active { background: var(--gold); color: var(--ink); }
  .nav-item.active svg { stroke: var(--ink); }
  .sidebar-footer {
    padding: 16px; border-top: 1px solid rgba(255,255,255,0.08);
    display: flex; align-items: center; gap: 10px;
  }
  .avatar {
    width: 32px; height: 32px; background: var(--gold); border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-size: 12px; font-weight: 700; color: var(--ink); flex-shrink: 0;
  }
  .avatar-info { white-space: nowrap; }
  .avatar-name { font-size: 13px; font-weight: 600; }
  .avatar-role { font-size: 11px; color: rgba(255,255,255,0.4); }

  /* MAIN */
  .main { flex: 1; display: flex; flex-direction: column; overflow: hidden; }
  .topbar {
    background: white; border-bottom: 1px solid var(--border);
    padding: 0 28px; height: 60px; display: flex; align-items: center;
    justify-content: space-between; gap: 16px; flex-shrink: 0;
  }
  .topbar-title { font-family: var(--font-display); font-size: 20px; font-weight: 600; }
  .topbar-right { display: flex; align-items: center; gap: 12px; }
  .search-box {
    display: flex; align-items: center; gap: 8px; background: var(--cream);
    border: 1px solid var(--border); border-radius: 8px; padding: 6px 12px; width: 220px;
  }
  .search-box input {
    border: none; background: none; outline: none; font-family: var(--font-body);
    font-size: 13px; color: var(--ink); width: 100%;
  }
  .search-box input::placeholder { color: var(--ink-muted); }
  .icon-btn {
    width: 36px; height: 36px; border-radius: 8px; border: 1px solid var(--border);
    background: white; display: flex; align-items: center; justify-content: center;
    cursor: pointer; color: var(--ink-soft); transition: all 0.15s;
  }
  .icon-btn:hover { background: var(--cream); }

  .content { flex: 1; overflow-y: auto; padding: 28px; }

  /* STAT CARDS */
  .stat-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 28px; }
  .stat-card {
    background: white; border-radius: var(--radius); padding: 20px 22px;
    border: 1px solid var(--border); position: relative; overflow: hidden;
  }
  .stat-card::after {
    content: ''; position: absolute; top: 0; left: 0; width: 3px; height: 100%;
  }
  .stat-card.gold::after { background: var(--gold); }
  .stat-card.emerald::after { background: var(--emerald); }
  .stat-card.azure::after { background: var(--azure); }
  .stat-card.rose::after { background: var(--rose); }
  .stat-label { font-size: 12px; color: var(--ink-muted); text-transform: uppercase; letter-spacing: 0.06em; font-weight: 600; }
  .stat-value { font-family: var(--font-display); font-size: 32px; font-weight: 700; margin: 4px 0 6px; }
  .stat-delta { font-size: 12px; display: flex; align-items: center; gap: 4px; }
  .stat-delta.up { color: var(--emerald); }
  .stat-delta.down { color: var(--rose); }

  /* CARD */
  .card {
    background: white; border-radius: var(--radius); border: 1px solid var(--border);
    overflow: hidden; margin-bottom: 20px;
  }
  .card-header {
    padding: 18px 22px; border-bottom: 1px solid var(--border);
    display: flex; align-items: center; justify-content: space-between;
  }
  .card-title { font-family: var(--font-display); font-size: 16px; font-weight: 600; }
  .card-subtitle { font-size: 13px; color: var(--ink-muted); margin-top: 2px; }

  /* TABLE */
  table { width: 100%; border-collapse: collapse; }
  th {
    padding: 12px 16px; text-align: left; font-size: 11px; font-weight: 600;
    text-transform: uppercase; letter-spacing: 0.06em; color: var(--ink-muted);
    background: var(--cream); border-bottom: 1px solid var(--border);
  }
  td {
    padding: 13px 16px; font-size: 14px; border-bottom: 1px solid var(--border);
    color: var(--ink-soft);
  }
  tr:last-child td { border-bottom: none; }
  tr:hover td { background: var(--cream); }

  /* BADGES */
  .badge {
    display: inline-flex; align-items: center; padding: 3px 10px; border-radius: 20px;
    font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.04em;
  }
  .badge.active { background: var(--emerald-light); color: var(--emerald); }
  .badge.inactive { background: var(--rose-light); color: var(--rose); }
  .badge.exam { background: var(--rose-light); color: var(--rose); }
  .badge.event { background: var(--azure-light); color: var(--azure); }
  .badge.meeting { background: var(--gold-light); color: #92650a; }
  .badge.holiday { background: var(--emerald-light); color: var(--emerald); }

  /* BUTTONS */
  .btn {
    display: inline-flex; align-items: center; gap: 7px; padding: 8px 16px;
    border-radius: 8px; font-family: var(--font-body); font-size: 13px; font-weight: 600;
    cursor: pointer; transition: all 0.15s; border: none;
  }
  .btn-primary { background: var(--ink); color: white; }
  .btn-primary:hover { background: #2a2f3d; }
  .btn-ghost { background: transparent; color: var(--ink-soft); border: 1px solid var(--border); }
  .btn-ghost:hover { background: var(--cream); }
  .btn-danger { background: var(--rose-light); color: var(--rose); }
  .btn-danger:hover { background: #f5c6c6; }
  .btn-sm { padding: 5px 10px; font-size: 12px; }

  /* MODAL */
  .overlay {
    position: fixed; inset: 0; background: rgba(15,17,23,0.5); z-index: 100;
    display: flex; align-items: center; justify-content: center; padding: 20px;
    animation: fadeIn 0.15s ease;
  }
  .modal {
    background: white; border-radius: 16px; padding: 28px; width: 100%;
    max-width: 480px; box-shadow: var(--shadow-lg); animation: slideUp 0.2s ease;
    max-height: 90vh; overflow-y: auto;
  }
  .modal-title { font-family: var(--font-display); font-size: 20px; font-weight: 700; margin-bottom: 20px; }
  .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
  .form-group { display: flex; flex-direction: column; gap: 6px; }
  .form-group.full { grid-column: 1 / -1; }
  label { font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: var(--ink-muted); }
  input, select {
    padding: 9px 12px; border: 1px solid var(--border); border-radius: 8px;
    font-family: var(--font-body); font-size: 14px; color: var(--ink); outline: none;
    transition: border-color 0.15s; background: white;
  }
  input:focus, select:focus { border-color: var(--gold); }
  .modal-actions { display: flex; gap: 10px; margin-top: 22px; justify-content: flex-end; }

  /* MISC */
  .gpa-bar { background: var(--cream-dark); border-radius: 4px; height: 6px; width: 80px; overflow: hidden; }
  .gpa-fill { height: 100%; border-radius: 4px; background: var(--emerald); }
  .attendance-bar { background: var(--cream-dark); border-radius: 4px; height: 6px; width: 80px; overflow: hidden; }
  .attendance-fill { height: 100%; border-radius: 4px; }
  .grade-cell {
    font-weight: 600; padding: 4px 10px; border-radius: 6px; display: inline-block; font-size: 13px;
  }
  .grade-a { background: var(--emerald-light); color: var(--emerald); }
  .grade-b { background: var(--azure-light); color: var(--azure); }
  .grade-c { background: var(--gold-light); color: #92650a; }
  .grade-d { background: var(--rose-light); color: var(--rose); }

  /* DASHBOARD */
  .chart-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 20px; }
  .bar-chart { display: flex; align-items: flex-end; gap: 10px; height: 120px; padding: 0 4px; }
  .bar-col { display: flex; flex-direction: column; align-items: center; gap: 6px; flex: 1; }
  .bar { width: 100%; border-radius: 6px 6px 0 0; transition: all 0.3s; background: var(--gold); cursor: pointer; }
  .bar:hover { filter: brightness(1.1); }
  .bar-label { font-size: 11px; color: var(--ink-muted); }

  /* EVENTS */
  .events-list { display: flex; flex-direction: column; gap: 12px; }
  .event-item {
    display: flex; align-items: center; gap: 14px; padding: 14px 16px;
    border-radius: 10px; border: 1px solid var(--border); background: white; transition: all 0.15s;
  }
  .event-item:hover { border-color: var(--gold); box-shadow: var(--shadow); }
  .event-date {
    text-align: center; background: var(--cream); border-radius: 8px; padding: 6px 10px; min-width: 48px;
  }
  .event-day { font-family: var(--font-display); font-size: 20px; font-weight: 700; line-height: 1; }
  .event-month { font-size: 10px; color: var(--ink-muted); text-transform: uppercase; letter-spacing: 0.06em; }

  /* ANIMATIONS */
  @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
  @keyframes slideUp { from { opacity: 0; transform: translateY(20px) } to { opacity: 1; transform: translateY(0) } }

  .empty-state { text-align: center; padding: 48px 20px; color: var(--ink-muted); }
  .empty-state p { font-size: 14px; margin-top: 12px; }

  @media (max-width: 1024px) { .stat-grid { grid-template-columns: 1fr 1fr; } .chart-row { grid-template-columns: 1fr; } }
  @media (max-width: 768px) { .sidebar { display: none; } .stat-grid { grid-template-columns: 1fr; } }
`;

export default styles;
