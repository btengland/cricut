export async function getWeather(city: string): Promise<any> {
	const url = `https://goweather.herokuapp.com/weather/${encodeURIComponent(city)}`;
	const response = await fetch(url);
	if (!response.ok) {
		throw new Error('Failed to fetch weather data');
	}
	return await response.json();
}
