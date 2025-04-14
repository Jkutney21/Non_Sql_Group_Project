# Non_Sql_Group_Project

## for fast start up 
# -- 
run.bat 

## docker
# -- 
docker exec -it mongo mongosh



## end points for login and reg
# ---
each one needs to be unqine 

POST http://localhost:8080/api/auth/register

{
  "userId": "testUser123"
  "email": "testuser@example.com",
  "password": "yourSecurePassword"
}

POST http://localhost:8080/api/auth/login
{
  "userId": "testUser123",
  "username": "testuser@example.com",
  "password": "yourSecurePassword"
}

