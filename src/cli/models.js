const fs = require('fs')
const { Command } = require('commander')
const HexTable = require('../core/HexTable')

const { readGroup, readModel } = require('../core/models')
const { groupToObj, modelToObj } = require('../core/wavefront')

const program = new Command()

program
  .requiredOption('-f, --file <path>', 'file to get the data from')
  .option('-m, --model <address>', 'the address of the model you want to rip')
  .option('--name <name>', 'the name of the model you want to rip')
  .option('-g, --groupStruct <path>', 'export group data with the given struct')
  .option('-o, --output <path>', 'data output path', './output')
  .option('--obj', 'output the data as .obj files')
  .parse()

const { file, model, name, groupStruct, output, obj } = program.opts()

const buffer = fs.readFileSync(file)
const table = new HexTable(buffer)

if (groupStruct) {
  const rawGroup = fs.readFileSync(groupStruct)
  const group = JSON.parse(rawGroup)
  const groupData = readGroup(table, group)

  if (obj) {
    const objGroupData = groupToObj(groupData)

    objGroupData.forEach((objModel, idx) => {
      const { title, models } = groupData
      const { name } = models[idx].details
      const dir = `${output}/${title}`

      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true })
      }

      fs.writeFileSync(`${dir}/${name}.obj`, objModel)
    })
  }

  fs.writeFileSync(`${output}/${groupData.title}.json`, JSON.stringify(groupData))
}
else if (model) {
  const modelData = readModel(table, name, model)
  const objData = modelToObj(modelData)
  const dir = `${output}/${name}.obj`

  fs.writeFileSync(dir, objData)
}
