import { IsNumber, IsPositive, IsString, MinLength } from "class-validator";

export class CreateCatDto {
    @IsString()
    @MinLength(1)
    name: string;

    @IsNumber()
    @IsPositive()
    age: number;

    @IsString()
    breed: string;
}
