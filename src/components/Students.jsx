import { useState } from 'react';
import Icon from './Icon';
import Modal from './Modal';
import { GRADE_CLASSES } from '../data/mockData';

const EMPTY_FORM = { name: '', grade: '10A', email: '', phone: '', status: 'active', gpa: '', attendance: '' };

const Students = ({ students, setStudents }) => {
  const [search, setSearch] = useState('');
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);

  const filtered = students.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) || s.grade.includes(search.toUpperCase())
  );

  const openAdd  = () => { setForm(EMPTY_FORM); setModal('add'); };
  const openEdit = (s) => { setForm({ ...s, gpa: String(s.gpa), attendance: String(s.attendance) }); setModal({ edit: s }); };
  const set = (key) => (e) => setForm(f => ({ ...f, [key]: e.target.value }));

  const save = () => {
    const entry = { ...form, gpa: parseFloat(form.gpa) || 0, attendance: parseInt(form.attendance) || 0 };
    if (modal === 'add') {
      setStudents(prev => [...prev, { ...entry, id: Date.now(), enrolled: new Date().toISOString().split('T')[0] }]);
    } else {
      setStudents(prev => prev.map(s => s.id === modal.edit.id ? { ...s, ...entry } : s));
    }
    setModal(null);
  };

  const remove = (id) => { if (window.confirm('Delete this student?')) setStudents(prev => prev.filter(s => s.id !== id)); };

  return (
    <>
      <div className="card">
        <div className="card-header">
          <div>
            <div className="card-title">Students</div>
            <div className="card-subtitle">{filtered.length} records</div>
          </div>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <div className="search-box">
              <Icon name="search" size={14} />
              <input placeholder="Search students…" value={search} onChange={e => setSearch(e.target.value)} />
            </div>
            <button className="btn btn-primary" onClick={openAdd}><Icon name="plus" size={14} /> Add Student</button>
          </div>
        </div>
        <table>
          <thead>
            <tr><th>Name</th><th>Grade</th><th>GPA</th><th>Attendance</th><th>Email</th><th>Status</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan={7}><div className="empty-state"><Icon name="students" size={40} /><p>No students found</p></div></td></tr>
            ) : filtered.map(s => (
              <tr key={s.id}>
                <td style={{ fontWeight: 600, color: 'var(--ink)' }}>{s.name}</td>
                <td><span className="badge active" style={{ fontSize: 10 }}>{s.grade}</span></td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontWeight: 600 }}>{s.gpa}</span>
                    <div className="gpa-bar"><div className="gpa-fill" style={{ width: `${(s.gpa / 4) * 100}%` }} /></div>
                  </div>
                </td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span>{s.attendance}%</span>
                    <div className="attendance-bar">
                      <div className="attendance-fill" style={{ width: `${s.attendance}%`, background: s.attendance >= 90 ? 'var(--emerald)' : s.attendance >= 75 ? 'var(--gold)' : 'var(--rose)' }} />
                    </div>
                  </div>
                </td>
                <td style={{ fontSize: 13 }}>{s.email}</td>
                <td><span className={`badge ${s.status}`}>{s.status}</span></td>
                <td>
                  <div style={{ display: 'flex', gap: 6 }}>
                    <button className="btn btn-ghost btn-sm" onClick={() => openEdit(s)}><Icon name="edit" size={13} /></button>
                    <button className="btn btn-danger btn-sm" onClick={() => remove(s.id)}><Icon name="trash" size={13} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modal && (
        <Modal title={modal === 'add' ? 'Add Student' : 'Edit Student'} onClose={() => setModal(null)}>
          <div className="form-grid">
            <div className="form-group full"><label>Full Name</label><input value={form.name} onChange={set('name')} placeholder="Student name" /></div>
            <div className="form-group"><label>Grade</label>
              <select value={form.grade} onChange={set('grade')}>
                {GRADE_CLASSES.map(g => <option key={g}>{g}</option>)}
              </select>
            </div>
            <div className="form-group"><label>Status</label>
              <select value={form.status} onChange={set('status')}>
                <option value="active">Active</option><option value="inactive">Inactive</option>
              </select>
            </div>
            <div className="form-group full"><label>Email</label><input type="email" value={form.email} onChange={set('email')} placeholder="student@school.edu" /></div>
            <div className="form-group"><label>Phone</label><input value={form.phone} onChange={set('phone')} placeholder="555-0000" /></div>
            <div className="form-group"><label>GPA (0–4.0)</label><input type="number" step="0.1" min="0" max="4" value={form.gpa} onChange={set('gpa')} placeholder="3.5" /></div>
            <div className="form-group"><label>Attendance %</label><input type="number" min="0" max="100" value={form.attendance} onChange={set('attendance')} placeholder="90" /></div>
          </div>
          <div className="modal-actions">
            <button className="btn btn-ghost" onClick={() => setModal(null)}>Cancel</button>
            <button className="btn btn-primary" onClick={save}><Icon name="check" size={14} /> {modal === 'add' ? 'Add Student' : 'Save Changes'}</button>
          </div>
        </Modal>
      )}
    </>
  );
};

export default Students;
