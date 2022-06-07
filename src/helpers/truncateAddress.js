export const truncateAddress = (address) => {
  address = address.substring(0, 9) + '...' + address.substring(address.length - 8, address.length)
  return address;
}
