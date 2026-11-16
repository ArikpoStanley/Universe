# syntax=docker/dockerfile:1

FROM node:24-alpine AS base
WORKDIR /app
RUN apk add --no-cache libc6-compat

FROM base AS deps
COPY package.json package-lock.json* ./
RUN npm ci

FROM deps AS build
COPY . .
ARG NEXT_PUBLIC_PORTAL_URL=https://portal-universe.fly.dev
ARG NEXT_PUBLIC_API_URL=https://universe-backend.fly.dev
ARG API_ORIGIN=https://universe-backend.fly.dev
ARG API_INTERNAL_URL=https://universe-backend.fly.dev
ENV NEXT_PUBLIC_PORTAL_URL=$NEXT_PUBLIC_PORTAL_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV API_ORIGIN=$API_ORIGIN
ENV API_INTERNAL_URL=$API_INTERNAL_URL
RUN npm run build

FROM base AS runner
ENV NODE_ENV=production
WORKDIR /app
ARG API_ORIGIN=https://universe-backend.fly.dev
ARG API_INTERNAL_URL=https://universe-backend.fly.dev
ENV API_ORIGIN=$API_ORIGIN
ENV API_INTERNAL_URL=$API_INTERNAL_URL
COPY --from=build /app/public ./public
COPY --from=build /app/.next/standalone ./
COPY --from=build /app/.next/static ./.next/static
EXPOSE 3001
ENV PORT=3001
ENV HOSTNAME=0.0.0.0
CMD ["node", "server.js"]
