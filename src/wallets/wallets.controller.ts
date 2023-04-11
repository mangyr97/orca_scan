import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { WalletsService } from './wallets.service';
import { CreateCatDto } from './dto/create-wallet.dto';
import { Wallet } from './entities/wallet.entity';

@ApiBearerAuth()
@ApiTags('wallets')
@Controller('wallets')
export class WalletsController {
  constructor(private readonly catsService: WalletsService) {}

  @Post()
  @ApiOperation({ summary: 'Create wallet' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async create(@Body() createCatDto: CreateCatDto): Promise<Wallet> {
    return this.catsService.create(createCatDto);
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: Wallet,
  })
  findOne(@Param('id') id: string): Wallet {
    return this.catsService.findOne(+id);
  }
}