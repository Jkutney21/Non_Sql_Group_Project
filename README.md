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
  "email": "testuser@example.com",
  "password": "yourSecurePassword"
  "role": "STUDENT"
}

POST http://localhost:8080/api/auth/login
{
  "username": "testuser@example.com",
  "password": "yourSecurePassword"
}

