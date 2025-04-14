# Use an OpenJDK base image
FROM openjdk:20-jdk-slim

# Set working directory
WORKDIR /app

# Copy and build the project
COPY . /app
RUN ./gradlew build --no-daemon

# Run the Spring Boot app
CMD ["java", "-jar", "build/libs/Backend-0.0.1-SNAPSHOT.jar"]
