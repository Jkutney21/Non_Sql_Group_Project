# Use an OpenJDK base image
FROM openjdk:20-jdk-slim

# Set working directory
WORKDIR /app

# Copy the project files
COPY . /app

# Clean and build the project, skipping tests
RUN ./gradlew clean build -x test --no-daemon

# Run the Spring Boot app
CMD ["java", "-jar", "build/libs/Backend-0.0.1-SNAPSHOT.jar"]