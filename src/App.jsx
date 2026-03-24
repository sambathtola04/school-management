import { useState } from 'react';
import styles from './styles';
import Icon from './components/Icon';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Students from './components/Students';
import Teachers from './components/Teachers';
import Courses from './components/Courses';
import Grades from './components/Grades';
import Events from './components/Events';
import {
  INITIAL_STUDENTS,
  INITIAL_TEACHERS,
  INITIAL_COURSES,
  INITIAL_EVENTS,
} from './data/mockData';

const PAGES = [
  { key: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
  { key: 'students',  label: 'Students',  icon: 'students'  },
  { key: 'teachers',  label: 'Teachers',  icon: 'teachers'  },
  { key: 'courses',   label: 'Courses',   icon: 'courses'   },
  { key: 'grades',    label: 'Grades',    icon: 'grades'    },
  { key: 'events',    label: 'Events',    icon: 'events'    },
];

const TITLES = {
  dashboard: 'Overview',
  students:  'Students',
  teachers:  'Faculty',
  courses:   'Courses',
  grades:    'Grades',
  events:    'Calendar',
};

export default function App() {
  const [user,      setUser]      = useState(null);
  const [page,      setPage]      = useState('dashboard');
  const [collapsed, setCollapsed] = useState(false);
  const [students,  setStudents]  = useState(INITIAL_STUDENTS);
  const [teachers,  setTeachers]  = useState(INITIAL_TEACHERS);
  const [courses,   setCourses]   = useState(INITIAL_COURSES);
  const [events,    setEvents]    = useState(INITIAL_EVENTS);

  if (!user) return <Login onLogin={u => { setUser(u); setPage('dashboard'); }} />;

  return (
    <>
      <style>{styles}</style>
      <div className="app">
        {/* ── Sidebar ── */}
        <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
          <div className="sidebar-logo">
            <div className="sidebar-logo-icon">A</div>
            {!collapsed && (
              <div>
                <div className="sidebar-logo-text">Academix</div>
                <div className="sidebar-logo-sub">School Management</div>
              </div>
            )}
          </div>

          <nav className="sidebar-nav">
            {PAGES.map(p => (
              <button
                key={p.key}
                className={`nav-item ${page === p.key ? 'active' : ''}`}
                onClick={() => setPage(p.key)}
              >
                <Icon name={p.icon} size={18} />
                {!collapsed && p.label}
              </button>
            ))}
          </nav>

          <div className="sidebar-footer">
            <div className="avatar">{user.avatar}</div>
            {!collapsed && (
              <div className="avatar-info" style={{ flex: 1 }}>
                <div className="avatar-name" style={{ color: 'white' }}>{user.name}</div>
                <div className="avatar-role">{user.role}</div>
              </div>
            )}
            {!collapsed && (
              <button onClick={() => setUser(null)} title="Logout" style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.4)', padding: 4, borderRadius: 6, display: 'flex', alignItems: 'center' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
              </button>
            )}
          </div>
        </aside>

        {/* ── Main ── */}
        <main className="main">
          <header className="topbar">
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <button className="icon-btn" onClick={() => setCollapsed(c => !c)}>
                <Icon name="menu" size={16} />
              </button>
              <div className="topbar-title">{TITLES[page]}</div>
            </div>
            <div className="topbar-right">
              <div className="search-box">
                <Icon name="search" size={14} />
                <input placeholder="Quick search…" />
              </div>
              <button className="icon-btn"><Icon name="bell" size={16} /></button>
              <div className="avatar" style={{ background: 'var(--ink)', color: 'var(--gold)', cursor: 'default' }}>{user.avatar}</div>
            </div>
          </header>

          <div className="content">
            {page === 'dashboard' && <Dashboard students={students} teachers={teachers} courses={courses} events={events} />}
            {page === 'students'  && <Students  students={students}  setStudents={setStudents} />}
            {page === 'teachers'  && <Teachers  teachers={teachers}  setTeachers={setTeachers} />}
            {page === 'courses'   && <Courses   courses={courses}    setCourses={setCourses} teachers={teachers} />}
            {page === 'grades'    && <Grades />}
            {page === 'events'    && <Events    events={events}      setEvents={setEvents} />}
          </div>
        </main>
      </div>
    </>
  );
}
