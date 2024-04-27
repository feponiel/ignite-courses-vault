# User CRUD REST API: Documentation
Basic documentation for use. Do not forget to follow the instructions to avoid errors, they're not so detailed in the documentation!

## Routes
<details>
  <summary><code>[POST] /users</code>: Create a new user.</summary>

  **Input (JSON Body)**:
  ```json
  {
    "name": "Felipe Elias",
    "email": "felipedaniel.me@gmail.com"
  }
  ```

  **Output**:
  > Response: 201 (Created)
</details>

---

<details>
  <summary><code>[GET] /users</code>: Returns all users registered.</summary>

  **Output**:
  > Response: 200 (OK)
  ```json
  [
    {
      "id": "e8c21e9c-a362-48e2-869b-99c87e8371a8",
      "name": "Felipe Elias",
      "email": "felipedaniel.me@gmail.com"
    },
    {
      "id": "7f877788-c364-4144-8b48-810a09fea70e",
      "name": "John Doe",
      "email": "johndoe@example.com"
    }
  ]
  ```
</details>

---

<details>
  <summary><code>[PUT] /users/:id</code>: Edit a specific user.</summary>

  **Input (JSON Body)**:
  > OBS: You can edit both name and email
  ```json
  {
    "name": "Felipe Daniel"
  }
  ```

  **Output**:
  > Response: 204 (No content)
</details>

---

<details>
  <summary><code>[DELETE] /users/:id</code>: Delete a specific user.</summary>

  **Output**:
  > Response: 204 (No content)
</details>

<br />

## Expected errors
`[400] Invalid or missing user information.`: You're probably trying to create an user without enough data, or incorrect data.

`[404] Not found!`: You're probably trying to get a nonexistent resource.

`[409] User already exists.`: You're probably trying create an user with an email already in use.

`[409] Email is already in use.`: You're probably trying to edit an user with an email already in use.
