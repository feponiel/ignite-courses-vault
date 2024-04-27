# Forum REST API: Documentation
Basic documentation for use. Do not forget to follow the instructions to avoid errors, they're not so detailed in the documentation!

## Routes
<details>
  <summary><code>[POST] /accounts</code>: Create a new account.</summary>

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
  ```json
  {
    "access_token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyYzIyZmNiZS05MGQ0LTRkMDctYmQ4MS1lM2YzMGU4MDdiNGQiLCJpYXQiOjE3MTQ1Nzc5NzN9.LT-pInka6RzqvvyFlXnO4gyk1LlzBByyBhGN57Wu1Qx94O1L1gCpWqeiOFK114dgmrS1r_fSzaXiWYC3SjVfgTZBuDEVqwQEAsKJ3BS_VyLqUX0hObADS2bt5XZbCRhpCeDCn4zbHc0_uf0HBfrXHvClmIxjMhSoVFwkRTuimX540EfTOi35yUOX9Vq6crXpTAvhisdSBbxJEct13kP75nr7nc1gR_vK5hjpkl1AkAaUTTYqDL2SlIr1X2MRaKvU2VqQJhBDnUH0pfFKZ3itQ2qd-PIIY94mz3eZMh1KURQM18fXN9utc7Sek9y31kanmZUDq3fx8w9NHBv36riUFg"
  }
  ```
</details>

---

<details>
  <summary><code>[POST] /questions</code>: Create a new question.</summary>

  **Input (JSON Body)**:
  ```json
  {
    "title": "New question",
    "content": "Question content",
    "attachments": ["b092ffc6-5829-4ec6-a367-8d6d8bde75df", "72997e7f-68b4-4cf3-9b84-8b14d5ab6d58"]
  }
  ```

  **Output**:
  > Response: 201 (Created)
</details>

---

<details>
  <summary><code>[POST] /questions/:questionId/answers</code>: Create a new answer.</summary>

  **Input (JSON Body)**:
  ```json
  {
    "content": "Answer content",
    "attachments": ["d6862606-d486-49bb-a718-219e1bc8ae76"]
  }
  ```

  **Output**:
  > Response: 201 (Created)
</details>

---

<details>
  <summary><code>[POST] /questions/:questionId/comments</code>: Create a question comment.</summary>

  **Input (JSON Body)**:
  ```json
  {
    "content": "Comment content"
  }
  ```

  **Output**:
  > Response: 201 (Created)
</details>

---

<details>
  <summary><code>[POST] /answers/:answerId/comments</code>: Create an answer comment.</summary>

  **Input (JSON Body)**:
  ```json
  {
    "content": "Comment content"
  }
  ```

  **Output**:
  > Response: 201 (Created)
</details>

---

<details>
  <summary><code>[POST] /attachments</code>: Upload an attachment.</summary>

  **Input (Multipart/form-data)**:
  ```
  attachment-example.jpg
  ```

  **Output**:
  > Response: 201 (Created)
  ```json
  {
    "attachmentId": "b092ffc6-5829-4ec6-a367-8d6d8bde75df"
  }
  ```
</details>

---

<details>
  <summary><code>[GET] /questions</code>: Returns all recent questions.</summary>

  There are a maximum of 20 questions per request, you can page by passing `?page=(PAGE NUMBER)` in the query param.

  **Output**:
  > Response: 200 (OK)
  ```json
  {
    "questions": [
      {
        "id": "67372a5a-a980-4463-977f-5e7fc8bfd697",
        "title": "New question",
        "slug": "Question content",
        "createdAt": "2024-05-01T16:04:12.393Z",
        "updatedAt": "2024-05-01T16:04:12.394Z"
      },
      {
        "id": "68526946-e9a3-46b4-bd19-0c3f5ca6ebc9",
        "title": "New question 02",
        "slug": "Question content 02",
        "createdAt": "2024-05-01T16:04:12.393Z",
        "updatedAt": "2024-05-01T16:04:12.394Z"
      }
    ]
  }
  ```
</details>

---

<details>
  <summary><code>[GET] /questions/:slug</code>: Returns a question by its slug.</summary>

  **Output**:
  > Response: 200 (OK)
  ```json
  {
    "question": {
      "questionId": {
        "value": "67372a5a-a980-4463-977f-5e7fc8bfd697"
      },
      "authorId": {
        "value": "65eb99d8-1c85-4b16-b1f3-962f675b2bfe"
      },
      "author": "Felipe Elias",
      "title": "New question",
      "content": "Question content",
      "slug": "new-question",
      "attachments": [
        {
          "id": "b092ffc6-5829-4ec6-a367-8d6d8bde75df",
          "title": "attachment-example.jpg",
          "url": "attachment-example.jpg"
        },
        {
          "id": "72997e7f-68b4-4cf3-9b84-8b14d5ab6d58",
          "title": "another-attachment-example.png",
          "url": "another-attachment-example.png"
        }
      ],
      "createdAt": "2024-05-01T18:09:17.958Z",
      "updatedAt": "2024-05-01T18:09:17.958Z"
    }
  }
  ```
</details>

---

