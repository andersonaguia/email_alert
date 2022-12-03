import { IsBooleanString, IsNotEmpty, IsString } from "class-validator";

export class CreateAlarmDTO {    
    @IsString()
    @IsNotEmpty()
    readonly activated: string;     

    @IsString()
    @IsNotEmpty()
    readonly device: string;

    @IsString()
    readonly message: string;
    
}