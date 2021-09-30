const KEY = 100925440

/** @param {string} address */
const ramToFile = (address) => {
  const decimal = parseInt(address, 16)
  return (decimal - KEY).toString(16)
}

/** @param {string} hex */
const hexToNumber = (hex) => {
  return parseInt(hex, 16)
}

/** @param {string} hex */
const hexToFloat = (hex) => {
  const high = hex.slice(0, 4)
  const low = hex.slice(4, 8)
  const decimal = hexToNumber(low)
  const integral = hexToNumber(high)
  const result = integral + decimal / 65536
  return integral > 32767 ? result - 65536 : result
}

/** @param {string} hex */
const hexToIndex = (hex) => {
  let decimal = hexToNumber(hex)
  decimal = decimal > 32767 ? decimal - 65536 + 8 : decimal
  return Math.abs(decimal / 8)
}

module.exports = { ramToFile, hexToNumber, hexToFloat, hexToIndex }
