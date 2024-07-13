# Stage 1: Build the application
FROM node:20 AS builder

# Set the working directory inside the container to /app
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock) to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Build the application
RUN npm run build

# Stage 2: Run the application
FROM node:20-slim

# Set the working directory inside the container to /app
WORKDIR /app

# Copy only the necessary files from the builder stage
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/prisma ./prisma

# Expose the port on which the app will run
EXPOSE 3000

# Start the Next.js application
CMD ["npm", "run", "start"]