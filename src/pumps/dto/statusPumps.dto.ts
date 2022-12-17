import { IsNotEmpty, IsString } from "class-validator";

export class StatusPumpsDTO {    
    @IsString()
    @IsNotEmpty()
    readonly piscina: string;     

    @IsString()
    @IsNotEmpty()
    readonly fonte: string;

    @IsString()
    @IsNotEmpty()
    readonly borda: string;    
}