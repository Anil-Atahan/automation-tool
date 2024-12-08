
# Web Automation Tool

This project is a web automation tool, designed with modular architecture, strong validation, and robust error handling. It supports running automation scripts and integrates advanced logging and testing systems.

---

## Backend Features

- **Modular Monolith Architecture:** Easy to scale and maintain.
- **Domain Driven Design:** The application follows the principles of Domain-Driven Design (DDD), organizing the code into cohesive modules. Each module encapsulates its domain logic, ensuring high cohesion and low coupling.
- **Validation:** Custom-built validators using TypeScript for strong type checking.
- **Error Handling:** Centralized error management with standardized error codes.
- **Logging:** Integrated with `winston` for structured logging and log rotation.
- **Testing:** Unit and integration tests using `jest` and `supertest`.

---

---

## Frontend Features

- **Todo:** TODO 

---

## Installation

### Prerequisites

- **Node.js**: Ensure you have Node.js version 14 or higher installed.
- **npm**: Ensure npm is available or use yarn as an alternative.
- **docker**: Docker is required to containerize the application and its dependencies, ensuring consistent deployments across environments.
- **docker-compose**: Docker Compose is used to define and run multi-container Docker applications, simplifying the orchestration of services like databases, APIs, and supporting tools.

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repository-url.git
   ```

3. Configure environment variables:
   Create a `.env` file in the root directory with the following:
   ```env
   PORT=3000
   DATABASE_URL=your-database-connection-string
   ```

4. Start the application:
   ```bash
   docker-compose up
   ```

---

## Backend Scripts

- **Start Development Server**: `npm run dev`
- **Run Tests**: `npm test`
- **Generate Documentation**: `npm run docs`
- **Lint Code**: `npm run lint`
- **Build Application**: `npm run build`

---

## Frontend Scripts

- **TODO**: `todo`

---

## Backend Project Structure

```plaintext
src/
├── modules/
│   ├── automation/
│   │   ├── application/
│   │   ├── domain/
│   │   ├── infrastructure/
│   │   ├── presentation/
├── shared/
│   ├── application/
│   ├── domain/
│   ├── infrastructure/
```

---

## Frontend Project Structure

```plaintext
todo
```

---

## Testing

### Run Tests
```bash
npm test
```

### Run Tests with Coverage
```bash
npm test -- --coverage
```

---

## Backend Logging

Logs are stored in the `logs/` directory:

- `error.log`: Contains error-level logs.
- `combined.log`: Contains logs of all levels.

---


## License

This project is licensed under the [MIT License](LICENSE).

---

## Contact

For issues, questions, or contributions, please reach out at [anilatahan95@gmail.com].
