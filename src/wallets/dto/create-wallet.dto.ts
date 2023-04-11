import { IsInt, IsString } from 'class-validator';

export class CreateCatDto {
  @IsString()
  readonly address: string;

  @IsInt()
  readonly telegramUserId: number;
}