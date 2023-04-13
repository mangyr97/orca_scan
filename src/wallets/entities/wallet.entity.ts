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

export class WalletsEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id?: number;
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
  telegram_user_id: number;

  @CreateDateColumn({ name: 'created_at' })
  created_at?: Date;
}



export type EventsSaveOptions = {
  event_type: Event_type,
  event_description: string,
  tag:string,
  network_tag: string,
  exchange: string,
}
export type Event_type = 'close_binding' | 'deposit_was_closed' | 'alert' | 'deposit_was_opened'
@Entity('events')
@Unique(['id'])
export class EventsEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id?: string;
  @Index()
  @Column({ name: 'event_type', type: 'text' })
  event_type!: Event_type;
  @Column({ name: 'event_description', type: 'text' , default: 'undefined'})
  event_description?: string;
  @Index()
  @Column({ name: 'tag', type: 'text', default: 'undefined' })
  tag!: string;
  @Index()
  @Column({ name: 'network_tag', type: 'text', default: 'undefined' })
  network_tag!: string;
  @Column({ name: 'exchange', type: 'varchar', length: 100  })
  exchange!: string;
  @CreateDateColumn({ name: 'created_at' })
  created_at?: Date;
}