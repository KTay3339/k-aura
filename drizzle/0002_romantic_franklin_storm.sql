CREATE TABLE `event_subscribers` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`email` text NOT NULL,
	`active` integer DEFAULT true NOT NULL,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `event_subscribers_email_unique` ON `event_subscribers` (`email`);--> statement-breakpoint
CREATE TABLE `salon_events` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`description` text,
	`event_type` text NOT NULL,
	`starts_at` integer NOT NULL,
	`ends_at` integer,
	`location` text DEFAULT 'K Aura Salon' NOT NULL,
	`public` integer DEFAULT true NOT NULL,
	`created_at` integer NOT NULL
);
