/**
 * Calculates the distance between two points on the Earth's surface using the Haversine formula.
 * @param lat1 Latitude of the first point in decimal degrees.
 * @param lon1 Longitude of the first point in decimal degrees.
 * @param lat2 Latitude of the second point in decimal degrees.
 * @param lon2 Longitude of the second point in decimal degrees.
 * @returns The distance between the two points in kilometers.
 */
export const calculateLogLatHaversine = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number => {
  const deg2rad = (deg: number): number => deg * (Math.PI / 180)

  const earthRadiusKm = 6371 // Earth radius in kilometers

  const dLat = deg2rad(lat2 - lat1)
  const dLon = deg2rad(lon2 - lon1)

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2)

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

  const distance = earthRadiusKm * c

  return distance
}
