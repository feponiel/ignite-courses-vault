export const dateFormatter = new Intl.DateTimeFormat('en-CA')

export const priceFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
})
