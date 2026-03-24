import Icon from './Icon';

const Modal = ({ title, onClose, children }) => (
  <div className="overlay" onClick={e => e.target === e.currentTarget && onClose()}>
    <div className="modal">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <div className="modal-title">{title}</div>
        <button className="icon-btn" onClick={onClose}><Icon name="close" size={16} /></button>
      </div>
      {children}
    </div>
  </div>
);

export default Modal;
