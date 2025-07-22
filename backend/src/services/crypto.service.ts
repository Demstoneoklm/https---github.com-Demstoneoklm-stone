import crypto from 'crypto';
import dotenv from 'dotenv';
dotenv.config();

export class CryptoService {
    private static readonly ALGORITHM = 'aes-256-gcm';
    private static readonly IV_LENGTH = 16;
    private static readonly SALT_LENGTH = 64;
    private static readonly TAG_LENGTH = 16;
    private static readonly KEY_LENGTH = 32;

    static encrypt(data: Buffer): { encrypted: Buffer; iv: string; tag: string } {
        const iv = crypto.randomBytes(this.IV_LENGTH);
        const salt = crypto.randomBytes(this.SALT_LENGTH);
        const key = crypto.pbkdf2Sync(
            process.env.ENCRYPTION_KEY!,
            salt,
            100000,
            this.KEY_LENGTH,
            'sha512'
        );

        const cipher = crypto.createCipheriv(this.ALGORITHM, key, iv);
        const encrypted = Buffer.concat([
            cipher.update(data),
            cipher.final(),
        ]);

        const tag = cipher.getAuthTag();

        return {
            encrypted,
            iv: iv.toString('hex'),
            tag: tag.toString('hex')
        };
    }

    static decrypt(encrypted: Buffer, iv: string, tag: string): Buffer {
        const ivBuffer = Buffer.from(iv, 'hex');
        const tagBuffer = Buffer.from(tag, 'hex');
        const key = crypto.pbkdf2Sync(
            process.env.ENCRYPTION_KEY!,
            Buffer.from(process.env.ENCRYPTION_SALT!, 'hex'),
            100000,
            this.KEY_LENGTH,
            'sha512'
        );

        const decipher = crypto.createDecipheriv(this.ALGORITHM, key, ivBuffer);
        decipher.setAuthTag(tagBuffer);

        return Buffer.concat([
            decipher.update(encrypted),
            decipher.final()
        ]);
    }
}