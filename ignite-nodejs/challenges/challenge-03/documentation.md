# Find a Friend REST API: Documentation
Basic documentation for use. Do not forget to follow the instructions to avoid errors, they're not so detailed in the documentation!

## Routes
<details>
  <summary><code>[POST] /orgs</code>: Create a new org.</summary>

  **Input (JSON Body)**:
  ```json
  {
    "name": "Test Org",
    "email": "test@example.com",
    "password": "123456",
    "whatsapp_number": "+55 00-000000000",
    "cep": "00000001",
    "address": "Test Street, 001, Non-existent City,",
    "manager": "Test Manager"
  }
  ```

  **Output**:
  > Response: 201 (Created)
  ```json
  {
    "org": {
      "id": "28bbc6eb-f576-46a9-8b7b-985799131b9f",
      "name": "Test Org",
      "email": "test@example.com",
      "cep": "00000001",
      "address": "Test Street, 001, Non-existent City,",
      "whatsapp_number": "+55 00-000000000",
      "manager": "Test Manager",
      "created_at": "2024-05-02T11:05:10.990Z"
    }
  }
  ```
</details>

---

<details>
  <summary><code>[POST] /sessions</code>: Create a new session.</summary>

  **Input (JSON Body)**:
  ```json
  {
    "email": "test@example.com",
    "password": "123456"
  }
  ```

  **Output**:
  > Response: 200 (OK)
  ```json
  {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyOGJiYzZlYi1mNTc2LTQ2YTktOGI3Yi05ODU3OTkxMzFiOWYiLCJpYXQiOjE3MTQ2NDgxNjEsImV4cCI6MTcxNDY0ODc2MX0.HlpHtI-ej7VP4AUSsyDqDnF9HvTYCIped2af8lLFFoI"
  }
  ```
</details>

---

<details>
  <summary><code>[POST] /pets</code>: Create a new pet.</summary>

  **Input (JSON Body)**:
  ```json
  {
    "name": "Test Pet",
    "age": 1,
    "breed": "Golden Retriever",
    "size": "LARGE",
    "presentation": "Hello! My name is Test Pet because i don't have a name and I'm a test.",
    "energy_level": 4,
    "independence_level": "LOW",
    "adapted_climate": "TEMPERATE",
    "appropriate_environment": "Large place with a pool",
    "care": [],
    "city": "Non-existent City",
    "photos": [],
    "orgId": "28bbc6eb-f576-46a9-8b7b-985799131b9f"
  }
  ```

  **Output**:
  > Response: 201 (Created)
  ```json
  {
    "pet": {
      "id": "1fc7dfbf-89dd-4ed5-a08c-a390ca346de1",
      "name": "Test Pet",
      "age": 1,
      "breed": "Golden Retriever",
      "size": "LARGE",
      "energy_level": 4,
      "independence_level": "LOW",
      "adapted_climate": "TEMPERATE",
      "appropriate_environment": "Large place with a pool",
      "care": [],
      "presentation": "Hello! My name is Test Pet because i don't have a name and I'm a test.",
      "photos": [],
      "city": "Non-existent City",
      "orgId": "28bbc6eb-f576-46a9-8b7b-985799131b9f"
    }
  }
  ```
</details>

---

<details>
  <summary><code>[GET] /pets/:petId</code>: Returns a specific pet.</summary>

  **Output**:
  > Response: 200 (OK)
  ```json
  {
    "pet": {
      "id": "1fc7dfbf-89dd-4ed5-a08c-a390ca346de1",
      "name": "Test Pet",
      "age": 1,
      "breed": "Golden Retriever",
      "size": "LARGE",
      "energy_level": 4,
      "independence_level": "LOW",
      "adapted_climate": "TEMPERATE",
      "appropriate_environment": "Large place with a pool",
      "care": [],
      "presentation": "Hello! My name is Test Pet because i don't have a name and I'm a test.",
      "photos": [],
      "city": "Non-existent City",
      "orgId": "28bbc6eb-f576-46a9-8b7b-985799131b9f"
    }
  }
  ```
</details>

---

<details>
  <summary><code>[GET] /pets?city=(CITY)</code>: Returns all pets filtered by your query.</summary>

  Query Options:
  > You can use both, but "city" is required
  ```
    city: any city (required)
    age: any age (optional)
    breed: any breed (optional)
    size: SMALL, MEDIUM or LARGE (optional)
    energy_level: 1-5 (optional)
    independence_level: LOW, MEDIUM or HIGH (optional)
    adapted_climate: COLD, TEMPERATE or HEAT (optional)
  ```

  **Output**:
  > Response: 200 (OK)
  ```json
  {
    "pets": [
      {
        "id": "1fc7dfbf-89dd-4ed5-a08c-a390ca346de1",
        "name": "Test Pet",
        "age": 1,
        "breed": "Golden Retriever",
        "size": "LARGE",
        "energy_level": 4,
        "independence_level": "LOW",
        "adapted_climate": "TEMPERATE",
        "appropriate_environment": "Large place with a pool",
        "care": [],
        "presentation": "Hello! My name is Test Pet because i don't have a name and I'm a test.",
        "photos": [],
        "city": "Non-existent City",
        "orgId": "28bbc6eb-f576-46a9-8b7b-985799131b9f"
      }
    ]
  }
  ```
</details>

---

<details>
  <summary><code>[PATCH] /token/refresh</code>: Create a new auth token.</summary>

  **Output**:
  > Response: 200 (OK)
  ```json
  {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyOGJiYzZlYi1mNTc2LTQ2YTktOGI3Yi05ODU3OTkxMzFiOWYiLCJpYXQiOjE3MTQ2NTAxMzEsImV4cCI6MTcxNDY1MDczMX0.FPYLcboZr59QJHc1zzb9K1eVvB67INPOK5rpX3M7l98"
  }
  ```
</details>

<br />

## Expected errors
`[400] Validation error!`: You're probably trying to make a request without enough data, or incorrect data.

`[400] The energy level must be a number equal to or between 1 and 5!`: You're probably trying to create a pet sending an invalid energy level.

`[400] You must provide a city to fetch pets!`: You're probably trying to get a filtered pet list without sending at least a city.

`[401] Unauthorized!`: You're probably trying to access a private route without meeting the requirements (session).

`[401] Invalid credentials!`: You're probably trying to login with incorrect data.

`[404] Resource not found!`: You're probably trying to get a nonexistent resource.

`[409] Org already exists!`: You're probably trying to create an org with an email already in use.
