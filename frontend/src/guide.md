# File Structure Guide

## Assets

For static files. Think images or fonts.

## Components

This folder follows the ideas of atomic design.

### Atoms
The smallest possible components. Think a button or a single form input (text box or a radio button)

### Molecules
Combinations of atoms. Think a search box (a text input plus a button) or a group of radio buttons

### Organisms
Combinations of molecules. This would be a whole section on a page typically. Think of a website header or a complete form with many different inputs.

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