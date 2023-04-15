import { IsString, MinLength } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class GetBalanceRequestDto {
  @ApiProperty({ example: '0x3428C6B411C6e3147DAD28cdAc63CB736444eA97', description: 'The user wallet address' })
  @IsString()
  readonly address: string;
}

export class GetBalanceResponsetDto {
  @ApiProperty({ example: '0.163812188391329885', description: 'The address balance' })
  @IsString()
  readonly balance: string;
}