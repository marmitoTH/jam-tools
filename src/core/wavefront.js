/**
 * @param {Object} model
 * @returns {string}
 */
const modelToObj = (model) => {
  const { vertices, normals, quads } = model
  const v = vertices.map((data) => `v ${data[0]} ${data[1]} ${data[2]}\n`)
  const vn = normals.map((data) => `vn ${data[0]} ${data[1]} ${data[2]}\n`)

  const f = quads.map((data) => {
    const indices = data.map((index) => index + 1)
    return `f ${indices.join(' ')}\n`
  })

  return v.join('') + vn.join('') + f.join('')
}

/**
 * @param {Object} group
 * @returns {string[]}
 */
const groupToObj = (group) => {
  const { models } = group
  return models.map((model) => modelToObj(model))
}

module.exports = { modelToObj, groupToObj }
