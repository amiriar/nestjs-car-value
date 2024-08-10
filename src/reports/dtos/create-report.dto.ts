import { IsLatitude, IsLongitude, IsNumber, IsString, Max, Min } from "class-validator";

export class CreateReportDto{
    @IsNumber()
    @Min(0)
    @Max(100000000)
    price: string;

    @IsString()
    make: string;

    @IsString()
    model: string;

    @IsNumber()
    @Min(1930)
    @Max(2030)
    year: number;

    @IsNumber()
    @IsLongitude()
    lng: number;

    @IsNumber()
    @IsLatitude()
    lat: number;

    @IsNumber()
    @Min(0)
    @Max(100000000)
    mileage: number;
}