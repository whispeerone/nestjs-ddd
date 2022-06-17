import { Entity, BaseEntity, Column, PrimaryColumn, CreateDateColumn } from 'typeorm';
import { JoinTable, OneToMany } from 'typeorm';

@Entity('clientEntity')
export class ClientEntity extends BaseEntity {

    @PrimaryColumn()
    id: string;
    
    @Column({nullable : true})
    name?: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @Column()
    phoneNumber: string;
}