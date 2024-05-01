import styles from '../styles/components/modal.module.css';

interface ModalProps {
	message: string;
	onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ message, onClose }) => {
	return (
		<div className={styles.overlay}>
			<div className={styles.modal}>
				<p>{message}</p>
				<button onClick={onClose}>Close</button>
			</div>
		</div>
	);
};

export default Modal;
