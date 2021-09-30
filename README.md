<center>
  <img src="logo.png" height=200 />
</center>

## About

Jam Tools is planned to be a collection of tools able to extract assets from Sega Saturn games, so far it's able to extract 3D models from Sonic Jam and Sonic 3D Blast. It's very likely that the tools are able to extract models from other games as well, but it's currently unknown. The tools has being written in Java Script and Node JS, with a big contribution from Starman, who reverse engineered Sonic Jam and shared his [research](http://info.sonicretro.org/SCHG:Sonic_Jam).

## Installation

The installation process might not be very straight forward for people not used to Node or programming in general. You'll need to run the tools through command lines, running the source code in your machine.

Make sure to have [Node JS](https://nodejs.org), `v14.16.0` or superior, installed. Once you have Node installed, you'll be able to install [Yarn](https://classic.yarnpkg.com/en/docs/install/#windows-stable), it's used to manage dependencies and run `package.json` scripts. The following command must output both Node and Yarn versions, it's a guarantee that everything is installed properly:

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

### Model Ripping

In Sonic Jam and Sonic 3D Blast, models are grouped, meaning that each model is formed by a collection of sub models.
