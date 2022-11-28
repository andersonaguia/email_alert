import { IsBoolean, IsNotEmpty, IsString } from "class-validator";

export class CreateAlarmDTO {    
    @IsString()
    @IsNotEmpty()
    readonly device: string;
    
    @IsBoolean()
    @IsNotEmpty()
    readonly activated: boolean;      
}