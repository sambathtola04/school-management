import { useState } from 'react';
import Icon from './Icon';
import Modal from './Modal';

const EMPTY_FORM = { title: '', date: '', type: 'event', description: '' };

const Events = ({ events, setEvents }) => {
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const set = (key) => (e) => setForm(f => ({ ...f, [key]: e.target.value }));

  const save = () => {
    if (modal === 'add') setEvents(prev => [...prev, { ...form, id: Date.now() }]);
    else setEvents(prev => prev.map(e => e.id === modal.edit.id ? { ...e, ...form } : e));
    setModal(null);
  };

  const remove = (id) => { if (window.confirm('Delete event?')) setEvents(prev => prev.filter(e => e.id !== id)); };
  const sorted = [...events].sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <>
      <div className="card">
        <div className="card-header">
          <div><div className="card-title">School Calendar</div><div className="card-subtitle">{events.length} upcoming events</div></div>
          <button className="btn btn-primary" onClick={() => { setForm(EMPTY_FORM); setModal('add'); }}>
            <Icon name="plus" size={14} /> Add Event
          </button>
        </div>
        <div style={{ padding: 20 }}>
          <div className="events-list">
            {sorted.map(ev => {
              const d = new Date(ev.date);
              return (
                <div key={ev.id} className="event-item">
                  <div className="event-date">
                    <div className="event-day">{d.getDate()}</div>
                    <div className="event-month">{d.toLocaleString('en', { month: 'short' })}</div>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: 15, color: 'var(--ink)', marginBottom: 3 }}>{ev.title}</div>
                    <div style={{ fontSize: 13, color: 'var(--ink-muted)' }}>{ev.description}</div>
                  </div>
                  <span className={`badge ${ev.type}`}>{ev.type}</span>
                  <div style={{ display: 'flex', gap: 6 }}>
                    <button className="btn btn-ghost btn-sm" onClick={() => { setForm(ev); setModal({ edit: ev }); }}><Icon name="edit" size={13} /></button>
                    <button className="btn btn-danger btn-sm" onClick={() => remove(ev.id)}><Icon name="trash" size={13} /></button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {modal && (
        <Modal title={modal === 'add' ? 'Add Event' : 'Edit Event'} onClose={() => setModal(null)}>
          <div className="form-grid">
            <div className="form-group full"><label>Title</label><input value={form.title} onChange={set('title')} placeholder="Event title" /></div>
            <div className="form-group"><label>Date</label><input type="date" value={form.date} onChange={set('date')} /></div>
            <div className="form-group"><label>Type</label>
              <select value={form.type} onChange={set('type')}>
                <option value="event">Event</option>
                <option value="exam">Exam</option>
                <option value="meeting">Meeting</option>
                <option value="holiday">Holiday</option>
              </select>
            </div>
            <div className="form-group full"><label>Description</label><input value={form.description} onChange={set('description')} placeholder="Brief description" /></div>
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

export default Events;
