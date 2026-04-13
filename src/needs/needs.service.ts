import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginatedResult } from '../common/interfaces/paginated-result.interface';
import { SheltersService } from '../shelters/shelters.service';
import { CreateNeedDto } from './dto/create-need.dto';
import { FilterNeedsDto } from './dto/filter-needs.dto';
import { UpdateNeedDto } from './dto/update-need.dto';
import { Need } from './entities/need.entity';

@Injectable()
export class NeedsService {
  constructor(
    @InjectRepository(Need)
    private readonly needRepository: Repository<Need>,
    private readonly sheltersService: SheltersService,
  ) {}

  async create(dto: CreateNeedDto): Promise<Need> {
    await this.sheltersService.findOne(dto.shelterId);
    const need = this.needRepository.create(dto);
    try {
      return await this.needRepository.save(need);
    } catch {
      throw new InternalServerErrorException('Failed to create need');
    }
  }

  async findAll(filters: FilterNeedsDto): Promise<PaginatedResult<Need>> {
    const qb = this.needRepository
      .createQueryBuilder('need')
      .leftJoinAndSelect('need.shelter', 'shelter')
      .orderBy('need.createdAt', 'DESC')
      .skip(filters.skip)
      .take(filters.limit);

    if (filters.status) {
      qb.andWhere('need.status = :status', { status: filters.status });
    }

    if (filters.title) {
      qb.andWhere('LOWER(need.title) LIKE :title', {
        title: `%${filters.title.toLowerCase()}%`,
      });
    }

    if (filters.shelterName) {
      qb.andWhere('LOWER(shelter.name) LIKE :shelterName', {
        shelterName: `%${filters.shelterName.toLowerCase()}%`,
      });
    }

    const [data, total] = await qb.getManyAndCount();
    return {
      data,
      meta: {
        total,
        page: filters.page,
        limit: filters.limit,
        totalPages: Math.ceil(total / filters.limit),
      },
    };
  }

  async findOne(id: string): Promise<Need> {
    const need = await this.needRepository.findOne({
      where: { id },
      relations: ['shelter'],
    });
    if (!need) {
      throw new NotFoundException(`Need with id ${id} not found`);
    }
    return need;
  }

  async update(id: string, dto: UpdateNeedDto): Promise<Need> {
    const need = await this.findOne(id);
    const definedFields = Object.fromEntries(
      Object.entries(dto).filter(([, v]) => v !== undefined),
    );
    Object.assign(need, definedFields);
    try {
      return await this.needRepository.save(need);
    } catch {
      throw new InternalServerErrorException('Failed to update need');
    }
  }

  async remove(id: string): Promise<void> {
    const need = await this.findOne(id);
    try {
      await this.needRepository.remove(need);
    } catch {
      throw new InternalServerErrorException('Failed to delete need');
    }
  }
}
