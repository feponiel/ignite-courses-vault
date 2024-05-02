# Transactions REST API: Documentation
Basic documentation for use. Do not forget to follow the instructions to avoid errors, they're not so detailed in the documentation!

## Routes
<details>
  <summary><code>[POST] /transactions</code>: Create a new transaction.</summary>

  **Input (JSON Body)**:
  ```json
  {
    "title": "Freelance",
    "amount": 8000,
    "type": "credit"
  }
  ```

  **Output**:
  > Response: 201 (Created)
</details>

---

<details>
  <summary><code>[GET] /transactions</code>: Returns all transactions registered.</summary>

  **Output**:
  > Response: 200 (OK)
  ```json
  {
    "transactions": [
      {
        "id": "3837bfe6-b8b7-40c9-ab1e-d04b3ca58957",
        "title": "Freelance",
        "amount": 8000,
        "created_at": "2024-01-02 00:02:22",
        "session_id": "ab959ffa-8988-4c32-95c6-c7ebc94435e2"
      },
      {
        "id": "g2298959-de3c-4283-a33e-b440defa71fa",
        "title": "Cell phone",
        "amount": -2000,
        "created_at": "2024-01-02 00:10:14",
        "session_id": "ab959ffa-8988-4c32-95c6-c7ebc94435e2"
      }
    ]
  }
  ```
</details>

---

<details>
  <summary><code>[GET] /transactions/:id</code>: Returns a specific transaction.</summary>

  **Output**:
  > Response: 200 (OK)
  ```json
  {
    "transaction": {
      "id": "g2298959-de3c-4283-a33e-b440defa71fa",
      "title": "Cell phone",
      "amount": -2000,
      "created_at": "2024-01-02 00:10:14",
      "session_id": "ab959ffa-8988-4c32-95c6-c7ebc94435e2"
    }
  }
  ```
</details>

---

<details>
  <summary><code>[GET] /transactions/summary</code>: Returns your balance.</summary>

  **Output**:
  > Response: 200 (OK)
  ```json
  {
    "summary": {
      "amount": 6000
    }
  }
  ```
</details>

<br />

## Expected errors
`[400] Bad Request`: You're probably trying to make a request without enough data, or incorrect data.

`[401] Unauthorized!`: You're probably trying to access a private route without meeting the requirements (session).
