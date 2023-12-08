import { Injectable } from '@nestjs/common';

@Injectable()
export class GlobalService {
    public treasuryAmintBalanceEthereum: number;
    public treasuryAmintBalancePolygon: number;

    public treasuryEthBalanceEthereum: number;
    public treasuryEthBalancePolygon: number;

}
