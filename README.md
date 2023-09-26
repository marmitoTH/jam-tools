<p align="center">
  <img src="logo.png" height=200 />
</p>

## About

Jam Tools is planned to be a collection of tools able to extract assets from Sega Saturn games. So far, it can extract 3D models from Sonic Jam and Sonic 3D Blast. The tools can likely extract models from other Saturn games, but it's currently unknown. The tools have been written in JavaScript and Node JS, with a significant contribution from **Starman**, who reverse-engineered Sonic Jam and shared his [research](http://info.sonicretro.org/SCHG:Sonic_Jam).

This project was initially meant to extract everything from Sonic Jam and 3D Blast. Unfortunately, I lost interest in it long ago, and I have no plans to continue working on new features. I'm sharing it now because I've occasionally seen people looking for these models online, and they ask me about it. So, here are the tools!

## Installation

The installation process might not be very straight forward for people not used to Node or programming in general. You'll need to run the tools through command lines, running the source code in your machine.

Make sure to have [Node JS](https://nodejs.org), `v14.16.0` or superior, installed. Once you have Node installed, you'll be able to install [Yarn](https://classic.yarnpkg.com/en/docs/install/#windows-stable), it's used to manage dependencies and run `package.json` scripts.

After installing Node JS, you can also install yarn from `npm` running the following command:

```
npm install --global yarn
```

The following command must output both Node and Yarn versions, it's a guarantee that everything is installed properly:

```
node --version
yarn --version
```

After installing everything, open the cmd on the project root directory and run the following command:

```
yarn install
```

All the dependencies will be installed and the tools are ready to use!

## How To Use

You can run the command `yarn models -h` to see the list of all available options.

```
Options:
  -f, --file <path>         file to get the data from
  -m, --model <address>     the address of the model you want to rip
  --name <name>             the name of the model you want to rip
  -g, --groupStruct <path>  export group data with the given struct
  -o, --output <path>       data output path (default: "./output")
  --obj                     output the data as .obj files
  -h, --help                display help for command
```

### Model Ripping

In Sonic Jam and Sonic 3D Blast, models are grouped, meaning a collection of sub-models forms each model. However, some models, like the stone arch, are created only by a single model. The list of all models and sub-models can be found [in this guide](https://info.sonicretro.org/SCHG:Sonic_Jam/Models).

#### Individual Models

To rip individual models, run the following command:

```
yarn models --file <file path> --model <model address> --name <name of the model>
```

The file path must be the path of your `MUSEUM.MUS` file. The model address must match the addresses from the guide. The name of the model can be whatever you want.

By default, the models will be extracted to the `output` folder, but you can also specify the output directory by adding the following command:

```
--output <path>
```

#### Models Groups

To rip model groups as `.json` to import from Blender, run the following command:

```
yarn models --file <file path> --groupStruct <struct path>
```

The file path is the same as before. The group struct must be the path to a `.json` file that matches the following payload:

```json
{
  "title": "Title of the Model",
  "address": "3CB0C",
  "elements": [
    "model_01"
  ]
}
```

The title refers to your group name and can be whatever you want. The address is the group footer address you can find in the guide. The elements are the name of each sub-model from the group. Again, ensure to read the guide. It's built from the model's list tables. You can find some examples inside the `data/groups` folder.

You can also export the group as `.obj` by adding `--obj` to the end of the previously mentioned command. This will spread your group's sub-models into individual `.obj` files. It's faster to export as `.json` and then read the `.json` file in Blender.

### Blender Add-on

The models exported as `.obj` can be read by Blender like any other `.obj` file. No extra setup is needed.

To read the `.json` files generated from the group extraction, you must first install the `jam_tools.py` extension from the `blender` folder. You can install it from Blender preferences windows under the add-on's settings or copy and paste the plugin content into the Blender text editor and press 'Run Script.'

After that, you can import the group's file by clicking the `Load Group Data` from the Jam Tools dropdown from Blender's scene properties menu. Press f3 and type `load group data` to open the file browser window. Finally, select your extracted group `.json` file and all your models will be loaded into Blender.

# Known Limitations

The tools can't correctly assemble the model's positions and rotations. So, you have to fix the models by hand manually. It also doesn't export textures, animations, or UV coordinates (all extracted models are untextured). I lost interest in finishing this project long ago, so don't expect updates. Feel free to fork it and add new things.
