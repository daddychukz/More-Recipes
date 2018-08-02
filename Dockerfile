#First_Job: build application
FROM node:8-alpine AS base

# RUN npm i npm@latest -g
RUN apk add --no-cache nodejs && npm i npm@latest -g
RUN mkdir -p /var/app/more-recipes

WORKDIR /var/app/more-recipes/

COPY . .

RUN npm install && npm run build && npm run client:build

#Second_Job: build image using artifcats from first job
FROM node:8-alpine

RUN mkdir -p /var/app/more-recipes

WORKDIR /var/app/more-recipes/

COPY --from=base /var/app/more-recipes/Client/dist ./Client/dist
COPY --from=base /var/app/more-recipes/Client/src/static ./Client/dist/static
COPY --from=base /var/app/more-recipes/Server/dist ./Server/dist
COPY --from=base /var/app/more-recipes/node_modules ./node_modules
COPY package.json ./
COPY .sequelizerc ./
COPY .env ./
COPY webpack.config.js ./

RUN npm install
ENV NODE_ENV=production
ENV configEnvVar=DATABASE_URL
ENV SECRET=secret123
ENV DATABASE_URL=postgres://wbxstbmq:1So1LMlT5dVMv8j9i4lLgbBZef7Czu4O@stampy.db.elephantsql.com:5432/wbxstbmq
ENV export configDialect=postgres
ENV export ClientId=1020610939165-pgmi2vuh8broeahhfo1v6vfqueb92sak.apps.googleusercontent.com
ENV export CloudName=chuks-andela32
ENV export UploadPreset=jdhszyow

EXPOSE 5000

CMD ["npm", "run", "prod"]
