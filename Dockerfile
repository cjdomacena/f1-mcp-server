# Dockerfile
FROM node:slim

# Set a proper working directory (should be a directory path, not ".")
WORKDIR /app

# Copy files into the working directory
COPY . .

# Install dependencies
RUN npm install

# Expose the port your app listens on (optional, but recommended)
EXPOSE 3000

# Start your app — use sh to allow chaining
CMD ["sh", "-c", "npm run build && npm run start"]