import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseAbstractEntity } from '../../../common/base/base.entity';
import { BookingEntity } from './booking.entity';
import { MenuEntity } from '../../menu/entities/menu.entity';

@Entity('bookings_menus')
export class BookingMenuEntity extends BaseAbstractEntity {
  @Column({ name: 'booking_id', nullable: false })
  bookingId: number;

  @Column({ name: 'menu_id', nullable: false })
  menuId: number;

  @Column({ nullable: true })
  memo: string;

  @ManyToOne(() => BookingEntity, (booking) => booking.menus, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  booking: BookingEntity;

  @ManyToOne(() => MenuEntity, (menu) => menu.bookings, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  menu: MenuEntity;
}
