export function getProductDetailLink(productId) {
  return `/product/${productId}`
}

export function formatProductPrice(price) {
  return String(price || "").replaceAll("â‚¹", "Rs. ")
}
