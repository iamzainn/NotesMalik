This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel




# Notesmalik

## Running the Project using Docker

Follow these steps to set up and run the project using Docker.

### Prerequisites

1. **Install Docker:**
   - **Windows & macOS:** [Docker Desktop](https://www.docker.com/products/docker-desktop)
   - **Linux:** Follow the instructions for your distribution at [Docker Engine](https://docs.docker.com/engine/install/)

### Steps

1. **Clone the Repository:**

    ```sh
    git clone <repository-url>
    cd Notesmalik
    ```

2. **Build the Docker Image:**

    ```sh
    docker build -t my-app .
    ```

    This will generate a Docker image named `my-app`.

3. **Run the Docker Container:**

    ```sh
    docker run -p 3000:3000 my-app
    ```

    This will run the container and map port 3000 of the container to port 3000 on your host machine.

### Dockerfile

The `Dockerfile` used for building the image is as follows:

```dockerfile
# Use the official Node.js 20 image as the base image
FROM node:20

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

# Expose the port on which the app will run
EXPOSE 3000

# Start the Next.js application
CMD ["npm", "run", "start"]


The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
