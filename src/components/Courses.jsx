import { useState } from 'react';
import Icon from './Icon';
import Modal from './Modal';
import { GRADE_CLASSES } from '../data/mockData';

const Courses = ({ courses, setCourses, teachers }) => {
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState({ name: '', teacher: '', grade: '10A', schedule: '', students: 0, capacity: 30, credits: 3 });

  const openAdd  = () => { setForm({ name: '', teacher: teachers[0]?.name || '', grade: '10A', schedule: '', students: 0, capacity: 30, credits: 3 }); setModal('add'); };
  const openEdit = (c) => { setForm({ ...c, students: String(c.students), capacity: String(c.capacity), credits: String(c.credits) }); setModal({ edit: c }); };
  const set = (key) => (e) => setForm(f => ({ ...f, [key]: e.target.value }));

  const save = () => {
    const entry = { ...form, students: parseInt(form.students) || 0, capacity: parseInt(form.capacity) || 30, credits: parseInt(form.credits) || 3 };
    if (modal === 'add') setCourses(prev => [...prev, { ...entry, id: Date.now() }]);
    else setCourses(prev => prev.map(c => c.id === modal.edit.id ? { ...c, ...entry } : c));
    setModal(null);
  };

  const remove = (id) => { if (window.confirm('Delete course?')) setCourses(prev => prev.filter(c => c.id !== id)); };

  return (
    <>
      <div className="card">
        <div className="card-header">
          <div><div className="card-title">Courses</div><div className="card-subtitle">{courses.length} active courses</div></div>
          <button className="btn btn-primary" onClick={openAdd}><Icon name="plus" size={14} /> Add Course</button>
        </div>
        <table>
          <thead><tr><th>Course</th><th>Teacher</th><th>Grade</th><th>Schedule</th><th>Enrollment</th><th>Credits</th><th>Actions</th></tr></thead>
          <tbody>
            {courses.map(c => {
              const pct = Math.round((c.students / c.capacity) * 100);
              return (
                <tr key={c.id}>
                  <td style={{ fontWeight: 600, color: 'var(--ink)' }}>{c.name}</td>
                  <td style={{ fontSize: 13 }}>{c.teacher}</td>
                  <td><span className="badge active" style={{ fontSize: 10 }}>{c.grade}</span></td>
                  <td style={{ fontSize: 13, color: 'var(--ink-muted)' }}>{c.schedule}</td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ fontSize: 13 }}>{c.students}/{c.capacity}</span>
                      <div style={{ background: 'var(--cream-dark)', borderRadius: 4, height: 6, width: 60, overflow: 'hidden' }}>
                        <div style={{ width: `${pct}%`, height: '100%', borderRadius: 4, background: pct > 90 ? 'var(--rose)' : 'var(--emerald)' }} />
                      </div>
                    </div>
                  </td>
                  <td><span style={{ fontWeight: 600, color: 'var(--azure)' }}>{c.credits} cr</span></td>
                  <td>
                    <div style={{ display: 'flex', gap: 6 }}>
                      <button className="btn btn-ghost btn-sm" onClick={() => openEdit(c)}><Icon name="edit" size={13} /></button>
                      <button className="btn btn-danger btn-sm" onClick={() => remove(c.id)}><Icon name="trash" size={13} /></button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {modal && (
        <Modal title={modal === 'add' ? 'Add Course' : 'Edit Course'} onClose={() => setModal(null)}>
          <div className="form-grid">
            <div className="form-group full"><label>Course Name</label><input value={form.name} onChange={set('name')} placeholder="Advanced Mathematics" /></div>
            <div className="form-group full"><label>Teacher</label>
              <select value={form.teacher} onChange={set('teacher')}>
                {teachers.map(t => <option key={t.id} value={t.name}>{t.name}</option>)}
              </select>
            </div>
            <div className="form-group"><label>Grade</label>
              <select value={form.grade} onChange={set('grade')}>
                {GRADE_CLASSES.map(g => <option key={g}>{g}</option>)}
              </select>
            </div>
            <div className="form-group"><label>Credits</label><input type="number" value={form.credits} onChange={set('credits')} /></div>
            <div className="form-group full"><label>Schedule</label><input value={form.schedule} onChange={set('schedule')} placeholder="Mon/Wed 10:00" /></div>
            <div className="form-group"><label>Enrolled</label><input type="number" value={form.students} onChange={set('students')} /></div>
            <div className="form-group"><label>Capacity</label><input type="number" value={form.capacity} onChange={set('capacity')} /></div>
          </div>
          <div className="modal-actions">
            <button className="btn btn-ghost" onClick={() => setModal(null)}>Cancel</button>
            <button className="btn btn-primary" onClick={save}><Icon name="check" size={14} /> Save</button>
          </div>
        </Modal>
      )}
    </>
  );
};

export default Courses;
