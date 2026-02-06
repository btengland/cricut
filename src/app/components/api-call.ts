import { Observable, from } from 'rxjs';
import { mergeMap, catchError } from 'rxjs/operators';

export function getWeather(city: string): Observable<any> {
	const url = `https://goweather.herokuapp.com/weather/${encodeURIComponent(city)}`;
	// The pipe is used to run everything asynchronously
	return from(fetch(url)).pipe(
		mergeMap(response => {
			if (!response.ok) {
				throw new Error('Failed to fetch weather data');
			}
			return from(response.json());
		}),
		catchError(error => {
			throw new Error('Error fetching weather: ' + error.message);
		})
	);
}
