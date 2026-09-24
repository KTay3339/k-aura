CREATE TABLE `applications` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`full_name` text NOT NULL,
	`email` text NOT NULL,
	`phone` text NOT NULL,
	`rental_type` text NOT NULL,
	`is_student` integer NOT NULL,
	`school_name` text,
	`profession` text NOT NULL,
	`business_name` text,
	`bio` text,
	`services` text NOT NULL,
	`wants_client_link` integer NOT NULL,
	`booking_url` text,
	`profile_image_key` text NOT NULL,
	`license_key` text,
	`id_front_key` text,
	`id_back_key` text,
	`eligible_hours` text NOT NULL,
	`status` text DEFAULT 'pending' NOT NULL,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `providers` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`application_id` integer NOT NULL,
	`slug` text NOT NULL,
	`full_name` text NOT NULL,
	`business_name` text,
	`profession` text NOT NULL,
	`bio` text,
	`services` text NOT NULL,
	`rental_type` text NOT NULL,
	`booking_url` text NOT NULL,
	`profile_image_key` text NOT NULL,
	`verification_label` text DEFAULT 'K Aura verified' NOT NULL,
	`active` integer DEFAULT true NOT NULL,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `providers_application_id_unique` ON `providers` (`application_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `providers_slug_unique` ON `providers` (`slug`);