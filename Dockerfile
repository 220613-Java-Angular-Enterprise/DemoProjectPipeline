# Declare the base image - this is a lightweight JDK 8 environment setup
FROM openjdk:8-jdk-alpine

# Copy the jar produced from mvn clean package phase from the target to the container
COPY /target/DemoProj-0.0.1-SNAPSHOT.jar DemoProj-0.0.1-SNAPSHOT.jar

# Expose out server port
EXPOSE 8080

#Run the JAR when we run the container
CMD ["java", "-jar", "/DemoProj-0.0.1-SNAPSHOT.jar"]