<details>
  <summary><code>[GET] /questions/:questionId/answers</code>: Returns all question answers.</summary>

  **Output**:
  > Response: 200 (OK)
  ```json
  {
    "answers": [
      {
        "id": "a0ed4009-9515-4a38-89e1-57663b1a114b",
        "content": "Probably it's because you're using Linux",
        "createdAt": "2024-05-01T18:26:38.717Z",
        "updatedAt": "2024-05-01T18:26:38.717Z"
      },
      {
        "id": "afb23016-bcb5-4b7e-a111-aa139f830cc9",
        "content": "Hm... I think my example would work",
        "createdAt": "2024-05-01T18:26:23.373Z",
        "updatedAt": "2024-05-01T18:26:23.373Z"
      }
    ]
  }
  ```
</details>

---

<details>
  <summary><code>[GET] /questions/:questionId/comments</code>: Returns all question comments.</summary>

  **Output**:
  > Response: 200 (OK)
  ```json
  {
    "questionComments": [
      {
        "commentId": {
          "value": "b759fa49-566a-4a6d-b8c6-07ae8afaf6bf"
        },
        "authorId": {
          "value": "bfaf0a30-c721-4db9-9526-70561b2acb56"
        },
        "authorName": "John Doe",
        "content": "UP!",
        "createdAt": "2024-05-01T18:33:04.012Z",
        "updatedAt": "2024-05-01T18:33:04.014Z"
      },
      {
        "commentId": {
          "value": "a0cd187e-5640-4780-a336-33099f4a682c"
        },
        "authorId": {
          "value": "8fa52d1d-d293-4e13-8085-6e0c6c47278a"
        },
        "authorName": "Jane Doe",
        "content": "I have the same problem...",
        "createdAt": "2024-05-01T18:33:04.012Z",
        "updatedAt": "2024-05-01T18:33:04.014Z"
      }
    ]
  }
  ```
</details>

---

<details>
  <summary><code>[GET] /answers/:answerId/comments</code>: Returns all answer comments.</summary>

  **Output**:
  > Response: 200 (OK)
  ```json
  {
    "answerComments": [
      {
        "commentId": {
          "value": "0a5eb5ae-b715-405a-9b50-7df28fa251a4"
        },
        "authorId": {
          "value": "65eb99d8-1c85-4b16-b1f3-962f675b2bfe"
        },
        "authorName": "Felipe Elias",
        "content": "Oh! Good point. I'll try to do it.",
        "createdAt": "2024-05-01T18:37:17.276Z",
        "updatedAt": "2024-05-01T18:37:17.278Z"
      }
    ]
  }
  ```
</details>

---

<details>
  <summary><code>[PUT] /questions/:questionId</code>: Edit a question.</summary>

  **Input (JSON Body)**:
  > The attachment array is a watched list, so let's assume that in the example below I had an image attached to the question. If I send the attachment array empty, the attached image will be automatically deleted from the database. Likewise, if I send other attachment IDs, the watched list will identify which ones are already on the database and prevent it from running unnecessary queries, saving only new attachments.
  ```json
  {
    "title": "New title",
    "content": "New content",
    "attachments": []
  }
  ```

  **Output**:
  > Response: 204 (No content)
</details>

---

<details>
  <summary><code>[PUT] /answers/:answerId</code>: Edit an answer.</summary>

  **Input (JSON Body)**:
  > The attachment array is a watched list, so let's assume that in the example below I had an image attached to the answer. If I send the attachment array empty, the attached image will be automatically deleted from the database. Likewise, if I send other attachment IDs, the watched list will identify which ones are already on the database and prevent it from running unnecessary queries, saving only new attachments.
  ```json
  {
    "content": "New answer content",
    "attachments": []
  }
  ```

  **Output**:
  > Response: 204 (No content)
</details>

---

<details>
  <summary><code>[PATCH] /notifications/:notificationId/read</code>: Read a notification.</summary>

  **Output**:
  > Response: 204 (No content)
</details>

---

<details>
  <summary><code>[PATCH] /answers/:answerId/choose-as-best</code>: Choose an answer as the best.</summary>

  **Output**:
  > Response: 204 (No content)
</details>

---

<details>
  <summary><code>[DELETE] /questions/:id</code>: Delete a question.</summary>

  **Output**:
  > Response: 204 (No content)
</details>

---

<details>
  <summary><code>[DELETE] /answers/:id</code>: Delete an answer.</summary>

  **Output**:
  > Response: 204 (No content)
</details>

---

<details>
  <summary><code>[DELETE] /questions/comments/:id</code>: Delete a question comment.</summary>

  **Output**:
  > Response: 204 (No content)
</details>

---

<details>
  <summary><code>[DELETE] /answers/comments/:id</code>: Delete an answer comment.</summary>

  **Output**:
  > Response: 204 (No content)
</details>

<br />

## Expected errors
`[400] Validation error!`: You're probably trying to make a request without enough data, or incorrect data.

`[400] File type * is not valid!`: You're probably trying to make an upload with an invalid file type.

`[401] Unauthorized!`: You're probably trying to access a private route without meeting the requirements (session).

`[401] Invalid credentials!`: You're probably trying to login with incorrect data.

`[401] Not allowed!`: You're probably trying to manipulate someone else's resource.

`[404] Resource not found!`: You're probably trying to get a nonexistent resource.

`[409] Student * already exists!`: You're probably trying to create an account with an email already in use.

`[409] Title * is already in use!`: You're probably trying to create a question with a title already in use.
