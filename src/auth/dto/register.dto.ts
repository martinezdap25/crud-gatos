import { Transform } from "class-transformer";
import { IsEmail, IsString, IsStrongPassword, MinLength } from "class-validator";

export class registerDto {
    @IsString()
    @MinLength(3)
    name:string;

    @IsString()
    @IsEmail()
    email:string;

    @Transform(({ value }: { value: string }) => value.trim())
    @IsStrongPassword()
    @MinLength(8)
    password:string;
}