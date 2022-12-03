import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "system_alarms" }) // definindo um nome para tabela
export class AlarmEntity {
    // Cria uma coluna primária cujo valor será gerado automaticamente com um valor de incremento automático. 
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ type: String })
    device: string;

    @Column({ type: Boolean })
    activated: string;

    message: string;
}