import { Transform } from "class-transformer";
import { IsEmail, IsString, MinLength } from "class-validator";

export class loginDto {

    @IsString()
    @IsEmail()
    email:string;

    @Transform(({ value }: { value: string }) => value.trim())
    @IsString()
    @MinLength(8)
    password:string;
}