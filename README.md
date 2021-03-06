# ![First Come First Served](git_img/fcfs-logo-temp.png)

- [!First Come First Served](#)
  - [API: https://www.fcfs.link/api/v1](#api-httpswwwfcfslinkapiv1)
    - [Open Endpoints](#open-endpoints)
      - [1. Get All Campgrounds](#1-get-all-campgrounds)
      - [2. Get Campgrounds Within a Radius](#2-get-campgrounds-within-a-radius)
      - [3. Get Campgrounds By State](#3-get-campgrounds-by-state)
      - [4. Get Campgrounds By Park](#4-get-campgrounds-by-park)
      - [5. Get A Single Campground](#5-get-a-single-campground)
      - [6. Login](#6-login)
    - [Closed Endpoints](#closed-endpoints)
      - [1. Add Campground](#1-add-campground)
      - [2. Edit Campground](#2-edit-campground)
      - [3. Up Vote Campground](#3-up-vote-campground)
      - [4. Down Vote Campground](#4-down-vote-campground)
      - [5. Logout User](#5-logout-user)
  - [Community Website](#community-website)
    - [Purpose:](#purpose)
    - [Development](#development)
      - [1. Project Details](https://github.com/chamoo334/fcfs-api/tree/main/fcfs)
        - [1. Frontend Notes](https://github.com/chamoo334/fcfs-api/tree/main/fcfs/client)
        - [2. Backend Notes](https://github.com/chamoo334/fcfs-api/tree/main/fcfs/server)
      - [2. Sass Styling](https://github.com/chamoo334/fcfs-api/tree/main/dev_docs/api_theme_docs)

## API: https://www.fcfs.link/api/v1

_Notes:<br> - all URL parameters are lowercase with - replacing all spaces. <br> - state parameters are the requested state's 2 letter indentifier_

### Open Endpoints

Open endpoints require no Authentication. Used to fetch campground data.

#### 1. Get All Campgrounds

Fetch all campgrounds.

**_Endpoint:_**

```bash
Method: GET
Type: application/json
URL:/campgrounds
```

**_Success Response:_**

Code: `200 OK`

```js
{
    "sucess": true,
    "count": 2,
    "data": [
        {
            "location": {
                "coordinates": [
                    [lat value],
                    [lon value]
                ],
                "formattedAddress": "[submitted address in formatted form]"
            },
            "name": "name of campground",
            "park": "name of park",
            "state": "state's 2 letter identifier",
            "fee": [integer value],
            "toilet": [boolean],
            "water": [boolean],
            "yearRound": [boolean],
            "lastModifiedBy": "[user's name]",
            "photo": "photo-camp-no-photo.jpg",
            "lastUpdate": "[date of creation]",
            "slug": "ccc-quarry-backpacking-campsite-2",
            "votes": {
                "total": [# of total votes],
                "percentPos": [% of votes that are positive]
            },
            "parkSlug": "[slug of park associated with campground]"
        },
        {
            "location": {
                "coordinates": [
                    36.457097,
                    -116.866158
                ],
                "formattedAddress": "328 Greenland Blvd, Death Valley, CA 92328-9600, US"
            },
            "name": "name of campground",
            "park": "name of park",
            "state": "state's 2 letter identifier",
            "fee": [integer value],
            "toilet": [boolean],
            "water": [boolean],
            "yearRound": [boolean],
            "lastModifiedBy": "[user's name]",
            "photo": "photo-camp-no-photo.jpg",
            "lastUpdate": "[date of creation]",
            "slug": "ccc-quarry-backpacking-campsite-2",
            "votes": {
                "total": [# of total votes],
                "percentPos": [% of votes that are positive]
            },
            "parkSlug": "[slug of park associated with campground]"
        },
    ]
}
```

#### 2. Get Campgrounds Within a Radius

Fetch all campgrounds within a radius from the any zipcode.

**_Endpoint:_**

```bash
Method: GET
Type: application/json
URL: /campgrounds/:zipcode/:radius
```

<sub>Radius is assumed to be miles</sub>
**_Success Response:_**

Code: `200 OK`

```js
{
    "sucess": true,
    "count": 1,
    "data": [
        {
            "location": {
                "coordinates": [
                    [lat value],
                    [lon value]
                ],
                "formattedAddress": "[submitted address in formatted form]"
            },
            "name": "name of campground",
            "park": "name of park",
            "state": "state's 2 letter identifier",
            "fee": [integer value],
            "toilet": [boolean],
            "water": [boolean],
            "yearRound": [boolean],
            "lastModifiedBy": "[user's name]",
            "photo": "photo-camp-no-photo.jpg",
            "lastUpdate": "[date of creation]",
            "slug": "ccc-quarry-backpacking-campsite-2",
            "votes": {
                "total": [# of total votes],
                "percentPos": [% of votes that are positive]
            },
            "parkSlug": "[slug of park associated with campground]"
        },
    ]
}
```

#### 3. Get Campgrounds By State

Fetch all campgrounds within a specific state.

**_Endpoint:_**

```bash
Method: GET
Type: application/json
URL: /:state
```

**_Success Response:_**

Code: `200 OK`

```js
{
    "sucess": true,
    "count": 1,
    "data": [
        {
            "location": {
                "coordinates": [
                    [lat value],
                    [lon value]
                ],
                "formattedAddress": "[submitted address in formatted form]"
            },
            "name": "name of campground",
            "park": "name of park",
            "state": "state's 2 letter identifier",
            "fee": [integer value],
            "toilet": [boolean],
            "water": [boolean],
            "yearRound": [boolean],
            "lastModifiedBy": "[user's name]",
            "photo": "photo-camp-no-photo.jpg",
            "lastUpdate": "[date of creation]",
            "slug": "ccc-quarry-backpacking-campsite-2",
            "votes": {
                "total": [# of total votes],
                "percentPos": [% of votes that are positive]
            },
            "parkSlug": "[slug of park associated with campground]"
        },
    ]
}
```

#### 4. Get Campgrounds By Park

Fetch all campgrounds within a specific park.

**_Endpoint:_**

```bash
Method: GET
Type: application/json
URL: /:state/:park
```

**_Success Response:_**

Code: `200 OK`

```js
{
    "sucess": true,
    "count": 1,
    "data": [
        {
            "location": {
                "coordinates": [
                    [lat value],
                    [lon value]
                ],
                "formattedAddress": "[submitted address in formatted form]"
            },
            "name": "name of campground",
            "park": "name of park",
            "state": "state's 2 letter identifier",
            "fee": [integer value],
            "toilet": [boolean],
            "water": [boolean],
            "yearRound": [boolean],
            "lastModifiedBy": "[user's name]",
            "photo": "photo-camp-no-photo.jpg",
            "lastUpdate": "[date of creation]",
            "slug": "ccc-quarry-backpacking-campsite-2",
            "votes": {
                "total": [# of total votes],
                "percentPos": [% of votes that are positive]
            },
            "parkSlug": "[slug of park associated with campground]"
        },
    ]
}
```

#### 5. Get A Single Campground

Fetch a specific campground.

**_Endpoint:_**

```bash
Method: GET
Type: application/json
URL: /:state/:park/:campground
```

**_Success Response:_**

Code: `200 OK`

```js
{
    "sucess": true,
    "count": 1,
    "data": [
        {
            "location": {
                "coordinates": [
                    [lat value],
                    [lon value]
                ],
                "formattedAddress": "[submitted address in formatted form]"
            },
            "name": "name of campground",
            "park": "name of park",
            "state": "state's 2 letter identifier",
            "fee": [integer value],
            "toilet": [boolean],
            "water": [boolean],
            "yearRound": [boolean],
            "lastModifiedBy": "[user's name]",
            "photo": "photo-camp-no-photo.jpg",
            "lastUpdate": "[date of creation]",
            "slug": "ccc-quarry-backpacking-campsite-2",
            "votes": {
                "total": [# of total votes],
                "percentPos": [% of votes that are positive]
            },
            "parkSlug": "[slug of park associated with campground]"
        },
    ]
}
```

#### 6. Login

Successful login provides the user with a token for use with protected routes. All fields are required.

**_Endpoint:_**

```bash
Method: POST
Type: application/json
URL: /auth/login
```

**_Body Constraints:_**

```js
{
    "name": "[valid name of registered user]",
    "password": "[valid password]"
}
```

**_Success Response:_**

Code: `200 OK`

```js
{
    "token": "[valid token to be used with requests]"
}
```

**_Error Response:_**

Condition: Name and/or password are invalid.

Code: `401 Unauthorized`

```js
{
    "success": false,
    "error": "Invalid credentials"
}
```

### Closed Endpoints

Require a valid token to be included in the header of the
request. A token can be acquired from via [Login](#6-login).

#### 1. Add Campground

Allows registered users to add a campground. All fields are required except 'vote'. Should a user want to vote, use 1 or -1 to indicate positive or negative review.

**_Endpoint:_**

```bash
Method: POST
Type: application/json
URL: /:state
```

<sub>The state attribute of the body should match that of the endpoint's URL</sub>

**_Body Constraints:_**

```js
{
    "name": "[name of campground]" [required],
    "park": "[name of park]" [required],
    "state": "[state's 2 letter identifier]" [required],
    "address": "[street address, city, state, zip code]" [required for new parks],
    "fee": [integer value] [required],
    "toilet": [boolean] [required],
    "water": [boolean] [required],
    "yearRound": [boolean] [required],
    "vote": [1 or -1] [optional]
}
```

**_Success Response:_**

Code: `201 Created`

```js
{
    "success": true,
    "resData": {
        "name": "name of campground",
        "park": "name of park",
        "state": "state's 2 letter identifier",
        "location": {
            "coordinates": [
                [lat value],
                [lon value]
            ],
            "formattedAddress": "[submitted address in formatted form]"
        },
        "fee": [integer value],
        "toilet": [boolean],
        "water": [boolean],
        "yearRound": [boolean],
        "lastModifiedBy": "[user's name]",
        "photo": "photo-camp-no-photo.jpg",
        "lastUpdate": "[date of creation]",
        "slug": "ccc-quarry-backpacking-campsite-2",
        "votes": {
            "total": [# of total votes],
            "percentPos": [% of votes that are positive]
        },
        "parkSlug": "[slug of park associated with campground]"
    }
}
```

**_Error Response:_**

Condition: Campground data already exists.

Code: `400 Bad Request`

```js
{
    "success": false,
    "error": "Campground associated with the provided park already exists."
}
```

Condition: The park associated with the campground was not found and an address is required to proceed with submitting both a new campground and a new park.

Code: `404 Not Found`

Content Example:

```js
{
    "success": false,
    "error": "Please include an address for either the campground or the park"
}
```

#### 2. Edit Campground

Allows registered contributors to edit an existing campground.

**_Endpoint:_**

```bash
Method: PUT
Type: application/json
URL: /:state/:park/:campground
```

**_Body Constraints:_**

```js
{
    "address": "[street address, city, state, zip code]" [optional],
    "fee": [integer value] [optional],
    "toilet": [boolean] [optional],
    "water": [boolean] [optional],
    "yearRound": [boolean] [optional],
}
```

<sub>Updating the address will only apply to the requested campground and not the associated park</sub>

**_Success Response:_**

Code: `200 OK`

```js
{
    "success": true,
    "resData": {
        "name": "name of campground",
        "park": "name of park",
        "state": "state's 2 letter identifier",
        "location": {
            "coordinates": [
                [lat value],
                [lon value]
            ],
            "formattedAddress": "[submitted address in formatted form]"
        },
        "fee": [integer value],
        "toilet": [boolean],
        "water": [boolean],
        "yearRound": [boolean],
        "lastModifiedBy": "[user's name]",
        "photo": "photo-camp-no-photo.jpg",
        "lastUpdate": "[date of creation]",
        "slug": "ccc-quarry-backpacking-campsite-2",
        "votes": {
            "total": [# of total votes],
            "percentPos": [% of votes that are positive]
        },
        "parkSlug": "[slug of park associated with campground]"
    }
}
```

**_Error Response:_**

Condition: Attempted to edit prohibited fields. Such attempts result in not being able to find a correlating campground to edit.

Code: `404 Not Found`

```js
{
    "success": false,
    "error": "park,state,vote are prohibited fields for updates"
}
```

Condition: Invalid token in request

Code: `401 Unauthorized`

```js
{
    "success": false,
    "error": "Not authorized to access this route"
}
```

#### 3. Up Vote Campground

Provide a positive review of a campground.

**_Endpoint:_**

```bash
Method: PUT
Type: application/json
URL: /:state/:park/:campground/good
```

**_Success Response:_**

Code: `200 OK`

```js
{
    {
    "success": true,
    "resData": {
        "name": "name of campground",
        "park": "name of park",
        "state": "state's 2 letter identifier",
        "location": {
            "coordinates": [
                [lat value],
                [lon value]
            ],
            "formattedAddress": "[submitted address in formatted form]"
        },
        "fee": [integer value],
        "toilet": [boolean],
        "water": [boolean],
        "yearRound": [boolean],
        "lastModifiedBy": "[user's name]",
        "photo": "photo-camp-no-photo.jpg",
        "lastUpdate": "[date of creation]",
        "slug": "ccc-quarry-backpacking-campsite-2",
        "votes": {
            "total": [# of total votes],
            "percentPos": [% of votes that are positive]
        },
        "parkSlug": "[slug of park associated with campground]"
    }
}
}
```

**_Error Response:_**

Condition: Invalid token in request

Code: `401 Unauthorized`

```js
{
    "success": false,
    "error": "Not authorized to access this route"
}
```

#### 4. Down Vote Campground

Provide a negative review of a campground.

**_Endpoint:_**

```bash
Method: PUT
Type: application/json
URL: /:state/:park/:campground/bad
```

**_Success Response:_**

Code: `200 OK`

```js
{
    {
    "success": true,
    "resData": {
        "name": "name of campground",
        "park": "name of park",
        "state": "state's 2 letter identifier",
        "location": {
            "coordinates": [
                [lat value],
                [lon value]
            ],
            "formattedAddress": "[submitted address in formatted form]"
        },
        "fee": [integer value],
        "toilet": [boolean],
        "water": [boolean],
        "yearRound": [boolean],
        "lastModifiedBy": "[user's name]",
        "photo": "photo-camp-no-photo.jpg",
        "lastUpdate": "[date of creation]",
        "slug": "ccc-quarry-backpacking-campsite-2",
        "votes": {
            "total": [# of total votes],
            "percentPos": [% of votes that are positive]
        },
        "parkSlug": "[slug of park associated with campground]"
    }
}
}
```

**_Error Response:_**

Condition: Invalid token in request

Code: `401 Unauthorized`

```js
{
    "success": false,
    "error": "Not authorized to access this route"
}
```

#### 5. Logout User

Removes active cookie associated with the user's account.

**_Endpoint:_**

```bash
Method: GET
Type: application/json
URL: /auth/logout
```

**_Success Response:_**

Code: `200 OK`

**_Error Response:_**

Condition: Invalid token in request

Code: `401 Unauthorized`

```js
{
    "success": false,
    "error": "Not authorized to access this route"
}
```

## Community Website

### Purpose:

FCFS was created to facilitate the collection and organization of campgrounds that do not accept reservations. In addition to promoting community driven data collection, the API ws created to assist with making the data easily available for use within any other application.

Community website can be found [here](https://www.fcfs.link/).

### Development:

- [General Project Summary](https://github.com/chamoo334/fcfs-api/tree/main/fcfs)
- [SASS Styling](https://github.com/chamoo334/fcfs-api/dev_docs/api_theme_docs)

[Back to top](#fcfs-api)
