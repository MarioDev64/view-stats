import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faTemperatureThreeQuarters,
	faWater,
	faWind
} from '@fortawesome/free-solid-svg-icons';
import styles from '../styles/components/wheather_info_card.module.css';
import Image from 'next/image';

interface CardProps {
	dayData: any; // Define el tipo correcto para los datos del día
}

const WheatherCard: React.FC<CardProps> = ({ dayData }) => {
	// Extrae la información relevante del objeto dayData
	const { dt, weather, temp, humidity, wind_speed } = dayData;

	// Formatea la fecha utilizando el timestamp (dt)
	const date = new Date(dt * 1000).toLocaleDateString('en-US', {
		weekday: 'long',
		month: 'long',
		day: 'numeric'
	});

	// Extrae la descripción del clima y la temperatura máxima y mínima
	const weatherDescription = weather[0].description;

	const weatherIconUrl = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;
	const maxTemp = Math.round(temp.max);
	const minTemp = Math.round(temp.min);

	return (
		<div className={styles.card}>
			<p className={styles.date}>{date}</p>
			<Image
				src={weatherIconUrl}
				className={styles.icon}
				alt="wheater icon"
				width={80}
				height={80}
			/>
			<p className={styles.description}>{weatherDescription}</p>
			<p className={styles.temp}>
				<FontAwesomeIcon icon={faTemperatureThreeQuarters} /> High:{' '}
				{maxTemp}&deg;C | Low: {minTemp}&deg;C
			</p>
			<p className={styles.temp}>
				<FontAwesomeIcon icon={faWater} /> Humidity: {humidity} |{' '}
				<FontAwesomeIcon icon={faWind} /> Wind: {wind_speed}km/h
			</p>
		</div>
	);
};

export default WheatherCard;
