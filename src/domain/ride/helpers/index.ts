const calculateMinutesForKm = (distanceKm: number): number => {
  const averageSpeedKmPerHour = 30 // km/h
  const minutes = (distanceKm / averageSpeedKmPerHour) * 60
  return minutes
}

export const calculateTotalPrice = (distanceKm: number): string => {
  const pricePerKm = 1000
  const pricePerMinute = 200
  const durationMinutes = calculateMinutesForKm(distanceKm)
  const totalPrice = distanceKm * pricePerKm + durationMinutes * pricePerMinute
  // Redondeamos el resultado al valor más cercano de peso colombiano
  const roundedPrice = Math.round(totalPrice)

  // Formateamos el precio con el símbolo de COP y separación de miles
  const formattedPrice = roundedPrice.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })

  return formattedPrice
}
