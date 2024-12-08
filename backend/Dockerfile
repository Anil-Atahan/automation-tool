# Backend/Dockerfile
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Expose port and start the app
EXPOSE 3000
CMD ["npm", "run", "start:prod"]
