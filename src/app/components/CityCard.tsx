import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import styles from '../styles/components/citycard.module.css';

interface CityCardProps {
	cityName: string;
	stateCode: string;
	countryCode: string;
	onClickSeeWeather: () => void;
}

const CityCard: React.FC<CityCardProps> = ({
	cityName,
	stateCode,
	countryCode,
	onClickSeeWeather
}) => {
	return (
		<div className={styles.card}>
			<div className={styles.cityInfo}>
				<div className={styles.cityName}>{cityName}</div>
				<div className={styles.location}>
					{stateCode}, {countryCode}
				</div>
			</div>
			<button className={styles.iconButton} onClick={onClickSeeWeather}>
				<div className={styles.label}>
					See Weather <FontAwesomeIcon icon={faEye} />
				</div>
			</button>
		</div>
	);
};

export default CityCard;
