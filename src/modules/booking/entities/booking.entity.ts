import { Check, Column, Entity, OneToMany } from 'typeorm';
import { BaseAbstractEntity } from '../../../common/base/base.entity';
import { RegrexEnum } from '../../../common/enums/time.enum';
import { BookingMenuEntity } from './bookingMenu.entity';
import { BookingStatusEnum } from '../enums/booking.enum';

@Entity('bookings')
@Check(`"from_hour" ~ '${RegrexEnum.TIME_INTERVAL}'`)
@Check(`"to_hour" ~ '${RegrexEnum.TIME_INTERVAL}'`)
export class BookingEntity extends BaseAbstractEntity {
  @Column({ name: 'customer_id', nullable: false })
  customerId: number;

  @Column({ name: 'schedule_id', nullable: false })
  scheduleId: number;

  @Column({
    name: 'from_hour',
    nullable: false,
    length: 5,
  })
  fromHour: string;

  @Column({
    name: 'to_hour',
    nullable: false,
    length: 5,
  })
  toHour: string;

  @Column({ nullable: true })
  memo: string;

  @Column({
    name: 'booking_status',
    type: 'enum',
    enum: BookingStatusEnum,
    default: BookingStatusEnum.IN_PROGRESS,
    nullable: false,
  })
  bookingStatus: BookingStatusEnum;

  @OneToMany(() => BookingMenuEntity, (menus) => menus.booking, {
    cascade: true,
  })
  menus: BookingMenuEntity[];
}
