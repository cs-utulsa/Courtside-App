# File Structure Guide

## Assets

For static files. Think images or fonts.

## Components

This folder has all of the different custom components of the app separated by feature or type. Other folders may be added in the future as more components of a given type are created.

### Auth

This is components relating to the Auth Flow

### Buttons

Buttons.

### Data

These are components that display data. This might be Game data, Stat data, player data, etc. etc.

### Error

Components that display an error or inform the user that na error has occurred.

### Logo

Components related to the branding of Courtside.

### Misc

Components there is not another place for.

### Navigation

Components related to navigation through the app including things like navigation bars, drawers, and links.

## Constants

Constant data. In development, this might be test data. In production, this would be simple constant values since data will be pulled from a server.

## Contexts
Contexts are a feature of React. That allows information to be shared between components in different parts of the tree to avoid what's called prop-drilling.

## Hooks
This is for custom hooks. React comes with many hooks such as useState and useEffect and when we make our own they will go here.

## Navigation
This is for all components having to do with navigation as provided by the React Navigation library.

## Pages
This is for all the different screens in the app.

## Services

## Styles
This is for global styles and multi use functions that can create style objects.

## Types
Custom typescript types for our app.