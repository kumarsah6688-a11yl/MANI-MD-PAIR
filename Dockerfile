FROM node:22-slim

# Install system dependencies
RUN apt-get update && apt-get install -y \
    ffmpeg \
    imagemagick \
    webp \
    git \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy package files
COPY package.json ./

# Install dependencies using npm
RUN npm install --production

# Copy project files
COPY . .

# Expose port
EXPOSE 3000

# Start command
CMD ["node", "index.js"]
