'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './styles/home.module.css';
import InputField from './components/InputField';
import Modal from './components/Modal';
import CityCard from './components/CityCard';
import Loading from './components/Loading';
import { OPENWEATHERMAP_API_KEY } from './lib/config';
import { determineLocationType } from './lib/utils';

export default function Home() {
	const [searchQuery, setSearchQuery] = useState('');
	const [cityData, setCityData] = useState<any[]>([]);
	const [notRecordsFoundError, setNotRecordsFoundError] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();

	const handleSearch = async () => {
		//removing not records found error state to clean ui
		setNotRecordsFoundError(false);

		//handling if searchQuery is empty or not provided
		if (!searchQuery || searchQuery.trim().length === 0) {
			setErrorMessage('Please type a city name or zipcode.');
			return;
		}

		setIsLoading(true);

		const locationType = determineLocationType(searchQuery);

		if (locationType === 'address') {
			getAddressesByCity();
		} else {
			getAddressesByZipCode();
		}
	};

	const getAddressesByCity = async () => {
		try {
			const response = await fetch(
				`https://api.openweathermap.org/geo/1.0/direct?q=${searchQuery}&limit=5&appid=${OPENWEATHERMAP_API_KEY}`
			);

			if (response.ok) {
				const data = await response.json();
				setCityData(data);
				data.length === 0 && setNotRecordsFoundError(true);
			} else {
				console.error('Failed to fetch city data');
			}
		} catch (error) {
			console.error('Error fetching city data:', error);
		} finally {
			setIsLoading(false);
		}
	};

	const getAddressesByZipCode = async () => {
		try {
			const response = await fetch(
				`https://api.openweathermap.org/geo/1.0/zip?zip=${parseInt(searchQuery)}&limit=5&appid=${OPENWEATHERMAP_API_KEY}`
			);

			if (response.ok) {
				const data = await response.json();
				// push single data in a array. This avoid aditional validations
				let tempCityData = [];
				tempCityData.push(data);
				tempCityData[0].state = tempCityData[0].zip;
				setCityData(tempCityData);
			} else {
				// handling zip code not found
				if(response.status === 404) {
					setNotRecordsFoundError(true);
					setCityData([]);
				}
				console.error('Failed to fetch city data');
			}
		} catch (error) {
			console.error('Error fetching city data:', error);
		} finally {
			setIsLoading(false);
		}
	};

	const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			handleSearch();
		}
	};

	const closeModal = () => {
		setErrorMessage('');
	};

	return (
		<main className={styles.main}>
			<h1 className={styles.title}>Weather Forecast</h1>
			<div className={styles.container}>
				<InputField
					placeholder="Enter city or ZIP code"
					value={searchQuery}
					onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
							setNotRecordsFoundError(false);
							setSearchQuery(e.target.value)
						}
					}
					onKeyPress={handleKeyPress}
				/>
				<button className={styles.btn} onClick={handleSearch}>
					Search
				</button>
			</div>

			{isLoading && <Loading />}

			<div className={styles.cityCards}>
				
				{notRecordsFoundError && (<label>No records found with the city name or zipcode <strong>{searchQuery}</strong></label>)}
				{cityData.map((city: any, index) => (
					<CityCard
						key={`${city.name}-${city.country}-${index}`}
						cityName={city.name}
						stateCode={city.state}
						countryCode={city.country}
						onClickSeeWeather={() =>
							router.push(
								`/forecast?locationInfo=${city.name},${city.state},${city.country}&lat=${city.lat}&lon=${city.lon}`
							)
						}
					/>
				))}
			</div>

			{errorMessage && (
				<Modal message={errorMessage} onClose={closeModal} />
			)}
		</main>
	);
}
