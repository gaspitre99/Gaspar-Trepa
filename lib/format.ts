export const pct = (n: number) => `${Math.round(n)}%`

export const duration = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`

export const progressOf = (done: number, total: number) => total === 0 ? 0 : (done / total) * 100

export const formatPrice = (price: number) => {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 0,
  }).format(price).replace('ARS', '$').replace(/\$\s?/, '$ ').trim();
};
