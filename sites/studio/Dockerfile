# Alpacode Studio — studio.alpacode.it (sites/studio/), the first
# compartment of the house. Built from the repo root (it shares the
# lockfile and shared/) by the same `docker compose up -d --build` as
# alpacode.it. A Node server like the house's: the pages are
# prerendered, the contact form and the payment providers' webhooks run
# on demand.

# ---------- build ----------
FROM node:22-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
# Public, build-time: canonical URLs, the doors between the
# compartments, the booking link, analytics and the ad tags (which load
# only after consent).
ARG STUDIO_SITE="https://studio.alpacode.it"
ARG PUBLIC_HOUSE_ORIGIN="https://alpacode.it"
ARG PUBLIC_STUDIO_ORIGIN="https://studio.alpacode.it"
ARG PUBLIC_CALCOM_LINK="https://cal.eu/alpacode/30min"
ARG PUBLIC_UMAMI_SRC=""
ARG PUBLIC_UMAMI_STUDIO_ID=""
ARG PUBLIC_META_PIXEL_ID=""
ARG PUBLIC_GADS_ID=""
ENV STUDIO_SITE=$STUDIO_SITE \
    PUBLIC_HOUSE_ORIGIN=$PUBLIC_HOUSE_ORIGIN \
    PUBLIC_STUDIO_ORIGIN=$PUBLIC_STUDIO_ORIGIN \
    PUBLIC_CALCOM_LINK=$PUBLIC_CALCOM_LINK \
    PUBLIC_UMAMI_SRC=$PUBLIC_UMAMI_SRC \
    PUBLIC_UMAMI_STUDIO_ID=$PUBLIC_UMAMI_STUDIO_ID \
    PUBLIC_META_PIXEL_ID=$PUBLIC_META_PIXEL_ID \
    PUBLIC_GADS_ID=$PUBLIC_GADS_ID
COPY . .
RUN npm run studio:build

# ---------- runtime ----------
FROM node:22-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production \
    HOST=0.0.0.0 \
    PORT=4321
COPY package.json package-lock.json ./
RUN npm ci --omit=dev && npm cache clean --force
COPY --from=build /app/sites/studio/dist ./dist
# The orders ledger lives here (docker-compose mounts the studio-data
# volume). Owned by the runtime user, so a fresh volume inherits it.
RUN mkdir -p /app/data && chown node:node /app/data
EXPOSE 4321
USER node
CMD ["node", "./dist/server/entry.mjs"]
