# ============================================
# EMPLOI ROMAND - Dockerfile pour Production
# ============================================
# Dockerfile multi-stage optimisé pour le déploiement
# de l'application Emploi Romand (SaaS Recherche d'Emploi Suisse Romande)
#
# Build optimisé avec:
# - Node.js 18 Alpine (léger)
# - Build multi-stage pour réduire la taille finale
# - Layer caching optimal
# - Sécurité renforcée

# ============================================
# STAGE 1: Dependencies
# ============================================
FROM node:18-alpine AS deps

# Installer les dépendances système nécessaires
RUN apk add --no-cache libc6-compat

WORKDIR /app

# Copier les fichiers de dépendances
COPY package.json package-lock.json* ./

# Installer les dépendances (production uniquement)
RUN npm ci --only=production --ignore-scripts

# ============================================
# STAGE 2: Builder
# ============================================
FROM node:18-alpine AS builder

WORKDIR /app

# Copier les node_modules du stage précédent
COPY --from=deps /app/node_modules ./node_modules

# Copier les fichiers source
COPY . .

# Variables d'environnement pour le build
# (les vraies valeurs seront injectées au runtime)
ENV NODE_ENV=production
ENV VITE_SUPABASE_URL=placeholder
ENV VITE_SUPABASE_ANON_KEY=placeholder

# Builder l'application
RUN npm run build

# ============================================
# STAGE 3: Runner (Production)
# ============================================
FROM node:18-alpine AS runner

# Métadonnées
LABEL maintainer="Emploi Romand <support@emploiromand.ch>"
LABEL description="Application SaaS de recherche d'emploi pour la Suisse Romande"
LABEL version="1.0.0"

# Installer serve pour servir les fichiers statiques
RUN npm install -g serve

WORKDIR /app

# Créer un utilisateur non-root pour la sécurité
RUN addgroup --system --gid 1001 nodejs \
    && adduser --system --uid 1001 emploiromand

# Copier les fichiers buildés depuis le builder
COPY --from=builder --chown=emploiromand:nodejs /app/dist ./dist
COPY --from=builder --chown=emploiromand:nodejs /app/package.json ./

# Changer vers l'utilisateur non-root
USER emploiromand

# Exposer le port
EXPOSE 3000

# Variables d'environnement
ENV NODE_ENV=production
ENV PORT=3000

# Healthcheck pour monitorer l'application
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# Démarrer l'application
CMD ["serve", "-s", "dist", "-l", "3000"]

# ============================================
# INSTRUCTIONS D'UTILISATION
# ============================================
# 
# BUILD:
# docker build -t emploi-romand:latest .
#
# RUN (avec variables d'environnement):
# docker run -d \
#   --name emploi-romand \
#   -p 3000:3000 \
#   -e VITE_SUPABASE_URL=votre_url \
#   -e VITE_SUPABASE_ANON_KEY=votre_key \
#   -e VITE_OPENAI_API_KEY=votre_openai_key \
#   emploi-romand:latest
#
# RUN (avec fichier .env):
# docker run -d \
#   --name emploi-romand \
#   -p 3000:3000 \
#   --env-file .env \
#   emploi-romand:latest
#
# DOCKER COMPOSE:
# Voir docker-compose.yml pour orchestration complète
#
# LOGS:
# docker logs -f emploi-romand
#
# STOP:
# docker stop emploi-romand
#
# ============================================
