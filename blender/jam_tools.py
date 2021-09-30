import os
import bpy
import json

from bpy.props import StringProperty
from bpy.types import Operator, Panel
from bpy_extras.io_utils import ImportHelper

def assemble_model(model, location, parent):
  vertices = model['vertices']
  faces = model['quads']

  mesh = bpy.data.meshes.new(model['details']['name'])
  mesh.from_pydata(vertices, [], faces)
  mesh.update()

  model_object = bpy.data.objects.new(model['details']['name'], mesh)
  model_object.parent = parent
  model_object.location = location

  for polygon in model_object.data.polygons:
      polygon.use_smooth = True

  bpy.context.scene.collection.objects.link(model_object)

def assemble_group(group_data):
  models = group_data['models']
  locations = group_data['positions']

  root = bpy.data.objects.new(group_data['title'], None)

  for idx, model in enumerate(models):
    assemble_model(model, locations[idx], root)

  bpy.context.scene.collection.objects.link(root)

class JamTools(Panel):
  bl_label = 'Jam Tools'
  bl_idname = 'jam_tools_panel'
  bl_space_type = 'PROPERTIES'
  bl_region_type = 'WINDOW'
  bl_context = 'scene'

  def draw(self, context):
    layout = self.layout
    scene = context.scene

    # Load Group Data
    row = layout.row()
    row.scale_y = 1.0
    row.operator('jam_tools.open_group_browser')

class JamGroupBrowser(Operator, ImportHelper):
  bl_idname = 'jam_tools.open_group_browser'
  bl_label = 'Load Group Data'

  filter_glob: StringProperty(default='*.json', options={'HIDDEN'})

  def execute(self, context):
    group_file = open(self.filepath)
    group_data = json.load(group_file)
    assemble_group(group_data)

    return { 'FINISHED' }

def register():
  bpy.utils.register_class(JamTools)
  bpy.utils.register_class(JamGroupBrowser)

def unregister():
  bpy.utils.unregister_class(JamTools)
  bpy.utils.unregister_class(JamGroupBrowser)

if __name__ == "__main__":
  register()
