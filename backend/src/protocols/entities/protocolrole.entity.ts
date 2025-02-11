import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Protocol } from './protocol.entity';
import { User } from 'src/users/entities/user.entity';

@Entity({ name: 'protocol_roles' })
export class ProtocolRole {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Protocol, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'protocol_id' })
  protocol: Protocol;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'role_user_id' })
  roleUser: User;

  @Column({ nullable: false })
  role_name: string;
}
