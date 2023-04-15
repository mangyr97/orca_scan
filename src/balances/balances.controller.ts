import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { BalancesService } from './balances.service';
import { GetBalanceDto } from './dto/get-balance.dto';

@ApiTags('balances')
@Controller('balances')
export class BalancesController {
  constructor(private readonly BalancesService: BalancesService) {}
  
  @Post()
  @ApiOperation({ summary: 'Get address balance' })
  @ApiResponse({
    status: 200,
    description: 'Founded balance',
    type: '100',
  })
  async create(@Body() GetBalanceDto: GetBalanceDto): Promise<string> {
    const balance =  this.BalancesService.getBalances(GetBalanceDto.address);
    return balance
  }
}