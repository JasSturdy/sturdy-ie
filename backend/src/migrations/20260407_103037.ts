import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_ventures_collaboration_sought" AS ENUM('research-partners', 'platform-integration', 'regulated-pilots');
  CREATE TYPE "public"."enum_ventures_status" AS ENUM('Exploring', 'Active', 'Relaunching');
  CREATE TYPE "public"."enum_myinsights_category" AS ENUM('Governance & Compliance', 'Research Collaboration', 'Interoperability & Standards', 'Preventive Health Innovation', 'AI & Regulated Data');
  CREATE TYPE "public"."enum_challenge_cards_icon" AS ENUM('fragmented', 'server', 'network', 'shieldCheck', 'shield', 'layers', 'activity', 'globe');
  CREATE TYPE "public"."enum_hero_blocks_rich_text_section_position" AS ENUM('above-heading', 'below-heading', 'below-subheading', 'below-tagline', 'above-cta', 'below-cta');
  CREATE TYPE "public"."enum_hero_blocks_bullet_list_position" AS ENUM('above-heading', 'below-heading', 'below-subheading', 'below-tagline', 'above-cta', 'below-cta');
  CREATE TYPE "public"."enum_response_card_bars" AS ENUM('1', '2', '3');
  CREATE TYPE "public"."enum_approach_items_icon" AS ENUM('trust', 'control', 'standards', 'resilience');
  CREATE TYPE "public"."enum_standards_cards_icon" AS ENUM('data-governance', 'security-architecture', 'regulatory-systems', 'institutional-infrastructure', 'health', 'research', 'financial', 'european-data');
  CREATE TYPE "public"."enum_application_cards_icon" AS ENUM('data-governance', 'security-architecture', 'regulatory-systems', 'institutional-infrastructure', 'health', 'research', 'financial', 'european-data');
  CREATE TYPE "public"."enum_focus_cards_icon" AS ENUM('governance', 'security', 'infrastructure', 'operating', 'regulatory', 'collaboration');
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE "ventures_collaboration_sought" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_ventures_collaboration_sought",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "ventures" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar,
  	"img_id" integer NOT NULL,
  	"status" "enum_ventures_status" NOT NULL,
  	"short_overview" varchar,
  	"venture_overview" jsonb,
  	"problem_space" jsonb,
  	"innovation_direction" jsonb,
  	"data_analytics" jsonb,
  	"featured" boolean DEFAULT false,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "myinsights_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar NOT NULL,
  	"body" jsonb NOT NULL
  );
  
  CREATE TABLE "myinsights" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"category" "enum_myinsights_category" NOT NULL,
  	"img_id" integer NOT NULL,
  	"date" timestamp(3) with time zone,
  	"summary" jsonb NOT NULL,
  	"flagship" boolean DEFAULT false,
  	"featured" boolean DEFAULT false,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "case_studies_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar NOT NULL,
  	"body" jsonb NOT NULL
  );
  
  CREATE TABLE "case_studies" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"summary" jsonb NOT NULL,
  	"theme" varchar NOT NULL,
  	"date" varchar,
  	"period" varchar,
  	"image_id" integer NOT NULL,
  	"featured" boolean DEFAULT false,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "challenge_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"body" varchar NOT NULL,
  	"icon" "enum_challenge_cards_icon" DEFAULT 'shield'
  );
  
  CREATE TABLE "challenge" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"badge" varchar DEFAULT 'Infrastructure',
  	"heading" varchar DEFAULT 'Bridging the Gap Between' NOT NULL,
  	"heading_light" varchar DEFAULT 'Policy and Practice',
  	"body" jsonb DEFAULT '{"root":{"type":"root","children":[{"type":"paragraph","version":1,"children":[{"type":"text","text":"Across regulated environments, the challenge is not technology. It is aligning governance, systems, and operations so data can be used effectively in practice.","version":1}]}],"direction":"ltr","format":"","indent":0,"version":1}}'::jsonb,
  	"cta_label" varchar DEFAULT 'View Case Studies',
  	"cta_href" varchar DEFAULT '/case-studies',
  	"image_id" integer NOT NULL,
  	"image_caption" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "hero_blocks_rich_text_section" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"position" "enum_hero_blocks_rich_text_section_position" DEFAULT 'below-tagline' NOT NULL,
  	"content" jsonb NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "hero_blocks_bullet_list_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" jsonb NOT NULL
  );
  
  CREATE TABLE "hero_blocks_bullet_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"position" "enum_hero_blocks_bullet_list_position" DEFAULT 'below-tagline' NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "hero" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Jason Sturdy' NOT NULL,
  	"heading_highlight" varchar DEFAULT 'Jason',
  	"subheading" varchar DEFAULT 'Building Trusted Systems from Policy to Practice' NOT NULL,
  	"tagline" varchar DEFAULT 'Data Governance â€¢ Security Architecture â€¢ Operating Models â€¢ Digital Infrastructure',
  	"primary_cta_label" varchar DEFAULT 'View Case Studies',
  	"primary_cta_href" varchar DEFAULT '/case-studies',
  	"secondary_cta_label" varchar DEFAULT 'Explore Insights',
  	"secondary_cta_href" varchar DEFAULT '/myinsights',
  	"portrait_id" integer,
  	"portrait_alt" varchar DEFAULT 'Portrait of Jason Sturdy',
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "industries_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"image_id" integer NOT NULL
  );
  
  CREATE TABLE "industries" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"section_label" varchar DEFAULT 'Industries',
  	"heading_regular" varchar DEFAULT 'Operating Across' NOT NULL,
  	"heading_accent" varchar DEFAULT 'Regulated' NOT NULL,
  	"heading_light" varchar DEFAULT 'Environments',
  	"body" jsonb DEFAULT '{"root":{"type":"root","children":[{"type":"paragraph","version":1,"children":[{"type":"text","text":"Across public sector, financial services, healthcare, and critical infrastructure environments, organisations operate under increasing regulatory expectations while managing complex data systems.","version":1}]},{"type":"paragraph","version":1,"children":[{"type":"text","text":"The challenge is not a lack of data or policy. It is making both work together in practice.","version":1}]},{"type":"paragraph","version":1,"children":[{"type":"text","text":"My work focuses on bridging that gap, designing systems and operating models that align governance, infrastructure, and real-world use.","version":1}]}],"direction":"ltr","format":"","indent":0,"version":1}}'::jsonb,
  	"cta_label" varchar DEFAULT 'View Case Studies',
  	"cta_href" varchar DEFAULT '/case-studies',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "response_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL,
  	"alt" varchar DEFAULT ''
  );
  
  CREATE TABLE "response" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"badge" varchar DEFAULT 'Response',
  	"heading" varchar DEFAULT 'Designing Systems' NOT NULL,
  	"heading_light" varchar DEFAULT 'That Work in Practice',
  	"body" jsonb DEFAULT '{"root":{"type":"root","children":[{"type":"paragraph","version":1,"children":[{"type":"text","text":"Addressing the gap between policy, systems, and real-world use requires more than technology.","version":1}]},{"type":"paragraph","version":1,"children":[{"type":"text","text":"It requires approaches that embed governance, standards, and collaboration into how systems are designed and operated.","version":1}]}],"direction":"ltr","format":"","indent":0,"version":1}}'::jsonb,
  	"cta_label" varchar DEFAULT 'Explore Insights',
  	"cta_href" varchar DEFAULT '/myinsights',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "response_card" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"index_label" varchar DEFAULT '01' NOT NULL,
  	"title" varchar DEFAULT 'Governance by Design' NOT NULL,
  	"body" varchar DEFAULT 'Embedding policy and control into system architecture',
  	"bars" "enum_response_card_bars" DEFAULT '1' NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "approach_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"body" jsonb NOT NULL,
  	"icon" "enum_approach_items_icon" DEFAULT 'trust' NOT NULL,
  	"bars" numeric DEFAULT 1 NOT NULL
  );
  
  CREATE TABLE "approach" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"section_label" varchar DEFAULT 'Challenge',
  	"badge" varchar DEFAULT 'Challenge',
  	"heading_accent" varchar DEFAULT 'How',
  	"heading" varchar DEFAULT 'I Work',
  	"body" jsonb,
  	"explore_heading" varchar DEFAULT 'Explore My Work',
  	"explore_body" jsonb,
  	"explore_cta_label" varchar DEFAULT 'View Case Studies',
  	"explore_cta_href" varchar DEFAULT '/case-studies',
  	"explore_cta_label2" varchar DEFAULT 'Explore Insights',
  	"explore_cta_href2" varchar DEFAULT '/insights',
  	"explore_background_image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "standards_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"slug" varchar NOT NULL,
  	"title" varchar NOT NULL,
  	"tagline" varchar NOT NULL,
  	"image_id" integer NOT NULL,
  	"icon" "enum_standards_cards_icon" DEFAULT 'data-governance' NOT NULL
  );
  
  CREATE TABLE "standards" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"badge" varchar DEFAULT 'Standards',
  	"heading" varchar DEFAULT 'Standards,' NOT NULL,
  	"heading_accent" varchar DEFAULT 'Frameworks & Ecosystems',
  	"body" jsonb DEFAULT '{"root":{"type":"root","children":[{"type":"paragraph","version":1,"children":[{"type":"text","text":"Operating within established standards and regulatory frameworks to ensure governance, interoperability, security, and trust across complex environments.","version":1}]},{"type":"paragraph","version":1,"children":[{"type":"text","text":"They are infrastructure-level environments that integrate governance, security, and data exchange across organisations.","version":1}]}],"direction":"ltr","format":"","indent":0,"version":1}}'::jsonb,
  	"cta_label" varchar DEFAULT 'Explore Standards',
  	"cta_href" varchar DEFAULT '/standards',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "application_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"slug" varchar NOT NULL,
  	"title" varchar NOT NULL,
  	"tagline" varchar NOT NULL,
  	"image_id" integer,
  	"icon" "enum_application_cards_icon" DEFAULT 'data-governance' NOT NULL
  );
  
  CREATE TABLE "application" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"badge" varchar DEFAULT 'Application',
  	"heading" varchar DEFAULT 'Applied Across' NOT NULL,
  	"heading_accent" varchar DEFAULT 'Critical Environments',
  	"body" jsonb DEFAULT '{"root":{"type":"root","children":[{"type":"paragraph","version":1,"children":[{"type":"text","text":"This infrastructure is designed to operate in environments where governance, security, and reliability are essential.","version":1}]}],"direction":"ltr","format":"","indent":0,"version":1}}'::jsonb,
  	"cta_label" varchar DEFAULT 'Explore Insights',
  	"cta_href" varchar DEFAULT '/myinsights',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "about" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'About' NOT NULL,
  	"subtitle" varchar DEFAULT 'Executive leadership across sovereign data, governance, and regulated systems' NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "cta_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL,
  	"alt" varchar NOT NULL
  );
  
  CREATE TABLE "cta" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading_start" varchar DEFAULT 'Building',
  	"heading_middle" varchar DEFAULT 'Trusted Systems' NOT NULL,
  	"heading_end" varchar DEFAULT 'for Regulated Environments',
  	"subheading" varchar DEFAULT 'Where policy, infrastructure, and data must work in practice',
  	"button_label" varchar DEFAULT 'Explore My Work',
  	"button_href" varchar DEFAULT '/case-studies',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "executive_profile_paragraphs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL,
  	"is_bold" boolean DEFAULT false
  );
  
  CREATE TABLE "executive_profile" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"section_heading" varchar DEFAULT 'Executive',
  	"section_heading_accent" varchar DEFAULT 'Profile',
  	"image_id" integer NOT NULL,
  	"order" numeric DEFAULT 0,
  	"primary_cta_label" varchar DEFAULT 'View Case Studies',
  	"primary_cta_href" varchar DEFAULT '/case-studies',
  	"secondary_cta_label" varchar DEFAULT 'Explore Insights',
  	"secondary_cta_href" varchar DEFAULT '/myinsights',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "perspective_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL,
  	"alt" varchar DEFAULT ''
  );
  
  CREATE TABLE "perspective" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"badge" varchar DEFAULT 'Perspective',
  	"heading" varchar DEFAULT 'Designing Systems' NOT NULL,
  	"heading_light" varchar DEFAULT 'That Work in Practice',
  	"body" jsonb DEFAULT '{"root":{"type":"root","children":[{"type":"paragraph","version":1,"children":[{"type":"text","text":"Addressing the gap between policy, systems, and real-world use requires more than technology.","version":1}]},{"type":"paragraph","version":1,"children":[{"type":"text","text":"It requires approaches that embed governance, standards, and collaboration into how systems are designed and operated.","version":1}]}],"direction":"ltr","format":"","indent":0,"version":1}}'::jsonb,
  	"cta_label" varchar DEFAULT 'Explore Insights',
  	"cta_href" varchar DEFAULT '/myinsights',
  	"cta_label2" varchar DEFAULT 'Learn More',
  	"cta_href2" varchar DEFAULT '/about',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "impact" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"badge" varchar DEFAULT 'Impact',
  	"heading_accent" varchar DEFAULT 'Why' NOT NULL,
  	"heading" varchar DEFAULT 'This Matters' NOT NULL,
  	"body" jsonb DEFAULT '{"root":{"type":"root","children":[{"type":"paragraph","version":1,"children":[{"type":"text","version":1,"text":"Across government, financial systems, healthcare, and research, the issue is rarely a lack of data or regulation. Both already exist."}]},{"type":"paragraph","version":1,"children":[{"type":"text","version":1,"text":"The problem is that data is difficult to use, and regulatory intent is hard to translate into systems that work in practice. Too much effort is spent working around systems rather than benefiting from them."}]},{"type":"paragraph","version":1,"children":[{"type":"text","version":1,"text":"My work focuses on aligning data, policy, and infrastructure so organisations can operate with clarity, confidence, and control. This enables better decision-making, stronger oversight, and more effective collaboration across institutions."}]}],"direction":"ltr","format":"","indent":0,"version":1}}'::jsonb,
  	"image_id" integer NOT NULL,
  	"primary_cta_label" varchar DEFAULT 'Let''s Connect',
  	"primary_cta_href" varchar DEFAULT '/contact',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "focus_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_focus_cards_icon" DEFAULT 'governance' NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL
  );
  
  CREATE TABLE "focus" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"badge" varchar DEFAULT 'Focus',
  	"heading_accent" varchar DEFAULT 'Core',
  	"heading" varchar DEFAULT 'Areas of Focus' NOT NULL,
  	"primary_cta_label" varchar DEFAULT 'Read Leadership Papers',
  	"primary_cta_href" varchar DEFAULT '/leadership-papers',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "faq" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"question" varchar NOT NULL,
  	"answer" varchar NOT NULL,
  	"order" numeric DEFAULT 0 NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "leadership_papers_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar NOT NULL,
  	"body" jsonb NOT NULL
  );
  
  CREATE TABLE "leadership_papers" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"subtitle" varchar,
  	"category" varchar NOT NULL,
  	"date" varchar,
  	"summary" jsonb NOT NULL,
  	"image_id" integer,
  	"flagship" boolean DEFAULT false,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer,
  	"media_id" integer,
  	"ventures_id" integer,
  	"myinsights_id" integer,
  	"case_studies_id" integer,
  	"challenge_id" integer,
  	"hero_id" integer,
  	"industries_id" integer,
  	"response_id" integer,
  	"response_card_id" integer,
  	"approach_id" integer,
  	"standards_id" integer,
  	"application_id" integer,
  	"about_id" integer,
  	"cta_id" integer,
  	"executive_profile_id" integer,
  	"perspective_id" integer,
  	"impact_id" integer,
  	"focus_id" integer,
  	"faq_id" integer,
  	"leadership_papers_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "footer_nav_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"href" varchar NOT NULL
  );
  
  CREATE TABLE "footer_socials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"href" varchar NOT NULL
  );
  
  CREATE TABLE "footer" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"tagline" varchar NOT NULL,
  	"copyright" varchar DEFAULT 'Copyright Â© All Rights Reserved Jason Sturdy' NOT NULL,
  	"cta_label" varchar,
  	"cta_href" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ventures_collaboration_sought" ADD CONSTRAINT "ventures_collaboration_sought_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."ventures"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ventures" ADD CONSTRAINT "ventures_img_id_media_id_fk" FOREIGN KEY ("img_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "myinsights_sections" ADD CONSTRAINT "myinsights_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."myinsights"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "myinsights" ADD CONSTRAINT "myinsights_img_id_media_id_fk" FOREIGN KEY ("img_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "case_studies_sections" ADD CONSTRAINT "case_studies_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."case_studies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "case_studies" ADD CONSTRAINT "case_studies_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "challenge_cards" ADD CONSTRAINT "challenge_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."challenge"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "challenge" ADD CONSTRAINT "challenge_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "hero_blocks_rich_text_section" ADD CONSTRAINT "hero_blocks_rich_text_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "hero_blocks_bullet_list_items" ADD CONSTRAINT "hero_blocks_bullet_list_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."hero_blocks_bullet_list"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "hero_blocks_bullet_list" ADD CONSTRAINT "hero_blocks_bullet_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "hero" ADD CONSTRAINT "hero_portrait_id_media_id_fk" FOREIGN KEY ("portrait_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "industries_cards" ADD CONSTRAINT "industries_cards_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "industries_cards" ADD CONSTRAINT "industries_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."industries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "response_images" ADD CONSTRAINT "response_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "response_images" ADD CONSTRAINT "response_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."response"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "approach_items" ADD CONSTRAINT "approach_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."approach"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "approach" ADD CONSTRAINT "approach_explore_background_image_id_media_id_fk" FOREIGN KEY ("explore_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "standards_cards" ADD CONSTRAINT "standards_cards_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "standards_cards" ADD CONSTRAINT "standards_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."standards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "application_cards" ADD CONSTRAINT "application_cards_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "application_cards" ADD CONSTRAINT "application_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."application"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cta_cards" ADD CONSTRAINT "cta_cards_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "cta_cards" ADD CONSTRAINT "cta_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "executive_profile_paragraphs" ADD CONSTRAINT "executive_profile_paragraphs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."executive_profile"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "executive_profile" ADD CONSTRAINT "executive_profile_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "perspective_images" ADD CONSTRAINT "perspective_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "perspective_images" ADD CONSTRAINT "perspective_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."perspective"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "impact" ADD CONSTRAINT "impact_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "focus_cards" ADD CONSTRAINT "focus_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."focus"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "leadership_papers_sections" ADD CONSTRAINT "leadership_papers_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."leadership_papers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "leadership_papers" ADD CONSTRAINT "leadership_papers_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_ventures_fk" FOREIGN KEY ("ventures_id") REFERENCES "public"."ventures"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_myinsights_fk" FOREIGN KEY ("myinsights_id") REFERENCES "public"."myinsights"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_case_studies_fk" FOREIGN KEY ("case_studies_id") REFERENCES "public"."case_studies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_challenge_fk" FOREIGN KEY ("challenge_id") REFERENCES "public"."challenge"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_hero_fk" FOREIGN KEY ("hero_id") REFERENCES "public"."hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_industries_fk" FOREIGN KEY ("industries_id") REFERENCES "public"."industries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_response_fk" FOREIGN KEY ("response_id") REFERENCES "public"."response"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_response_card_fk" FOREIGN KEY ("response_card_id") REFERENCES "public"."response_card"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_approach_fk" FOREIGN KEY ("approach_id") REFERENCES "public"."approach"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_standards_fk" FOREIGN KEY ("standards_id") REFERENCES "public"."standards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_application_fk" FOREIGN KEY ("application_id") REFERENCES "public"."application"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_about_fk" FOREIGN KEY ("about_id") REFERENCES "public"."about"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_cta_fk" FOREIGN KEY ("cta_id") REFERENCES "public"."cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_executive_profile_fk" FOREIGN KEY ("executive_profile_id") REFERENCES "public"."executive_profile"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_perspective_fk" FOREIGN KEY ("perspective_id") REFERENCES "public"."perspective"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_impact_fk" FOREIGN KEY ("impact_id") REFERENCES "public"."impact"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_focus_fk" FOREIGN KEY ("focus_id") REFERENCES "public"."focus"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_faq_fk" FOREIGN KEY ("faq_id") REFERENCES "public"."faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_leadership_papers_fk" FOREIGN KEY ("leadership_papers_id") REFERENCES "public"."leadership_papers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_nav_items" ADD CONSTRAINT "footer_nav_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_socials" ADD CONSTRAINT "footer_socials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "ventures_collaboration_sought_order_idx" ON "ventures_collaboration_sought" USING btree ("order");
  CREATE INDEX "ventures_collaboration_sought_parent_idx" ON "ventures_collaboration_sought" USING btree ("parent_id");
  CREATE UNIQUE INDEX "ventures_slug_idx" ON "ventures" USING btree ("slug");
  CREATE INDEX "ventures_img_idx" ON "ventures" USING btree ("img_id");
  CREATE INDEX "ventures_updated_at_idx" ON "ventures" USING btree ("updated_at");
  CREATE INDEX "ventures_created_at_idx" ON "ventures" USING btree ("created_at");
  CREATE INDEX "myinsights_sections_order_idx" ON "myinsights_sections" USING btree ("_order");
  CREATE INDEX "myinsights_sections_parent_id_idx" ON "myinsights_sections" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "myinsights_slug_idx" ON "myinsights" USING btree ("slug");
  CREATE INDEX "myinsights_img_idx" ON "myinsights" USING btree ("img_id");
  CREATE INDEX "myinsights_updated_at_idx" ON "myinsights" USING btree ("updated_at");
  CREATE INDEX "myinsights_created_at_idx" ON "myinsights" USING btree ("created_at");
  CREATE INDEX "case_studies_sections_order_idx" ON "case_studies_sections" USING btree ("_order");
  CREATE INDEX "case_studies_sections_parent_id_idx" ON "case_studies_sections" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "case_studies_slug_idx" ON "case_studies" USING btree ("slug");
  CREATE INDEX "case_studies_image_idx" ON "case_studies" USING btree ("image_id");
  CREATE INDEX "case_studies_updated_at_idx" ON "case_studies" USING btree ("updated_at");
  CREATE INDEX "case_studies_created_at_idx" ON "case_studies" USING btree ("created_at");
  CREATE INDEX "challenge_cards_order_idx" ON "challenge_cards" USING btree ("_order");
  CREATE INDEX "challenge_cards_parent_id_idx" ON "challenge_cards" USING btree ("_parent_id");
  CREATE INDEX "challenge_image_idx" ON "challenge" USING btree ("image_id");
  CREATE INDEX "challenge_updated_at_idx" ON "challenge" USING btree ("updated_at");
  CREATE INDEX "challenge_created_at_idx" ON "challenge" USING btree ("created_at");
  CREATE INDEX "hero_blocks_rich_text_section_order_idx" ON "hero_blocks_rich_text_section" USING btree ("_order");
  CREATE INDEX "hero_blocks_rich_text_section_parent_id_idx" ON "hero_blocks_rich_text_section" USING btree ("_parent_id");
  CREATE INDEX "hero_blocks_rich_text_section_path_idx" ON "hero_blocks_rich_text_section" USING btree ("_path");
  CREATE INDEX "hero_blocks_bullet_list_items_order_idx" ON "hero_blocks_bullet_list_items" USING btree ("_order");
  CREATE INDEX "hero_blocks_bullet_list_items_parent_id_idx" ON "hero_blocks_bullet_list_items" USING btree ("_parent_id");
  CREATE INDEX "hero_blocks_bullet_list_order_idx" ON "hero_blocks_bullet_list" USING btree ("_order");
  CREATE INDEX "hero_blocks_bullet_list_parent_id_idx" ON "hero_blocks_bullet_list" USING btree ("_parent_id");
  CREATE INDEX "hero_blocks_bullet_list_path_idx" ON "hero_blocks_bullet_list" USING btree ("_path");
  CREATE INDEX "hero_portrait_idx" ON "hero" USING btree ("portrait_id");
  CREATE INDEX "hero_updated_at_idx" ON "hero" USING btree ("updated_at");
  CREATE INDEX "hero_created_at_idx" ON "hero" USING btree ("created_at");
  CREATE INDEX "industries_cards_order_idx" ON "industries_cards" USING btree ("_order");
  CREATE INDEX "industries_cards_parent_id_idx" ON "industries_cards" USING btree ("_parent_id");
  CREATE INDEX "industries_cards_image_idx" ON "industries_cards" USING btree ("image_id");
  CREATE INDEX "industries_updated_at_idx" ON "industries" USING btree ("updated_at");
  CREATE INDEX "industries_created_at_idx" ON "industries" USING btree ("created_at");
  CREATE INDEX "response_images_order_idx" ON "response_images" USING btree ("_order");
  CREATE INDEX "response_images_parent_id_idx" ON "response_images" USING btree ("_parent_id");
  CREATE INDEX "response_images_image_idx" ON "response_images" USING btree ("image_id");
  CREATE INDEX "response_updated_at_idx" ON "response" USING btree ("updated_at");
  CREATE INDEX "response_created_at_idx" ON "response" USING btree ("created_at");
  CREATE INDEX "response_card_updated_at_idx" ON "response_card" USING btree ("updated_at");
  CREATE INDEX "response_card_created_at_idx" ON "response_card" USING btree ("created_at");
  CREATE INDEX "approach_items_order_idx" ON "approach_items" USING btree ("_order");
  CREATE INDEX "approach_items_parent_id_idx" ON "approach_items" USING btree ("_parent_id");
  CREATE INDEX "approach_explore_background_image_idx" ON "approach" USING btree ("explore_background_image_id");
  CREATE INDEX "approach_updated_at_idx" ON "approach" USING btree ("updated_at");
  CREATE INDEX "approach_created_at_idx" ON "approach" USING btree ("created_at");
  CREATE INDEX "standards_cards_order_idx" ON "standards_cards" USING btree ("_order");
  CREATE INDEX "standards_cards_parent_id_idx" ON "standards_cards" USING btree ("_parent_id");
  CREATE INDEX "standards_cards_image_idx" ON "standards_cards" USING btree ("image_id");
  CREATE INDEX "standards_updated_at_idx" ON "standards" USING btree ("updated_at");
  CREATE INDEX "standards_created_at_idx" ON "standards" USING btree ("created_at");
  CREATE INDEX "application_cards_order_idx" ON "application_cards" USING btree ("_order");
  CREATE INDEX "application_cards_parent_id_idx" ON "application_cards" USING btree ("_parent_id");
  CREATE INDEX "application_cards_image_idx" ON "application_cards" USING btree ("image_id");
  CREATE INDEX "application_updated_at_idx" ON "application" USING btree ("updated_at");
  CREATE INDEX "application_created_at_idx" ON "application" USING btree ("created_at");
  CREATE INDEX "about_updated_at_idx" ON "about" USING btree ("updated_at");
  CREATE INDEX "about_created_at_idx" ON "about" USING btree ("created_at");
  CREATE INDEX "cta_cards_order_idx" ON "cta_cards" USING btree ("_order");
  CREATE INDEX "cta_cards_parent_id_idx" ON "cta_cards" USING btree ("_parent_id");
  CREATE INDEX "cta_cards_image_idx" ON "cta_cards" USING btree ("image_id");
  CREATE INDEX "cta_updated_at_idx" ON "cta" USING btree ("updated_at");
  CREATE INDEX "cta_created_at_idx" ON "cta" USING btree ("created_at");
  CREATE INDEX "executive_profile_paragraphs_order_idx" ON "executive_profile_paragraphs" USING btree ("_order");
  CREATE INDEX "executive_profile_paragraphs_parent_id_idx" ON "executive_profile_paragraphs" USING btree ("_parent_id");
  CREATE INDEX "executive_profile_image_idx" ON "executive_profile" USING btree ("image_id");
  CREATE INDEX "executive_profile_updated_at_idx" ON "executive_profile" USING btree ("updated_at");
  CREATE INDEX "executive_profile_created_at_idx" ON "executive_profile" USING btree ("created_at");
  CREATE INDEX "perspective_images_order_idx" ON "perspective_images" USING btree ("_order");
  CREATE INDEX "perspective_images_parent_id_idx" ON "perspective_images" USING btree ("_parent_id");
  CREATE INDEX "perspective_images_image_idx" ON "perspective_images" USING btree ("image_id");
  CREATE INDEX "perspective_updated_at_idx" ON "perspective" USING btree ("updated_at");
  CREATE INDEX "perspective_created_at_idx" ON "perspective" USING btree ("created_at");
  CREATE INDEX "impact_image_idx" ON "impact" USING btree ("image_id");
  CREATE INDEX "impact_updated_at_idx" ON "impact" USING btree ("updated_at");
  CREATE INDEX "impact_created_at_idx" ON "impact" USING btree ("created_at");
  CREATE INDEX "focus_cards_order_idx" ON "focus_cards" USING btree ("_order");
  CREATE INDEX "focus_cards_parent_id_idx" ON "focus_cards" USING btree ("_parent_id");
  CREATE INDEX "focus_updated_at_idx" ON "focus" USING btree ("updated_at");
  CREATE INDEX "focus_created_at_idx" ON "focus" USING btree ("created_at");
  CREATE INDEX "faq_updated_at_idx" ON "faq" USING btree ("updated_at");
  CREATE INDEX "faq_created_at_idx" ON "faq" USING btree ("created_at");
  CREATE INDEX "leadership_papers_sections_order_idx" ON "leadership_papers_sections" USING btree ("_order");
  CREATE INDEX "leadership_papers_sections_parent_id_idx" ON "leadership_papers_sections" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "leadership_papers_slug_idx" ON "leadership_papers" USING btree ("slug");
  CREATE INDEX "leadership_papers_image_idx" ON "leadership_papers" USING btree ("image_id");
  CREATE INDEX "leadership_papers_updated_at_idx" ON "leadership_papers" USING btree ("updated_at");
  CREATE INDEX "leadership_papers_created_at_idx" ON "leadership_papers" USING btree ("created_at");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_ventures_id_idx" ON "payload_locked_documents_rels" USING btree ("ventures_id");
  CREATE INDEX "payload_locked_documents_rels_myinsights_id_idx" ON "payload_locked_documents_rels" USING btree ("myinsights_id");
  CREATE INDEX "payload_locked_documents_rels_case_studies_id_idx" ON "payload_locked_documents_rels" USING btree ("case_studies_id");
  CREATE INDEX "payload_locked_documents_rels_challenge_id_idx" ON "payload_locked_documents_rels" USING btree ("challenge_id");
  CREATE INDEX "payload_locked_documents_rels_hero_id_idx" ON "payload_locked_documents_rels" USING btree ("hero_id");
  CREATE INDEX "payload_locked_documents_rels_industries_id_idx" ON "payload_locked_documents_rels" USING btree ("industries_id");
  CREATE INDEX "payload_locked_documents_rels_response_id_idx" ON "payload_locked_documents_rels" USING btree ("response_id");
  CREATE INDEX "payload_locked_documents_rels_response_card_id_idx" ON "payload_locked_documents_rels" USING btree ("response_card_id");
  CREATE INDEX "payload_locked_documents_rels_approach_id_idx" ON "payload_locked_documents_rels" USING btree ("approach_id");
  CREATE INDEX "payload_locked_documents_rels_standards_id_idx" ON "payload_locked_documents_rels" USING btree ("standards_id");
  CREATE INDEX "payload_locked_documents_rels_application_id_idx" ON "payload_locked_documents_rels" USING btree ("application_id");
  CREATE INDEX "payload_locked_documents_rels_about_id_idx" ON "payload_locked_documents_rels" USING btree ("about_id");
  CREATE INDEX "payload_locked_documents_rels_cta_id_idx" ON "payload_locked_documents_rels" USING btree ("cta_id");
  CREATE INDEX "payload_locked_documents_rels_executive_profile_id_idx" ON "payload_locked_documents_rels" USING btree ("executive_profile_id");
  CREATE INDEX "payload_locked_documents_rels_perspective_id_idx" ON "payload_locked_documents_rels" USING btree ("perspective_id");
  CREATE INDEX "payload_locked_documents_rels_impact_id_idx" ON "payload_locked_documents_rels" USING btree ("impact_id");
  CREATE INDEX "payload_locked_documents_rels_focus_id_idx" ON "payload_locked_documents_rels" USING btree ("focus_id");
  CREATE INDEX "payload_locked_documents_rels_faq_id_idx" ON "payload_locked_documents_rels" USING btree ("faq_id");
  CREATE INDEX "payload_locked_documents_rels_leadership_papers_id_idx" ON "payload_locked_documents_rels" USING btree ("leadership_papers_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "footer_nav_items_order_idx" ON "footer_nav_items" USING btree ("_order");
  CREATE INDEX "footer_nav_items_parent_id_idx" ON "footer_nav_items" USING btree ("_parent_id");
  CREATE INDEX "footer_socials_order_idx" ON "footer_socials" USING btree ("_order");
  CREATE INDEX "footer_socials_parent_id_idx" ON "footer_socials" USING btree ("_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "ventures_collaboration_sought" CASCADE;
  DROP TABLE "ventures" CASCADE;
  DROP TABLE "myinsights_sections" CASCADE;
  DROP TABLE "myinsights" CASCADE;
  DROP TABLE "case_studies_sections" CASCADE;
  DROP TABLE "case_studies" CASCADE;
  DROP TABLE "challenge_cards" CASCADE;
  DROP TABLE "challenge" CASCADE;
  DROP TABLE "hero_blocks_rich_text_section" CASCADE;
  DROP TABLE "hero_blocks_bullet_list_items" CASCADE;
  DROP TABLE "hero_blocks_bullet_list" CASCADE;
  DROP TABLE "hero" CASCADE;
  DROP TABLE "industries_cards" CASCADE;
  DROP TABLE "industries" CASCADE;
  DROP TABLE "response_images" CASCADE;
  DROP TABLE "response" CASCADE;
  DROP TABLE "response_card" CASCADE;
  DROP TABLE "approach_items" CASCADE;
  DROP TABLE "approach" CASCADE;
  DROP TABLE "standards_cards" CASCADE;
  DROP TABLE "standards" CASCADE;
  DROP TABLE "application_cards" CASCADE;
  DROP TABLE "application" CASCADE;
  DROP TABLE "about" CASCADE;
  DROP TABLE "cta_cards" CASCADE;
  DROP TABLE "cta" CASCADE;
  DROP TABLE "executive_profile_paragraphs" CASCADE;
  DROP TABLE "executive_profile" CASCADE;
  DROP TABLE "perspective_images" CASCADE;
  DROP TABLE "perspective" CASCADE;
  DROP TABLE "impact" CASCADE;
  DROP TABLE "focus_cards" CASCADE;
  DROP TABLE "focus" CASCADE;
  DROP TABLE "faq" CASCADE;
  DROP TABLE "leadership_papers_sections" CASCADE;
  DROP TABLE "leadership_papers" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "footer_nav_items" CASCADE;
  DROP TABLE "footer_socials" CASCADE;
  DROP TABLE "footer" CASCADE;
  DROP TYPE "public"."enum_ventures_collaboration_sought";
  DROP TYPE "public"."enum_ventures_status";
  DROP TYPE "public"."enum_myinsights_category";
  DROP TYPE "public"."enum_challenge_cards_icon";
  DROP TYPE "public"."enum_hero_blocks_rich_text_section_position";
  DROP TYPE "public"."enum_hero_blocks_bullet_list_position";
  DROP TYPE "public"."enum_response_card_bars";
  DROP TYPE "public"."enum_approach_items_icon";
  DROP TYPE "public"."enum_standards_cards_icon";
  DROP TYPE "public"."enum_application_cards_icon";
  DROP TYPE "public"."enum_focus_cards_icon";`)
}
