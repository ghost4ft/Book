# Book API Documentation

## All Registered Routes

### User Management

#### Register User

**Method:** `POST`\
**Endpoint:** `/api/auth/register`\
**Description:** Registers a new user.

 **Required Fields:**

- `username` (string) – User's unique username
- `email` (string) – User's email address
- `password` (string) – Secure password

 **Response Example:**

```json
{
  "message": "User registered successfully"
}
```

---

#### User Login

**Method:** `POST`\
**Endpoint:** `/api/auth/login`\
**Description:** Authenticates a user and returns a token.

 **Required Fields:**

- `email` (string) – User's registered email
- `password` (string) – User's password

 **Response Example:**

```json
{
  "token": "your_jwt_token"
}
```

---

