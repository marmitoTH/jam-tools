const HexTable = require('./HexTable')
const { ramToFile, hexToNumber, hexToFloat, hexToIndex } = require('./helpers')

/**
 * @param {HexTable} table
 * @param {string} address
 * @param {number} amount
 */
 const readQuads = (table, address, amount) => {
  table.goTo(ramToFile(address))

  const quads = []

  for (let i = 0; i < amount; i++) {
    const indices = []

    for (let j = 0; j < 4; j++) {
      const index = table.readWord(true)
      indices.push(hexToIndex(index))
    }

    quads.push([...new Set(indices)])
  }

  return quads
}

/**
 * @param {HexTable} table
 * @param {string} address
 * @param {number} amount
 */
const readVectors = (table, address, amount) => {
  table.goTo(ramToFile(address))

  const vertices = []

  for (let i = 0; i < amount; i++) {
    const x = hexToFloat(table.readDWord(true))
    const y = hexToFloat(table.readDWord(true))
    const z = hexToFloat(table.readDWord(true))

    vertices.push([ x, y, z ])
  }

  return vertices
}

/**
 * @param {HexTable} table
 * @param {string} name
 * @param {string} address
 */
const readModel = (table, name, address) => {
  table.goTo(address)

  const verticesPointer = table.readDWord(true)
  const vertexAmount = hexToNumber(table.readDWord(true))
  const quadsPointer = table.readDWord(true)
  const facesAmount = hexToNumber(table.readDWord(true))
  const settingsPointer = table.readDWord(true)
  const normalsPointer = table.readDWord(true)

  const vertices = readVectors(table, verticesPointer, vertexAmount)
  const normals = readVectors(table, normalsPointer, vertexAmount)
  const quads = readQuads(table, quadsPointer, facesAmount)

  return {
    details: {
      name,
      verticesPointer,
      quadsPointer,
      normalsPointer,
      settingsPointer,
      vertexAmount,
      facesAmount
    },
    vertices,
    normals,
    quads
  }
}

/**
 * @param {HexTable} table
 * @param {object} group
 */
const readGroup = (table, group) => {
  const { address, title, elements} = group
  const groupIdx = hexToNumber(address)

  const models = []
  const positions = []

  elements.forEach((name, index) => {
    const groupOffset = (groupIdx + index * 4).toString(16)
    const modelPointer = table.goTo(groupOffset).readDWord()
    const modelAddress = ramToFile(modelPointer)

    models.push(readModel(table, name, modelAddress))
  })

  table.goTo(group.address).offset(models.length * 8)

  for (let i = 0; i < models.length; i++) {
    const x = hexToFloat(table.readDWord(true))
    const y = hexToFloat(table.readDWord(true))
    const z = hexToFloat(table.readDWord(true))

    positions.push([ x, y, z ])
  }

  return { title, models, positions }
}

module.exports = { readQuads, readVectors, readModel, readGroup }
