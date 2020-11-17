import * as bcrypt from "bcryptjs";

export class HashManager {
    public async hash(text: string): Promise<string> {
        const rounds = Number(process.env.BCRYPT_COST);
        const salt = await bcrypt.genSalt(rounds);
        const result = await bcrypt.hash(text, salt);
        console.log(rounds)
        return result;
    }

    public async compare(text: string, hash: string): Promise<boolean>{
        return await bcrypt.compare(text, hash);
    }
}