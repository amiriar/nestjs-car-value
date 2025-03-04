import { Transform } from "class-transformer";
import { IsBoolean, IsLatitude, IsLongitude, IsNumber, IsString, Max, Min } from "class-validator";

export class GetEstimateDto{
    @IsString()
    make: string;

    @IsString()
    model: string;

    @Transform(({ value }) => parseInt(value))
    @IsNumber()
    @Min(1930)
    @Max(2030)
    year: number;

    @Transform(({ value }) => parseFloat(value))
    @IsNumber()
    @IsLongitude()
    lng: number;

    @Transform(({ value }) => parseFloat(value))
    @IsNumber()
    @IsLatitude()
    lat: number;

    @Transform(({ value }) => parseInt(value))
    @IsNumber() 
    @Min(0)
    @Max(100000000)
    mileage: number;

    @IsBoolean()
    approved: boolean;
}