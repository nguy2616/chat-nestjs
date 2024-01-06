import { Check, Column, Entity, JoinColumn, ManyToOne, Unique } from 'typeorm';
import { BaseAbstractEntity } from '../../../common/base/base.entity';
import {
  DayOfWeekEnum,
  DefaultHourEnum,
  RegrexEnum,
} from '../../../common/enums/time.enum';
import { UserEntity } from '../../user/entities/user.entity';

@Entity('schedules')
@Check(`"open_hour" ~ '${RegrexEnum.TIME_INTERVAL}'`)
@Check(`"close_hour" ~ '${RegrexEnum.TIME_INTERVAL}'`)
@Unique('unq_provider_day', ['dayOfWeek', 'date', 'providerId'])
export class ScheduleEntity extends BaseAbstractEntity {
  @Column({
    name: 'day_of_week',
    nullable: false,
    type: 'enum',
    enum: DayOfWeekEnum,
  })
  dayOfWeek: DayOfWeekEnum;

  @Column({ type: 'date', nullable: false })
  date: string;

  @Column({
    name: 'open_hour',
    nullable: false,
    length: 5,
    default: DefaultHourEnum.OPEN_HOUR,
  })
  openHour: string;

  @Column({
    name: 'close_hour',
    nullable: false,
    length: 5,
    default: DefaultHourEnum.CLOSE_HOUR,
  })
  closeHour: string;

  @Column({ name: 'is_open_all', nullable: false, default: true })
  isOpenAll: boolean;

  @Column({ name: 'provider_id', nullable: false })
  providerId: number;

  @ManyToOne(() => UserEntity, (provider) => provider.schedules, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'provider_id' })
  provider: UserEntity;
}
