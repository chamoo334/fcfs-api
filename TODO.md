# fcfs-api

## TODO

### - Frontend / Client

- [ ] Home Page
  - [ ] Registration / Login
    - [ ] Persistent ?
  - [ ] Dropdown Navbar
  - [ ] View by state clickable image
  - [ ] find within your current radius
- [ ] User Page
  - [ ] Add campground
- [ ] State Page
  - [ ] list all parks
  - [ ] click to view all parks
  - [ ] click to go to specific park
- [ ] Park Page
  - [ ] list all campgrounds
  - [ ] click to view all campgrounds
  - [ ] click to go to specific campground
- [ ] Campground Page
  - [ ] display campground information
  - [ ] vote on campground
    - [ ] authenticated users can update
- [ ] API Documentation Page
- [ ] Security
  - [ ] Prevent XSS using domPurify

## In Progress

## Done ✓

### - [ ] Backend / Server

- [x] basic route configurations for:
  - [x] GET /v1/campgrounds
  - [x] GET /v1/campgrounds/:zipcode/:distance
  - [x] GET /v1/:state
  - [x] GET /v1/:state/:park
  - [x] GET /v1/:state/:park/:campground
  - [x] POST /v1/:state
  - [x] PUT /v1/:state/:park/:campground
  - [x] PUT /v1/:state/:park/:campground/good
  - [x] PUT /v1/:state/:park/:campground/bad
  - [x] DELETE /v1/:state/:park
  - [x] DELETE /v1/:state/:park/:campground
- [ ] Database interactions
  - [x] List all campgrounds
  - [x] List all campgrounds by state
  - [x] Search by radious from zipcode using geocoder to get exact locations
  - [x] List campgrounds by park in a state
  - [x] Fetch specific campground
  - [x] Pagination
  - [x] Submit a new campsite
    - [x] authenticated users only
    - [x] field validation via API
  - [x] Update a campsite PUT
    - [x] authenticated users only
    - [x] field validation via API
  - [x] Delete a campsite
    - [x] admin only
  - [x] Delete a Park
    - [x] admin only
    - [x] delete associated campgrounds
- [ ] Users & Authentication
  - [x] Authentication via cookies or headers
  - [x] Registration
    - [x] Once registered a token with cookie will be sent
    - [x] Passwords must be hashed
  - [x] Login
    - [x] User login with username and password
    - [x] Once logged in a token will be sent along with a cookie
  - [x] Logout
    - [x] set token = none
  - [x] Password reset (lost password)
    - [x] User can request to reset password
    - [x] A hashed token will be emailed to the users registered email address
    - [x] A put request can be made to the generated url to reset password
    - [ ] The token will expire after 60 minutes
  - [x] Update user info
    - [x] Authenticated user only
    - [x] Separate route to update password
  - [x] Update user password
    - [x] Authenticated user only
    - [x] validate current and new passwords
  - [x] User CRUD
    - [x] Admin only
- [x] Security
  - [x] Encrypt passwords and reset tokens
  - [x] Prevent XSS by stripping html from input
  - [x] Prevent NoSQL injections using express-mongo-sanitize
  - [x] Add a rate limit for requests of 100 requests per 10 minutes
  - [x] Protect against http param polution
  - [x] Add headers for security (helmet)
  - [x] Use cors to make API public (for now)

## Consider

### - [ ] Backend / Server

- [ ] Security
  - [ ] Prevent cross site scripting xss-clean vs xss
