import Icon from './Icon';

const Dashboard = ({ students, teachers, courses, events }) => {
  const avgGpa = (students.reduce((a, b) => a + b.gpa, 0) / students.length).toFixed(2);
  const avgAtt = Math.round(students.reduce((a, b) => a + b.attendance, 0) / students.length);

  const barData = [
    { label: 'Grade 9',  count: students.filter(s => s.grade.startsWith('9')).length  + 6 },
    { label: 'Grade 10', count: students.filter(s => s.grade.startsWith('10')).length + 8 },
    { label: 'Grade 11', count: students.filter(s => s.grade.startsWith('11')).length + 7 },
    { label: 'Grade 12', count: students.filter(s => s.grade.startsWith('12')).length + 5 },
  ];
  const maxCount = Math.max(...barData.map(d => d.count));

  return (
    <>
      <div className="stat-grid">
        <div className="stat-card gold">
          <div className="stat-label">Total Students</div>
          <div className="stat-value">{students.length + 142}</div>
          <div className="stat-delta up"><Icon name="trend" size={12} /> +12 this term</div>
        </div>
        <div className="stat-card emerald">
          <div className="stat-label">Active Faculty</div>
          <div className="stat-value">{teachers.filter(t => t.status === 'active').length + 18}</div>
          <div className="stat-delta up"><Icon name="trend" size={12} /> +2 new hires</div>
        </div>
        <div className="stat-card azure">
          <div className="stat-label">Avg GPA</div>
          <div className="stat-value">{avgGpa}</div>
          <div className="stat-delta up"><Icon name="trend" size={12} /> +0.3 vs last term</div>
        </div>
        <div className="stat-card rose">
          <div className="stat-label">Attendance Rate</div>
          <div className="stat-value">{avgAtt}%</div>
          <div className="stat-delta down"><Icon name="trend" size={12} /> −2% vs target</div>
        </div>
      </div>

      <div className="chart-row">
        <div className="card">
          <div className="card-header">
            <div><div className="card-title">Enrollment by Grade</div><div className="card-subtitle">Current term distribution</div></div>
          </div>
          <div style={{ padding: '20px 24px 16px' }}>
            <div className="bar-chart">
              {barData.map(d => (
                <div key={d.label} className="bar-col">
                  <div style={{ fontSize: 11, color: 'var(--ink-muted)', fontWeight: 600 }}>{d.count}</div>
                  <div className="bar" style={{ height: `${(d.count / maxCount) * 90}px` }} />
                  <div className="bar-label">{d.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <div><div className="card-title">Course Capacity</div><div className="card-subtitle">Enrollment fill rate</div></div>
          </div>
          <div style={{ padding: '20px 24px' }}>
            {courses.map(c => {
              const pct = Math.round((c.students / c.capacity) * 100);
              return (
                <div key={c.id} style={{ marginBottom: 14 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5, fontSize: 13 }}>
                    <span style={{ fontWeight: 500, color: 'var(--ink)' }}>{c.name}</span>
                    <span style={{ color: 'var(--ink-muted)' }}>{c.students}/{c.capacity}</span>
                  </div>
                  <div style={{ background: 'var(--cream-dark)', borderRadius: 4, height: 6, overflow: 'hidden' }}>
                    <div style={{ width: `${pct}%`, height: '100%', borderRadius: 4, background: pct > 90 ? 'var(--rose)' : pct > 70 ? 'var(--gold)' : 'var(--emerald)' }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="chart-row">
        <div className="card">
          <div className="card-header">
            <div><div className="card-title">Recent Students</div><div className="card-subtitle">Latest enrolled</div></div>
          </div>
          <table>
            <thead><tr><th>Name</th><th>Grade</th><th>GPA</th><th>Attendance</th></tr></thead>
            <tbody>
              {students.slice(0, 5).map(s => (
                <tr key={s.id}>
                  <td style={{ fontWeight: 500, color: 'var(--ink)' }}>{s.name}</td>
                  <td><span className="badge active" style={{ fontSize: 10 }}>{s.grade}</span></td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ fontWeight: 600, color: s.gpa >= 3.5 ? 'var(--emerald)' : 'var(--ink)' }}>{s.gpa}</span>
                      <div className="gpa-bar"><div className="gpa-fill" style={{ width: `${(s.gpa / 4) * 100}%` }} /></div>
                    </div>
                  </td>
                  <td>{s.attendance}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="card">
          <div className="card-header">
            <div><div className="card-title">Upcoming Events</div></div>
          </div>
          <div style={{ padding: 16 }}>
            <div className="events-list">
              {events.slice(0, 4).map(ev => {
                const d = new Date(ev.date);
                return (
                  <div key={ev.id} className="event-item">
                    <div className="event-date">
                      <div className="event-day">{d.getDate()}</div>
                      <div className="event-month">{d.toLocaleString('en', { month: 'short' })}</div>
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 600, fontSize: 14, color: 'var(--ink)', marginBottom: 3 }}>{ev.title}</div>
                      <div style={{ fontSize: 12, color: 'var(--ink-muted)' }}>{ev.description}</div>
                    </div>
                    <span className={`badge ${ev.type}`}>{ev.type}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
