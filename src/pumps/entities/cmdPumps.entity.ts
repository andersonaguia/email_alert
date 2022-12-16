import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "cmd_pumps" }) // definindo um nome para tabela
export class CmdPumpsEntity {
    // Cria uma coluna primária cujo valor será gerado automaticamente com um valor de incremento automático. 
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ type: String })
    piscina: string;

    @Column({ type: String })
    fonte: string;

    @Column({ type: String })
    borda: string;

    @Column({ type: String })
    relay4: string;

    @Column({
        type: 'datetime',
        default: () => 'NOW()',
        name: "created_at"
    })
    createdAt: Date;
}