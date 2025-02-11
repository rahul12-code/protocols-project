import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('protocols')
export class Protocol {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  protocol_code: string;

  @Column({ nullable: true })
  created_by: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;
}
