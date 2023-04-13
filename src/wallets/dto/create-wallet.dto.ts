import { IsString, MinLength } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class CreateWalletDto {
  @ApiProperty({ example: '0x3428C6B411C6e3147DAD28cdAc63CB736444eA97', description: 'The user wallet address' })
  @IsString()
  readonly address: string;

  @ApiProperty({ example: '1', description: 'The user id in telegram' })
  @IsString()
  readonly telegram_user_id: string;
}