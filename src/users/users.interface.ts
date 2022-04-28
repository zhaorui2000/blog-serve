import { ApiPropertyOptional } from '@nestjs/swagger';

export class UserModel {
  @ApiPropertyOptional({ type: String })
  name: string;
  @ApiPropertyOptional({ type: String })
  id: string;
}
