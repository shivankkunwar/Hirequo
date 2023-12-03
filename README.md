# Admin Dashboard

This is a web application that allows admins to see and delete users. The users are provided via an API.

## Features

- The application displays the users in a table with four columns: id, name, email, and role.
- The column titles stand out from the entries with a different background color and font weight.
- There is a search bar that can filter on any property of the users. The search is case-insensitive and partial matches are allowed.
- The users can be edited or deleted in place by clicking on the edit or delete buttons on each row. The changes are only reflected in the current session and are not persisted to the API.
- The application implements pagination with 10 rows per page. There are buttons at the bottom to jump to any page, including special buttons for the  previous page, next page. The pagination updates based on the search/filtering results.
- The users can be selected by clicking on the checkboxes on each row. A selected row is highlighted with a grayish background color. Multiple selected rows can be deleted at once by clicking on the 'Delete Selected' button at the top right bin icon.
- There is a checkbox on the top left that is a shortcut to select or deselect all displayed rows. This only applies to the 10 rows displayed on the current page, and not all the users.
- The search box placeholder text starts with 'Search'.


## Technologies

- The application is built with React and TailwindCSS.


## Installation

- Clone the repository from GitHub.
- Run `npm install` to install the dependencies.
- Run `npm start` to start the development server.

