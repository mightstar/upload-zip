import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { Module } from "@nestjs/common";
import { GraphQLModule as NestGraphQLModule } from "@nestjs/graphql";
import GraphQLJSON from "graphql-type-json";
import { join } from "path";

import { Environments } from "consts";
import { ConfigService } from "modules/config/config.module";

@Module({
  imports: [
    NestGraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useFactory: async (configService: ConfigService) => {
        return {
          typePaths: ["./**/*.graphql"],
          introspection:
            configService.get("NODE_ENV") !== Environments.PRODUCTION,
          definitions: {
            path: join(process.cwd(), "src/graphql.ts"),
            outputAs: "interface",
          },
          resolvers: {
            JSON: GraphQLJSON,
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
})
export class GraphQlModule {}
