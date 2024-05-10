import { SequelizeModule } from "@nestjs/sequelize";
import { Test } from "@nestjs/testing";

import { ServiceModule } from "modules/service/service.module";
import { ListArgs } from "types";

import { AgreementsResolver } from "../agreements.resolver";
import { AgreementsService } from "../agreements.service";
import { Agreements } from "../models/agreements.model";

const TERMS_COUNT = 4;

describe("AgreementsResolver", () => {
  let resolver: AgreementsResolver;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [ServiceModule, SequelizeModule.forFeature([Agreements])],
      providers: [AgreementsResolver, AgreementsService],
    }).compile();

    resolver = await moduleRef.resolve<AgreementsResolver>(AgreementsResolver);
  });

  describe("findAll", () => {
    it("should return an array of agreements", async () => {
      const args: ListArgs<Agreements> = {};

      const result = await resolver.findAll(args);

      expect(result).toBeDefined();
      expect(result.length).toBe(TERMS_COUNT);
      expect(result).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            key: "user-terms",
          }),
          expect.objectContaining({
            key: "user-privacy-policy",
          }),
          expect.objectContaining({
            key: "disclaimer",
          }),
          expect.objectContaining({
            key: "user-consent",
          }),
        ])
      );
    });
  });
});
