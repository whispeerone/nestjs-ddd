import { Entity, BaseEntity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';
import { JoinTable, OneToMany} from 'typeorm';

import { EventEntity } from './event.entity';
import { EventHandlingStatus } from './event-status.entity';

@Entity('event_handler')
export class EventHandlerEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
    
    @Column()
    eventType: string;

    @OneToMany(() => EventHandlingStatus, event => event.handler)
    @JoinTable()
    statuses: EventHandlingStatus[];
}