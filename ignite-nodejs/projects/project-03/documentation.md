# Gym Check-In REST API: Documentation
Basic documentation for use. Do not forget to follow the instructions to avoid errors, they're not so detailed in the documentation!

## Routes
<details>
  <summary><code>[POST] /gyms</code>: Create a new gym.</summary>

  > You must have an ADMIN role. Configure this in your database `npx prisma studio`.

  **Input (JSON Body)**:
  ```json
  {
    "name": "JavaScript Gym",
    "description": "",
    "phone": "",
    "latitude": -22.7884662,
    "longitude": -47.3021757
  }
  ```

  **Output**:
  > Response: 201 (Created)
</details>

---

<details>
  <summary><code>[POST] /users</code>: Create a new user.</summary>

  **Input (JSON Body)**:
  ```json
  {
    "name": "Felipe Elias",
    "email": "felipedaniel.me@gmail.com",
    "password": "123456"
  }
  ```

  **Output**:
  > Response: 201 (Created)
</details>

---

<details>
  <summary><code>[POST] /sessions</code>: Create a new auth session.</summary>

  **Input (JSON Body)**:
  ```json
  {
    "email": "felipedaniel.me@gmail.com",
    "password": "123456"
  }
  ```

  **Output**:
  > Response: 200 (OK)
</details>

---

<details>
  <summary><code>[POST] /gyms/:gymId/check-ins</code>: Create a new check-in.</summary>

  **Input (JSON Body)**:
  ```json
  {
    "userLatitude": -22.7884662,
    "userLongitude": -47.3021757
  }
  ```

  **Output**:
  > Response: 201 (Created)
</details>

---

<details>
  <summary><code>[GET] /me</code>: Returns your profile information.</summary>

  **Output**:
  > Response: 200 (OK)
  ```json
  {
    "id": "ab7c9666-4acd-4f17-9be8-b35337c8cd0d",
	  "name": "Felipe Daniel",
	  "email": "felipedaniel.me@gmail.com",
	  "role": "ADMIN",
	  "created_at": "2024-01-21T11:52:54.746Z"
  }
  ```
</details>

---

<details>
  <summary><code>[GET] /gyms/search?query=(YOUR QUERY)</code>: Returns a gym containing the query searched.</summary>

  **Output**:
  > Response: 200 (OK)
  ```json
  {
    "gyms": [
      {
        "id": "78d565ce-b219-4f96-b216-81a4093c4f79",
        "name": "JavaScript Gym",
        "description": "",
        "phone": "",
        "latitude": "-22.7884662",
        "longitude": "-47.3021757"
      }
    ]
  }
  ```
</details>

---

<details>
  <summary><code>[GET] /gyms/nearby?userLatitude=(YOUR LATITUDE)&userLongitude=(YOUR LONGITUDE)</code>: Returns nearby gyms based on user location.</summary>

  **Output**:
  > Response: 200 (OK)
  ```json
  {
    "gyms": [
      {
        "id": "78d565ce-b219-4f96-b216-81a4093c4f79",
        "name": "JavaScript Gym",
        "description": "",
        "phone": "",
        "latitude": "-22.7884662",
        "longitude": "-47.3021757"
      }
    ]
  }
  ```
</details>

---

<details>
  <summary><code>[GET] /checkIns/history</code>: Returns your check-ins history.</summary>

  **Output**:
  > Response: 200 (OK)
  ```json
  {
    "checkIns": [
      {
        "id": "be411729-9543-4d61-adbf-4ea40ba5b7c6",
        "created_at": "2024-04-30T11:16:20.691Z",
        "validated_at": null,
        "user_id": "ab7c9666-4acd-4f17-9be8-b35337c8cd0d",
        "gym_id": "78d565ce-b219-4f96-b216-81a4093c4f79"
      }
    ]
  }
  ```
</details>

---

<details>
  <summary><code>[GET] /checkIns/metrics</code>: Returns your check-ins amount.</summary>

  **Output**:
  > Response: 200 (OK)
  ```json
  {
    "checkInsCount": 1
  }
  ```
</details>

---

<details>
  <summary><code>[PATCH] /checkIns/:checkInId/validate</code>: Validate a checkIn.</summary>

  > You must have an ADMIN role. Configure this in your database `npx prisma studio`.

  **Output**:
  > Response: 204 (No Content)
</details>

---

<details>
  <summary><code>[PATCH] /token/refresh</code>: Create a new session token.</summary>

  **Output**:
  > Response: 200 (OK)
  ```json
  {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiQURNSU4iLCJzdWIiOiJhYjdjOTY2Ni00YWNkLTRmMTctOWJlOC1iMzUzMzdjOGNkMGQiLCJpYXQiOjE3MTQ0NzY2MjQsImV4cCI6MTcxNDQ3NzIyNH0.QqTo2L45ewMkdQkSuo8lJ9b-63JN3VCDGQZuhm-4ToA"
  }
  ```
</details>

<br />

## Expected errors
`[400] Validation error!`: You're probably trying to make a request without enough data, or incorrect data.

`[401] Unauthorized!`: You're probably trying to access a private route without meeting the requirements (session or role).

`[401] Invalid credentials!`: You're probably trying to login with incorrect data.

`[403] Unable to check in away from a gym!`: You're probably trying to check in more than 100 meters away from the gym.

`[404] Resource not found!`: You're probably trying to get a nonexistent resource.

`[409] User already exists!`: You're probably trying to create an user with an email already in use.

`[409] Check-in has already been completed for today!`: You're probably trying to do more than one check-in on the same day.

`[409] Unable to validate an already validated check-in!`: You're probably trying to validate an already validated check-in.

`[422] Unable to validate the check-in after 20 minutes of its creation!`: You're probably trying to validate a check-in more than 20 minutes after its creation.
