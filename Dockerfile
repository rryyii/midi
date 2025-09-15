FROM eclipse-temurin:21-jdk

WORKDIR /app

COPY .mvn/ .mvn
COPY mvnw pom.xml ./
RUN ./mvnw dependency:resolve

COPY src ./src

RUN ./mvnw clean package -DskipTests

ENV PORT=8080
EXPOSE 8080

CMD ["java", "-jar", "target/mdi-0.0.1-SNAPSHOT.jar"]