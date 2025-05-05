# Build stage
FROM node:16 as build

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies with additional flags
RUN npm install --no-proxy --legacy-peer-deps --production=false

# Copy the rest of the application
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM node:16-slim

WORKDIR /app

# Copy built assets from builder
COPY --from=build /app/build ./build
COPY --from=build /app/package*.json ./

# Install only production dependencies
RUN npm install --production

EXPOSE 3000

CMD ["npm", "start"]
