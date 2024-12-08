FROM oven/bun:latest AS base

FROM base AS deps
WORKDIR /app
COPY bun.lockb package.json ./
RUN bun i --ignore-scripts

FROM base AS builder
RUN apt-get update -y && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*
WORKDIR /app
# Copy only necessary files
COPY --from=deps /app/node_modules ./node_modules
COPY ./public ./public
COPY ./src ./src
COPY  ./next.config.js ./package.json ./postcss.config.js tailwind.config.js tsconfig.json ./
ENV NEXT_TELEMETRY_DISABLED=1
ENV NEXT_PUBLIC_API_URL='http://vd.hyoretsu.com/api'
ENV NEXT_PUBLIC_CDN_URL='https://d1j6tgpykvuq4o.cloudfront.net'
RUN bun run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
COPY --from=builder /app/public ./public
# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
USER nextjs
EXPOSE 3000
CMD HOSTNAME="0.0.0.0" bun server.js
