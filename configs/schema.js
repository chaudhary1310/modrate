
import {  pgTable,boolean, varchar,serial,json} from "drizzle-orm/pg-core";


export const Users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  imageUrl : varchar ('imageUrl'),
  subscription: boolean('subscription').default(false)
});

export const VideoData = pgTable('videoData',{
  id:serial('id').primaryKey(),
  script:json('script').notNull(),
  audioFileUrl:varchar('audioFileUrl').notNull(),
  captions:json('captions').notNull(),
  imageList:varchar('imageList').array(),
  createdBy: varchar('createdBy').notNull()
});