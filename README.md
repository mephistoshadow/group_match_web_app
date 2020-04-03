

# Team 15

## Deployed URL

https://rhubarb-pudding-41030.herokuapp.com/

## Login

The login credentials are as follows:

- Standard user: username *user*, password *user*
- Admin user: username *admin*, password *admin*

We have two additional pre-configured standard users available:

- Username *janedoe*, password *password*
- Username *johndoe*, password *password*

## Sign Up

The sign up page provides the ability to create a new standard user account. It includes error checks for the email and username fields, that is, they must not already be in use. Once the form includes a valid email, username, and password, the user can then specify their personal infromation. Standard error checks are in place to make sure none of the fields are left blank and contain valid data. Once the sign up form is correct and complete, the user is re-directed to the login page to sign in with their new account.

*Note that it is not available to create an admin account through the sign up form.*

## How to Use: User Side

### Home Page: */dashboard*

Upon login, the user is directed to the dashboard, where they can manage their course enrollments. For each available course, they can:

- Join the course, which adds the course to the *Courses* dropdown in the header
- Drop the course, which removes the course from the *Courses* dropdown in the header

The user can navigate to the search page of the courses they are enrolled in via the courses dropdown.

### Course Search Page: */search/course/:course-id*

Each search page includes a header with the course title to inform which course the search page is for, and displays all the posts made by the enrolled students. Each post includes the username, year, CGPA, and commuter status of the author, as well as the content of the post. Users can match with each other via the star icon on the top-right side of the post. A user can add or delete their own post, and is limited to one post per course. The filters on the side of each course page allow the user to narrow down their search by applying the relevant year, CGPA, and commuter status filters. Note that having all or none of the filters activated, in both cases, displays all the posts. The search bar provides the user with the ability to query the posts by username.

### Match Page: */matches*

The match page displays all the *two-way* matches for the current user in their enrolled courses. By two-way match, we mean both users have to match with each other in order to connect to one another. For each match, a user has the option to view their profile or remove the match in that course altogether. If the user chooses to view the profile of their match, they can see their match's personal information, which is unavailable otherwise. The *Contact this user* button triggers the default mail client to compose a new blank email to the match.

### Profile Page: */profile/user/:user-id*

On the user profile page, a user is able to manipulate their login credentials (the username is immutable) and personal information. Note that accessing a profile other than your own yields read-only access to the user's personal information (and hides login credential information), as opposed to read and write access on a user's personal profile.

## How to Use: Admin Side

### Home Page: */admin-profile*
The standard dashboard for an admin displays their login credentials, which they can edit, and provides a breakdown of the number of students and number of courses in the database.

### Manage Student Users: */admin-user*

The *Users* page allows an admin to view and manipulate all the students in the database. The permitted admin actions are:

- Edit the login credentials, username and password, of a user
- Delete a user from the database

An admin is able to add a new standard user to the database by specifying a unique username and corresponding password. Note that the personal information fields (full name, year, CGPA, commuter status) of the newly-added user are initialized to default 'empty' values.

An admin is able to query the database for a particular user by their assigned user ID.

### Manage Courses: */admin-course*

The *Courses* page allows an admin to view and manipulate all the courses in the database. The permitted admin actions are:

- Edit the title and code of a course
- Delete a course from the database

An admin is able to add a new course to the database by specifying a unique course code and corresponding title.

An admin is able to query the database for a particular course by their assigned course ID.

## Routes

### Authentication Routes
POST: */users/login*
POST: */users/logout*
POST: */users/check-session*

### User Routes
POST: */users*
POST: */users/signup*
POST: */users/admin/password/:username*
GET: */users/:id*
GET:  */users/username/:username*
GET: */users/username/:email*
DELETE: */users/:username*
PATCH: */users/admin/:user*
PUT: */users/update/:id*

### Admin Routes
POST: */admin*
GET: */admin*

### Student Routes
POST: */students*
POST: */students/add-course*
POST: */students/remove-course*
lGET: */students*
GET */students/:id*
GET: */students/courses/:id*
DELETE: */students/:id*
PATCH: */students/admin/:id*
PUT: */students/update/:id*

### Course Routes
POST: */courses*
GET: */courses*
GET: */courses/:id*
DELETE: */courses*
PATCH: */courses/:id*

### Post Routes
POST: */posts*
GET: */posts/:courseId*
GET: */posts/:courseId/:author*
DELETE: */posts/:courseId*

### Match Routes
POST: */matches*
GET:  */matches*
GET: */matches/sent/user-id/course-id*
DELETE: */matches*