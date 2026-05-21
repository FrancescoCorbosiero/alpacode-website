# ---------- build ----------
FROM node:22-alpine AS build
WORKDIR /app

# Install deps against the lockfile for reproducible builds.
COPY package.json package-lock.json ./
RUN npm ci

# Build the Astro site (Node standalone adapter -> dist/server/entry.mjs).
# Public, build-time only: the cal.com booking link gets inlined into the
# prerendered pages.
ARG PUBLIC_CALCOM_LINK="https://cal.eu/alpacode/30min"
ENV PUBLIC_CALCOM_LINK=$PUBLIC_CALCOM_LINK
COPY . .
RUN npm run build

# ---------- runtime ----------
FROM node:22-alpine AS runtime
WORKDIR /app

ENV NODE_ENV=production \
    HOST=0.0.0.0 \
    PORT=4321

# Production dependencies only (Astro's standalone server resolves a few
# packages from node_modules at runtime).
COPY package.json package-lock.json ./
RUN npm ci --omit=dev && npm cache clean --force

# Built server + prerendered static client.
COPY --from=build /app/dist ./dist

EXPOSE 4321
USER node
CMD ["node", "./dist/server/entry.mjs"]
