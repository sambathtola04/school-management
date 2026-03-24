import { useState } from 'react';
import Icon from './Icon';

const USERS = [
  { email: 'admin@school.edu',   password: 'admin123',   name: 'Admin User',      role: 'Administrator', avatar: 'AD' },
  { email: 'teacher@school.edu', password: 'teacher123', name: 'Dr. Helen Carter', role: 'Teacher',       avatar: 'HC' },
  { email: 'student@school.edu', password: 'student123', name: 'Amara Osei',       role: 'Student',       avatar: 'AO' },
];

const Login = ({ onLogin }) => {
  const [tab,    setTab]    = useState('login');   // 'login' | 'register'
  const [form,   setForm]   = useState({ name: '', email: '', password: '', role: 'Administrator', confirm: '' });
  const [error,  setError]  = useState('');
  const [show,   setShow]   = useState(false);
  const [loading,setLoading]= useState(false);

  const set = (k) => (e) => { setForm(f => ({ ...f, [k]: e.target.value })); setError(''); };

  const handleLogin = () => {
    if (!form.email || !form.password) { setError('Please fill in all fields.'); return; }
    setLoading(true);
    setTimeout(() => {
      const user = USERS.find(u => u.email === form.email && u.password === form.password);
      if (user) { onLogin(user); }
      else { setError('Invalid email or password.'); setLoading(false); }
    }, 800);
  };

  const handleRegister = () => {
    if (!form.name || !form.email || !form.password || !form.confirm) { setError('Please fill in all fields.'); return; }
    if (form.password !== form.confirm) { setError('Passwords do not match.'); return; }
    if (form.password.length < 6) { setError('Password must be at least 6 characters.'); return; }
    setLoading(true);
    setTimeout(() => {
      const initials = form.name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
      onLogin({ email: form.email, name: form.name, role: form.role, avatar: initials });
    }, 800);
  };

  const demoLogin = (user) => {
    setLoading(true);
    setTimeout(() => onLogin(user), 600);
  };

  return (
    <div style={css.page}>
      <style>{loginStyles}</style>

      {/* Left panel */}
      <div style={css.left}>
        <div style={css.leftInner}>
          <div style={css.brand}>
            <div style={css.brandIcon}>A</div>
            <div>
              <div style={css.brandName}>Academix</div>
              <div style={css.brandSub}>School Management System</div>
            </div>
          </div>
          <div style={css.heroText}>
            <div style={css.heroTitle}>Manage your<br /><span style={{ color: '#d4a853' }}>school smarter.</span></div>
            <div style={css.heroDesc}>One platform for students, teachers, courses, grades, and everything in between.</div>
          </div>
          <div style={css.features}>
            {['Student & Teacher Management', 'Course Scheduling', 'Grade Tracking', 'Event Calendar'].map(f => (
              <div key={f} style={css.feature}>
                <div style={css.featureDot} />
                <span>{f}</span>
              </div>
            ))}
          </div>
          <div style={css.demoBox}>
            <div style={css.demoTitle}>Demo Accounts</div>
            {USERS.map(u => (
              <button key={u.email} style={css.demoBtn} className="demo-btn" onClick={() => demoLogin(u)}>
                <div style={{ ...css.demoAvatar, background: u.role === 'Administrator' ? '#d4a853' : u.role === 'Teacher' ? '#2563a8' : '#1a7a5e' }}>{u.avatar}</div>
                <div>
                  <div style={css.demoName}>{u.name}</div>
                  <div style={css.demoRole}>{u.role} · {u.email}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div style={css.right}>
        <div style={css.formCard}>
          {/* Tabs */}
          <div style={css.tabs}>
            <button style={{ ...css.tab, ...(tab === 'login'    ? css.tabActive : {}) }} onClick={() => { setTab('login');    setError(''); }}>Sign In</button>
            <button style={{ ...css.tab, ...(tab === 'register' ? css.tabActive : {}) }} onClick={() => { setTab('register'); setError(''); }}>Register</button>
          </div>

          {tab === 'login' ? (
            <>
              <div style={css.formTitle}>Welcome back</div>
              <div style={css.formSub}>Sign in to your account to continue</div>

              <div style={css.field}>
                <label style={css.label}>Email Address</label>
                <input style={css.input} className="auth-input" type="email" placeholder="you@school.edu" value={form.email} onChange={set('email')}
                  onKeyDown={e => e.key === 'Enter' && handleLogin()} />
              </div>
              <div style={css.field}>
                <label style={css.label}>Password</label>
                <div style={{ position: 'relative' }}>
                  <input style={{ ...css.input, paddingRight: 40 }} className="auth-input" type={show ? 'text' : 'password'} placeholder="••••••••" value={form.password} onChange={set('password')}
                    onKeyDown={e => e.key === 'Enter' && handleLogin()} />
                  <button style={css.eyeBtn} onClick={() => setShow(s => !s)}>
                    {show ? <EyeOff /> : <EyeOn />}
                  </button>
                </div>
              </div>

              {error && <div style={css.error}>{error}</div>}

              <button style={{ ...css.submitBtn, opacity: loading ? 0.7 : 1 }} className="submit-btn" onClick={handleLogin} disabled={loading}>
                {loading ? 'Signing in…' : 'Sign In'}
              </button>
            </>
          ) : (
            <>
              <div style={css.formTitle}>Create account</div>
              <div style={css.formSub}>Join Academix to get started</div>

              <div style={css.field}>
                <label style={css.label}>Full Name</label>
                <input style={css.input} className="auth-input" type="text" placeholder="Your full name" value={form.name} onChange={set('name')} />
              </div>
              <div style={css.field}>
                <label style={css.label}>Email Address</label>
                <input style={css.input} className="auth-input" type="email" placeholder="you@school.edu" value={form.email} onChange={set('email')} />
              </div>
              <div style={css.field}>
                <label style={css.label}>Role</label>
                <select style={css.input} className="auth-input" value={form.role} onChange={set('role')}>
                  <option>Administrator</option>
                  <option>Teacher</option>
                  <option>Student</option>
                </select>
              </div>
              <div style={css.field}>
                <label style={css.label}>Password</label>
                <div style={{ position: 'relative' }}>
                  <input style={{ ...css.input, paddingRight: 40 }} className="auth-input" type={show ? 'text' : 'password'} placeholder="Min. 6 characters" value={form.password} onChange={set('password')} />
                  <button style={css.eyeBtn} onClick={() => setShow(s => !s)}>
                    {show ? <EyeOff /> : <EyeOn />}
                  </button>
                </div>
              </div>
              <div style={css.field}>
                <label style={css.label}>Confirm Password</label>
                <input style={css.input} className="auth-input" type="password" placeholder="Re-enter password" value={form.confirm} onChange={set('confirm')}
                  onKeyDown={e => e.key === 'Enter' && handleRegister()} />
              </div>

              {error && <div style={css.error}>{error}</div>}

              <button style={{ ...css.submitBtn, opacity: loading ? 0.7 : 1 }} className="submit-btn" onClick={handleRegister} disabled={loading}>
                {loading ? 'Creating account…' : 'Create Account'}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const EyeOn  = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>;
const EyeOff = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>;

const css = {
  page:       { display: 'flex', height: '100vh', fontFamily: "'DM Sans', system-ui, sans-serif" },
  left:       { width: '45%', background: '#0f1117', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px' },
  leftInner:  { maxWidth: 420, width: '100%' },
  brand:      { display: 'flex', alignItems: 'center', gap: 14, marginBottom: 52 },
  brandIcon:  { width: 44, height: 44, background: '#d4a853', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Fraunces, Georgia, serif', fontSize: 22, color: '#0f1117', fontWeight: 700, flexShrink: 0 },
  brandName:  { fontFamily: 'Fraunces, Georgia, serif', fontSize: 20, fontWeight: 700 },
  brandSub:   { fontSize: 11, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.08em', textTransform: 'uppercase', marginTop: 2 },
  heroText:   { marginBottom: 36 },
  heroTitle:  { fontFamily: 'Fraunces, Georgia, serif', fontSize: 38, fontWeight: 700, lineHeight: 1.2, marginBottom: 16 },
  heroDesc:   { fontSize: 15, color: 'rgba(255,255,255,0.55)', lineHeight: 1.6 },
  features:   { display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 40 },
  feature:    { display: 'flex', alignItems: 'center', gap: 12, fontSize: 14, color: 'rgba(255,255,255,0.7)' },
  featureDot: { width: 6, height: 6, background: '#d4a853', borderRadius: '50%', flexShrink: 0 },
  demoBox:    { background: 'rgba(255,255,255,0.05)', borderRadius: 12, padding: '18px 20px', border: '1px solid rgba(255,255,255,0.08)' },
  demoTitle:  { fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'rgba(255,255,255,0.35)', marginBottom: 14 },
  demoBtn:    { display: 'flex', alignItems: 'center', gap: 12, width: '100%', background: 'none', border: 'none', cursor: 'pointer', padding: '8px 0', borderRadius: 8, textAlign: 'left' },
  demoAvatar: { width: 34, height: 34, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: 'white', flexShrink: 0 },
  demoName:   { fontSize: 13, fontWeight: 600, color: 'white' },
  demoRole:   { fontSize: 11, color: 'rgba(255,255,255,0.4)', marginTop: 1 },
  right:      { flex: 1, background: '#faf8f4', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 20px' },
  formCard:   { background: 'white', borderRadius: 20, padding: '40px 40px', width: '100%', maxWidth: 420, boxShadow: '0 8px 40px rgba(15,17,23,0.10)', border: '1px solid #e5e0d4' },
  tabs:       { display: 'flex', background: '#f3f0ea', borderRadius: 10, padding: 4, marginBottom: 28, gap: 4 },
  tab:        { flex: 1, padding: '9px', border: 'none', background: 'none', borderRadius: 8, fontFamily: "'DM Sans', system-ui", fontSize: 14, fontWeight: 600, cursor: 'pointer', color: '#6b7280', transition: 'all 0.15s' },
  tabActive:  { background: 'white', color: '#0f1117', boxShadow: '0 1px 6px rgba(15,17,23,0.1)' },
  formTitle:  { fontFamily: 'Fraunces, Georgia, serif', fontSize: 24, fontWeight: 700, color: '#0f1117', marginBottom: 6 },
  formSub:    { fontSize: 14, color: '#6b7280', marginBottom: 24 },
  field:      { marginBottom: 16 },
  label:      { display: 'block', fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#6b7280', marginBottom: 6 },
  input:      { width: '100%', padding: '10px 13px', border: '1px solid #e5e0d4', borderRadius: 9, fontFamily: "'DM Sans', system-ui", fontSize: 14, color: '#0f1117', outline: 'none', background: 'white', boxSizing: 'border-box' },
  eyeBtn:     { position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af', display: 'flex', alignItems: 'center' },
  error:      { background: '#fde8e8', color: '#c94040', fontSize: 13, padding: '10px 14px', borderRadius: 8, marginBottom: 16, fontWeight: 500 },
  submitBtn:  { width: '100%', padding: '12px', background: '#0f1117', color: 'white', border: 'none', borderRadius: 10, fontFamily: "'DM Sans', system-ui", fontSize: 15, fontWeight: 600, cursor: 'pointer', transition: 'all 0.15s', marginTop: 4 },
};

const loginStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Fraunces:wght@700&family=DM+Sans:wght@400;500;600&display=swap');
  .demo-btn:hover { background: rgba(255,255,255,0.06) !important; }
  .auth-input:focus { border-color: #d4a853 !important; box-shadow: 0 0 0 3px rgba(212,168,83,0.12); }
  .submit-btn:hover { background: #2a2f3d !important; }
  @media (max-width: 768px) {
    .login-left { display: none !important; }
  }
`;

export default Login;
