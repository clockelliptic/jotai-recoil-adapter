# Demo App Requirements

Table of Contents:
<!-- TOC -->

- [Demo App Requirements](#demo-app-requirements)
  - [Objectives](#objectives)
  - [Functional Requirements](#functional-requirements)
    - [Atoms](#atoms)
    - [Selectors](#selectors)
    - [Atom Effects](#atom-effects)
    - [State Callback Hooks (`useRecoilCallback`)](#state-callback-hooks-userecoilcallback)
    - [Concurrency with `waitForAll`](#concurrency-with-waitforall)
  - [Performance Profiling Routines:](#performance-profiling-routines)

<!-- /TOC -->

## Objectives

__Objective:__ Showcase the potential of `jotai-recoil-adapter` in handling diverse state management needs supplied by a Recoil-React application. We want to show that by using this adapter, developers can switch immediately to Jotai, and continue to use Recoil's familiar API while migrating to Jotai's API incrementally.

__Objective:__ Provide a basis for performance testing the overhead incurred by the adapter layer.

## Functional Requirements

### Atoms

- **Initializing**: 
  1. Set up an atom for tracking the current user's to do items with a default to-do item
  2. Load initial tasks from local storage.
  3. Initialize atom with user preferences (dark/light mode).
  4. Initialize default to-do categories/tags/priority-levels

- **Reading**: 
  1. Displaying the list of tasks on the main page.
  2. Showing the user's app preferences (dark/light mode).

- **Setting**: 
  1. Updating a task's description upon user editing.
  2. Changing the user's preference settings.
  3. Adding a new task to the list after user input.

- **Resetting**: 
  1. Resetting all tasks to 'incomplete' status with a single action.
  2. Resetting task filters to default settings.

- **Using Selectors to Initialize Atom Values**: 
  1. Initializing saved to-do's from asynchronous browser storage (IndexedDB).
  2. A button to fetch a new motivational quote from an open source API.

### Selectors

- **Synchronous Selectors**: 
  1. Calculating the total number of tasks.
  2. Determining the percentage of completed tasks.
  3. Filtering tasks by category.

- **Asynchronous Selectors**: 
  1. Fetch a motivational quote from an open source API.

- **Proxy Selectors**: 
  1. Propagating changes to to-do list items when changing to-do list categories/tags

### Atom Effects

- **Side-Effects**: 
  1. Auto-saving user settings to browser storage.
  2. Auto-saving task edits to browser storage.

### State Callback Hooks (`useRecoilCallback`)

- **Reading and Setting State**: 
  1. Exporting selected tasks to a CSV file.
  2. Bulk updating multiple tasks.

### Concurrency with `waitForAll`

- **Usage in Components**: 
  1. Reading multiple task lists from an atomFamily with an array of atomFamily keys.

- **Usage in Selectors' Getter Methods**: 
  1. A selector that aggregates task list stats (complete, incomplete, categories) per task list.

- **Usage in Selectors' Setter Methods**: 
  1. ...

- **Usage in State Callback Hooks**: 
  1. A reset-app button that resets all app data

## Performance Profiling Routines:

  1. Create `[1_000, 10_000, 100_000, 250_000]` to-do items
     - with atom `default` value
     - with `useRecoilState`
     - with `useSetRecoilState`
     - with `useRecoilCallback`
  2. Modify `[1_000, 10_000, 100_000, 250_000]` to-do items
     - with `useRecoilState`
     - with `useSetRecoilState`
     - with `useRecoilCallback`
  3. Detele `[1_000, 10_000, 100_000, 250_000]` to-do items
     - with `useRecoilState`
     - with `useSetRecoilState`
     - with `useResetRecoilState`
     - with `useRecoilCallback`
       - using `set` method
       - using `reset` method
