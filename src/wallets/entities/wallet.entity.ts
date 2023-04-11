import { ApiProperty } from '@nestjs/swagger';

export class Wallet {
  /**
   * The address of the wallet
   * @example 0x3428C6B411C6e3147DAD28cdAc63CB736444eA97
   */
  address: string;

  @ApiProperty({ example: 1, description: 'The user id in telegram' })
  telegramUserId: number;

}