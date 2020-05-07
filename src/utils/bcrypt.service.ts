import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class BcryptService {
    
    async encrypt(value): Promise<string> {
        const salt =  10;
        return await bcrypt.hash(value, salt);
    }

    async compare(value, valueHash): Promise<boolean> {
        return await bcrypt.compare(value, valueHash);
    }
}
