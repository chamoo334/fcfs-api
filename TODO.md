# fcfs-api

## TODO

### Expand User Dashboard page

### Expand comments for individual campgrounds

### - Backend / Server

- [ ] models/Photo.js -> testing & integration
- [ ] comments -> db model, testing, & integration
- [ ] public profile -> db, testing, & integration

### - Frontend / Client

- [ ] Security
  - [ ] Prevent XSS using domPurify
- [ ] Direct paths:
  - [ ] Public profiles
  - [ ] Individual state
    - [ ] list all parks
      - [ ] list all campgrounds
        - [ ] direct link to campground's page
- [ ] Dashboard

  - [ ] User Page
    - [ ] public profile editing
    - [ ] protected admin features
    - [ ] provide option to include coordinates when submitting campground
  - [ ] Reducers & Actions
    - [ ] UPDATE_DETAILS_SUCCESS
    - [ ] UPDATE_DETAILS_FAIL
    - [ ] UPDATE_PASSWORD_SUCCESS
    - [ ] UPDATE_PASSWORD_FAIL
    - [ ] SUBMIT_CAMPGROUND_SUCCESS
    - [ ] SUBMIT_CAMPGROUND_FAIL

- [ ] Public Profile Page
- [ ] All States Page
  - [ ] find within a radius of your current location
- [ ] Park Page
  - [ ] protected delete option for admin only
- [ ] Campground Page
  - [ ] provide option to include coordinates
  - [ ] protected delete option for admin only
- [ ] API Documentation Page
  - [ ] Side navigation to select different versions
  - [ ] formating with markdown-to-jsx ?
- [ ] Photo integration
- [ ] Comments Integration

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
- [x] Database interactions
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
- [x] Users & Authentication
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
    - [x] The token will expire after 60 minutes
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

### - Frontend / Client

- [x] Home Page
  - [x] Registration / Login
    - [x] Persistent
    - [x] forgot password
  - [x] Navbar
    - [x] Persistent
  - [x] redirect to dashboard with valid token
- [x] Auth
  - [x] Confirm Email
    - [x] Redirect to dashboard
  - [x] reset Password
    - [x] Redirect to login
- [ ] User Page
  - [x] Add campground
  - [x] Update details
  - [x] Update password
- [ ] All States Page
  - [x] View by state clickable image
    - [x] dropdown list all parks
      - [x] click to go to specific park
- [ ] Park Page
  - [x] list all campgrounds
  - [x] click to go to specific campground
    - [x] private route
- [ ] Campground Page
  - [x] display campground information
  - [x] vote on campground
  - [x] update campground
  - [x] protected
- [ ] API Documentation Page
  - [x] MVP data

## Possible Changes / Improvements

### - Backend / Server

- [ ] Security
  - [ ] Prevent cross site scripting xss-clean vs xss
  - [ ] models/Campground -> CampgroundSchema.pre('findOneAndUpdate') -> cache userID if attempting to alter prohibited field
    - [ ] possibly remove privileges
  - [ ] controllers/v1/auth.js -> authLogout blacklist for tokens or alternative

### - Frontend / Client

- [ ] Universal state management function for clearing based on location

### - General
