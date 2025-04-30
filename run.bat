@echo off

echo Starting the application...

REM Get the current directory of the batch file itself
set "BAT_DIR=%~dp0"

REM Define paths to Backend and Frontend based on the script's location
set "BACKEND_DIR=%BAT_DIR%Backend/Backend"
set "FRONTEND_DIR=%BAT_DIR%frontend"

REM Check if backend directory exists
if not exist "%BACKEND_DIR%" (
    echo ERROR: Backend directory not found at "%BACKEND_DIR%"
    exit /b 1
)

REM Check if frontend directory exists
if not exist "%FRONTEND_DIR%" (
    echo ERROR: Frontend directory not found at "%FRONTEND_DIR%"
    exit /b 1
)

REM Check if Java 20 is installed
java -version 2>nul | find "20" >nul
if errorlevel 1 (
    echo ERROR: Java 20 is not installed or not in PATH.
    echo Please install Java 20 from https://www.oracle.com/java/technologies/javase/jdk20-archive-downloads.html and try again.
    
) else (
    echo Java 20 is installed.
)

REM Check if Node.js is installed
node -v >nul 2>&1
if errorlevel 1 (
    echo ERROR: Node.js is not installed or not in PATH.
    echo Please install Node.js from https://nodejs.org/ and try again.
    
) else (
    echo Node.js is installed.
)

REM Start the backend service using Gradle
echo Starting the backend service...
cd /d "%BACKEND_DIR%"
start cmd /k "gradlew bootRun"

REM Wait for 5 seconds to ensure the backend starts
timeout /t 5 /nobreak > nul

REM Start the frontend service
echo Starting the frontend service...
cd /d "%FRONTEND_DIR%"
start cmd /k "npm start"

REM Provide the local URL for the frontend
echo Frontend is running at: http://74.235.248.40:3000/

REM Exit the script
exit
