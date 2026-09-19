import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { HydratedDocument, Model } from "mongoose";
import { RefreshToken } from "src/auth/schemas/refresh-token.schema";
import { BaseRepository } from "src/common/data-access/base-repository";
import { ModelNames } from "src/common/data-access/model-names.enum";


@Injectable()
export class RefreshTokenRepository extends BaseRepository<RefreshToken> {
  constructor(
    @InjectModel(ModelNames.REFRESH_TOKENS)
    private readonly refreshTokenModel: Model<RefreshToken>,
  ) {
    super(refreshTokenModel);
  }
}
