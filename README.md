
# team15 :sparkles:

## Phase 1 Instructions

### Start the App

Use the command `npm install && npm start` to start the application.

### Login

The login credentials are as follows:

- Standard user: username *user*, password *user*
- Admin user: username *admin*, password *admin*

The *Create an Account* link redirects to the sign-up page, which is not implemented for this phase due to the need for server calls.

### User Home Page

After authentication, the user is redirected to the user home page. On this page the user can manage their current course enrollment, which is reflected in the drop-down menu titled *Courses*. Clicking *Join* or *Drop* on any of the listed courses adds or removes, respectively, the target course from the user's drop-down list of enrolled courses. Data sharing is not implemented in this phase, and any changes to the user's enrolled courses are not reflected in the other pages.

### User Search Page

The user search page can be reached from the drop-down menu in the navigation bar. For this phase, the user is redirected to a generic search page. It is on this page that the user can click on the *Add a Post* button to create a post of their own.

The user can interact with the posts in two ways:
1. If the user wishes to match with another user, they can click on the star icon next to the post of interest.
2. If the user wishes to delete a post they have authored, they can click the trash icon next to one of their own posts. 

In addition, the user is presented with the ability to search the posts for a particular user by name, which in turn lists the posts that match the given query.

### User Post Page

The user is redirected to the post page when they click on the *Add a Post* button,  where they can input their name, email address, and a short message about themselves. Error-checking for empty or invalid inputs is not implemented in this phase.

### Admin Home Page

After authentication, the admin is redirected to the admin home page. On this page the admin can update their name, email, password, and view the stats for the number of users and the number of courses. To further manage the users or courses, the admin can click on the appropriate link, *Manage Users* or *Manage Courses*.

### Admin User Page

The admin user page has several functionalities.

- The left panel displays the list of all users. The admin can change the username/password of a particular user, or delete the user altogether.
- The right panel allows the admin to add a user, as well as search for a particular user by ID and change their username/password. 

### Admin Course Page

The admin course page has several functionalities.

- The left panel displays the list of all courses. The admin can change the name of a particular course, or delete the course altogether.
- The right panel allows the admin to add a course, as well as search for a particular course by ID and change its name.