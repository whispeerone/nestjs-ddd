import { Entity, BaseEntity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';
import { JoinTable, OneToMany } from 'typeorm';
import { EventHandlerEntity } from './event-handler.entity';
import { EventHandlingStatus } from './event-status.entity';

@Entity('event_entity')
export class EventEntity extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    eventId: string;
    
    @Column()
    payload: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @OneToMany(() => EventHandlingStatus, event => event.event)
    @JoinTable()
    statuses: EventHandlingStatus[];
}