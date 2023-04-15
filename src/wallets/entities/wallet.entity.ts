import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { 
  BaseEntity, 
  Column, 
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Unique,
  Index
} from 'typeorm';

@Entity('wallets')
@Unique(['address','telegram_user_id'])
export class WalletsEntity extends BaseEntity {
  @ApiProperty({ example: '40f34678-fb89-4661-ac8d-6aa038c64744', description: 'The uuid of wallet' })
  @PrimaryGeneratedColumn('uuid')
  id?: string;
  /**
   * The address of the wallet
   * @example 0x3428C6B411C6e3147DAD28cdAc63CB736444eA97
   */
  @Index()
  @Column({ name: 'address', type: 'text' })
  @ApiProperty({ example: '0x3428C6B411C6e3147DAD28cdAc63CB736444eA97', description: 'The user wallet address' })
  address: string;

  /**
   * The address of the wallet
   * @example 1
   */
  @Column({ name: 'telegram_user_id', type: 'varchar', length: 100 })
  @ApiProperty({ example: '2', description: 'The user id in telegram' })
  telegram_user_id: string;

  @CreateDateColumn({ name: 'created_at' })
  @ApiProperty({ example: '2023-04-15T15:20:59.602Z', description: 'The wallet creation time' })
  created_at?: Date;
}