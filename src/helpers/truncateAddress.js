export const truncateAddress = (address) => {
  address = address.substring(0, 6) + '...' + address.substring(address.length - 8, address.length)
  return address
}
