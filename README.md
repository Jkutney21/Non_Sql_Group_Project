# Non_Sql_Group_Project

## for fast start up 
# -- 
run.bat 

## docker
# -- 
docker exec -it mongo mongosh



## end points for login and reg
# ---


## POST http://localhost:8080/api/auth/register

{
  "email": "testuser@example.com",
  "password": "yourSecurePassword",
  "role": "STUDENT",
  "program": "Computer Science"
}
### each one needs to be unqine 

## POST http://localhost:8080/api/auth/login
{
  "username": "testuser@example.com",
  "password": "yourSecurePassword"
}


## GET /api/auth/department?department=Computer Science

names of the deparments 
{
   "Communication Studies", "English", "History", "Sociology", "Political Science",
    "Theatre and Dance", "Art and Design", "Music", "Religious Studies", "Women's Studies",
    "Elementary Education", "Early Childhood Education", "Secondary Education",
    "Special Education", "Educational Leadership", "Career and Technology Education",
    "Health Studies", "Nursing", "Nutrition", "Kinesiology", "Biology", "Environmental Science",
    "Computer Science", "Cybersecurity", "Design and Drafting Technology",
    "Accounting", "Finance", "Marketing", "Management", "Entrepreneurship", "Aviation",
    "Criminal Justice", "Social Work"
}
## GET /api/auth
Description: Retrieves a list of all courses.



POST /api/auth/add
{
  {
    "id": "12345",
    "name": "Introduction to Programming",
    "department": "Computer Science",
    "credits": 3
}
}