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
  @PrimaryGeneratedColumn('uuid')
  id?: string;
  /**
   * The address of the wallet
   * @example 0x3428C6B411C6e3147DAD28cdAc63CB736444eA97
   */
  @Index()
  @Column({ name: 'address', type: 'text' })
  address: string;

  /**
   * The address of the wallet
   * @example 1
   */
  @Column({ name: 'telegram_user_id', type: 'varchar', length: 100 })
  telegram_user_id: string;

  @CreateDateColumn({ name: 'created_at' })
  created_at?: Date;
}