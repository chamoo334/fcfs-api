# fcfs-api

## TODO

### - [ ] Backend / Server

- [ ] Database interactions
  - [ ] Submit a new campsite
    - [ ] authenticated users only
    - [x] field validation via API
  - [ ] Update a campsite PUT
    - [ ] authenticated users only
    - [x] field validation via API
  - [ ] Delete a campsite
    - [ ] admin only
  - [ ] Delete a Park
    - [ ] admin only
    - [x] delete associated campgrounds
- [ ] Users & Authentication
  - [ ] Authentication via cookies (look at other alternatives)
  - [ ] Registration
    - [ ] Once registered a token with cookie will be sent
    - [ ] Passwords must be hashed
  - [ ] Login
    - [ ] User login with username and password
    - [ ] Once logged in a token will be sent along with a cookie
  - [ ] Logout
    - set token = none
  - [ ] Password reset (lost password)
    - [ ] User can request to reset password
    - [ ] A hashed token will be emailed to the users registered email address
    - [ ] A put request can be made to the generated url to reset password
    - [ ] The token will expire after 60 minutes
  - [ ] Update user info
    - [ ] Authenticated user only
    - [ ] Separate route to update password
  - [ ] User CRUD
    - [ ] Admin only
- [ ] Security
  - [ ] Encrypt passwords and reset tokens
  - [ ] Prevent cross site scripting - XSS
  - [ ] Prevent NoSQL injections
  - [ ] Add a rate limit for requests of 100 requests per 10 minutes
  - [ ] Protect against http param polution
  - [ ] Add headers for security (helmet)
  - [ ] Use cors to make API public (for now)

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

## In Progress

### - [ ] Backend / Server

- [ ] Users & Authentication
  - [ ] Authentication via cookies (look at other alternatives)
  - [ ] Registration
    - [ ] Once registered a token with cookie will be sent
    - [ ] Passwords must be hashed
- [ ] Database interactions
  - [ ] Submit a new campsite
    - [ ] authenticated users only
    - [x] field validation via API
  - [ ] Update a campsite PUT
    - [ ] authenticated users only
    - [x] field validation via API
  - [ ] Delete a campsite
    - [ ] admin only
  - [ ] Delete a Park
    - [ ] admin only
    - [x] delete associated campgrounds

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
