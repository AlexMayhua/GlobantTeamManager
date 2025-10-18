FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine
WORKDIR /app
RUN npm i -g serve@14
COPY --from=builder /app/dist ./dist
ENV NODE_ENV=production
USER node
EXPOSE 3000
CMD ["serve", "-s", "dist", "-l", "3000"]
