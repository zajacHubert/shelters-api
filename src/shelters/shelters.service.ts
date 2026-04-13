import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginationDto } from '../common/dto/pagination.dto';
import { PaginatedResult } from '../common/interfaces/paginated-result.interface';
import { CreateShelterDto } from './dto/create-shelter.dto';
import { UpdateShelterDto } from './dto/update-shelter.dto';
import { Shelter } from './entities/shelter.entity';

@Injectable()
export class SheltersService {
  constructor(
    @InjectRepository(Shelter)
    private readonly shelterRepository: Repository<Shelter>,
  ) {}

  async create(dto: CreateShelterDto): Promise<Shelter> {
    const shelter = this.shelterRepository.create({
      name: dto.name,
      phoneNumber: dto.phoneNumber,
      address: dto.address,
      deliverySameAsAddress: dto.deliverySameAsAddress,
      deliveryAddress: dto.deliverySameAsAddress
        ? dto.address
        : (dto.deliveryAddress ?? dto.address),
    });
    try {
      return await this.shelterRepository.save(shelter);
    } catch {
      throw new InternalServerErrorException('Failed to create shelter');
    }
  }

  async findAll(pagination: PaginationDto): Promise<PaginatedResult<Shelter>> {
    const [data, total] = await this.shelterRepository.findAndCount({
      order: { createdAt: 'DESC' },
      skip: pagination.skip,
      take: pagination.limit,
    });
    return {
      data,
      meta: {
        total,
        page: pagination.page,
        limit: pagination.limit,
        totalPages: Math.ceil(total / pagination.limit),
      },
    };
  }

  async findOne(id: string): Promise<Shelter> {
    const shelter = await this.shelterRepository.findOne({
      where: { id },
      relations: ['needs'],
    });
    if (!shelter) {
      throw new NotFoundException(`Shelter with id ${id} not found`);
    }
    return shelter;
  }

  async update(id: string, dto: UpdateShelterDto): Promise<Shelter> {
    const shelter = await this.findOne(id);

    const definedFields = Object.fromEntries(
      Object.entries(dto).filter(([, v]) => v !== undefined),
    ) as Partial<Shelter>;

    Object.assign(shelter, definedFields);

    if (shelter.deliverySameAsAddress) {
      shelter.deliveryAddress = shelter.address;
    }

    try {
      return await this.shelterRepository.save(shelter);
    } catch {
      throw new InternalServerErrorException('Failed to update shelter');
    }
  }

  async remove(id: string): Promise<void> {
    const shelter = await this.findOne(id);
    try {
      await this.shelterRepository.remove(shelter);
    } catch {
      throw new InternalServerErrorException('Failed to delete shelter');
    }
  }
}
