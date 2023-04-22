import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { BalancesService } from './balances.service';
import { GetBalanceRequestDto, GetBalanceResponsetDto } from './dto/get-balance.dto';

@ApiTags('balances')
@Controller('balances')
export class BalancesController {
  constructor(private readonly BalancesService: BalancesService) {}
  
  @Post()
  @ApiOperation({ summary: 'Get address balance' })
  @ApiResponse({
    status: 200,
    description: 'Founded balance',
    type: GetBalanceResponsetDto,
  })
  async create(@Body() GetBalanceDto: GetBalanceRequestDto): Promise<any> {
    const balances =  await this.BalancesService.getBalances(GetBalanceDto.address);
    // const response: GetBalanceResponsetDto = {
    //   balance: balances
    // }
    return balances
  }
}