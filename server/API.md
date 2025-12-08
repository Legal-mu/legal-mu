# Legal-MU API Documentation

## Authentication Endpoints

### Base URL
```
http://localhost:5001/api
```

---

## 🔐 Authentication

### 1. Register User

**Endpoint:** `POST /api/auth/register`

**Description:** Register a new user account

**Request Body:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "password": "password123",
  "dateOfBirth": "1990-01-01" // Optional, format: YYYY-MM-DD
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": "uuid",
      "firstName": "John",
      "lastName": "Doe",
      "email": "john.doe@example.com",
      "role": "VISITOR",
      "dateOfBirth": "1990-01-01T00:00:00.000Z"
    },
    "token": "jwt-token-here"
  }
}
```

**Validation Rules:**
- `firstName`: Required, 2-50 characters
- `lastName`: Required, 2-50 characters
- `email`: Required, valid email format
- `password`: Required, minimum 8 characters
- `dateOfBirth`: Optional, valid date format

---

### 2. Login

**Endpoint:** `POST /api/auth/login`

**Description:** Authenticate user and get JWT token

**Request Body:**
```json
{
  "email": "john.doe@example.com",
  "password": "password123"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "uuid",
      "firstName": "John",
      "lastName": "Doe",
      "email": "john.doe@example.com",
      "role": "VISITOR",
      "dateOfBirth": "1990-01-01T00:00:00.000Z"
    },
    "token": "jwt-token-here"
  }
}
```

**Error Responses:**
- `401 Unauthorized`: Invalid email or password
- `403 Forbidden`: Account is deactivated

---

### 3. Forgot Password

**Endpoint:** `POST /api/auth/forgot-password`

**Description:** Request password reset token

**Request Body:**
```json
{
  "email": "john.doe@example.com"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "If an account exists with this email, a password reset link has been sent"
}
```

**Note:** In development mode, the reset token is also returned in the response for testing purposes.

---

### 4. Reset Password

**Endpoint:** `POST /api/auth/reset-password`

**Description:** Reset password using reset token

**Request Body:**
```json
{
  "token": "reset-token-from-email",
  "newPassword": "newpassword123"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Password reset successfully"
}
```

**Error Responses:**
- `400 Bad Request`: Invalid or expired reset token

**Validation Rules:**
- `token`: Required
- `newPassword`: Required, minimum 8 characters

---

## 🔒 Protected Routes

### Using JWT Token

Include the JWT token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

### Example Protected Route

**Endpoint:** `GET /api/protected`

**Description:** Example route that requires authentication

**Headers:**
```
Authorization: Bearer <jwt-token>
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "This is a protected route",
  "user": {
    "userId": "uuid",
    "email": "john.doe@example.com",
    "role": "VISITOR"
  }
}
```

**Error Responses:**
- `401 Unauthorized`: No token provided or invalid token

---

### Admin-Only Route

**Endpoint:** `GET /api/admin-only`

**Description:** Example route that requires admin role

**Headers:**
```
Authorization: Bearer <jwt-token>
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "This is an admin-only route",
  "user": {
    "userId": "uuid",
    "email": "admin@example.com",
    "role": "ADMIN"
  }
}
```

**Error Responses:**
- `401 Unauthorized`: No token provided or invalid token
- `403 Forbidden`: User doesn't have admin role

---

## 📋 User Roles

- **VISITOR**: Default role for new users
- **ADMIN**: Administrative access

---

## 🛠️ Error Responses

All error responses follow this format:

```json
{
  "success": false,
  "message": "Error message here"
}
```

**Validation Errors (400 Bad Request):**
```json
{
  "success": false,
  "message": "Validation error",
  "errors": [
    {
      "field": "email",
      "message": "Invalid email address"
    }
  ]
}
```

**Status Codes:**
- `200`: Success
- `201`: Created
- `400`: Bad Request (validation errors)
- `401`: Unauthorized (authentication required)
- `403`: Forbidden (insufficient permissions)
- `409`: Conflict (user already exists)
- `500`: Internal Server Error

---

## 📝 Example Usage

### Register a new user:
```bash
curl -X POST http://localhost:5001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Login:
```bash
curl -X POST http://localhost:5001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Access protected route:
```bash
curl -X GET http://localhost:5001/api/protected \
  -H "Authorization: Bearer <your-jwt-token>"
```

---

## 🔐 Security Best Practices

1. **JWT Token**: Store securely (httpOnly cookie or secure storage)
2. **Password**: Minimum 8 characters, use strong passwords
3. **HTTPS**: Always use HTTPS in production
4. **Token Expiration**: Tokens expire after 7 days (configurable)
5. **Reset Token**: Expires after 1 hour

---

## 🧪 Testing

You can test the API using:
- **Postman**
- **curl** (examples above)
- **Thunder Client** (VS Code extension)
- **Frontend application**

---

## 📚 Next Steps

- [ ] Add email service for password reset
- [ ] Add refresh token mechanism
- [ ] Add rate limiting
- [ ] Add request logging
- [ ] Add API versioning

