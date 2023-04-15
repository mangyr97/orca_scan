import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { WalletsService } from './wallets.service';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { WalletsEntity } from './entities/wallet.entity';

@ApiBearerAuth()
@ApiTags('wallets')
@Controller('wallets')
export class WalletsController {
  constructor(private readonly WalletsService: WalletsService) {}
  @Post()
  @ApiOperation({ summary: 'Create wallet' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async create(@Body() CreateWalletDto: CreateWalletDto): Promise<WalletsEntity> {
    const wallet =  this.WalletsService.create(CreateWalletDto);
    return wallet
  }

  @Get('/wallet/:id')
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: WalletsEntity,
  })
  async findById(@Param('id') id: string): Promise<WalletsEntity> {
    return await this.WalletsService.findById(id);
  }
  @Get('/all')
  @ApiResponse({
    status: 200,
    description: 'The found records',
    type: WalletsEntity,
  })
  async findAll(): Promise<WalletsEntity[]> {
    return await this.WalletsService.findAll();
  }
}