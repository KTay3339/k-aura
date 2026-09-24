CREATE TABLE `tour_inquiries` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`full_name` text NOT NULL,
	`email` text NOT NULL,
	`phone` text NOT NULL,
	`rental_type` text NOT NULL,
	`preferred_date` text NOT NULL,
	`preferred_time` text NOT NULL,
	`message` text,
	`status` text DEFAULT 'new' NOT NULL,
	`created_at` integer NOT NULL
);
