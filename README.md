# Gamejot

An app aiming to provide a fast way to jot down and recall things when playing a video game. You can add text notes and take photos for your created games with ability to delete, edit and reorder.

Built based on the [ignite boilerplate](https://github.com/infinitered/ignite) using:

- React Native
- React Navigation
- MobX State Tree
- TypeScript
- Storybook

## Quick Start

Install dependencies with `yarn install`
and run with `yarn start`

## Running Storybook

Run with `yarn run storybook`

## Build android bundle

Install the eas cli with `npm install -g eas-cli`
and create a build with `yarn build:android` + `:release` where release is either patch, minor or major. 

This step will automatically bump the version for you and start the build process on expo to create a google play ready bundle.

If you want to create an apk for local testing use `yarn build:android:apk`
