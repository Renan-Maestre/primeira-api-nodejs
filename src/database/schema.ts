
import { pgTable, text, time, uuid, timestamp } from "drizzle-orm/pg-core";


export const users = pgTable('users', {
    id: uuid("id").primaryKey().defaultRandom(),
    name: text("name").notNull(),
    email: text("email").notNull().unique()

})

export const courses = pgTable('courses', {
    id: uuid("id").primaryKey().defaultRandom(),
    title: text().notNull().unique(),
    description: text()
})


export const enrollments = pgTable('enrollments', {
    id: uuid().primaryKey().defaultRandom(),
    userId: uuid().notNull().references(() => users.id),
    courseId: uuid().notNull().references(() => courses.id),
})

