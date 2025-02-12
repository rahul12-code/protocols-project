import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProtocolsService } from './protocols.service';
import { ProtocolsController } from './protocols.controller';
import { Protocol } from './entities/protocol.entity';
import { ProtocolRole } from './entities/protocolrole.entity';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Protocol, ProtocolRole, User])],
  controllers: [ProtocolsController],
  providers: [ProtocolsService],
})
export class ProtocolsModule {}
