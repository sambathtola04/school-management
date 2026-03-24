import { useState } from 'react';
import Icon from './Icon';
import Modal from './Modal';

const EMPTY_FORM = { name: '', subject: '', email: '', phone: '', experience: '', status: 'active', classes: [] };

const Teachers = ({ teachers, setTeachers }) => {
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);

  const openAdd  = () => { setForm(EMPTY_FORM); setModal('add'); };
  const openEdit = (t) => { setForm({ ...t, experience: String(t.experience) }); setModal({ edit: t }); };
  const set = (key) => (e) => setForm(f => ({ ...f, [key]: e.target.value }));

  const save = () => {
    const entry = { ...form, experience: parseInt(form.experience) || 0 };
    if (modal === 'add') setTeachers(prev => [...prev, { ...entry, id: Date.now() }]);
    else setTeachers(prev => prev.map(t => t.id === modal.edit.id ? { ...t, ...entry } : t));
    setModal(null);
  };

  const remove = (id) => { if (window.confirm('Remove this teacher?')) setTeachers(prev => prev.filter(t => t.id !== id)); };

  return (
    <>
      <div className="card">
        <div className="card-header">
          <div><div className="card-title">Faculty</div><div className="card-subtitle">{teachers.length} members</div></div>
          <button className="btn btn-primary" onClick={openAdd}><Icon name="plus" size={14} /> Add Teacher</button>
        </div>
        <table>
          <thead><tr><th>Name</th><th>Subject</th><th>Classes</th><th>Experience</th><th>Email</th><th>Status</th><th>Actions</th></tr></thead>
          <tbody>
            {teachers.map(t => (
              <tr key={t.id}>
                <td style={{ fontWeight: 600, color: 'var(--ink)' }}>{t.name}</td>
                <td><span style={{ background: 'var(--violet)', color: 'white', padding: '3px 10px', borderRadius: 20, fontSize: 11, fontWeight: 600 }}>{t.subject}</span></td>
                <td style={{ fontSize: 12 }}>{t.classes.join(', ')}</td>
                <td>{t.experience} yrs</td>
                <td style={{ fontSize: 13 }}>{t.email}</td>
                <td><span className={`badge ${t.status}`}>{t.status}</span></td>
                <td>
                  <div style={{ display: 'flex', gap: 6 }}>
                    <button className="btn btn-ghost btn-sm" onClick={() => openEdit(t)}><Icon name="edit" size={13} /></button>
                    <button className="btn btn-danger btn-sm" onClick={() => remove(t.id)}><Icon name="trash" size={13} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modal && (
        <Modal title={modal === 'add' ? 'Add Teacher' : 'Edit Teacher'} onClose={() => setModal(null)}>
          <div className="form-grid">
            <div className="form-group full"><label>Full Name</label><input value={form.name} onChange={set('name')} placeholder="Dr. / Prof. Name" /></div>
            <div className="form-group"><label>Subject</label><input value={form.subject} onChange={set('subject')} placeholder="Mathematics" /></div>
            <div className="form-group"><label>Experience (yrs)</label><input type="number" value={form.experience} onChange={set('experience')} /></div>
            <div className="form-group full"><label>Email</label><input type="email" value={form.email} onChange={set('email')} /></div>
            <div className="form-group"><label>Phone</label><input value={form.phone} onChange={set('phone')} /></div>
            <div className="form-group"><label>Status</label>
              <select value={form.status} onChange={set('status')}>
                <option value="active">Active</option><option value="inactive">On Leave</option>
              </select>
            </div>
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

export default Teachers;
