import { Test, TestingModule } from '@nestjs/testing';
import { WalletsController } from './wallets.controller';
import { WalletsService } from './wallets.service';

describe('AppController', () => {
  let appController: WalletsController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [WalletsController],
      providers: [WalletsService],
    }).compile();

    appController = app.get<WalletsController>(WalletsController);
  });

  describe('create', () => {
    it('should return wallet', () => {
      expect(appController.create({"address": "0x3428C6B411C6e3147DAD28cdAc63CB736444eA97", "telegramUserId": 1})).toBe({"address": "0x3428C6B411C6e3147DAD28cdAc63CB736444eA97", "telegramUserId": 1});
    });
  });
});
