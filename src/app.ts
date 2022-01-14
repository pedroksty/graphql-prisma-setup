import 'reflect-metadata'
import express, { NextFunction, Request, Response } from 'express'
import cors from 'cors'
import 'express-async-errors'

import { AppError } from '@shared/errors/AppError'
import { ApolloServer } from 'apollo-server-express'
import { buildSchema } from 'type-graphql'
import { UsersResolvers } from '@modules/users/graphql/resolvers/UsersResolver'
import { PetsResolvers } from '@modules/pets/graphql/resolvers/PetsResolver'

async function startServer() {
  const app = express()
  const port = 4110

  const schema = await buildSchema({
    resolvers: [
      UsersResolvers,
      PetsResolvers
    ]
  })

  const apolloServer = new ApolloServer(({
    schema
  }))

  await apolloServer.start()

  apolloServer.applyMiddleware({ app })

  app.listen(port, () => { console.log(`Server start in port ${port}`) })
}

startServer()
