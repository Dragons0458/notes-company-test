import {
  IsDate,
  IsNotEmpty,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

const titleMaxLength = 100;

/**
 * Represents a note.
 */
@Entity('notes')
export class NotesEntity {
  /**
   * The note's id.
   */
  @PrimaryGeneratedColumn('uuid')
  @IsUUID()
  id!: string;

  /**
   * The note's title.
   */
  @Column({ type: 'varchar', length: titleMaxLength })
  @IsString()
  @IsNotEmpty()
  @MaxLength(titleMaxLength)
  title!: string;

  /**
   * The note's content.
   */
  @Column({ type: 'text' })
  @IsString()
  @IsNotEmpty()
  content!: string;

  /**
   * The note's created at.
   */
  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  @IsDate()
  createdAt!: Date;

  /**
   * The note's updated at.
   */
  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  @IsDate()
  updatedAt!: Date;
}
