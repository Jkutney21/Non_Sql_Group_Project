# Non_Sql_Group_Project

---

## Build & Run
- Clean and build without running tests:
  ```bash
  ./gradlew clean build -x test
  ./gradlew build -x test
  ```
- Fast startup (Windows):
  ```bash
  run.bat
  ```

## Docker (MongoDB CLI)
```bash
docker exec -it mongo mongosh
```

---

# Default User Details

| Role   | Email                   | Password     | Program           |
|--------|--------------------------|--------------|-------------------|
| Student| student@example.com       | password123  | Computer Science  |
| Staff  | staff@example.com         | password123  | Computer Science  |

---

# Endpoints for Login and Registration

## Register a New User
**POST** `http://localhost:8080/api/auth/register`

**Request Body:**
```json
{
  "email": "testuser@example.com",
  "password": "yourSecurePassword",
  "role": "STUDENT",
  "program": "Computer Science"
}
```
*Note: Each registered user must have a unique email.*

---

## Login
**POST** `http://localhost:8080/api/auth/login`

**Request Body:**
```json
{
  "username": "testuser@example.com",
  "password": "yourSecurePassword"
}
```

---

## Validate Token
**GET** `http://localhost:8080/api/auth/validate`

**Headers:**
- Authorization: `Bearer {yourToken}`

---

# Endpoints for Courses

## Get Courses by Department
**GET** `/api/courses/department?department=Computer Science`

**Available Departments:**
```json
[
  "Communication Studies", "English", "History", "Sociology", "Political Science",
  "Theatre and Dance", "Art and Design", "Music", "Religious Studies", "Women's Studies",
  "Elementary Education", "Early Childhood Education", "Secondary Education",
  "Special Education", "Educational Leadership", "Career and Technology Education",
  "Health Studies", "Nursing", "Nutrition", "Kinesiology", "Biology", "Environmental Science",
  "Computer Science", "Cybersecurity", "Design and Drafting Technology",
  "Accounting", "Finance", "Marketing", "Management", "Entrepreneurship", "Aviation",
  "Criminal Justice", "Social Work"
]
```

---

## Get All Courses
**GET** `/api/courses`

**Description:** Retrieves a list of all courses.

---

## Add a New Course
**POST** `/api/courses/add`

**Request Body:**
```json
{
  "id": "12345",
  "name": "Introduction to Programming",
  "department": "Computer Science",
  "credits": 3
}
```

---

# Endpoints for Financial Aid

## Get Financial Aid by User ID
**GET** `http://localhost:8080/api/aid/user/{USERID}`

---

## Update Financial Aid Type
**PUT** `http://localhost:8080/api/aid/{id}/type`

**Request Body Example:**
```json
{
  "type": "Scholarship"
}
```

---

## Get All Financial Aid Records
**GET** `http://localhost:8080/api/aid`

---


