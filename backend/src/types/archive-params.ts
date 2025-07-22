export interface ArchiveParams {
    encryptedData: Buffer;
    iv: string;
    authTag: string;
}
