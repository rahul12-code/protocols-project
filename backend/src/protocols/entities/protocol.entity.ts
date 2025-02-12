import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany 
} from 'typeorm';
 import { ProtocolRole } from './protocolrole.entity';

@Entity('protocols')
export class Protocol {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  protocol_code: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @OneToMany(() => ProtocolRole, (protocolRole) => protocolRole.protocol)
  protocolRoles: ProtocolRole[];
}
