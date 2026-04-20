## Pairing Project Requirements
* Please use github project space, post link in your Dev chat
* Try to commit between each passing test, and at a minimum between pair transitions or at the end of each day.
* Highly recommend that the pairs work from one machine to avoid merge issues
* Project Naming: Project_{team number} of each pair, e.g. Project_two, Project_three,...
* Must use Java + Spring + Postgres + Flyway + Typescript + React + Vite + Vitest
* We will be practicing TDD
* No production code without a failing test
* Watch your test fail
* Write just enough implementation to make it pass
* We will now work “Lean slice”
* Work from front end to back end, You may create your migration first
* The app topic is a class decided topic,
* Provide a form with a display list of entity items
* Full CRUD capability
* Dont remove “cascade” object references

---

## First Time Setup and Configuration
**First commit should only be initial setup:**
1. Setup a gitlab repo
2. Go to spring initializer and setup a basic project like we’ve done before
3. Start a new react vite typescript project inside the same repo at `"/frontend"`
4. Configure vitest
5. Decide on styling and do any necessary configuration
6. You should be able to run a basic and frontend test

Now commit and push!, this is your clean starting point to get started on your first feature.

---

## Checkpoint 1 Basic Requirements
* Must include at least 2 controllers with at least the following endpoints:
    * get all
    * get by id
    * Create
    * Update
    * Delete
* Must have at least 2 tests per endpoint
* Must have at least 2 entities with at least the following field types (in addition to using Id): String, Integer or Long, Double, and Instant (date), object relationship.
* The entity must be saved to a corresponding database table.
* Must have at least 2 flyway migrations
* Must have a frontend with some kind of UI that interacts with each endpoint
* Must have at least 5 different React components NOT including `App.tsx` and `index.tsx`
* Must have tests for all 5 react components in a corresponding test file (e.g. `aircraft-list.test.tsx`)
* You can’t recreate an app we’ve already built in ACC or the bridge (movies, todo list, library, car, aircraft)

---

## Recommendations
* Get all of your configuration done first.

### Guide to Getting Started with Springboot Guide for Setting Up Frontend for Testing
* Have you github repo setup
* Go to spring initializer and setup a basic project like we’ve done before
* Start a new react vite typescript project inside the same repo under `“frontend”`
* Configure vitest
* Decide on styling and do any necessary configuration
* You should be able to run a basic and frontend test
* Do a commit and push, then get started on your first feature.
* If you’re going to use MUI, Tailwind CSS, or another design system/component library, you should use it from the beginning rather than converting to it down the road
* Make a basic design before you start building. It does not need to be detailed. You can use a whiteboard, a piece of paper. This will help you think through how the user will interact with your app.
* Start simple - take it one feature at a time. You can always add more complexity later, but get the simple solution working first, then do a commit, then add more.
* Start on the frontend and start with the form component for creating your object. Then move to the backend, add only the post endpoint to complete the feature that allows you to create your object. Then move on to the next endpoint like get all, build the ui for it, then work your way to the backend and add the endpoint.