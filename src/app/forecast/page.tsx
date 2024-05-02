'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import styles from './forecast.module.css';
import Card from '../components/WheatherCard';
import Loading from '../components/Loading';
import TodayWheatherInfo from '../components/TodayWheatherInfo';
import { OPENWEATHERMAP_API_KEY } from '../lib/config';

export default function ForecastPage() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const locationInfo = searchParams.get('locationInfo');
	const lat = searchParams.get('lat');
	const lon = searchParams.get('lon');
	const [latitude, setLatitude] = useState<string | number>('');
	const [longitude, setLongitude] = useState<string | number>('');
	const [todayForecastData, setTodayForecastData] = useState<any>(null);
	const [forecastData, setforecastData] = useState<any>(null);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		if (lat && lon) {
			setLatitude(lat);
			setLongitude(lon);
		}
	}, [lat, lon]);

	useEffect(() => {
		if (latitude && longitude) getWheaterInfo();

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [latitude, longitude]);

	const getWheaterInfo = async () => {
		setIsLoading(true);
		try {
			const weatherResponse = await fetch(
				`https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&units=metric&exclude=current,minutely,hourly&appid=${OPENWEATHERMAP_API_KEY}`
			);

			if (weatherResponse.ok) {
				const forecastData = await weatherResponse.json();
				if (forecastData) {
					setTodayForecastData(forecastData.daily[0]);
					console.log('setTodayForecastData', forecastData.daily[0]);
					setforecastData(forecastData.daily.slice(1, 6));
				}
			} else {
				// Handle error response from API
				console.error('Failed to fetch weather data');
			}
		} catch (error) {
			console.error('Error fetching weather data:', error);
		} finally {
			setIsLoading(false);
		}
	};

	const handleBack = () => {
		router.push('/');
	};

	return (
		<div className={styles.container}>
			<h1>
				Weather Forecast for <span>{locationInfo}</span>
			</h1>

			{isLoading && <Loading />}

			{todayForecastData && (
				<TodayWheatherInfo dayData={todayForecastData} />
			)}

			{forecastData && (
				<div className={styles.cardContainer}>
					{forecastData.map((dayData: any, index: number) => (
						<Card key={index} dayData={dayData} />
					))}
				</div>
			)}

			<button onClick={handleBack}>Back to Search</button>
		</div>
	);
}
