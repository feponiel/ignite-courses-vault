# Task List REST API: Documentation
Basic documentation for use. Do not forget to follow the instructions to avoid errors, they're not so detailed in the documentation!

## Routes
<details>
  <summary><code>[POST] /tasks</code>: Create a new task.</summary>

  **Input (JSON Body)**:
  ```json
  {
    "title": "Do the homework",
    "description": "Do the college homework until tomorrow."
  }
  ```

  **Output**:
  > Response: 201 (Created)
</details>

---

<details>
  <summary><code>[GET] /tasks</code>: Returns all tasks registered.</summary>

  **Output**:
  > Response: 200 (OK)
  ```json
  [
    {
      "id": "126b5694-4fbf-42df-a6e8-6d20fdd4bbe1",
      "title": "Do the homework",
      "description": "Do the college homework until tomorrow.",
      "completedAt": null,
      "createdAt": "2023-12-18T02:49:58.868Z",
      "updatedAt": "2023-12-18T03:17:56.170Z"
    },
    {
      "id": "4c65e239-2c0e-48e9-a463-5277985c06d0",
      "title": "Create a desktop application",
      "description": "Practice your ElectronJS skills and create a desktop application",
      "completedAt": "2024-05-01T22:50:58.290Z",
      "createdAt": "2023-12-18T04:06:28.416Z",
      "updatedAt": "2023-12-18T04:06:28.416Z"
    }
  ]
  ```
</details>

---

<details>
  <summary><code>[PUT] /tasks/:id</code>: Edit a specific task.</summary>

  **Input (JSON Body)**:
  > OBS: You can edit both title and description
  ```json
  {
    "title": "New title",
    "description": "New description"
  }
  ```

  **Output**:
  > Response: 204 (No content)
</details>

---

<details>
  <summary><code>[DELETE] /tasks/:id</code>: Delete a specific task.</summary>

  **Output**:
  > Response: 204 (No content)
</details>

<br />

## Expected errors
`[400] The request body is empty or incomplete.`: You're probably trying to create a task without enough data.

`[400] The request body has more data than it needs.`: You're probably trying to make a request with more data than it needs.

`[400] The request body is empty.`: You're probably trying to update a task without sending a body.

`[400] The request body has no title or description for the task.`: You're probably trying to update a task without sending a title or a description.
