import { Transform } from "class-transformer";
import { IsEmail, IsString, IsStrongPassword } from "class-validator";

export class loginDto {

    @IsString()
    @IsEmail()
    email:string;

    @Transform(({ value }: { value: string }) => value.trim())
    @IsString()
    @IsStrongPassword()
    password:string;
}