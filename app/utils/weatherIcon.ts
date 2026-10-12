/**
 * Returns the official OpenWeatherMap icon URL matching
 * dynamic meteorological conditions.
 *
 * @param iconCode OpenWeatherMap icon string (e.g. '01d', '04n', '10d')
 * @param size '2x' (100px) or '4x' (200px for hero views)
 */
export function getWeatherIconUrl(iconCode?: string, size: '2x' | '4x' = '2x'): string {
  if (!iconCode) {
    return `https://openweathermap.org/img/wn/02d@${size}.png`;
  }
  return `https://openweathermap.org/img/wn/${iconCode}@${size}.png`;
}
