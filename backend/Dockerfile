# --- Stage 1: Build ---
FROM node:20-alpine AS builder
WORKDIR /app

# Install dependencies
COPY package.json tsconfig.json tsconfig.node.json prisma ./
RUN npm install -g npm@latest && npm ci && npx prisma generate

# Copy source
COPY src ./src

# Build
RUN npm run build

# --- Stage 2: Production ---
FROM node:20-alpine
WORKDIR /app

ENV NODE_ENV=production

# Copy built artifacts and deps from builder
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/prisma ./prisma

EXPOSE 4000
CMD ["node", "dist/index.js"]
