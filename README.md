# fcfs-api

## TODO

### - [ ] Backend / Server

- [ ] basic route configurations for:
  - [x] GET /v1/campgrounds
  - [x] GET /v1/campgrounds/:state
  - [x] GET /v1/campgrounds/:state/:parkid
  - [x] GET /v1/radius#
  - [x] POST /v1/:id/submit/:park/:campground
  - [ ] PUT /v1/:id/:park/:campground
  - [ ] DELETE /v1/:id/:park/:campground
- [ ] Database interactions
  - [ ] List all campgrounds GET /v1/campgrounds
  - [ ] List all campgrounds by state GET /v1/campgrounds
  - [ ] Search by radious from zipcode using geocoder to get exact locations GET /v1/radius#
  - [ ] List campgrounds in a specific region GET /v1/region#
  - [ ] Submit a new campsite POST /v1/submit/region:number/:park
    - [ ] authenticated users only
    - [ ] field validation via API
  - [ ] Update a campsite PUT /v1/update/region#/park/campground
    - [ ] authenticated users only
    - [ ] field validation via API
  - [ ] Delete a campsite DELETE /v1/region#/
    - admin only
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

- [ ] Documentation
  - [ ] API
  - [ ] Online
- [ ]

## In Progress

## Done ✓
