import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { getWeather } from './api-call';

describe('getWeather', () => {
  const mockFetch = vi.fn();

  beforeEach(() => {
    (globalThis as any).fetch = mockFetch;
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should return weather data for a valid city', async () => {
    const mockResponse = {
      temperature: '20°C',
      description: 'Sunny',
      wind: '5 km/h',
      forecast: [
        { day: '1', temperature: '22°C', wind: '6 km/h' }
      ]
    };

    const mockFetchResponse = {
      ok: true,
      json: vi.fn().mockResolvedValue(mockResponse)
    };

    mockFetch.mockResolvedValue(mockFetchResponse);

    const result = await getWeather('London').toPromise();

    expect(mockFetch).toHaveBeenCalledWith('https://goweather.herokuapp.com/weather/London');
    expect(result).toEqual(mockResponse);
  });

  it('should throw an error for network failure', async () => {
    mockFetch.mockRejectedValue(new Error('Network error'));

    try {
      await getWeather('InvalidCity').toPromise();
      expect.fail('Should have thrown an error');
    } catch (error) {
      expect((error as Error).message).toContain('Error fetching weather');
    }
  });

  it('should throw an error for non-ok response', async () => {
    const mockFetchResponse = {
      ok: false,
      status: 404
    };

    mockFetch.mockResolvedValue(mockFetchResponse);

    try {
      await getWeather('NonExistentCity').toPromise();
      expect.fail('Should have thrown an error');
    } catch (error) {
      expect((error as Error).message).toContain('Failed to fetch weather data');
    }
  });
});