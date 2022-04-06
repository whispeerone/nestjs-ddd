import { Entity, BaseEntity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';
import { JoinTable, ManyToOne } from 'typeorm';
import { EventHandlerEntity } from './event-handler.entity';
import { EventEntity } from './event.entity';

@Entity('event_handling_status')
export class EventHandlingStatus extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    status: number;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @CreateDateColumn({ name: 'modified_at', nullable: true, })
    modifiedAt?: Date;

    @Column({nullable: true})
    duration: number;

    @ManyToOne(() => EventEntity, event => event.statuses)
    event: EventEntity;

    @ManyToOne(() => EventHandlerEntity, event => event.statuses)
    handler: EventHandlerEntity;
}