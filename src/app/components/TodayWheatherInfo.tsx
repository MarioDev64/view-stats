import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faTemperatureThreeQuarters,
	faWater,
	faWind
} from '@fortawesome/free-solid-svg-icons';
import styles from '../styles/components/today_wheather_info.module.css';
import Image from 'next/image';

interface todayWheatherInfoProps {
	dayData: any; // Define el tipo correcto para los datos del día
}

const TodayWheatherInfo: React.FC<todayWheatherInfoProps> = ({ dayData }) => {
	const { dt, weather, temp, humidity, wind_speed, summary } = dayData;

	// Extrae la descripción del clima y la temperatura máxima y mínima
	const weatherDescription = weather[0].description;
	const weatherIconUrl = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;
	const maxTemp = Math.round(temp.max);
	const minTemp = Math.round(temp.min);

	return (
		<div className={styles.container}>
			<h3>
				Today, is <span>{weatherDescription}</span>
			</h3>
			<div className={styles.wrapper}>
				<p>
					<FontAwesomeIcon icon={faTemperatureThreeQuarters} /> High:{' '}
					{maxTemp}&deg;C | Low: {minTemp}&deg;C
				</p>
				<Image
					src={weatherIconUrl}
					className={styles.icon}
					alt="wheater icon"
					width={80}
					height={80}
				/>
			</div>
			<p className={styles.summary}>
				{summary} with winds of {wind_speed}km/h{' '}
			</p>
		</div>
	);
};

export default TodayWheatherInfo;
