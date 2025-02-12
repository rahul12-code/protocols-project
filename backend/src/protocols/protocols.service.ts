import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Protocol } from './entities/protocol.entity';
import { ProtocolRole } from './entities/protocolrole.entity';
import { User } from 'src/users/entities/user.entity';
import { CreateProtocolDto } from './dto/create-protocol.dto';
import { UpdateProtocolDto } from './dto/update-protocol.dto';

@Injectable()
export class ProtocolsService {
  constructor(
    @InjectRepository(Protocol)
    private readonly protocolRepository: Repository<Protocol>,

    @InjectRepository(ProtocolRole)
    private readonly protocolRoleRepository: Repository<ProtocolRole>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createProtocolDto: CreateProtocolDto) {
    // Step 1: Create the protocol
    const protocol = this.protocolRepository.create({
      protocol_code: createProtocolDto.protocol_id,
    });
    await this.protocolRepository.save(protocol);

    // Step 2: Create the protocol roles
    const roles: ProtocolRole[] = []; // Explicitly defining the type

    for (const [roleName, userNames] of Object.entries(createProtocolDto)) {
      if (roleName !== 'protocol_id') {
        for (const userName of userNames) {
          const [firstName, lastName] = userName.split(' ');

          // Find the user by first and last name
          const user = await this.userRepository.findOne({
            where: { first_name: firstName, last_name: lastName },
          });

          if (user) {
            const role = this.protocolRoleRepository.create({
              protocol,
              roleUser: user,
              role_name: roleName,
            });

            roles.push(role);
          }
        }
      }
    }

    // Save all roles in bulk
    await this.protocolRoleRepository.save(roles);

    return { message: 'Protocol created successfully', protocol, roles };
  }

  
  async findAll() {
    const protocols = await this.protocolRepository.find({
      relations: ['protocolRoles', 'protocolRoles.roleUser'],
    });
  
    return protocols.map((protocol) => {
      const formattedProtocol: any = {
        protocol_id: protocol.protocol_code,
      };
  
      // Group users by their roles
      for (const role of protocol.protocolRoles) {
        const fullName = `${role.roleUser.first_name} ${role.roleUser.last_name}`;
  
        if (!formattedProtocol[role.role_name]) {
          formattedProtocol[role.role_name] = [];
        }
  
        formattedProtocol[role.role_name].push(fullName);
      }
  
      return formattedProtocol;
    });
  }
  

  findOne(id: number) {
    return `This action returns a #${id} protocol`;
  }

  update(id: number, updateProtocolDto: UpdateProtocolDto) {
    return `This action updates a #${id} protocol`;
  }

  remove(id: number) {
    return `This action removes a #${id} protocol`;
  }
}
