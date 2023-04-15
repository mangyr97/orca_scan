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

@ApiTags('wallets')
@Controller('wallets')
export class WalletsController {
  constructor(private readonly WalletsService: WalletsService) {}
  
  @Post()
  @ApiOperation({ summary: 'Create wallet' })
  @ApiResponse({
    status: 200,
    description: 'Founded record',
    type: WalletsEntity,
  })
  async create(@Body() CreateWalletDto: CreateWalletDto): Promise<WalletsEntity> {
    const wallet =  this.WalletsService.create(CreateWalletDto);
    return wallet
  }

  @Get('/wallet/:id')
  @ApiOperation({ summary: 'Get wallet by id' })
  @ApiResponse({
    status: 200,
    description: 'Founded record',
    type: WalletsEntity,
  })
  async findById(@Param('id') id: string): Promise<WalletsEntity> {
    return await this.WalletsService.findById(id);
  }

  @Get('/wallet/tg/:id')
  @ApiOperation({ summary: 'Get wallet by telegram user id' })
  @ApiResponse({
    status: 200,
    description: 'Founded records',
    type: [WalletsEntity],
  })
  async findByTelegramId(@Param('id') telegram_user_id: string): Promise<WalletsEntity[]> {
    return await this.WalletsService.findByTelegramId(telegram_user_id);
  }

  @Get('/all')
  @ApiOperation({ summary: 'Get all wallets' })
  @ApiResponse({
    status: 200,
    description: 'Founded records',
    type: [WalletsEntity],
  })
  async findAll(): Promise<WalletsEntity[]> {
    return await this.WalletsService.findAll();
  }
}