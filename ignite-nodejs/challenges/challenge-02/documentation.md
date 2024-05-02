# Daily Diet REST API: Documentation
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
  <summary><code>[POST] /log/in</code>: Create a new session.</summary>

  **Input (JSON Body)**:
  ```json
  {
    "email": "felipedaniel.me@gmail.com"
  }
  ```

  **Output**:
  > Response: 200 (OK)
</details>

---

<details>
  <summary><code>[POST] /log/out</code>: End your current session.</summary>

  **Output**:
  > Response: 200 (OK)
  ```json
    {
      "message": "Logged out!"
    }
  ```
</details>

---

<details>
  <summary><code>[POST] /meals</code>: Create a new meal.</summary>

  **Input (JSON Body)**:
  ```json
  {
    "name": "Temaki",
    "description": "Yesterday I ate a temaki.",
    "diet": false,
    "date": "2024-03-20"
  }
  ```

  **Output**:
  > Response: 201 (Created)
</details>

---

<details>
  <summary><code>[GET] /meals</code>: Returns all of your meals.</summary>

  **Output**:
  > Response: 200 (OK)
  ```json
  {
    "meals": [
      {
        "id": "ba538695-4889-40dd-a50c-82f2a205b09a",
        "name": "Temaki",
        "description": "Yesterday I ate a temaki.",
        "diet": 0,
        "date": "2024-03-20",
        "linked_user": "felipedaniel.me@gmail.com"
      },
      {
        "id": "3492f4f5-e316-43c8-a076-ef1b2b722bd1",
        "name": "Rice",
        "description": "That day I only ate rice.",
        "diet": 1,
        "date": "2024-03-14",
        "linked_user": "felipedaniel.me@gmail.com"
      }
    ]
  }
  ```
</details>

---

<details>
  <summary><code>[GET] /meals/:mealId</code>: Returns a specific meal.</summary>

  **Output**:
  > Response: 200 (OK)
  ```json
  {
    "meal": {
      "id": "3492f4f5-e316-43c8-a076-ef1b2b722bd1",
      "name": "Rice",
      "description": "That day I only ate rice.",
      "diet": 1,
      "date": "2024-03-14",
      "linked_user": "felipedaniel.me@gmail.com"
    }
  }
  ```
</details>

---

<details>
  <summary><code>[GET] /meals/metrics</code>: Get your diet metrics.</summary>

  **Output**:
  > Response: 200 (OK)
  ```json
  {
    "totalMeals": 5,
    "mealsInDiet": 4,
    "nonDietMeals": 1,
    "bestSequence": 3
  }
  ```
</details>

---

<details>
  <summary><code>[PUT] /meals/:mealId</code>: Edit a specific meal.</summary>

  **Input (JSON Body)**:
  > OBS: You can edit both: name, description, diet and date
  ```json
  {
    "description": "Yesterday I ate a sushi.",
  }
  ```

  **Output**:
  > Response: 204 (No content)
</details>

---

<details>
  <summary><code>[DELETE] /meals/:mealId</code>: Delete a specific meal.</summary>

  **Output**:
  > Response: 204 (No content)
</details>

<br />

## Expected errors
`[400] Bad Request`: You're probably trying to make a request without enough data, or incorrect data.

`[401] Unauthorized!`: You're probably trying to access a private route without meeting the requirements (session).

`[422] Empty update object!`: You're probably trying to update a meal sending an empty object as the request body.
