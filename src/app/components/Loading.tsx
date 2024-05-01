import styles from '../styles/components/loading.module.css';

const Loading: React.FC = () => {
	return <div className={styles.lds_dual_ring}></div>;
};

export default Loading;
