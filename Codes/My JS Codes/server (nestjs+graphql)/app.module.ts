import { Module } from "@nestjs/common";

import { AgreementsModule } from "modules/agreements/agreements.module";
import { GraphQlModule } from "modules/graphql/graphql.module";
import { ServiceModule } from "modules/service/service.module";

@Module({
  imports: [ServiceModule, GraphQlModule, AgreementsModule],
})
export class AppModule {}
