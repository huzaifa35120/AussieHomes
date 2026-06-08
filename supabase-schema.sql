-- ================================================
-- AUZI HOMES – SUPABASE DATABASE SCHEMA
-- Run this in your Supabase SQL Editor
-- ================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ================================================
-- PROJECTS TABLE
-- ================================================
CREATE TABLE IF NOT EXISTS projects (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title           TEXT NOT NULL,
  short_description TEXT NOT NULL DEFAULT '',
  description     TEXT NOT NULL DEFAULT '',
  project_type    TEXT NOT NULL CHECK (project_type IN ('new_build', 'renovation', 'knockdown_rebuild')),
  status          TEXT NOT NULL DEFAULT 'completed' CHECK (status IN ('completed', 'in_progress', 'upcoming')),
  address         TEXT NOT NULL DEFAULT '',
  suburb          TEXT NOT NULL DEFAULT '',
  state           TEXT NOT NULL DEFAULT 'NSW',
  year_completed  INTEGER,
  images          TEXT[] DEFAULT '{}',
  video_url       TEXT,
  featured        BOOLEAN DEFAULT FALSE,
  bedrooms        INTEGER,
  bathrooms       INTEGER,
  area_sqm        NUMERIC(8,2),
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

-- Auto-update updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER projects_updated_at
  BEFORE UPDATE ON projects
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ================================================
-- CONTACT ENQUIRIES TABLE
-- ================================================
CREATE TABLE IF NOT EXISTS contact_enquiries (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name          TEXT NOT NULL,
  email         TEXT NOT NULL,
  phone         TEXT,
  service_type  TEXT,
  message       TEXT NOT NULL,
  read          BOOLEAN DEFAULT FALSE,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

-- ================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ================================================

-- Projects: anyone can read, only authenticated users can write
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read projects"
  ON projects FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can insert projects"
  ON projects FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update projects"
  ON projects FOR UPDATE
  TO authenticated
  USING (true) WITH CHECK (true);

CREATE POLICY "Authenticated users can delete projects"
  ON projects FOR DELETE
  TO authenticated
  USING (true);

-- Enquiries: anyone can insert, only authenticated users can read/update
ALTER TABLE contact_enquiries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit enquiries"
  ON contact_enquiries FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Authenticated users can read enquiries"
  ON contact_enquiries FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can update enquiries"
  ON contact_enquiries FOR UPDATE
  TO authenticated
  USING (true) WITH CHECK (true);

-- ================================================
-- STORAGE BUCKET FOR IMAGES
-- ================================================
-- Run this separately in Supabase Storage or via the dashboard:
--
-- 1. Go to Storage in your Supabase project
-- 2. Create a new bucket called "project-images"
-- 3. Make it PUBLIC
-- 4. Set the following policy:
--
-- INSERT policy: authenticated users only
-- SELECT policy: public (anyone can view)
--
-- OR run these SQL commands:

INSERT INTO storage.buckets (id, name, public)
VALUES ('project-images', 'project-images', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Public can view project images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'project-images');

CREATE POLICY "Authenticated users can upload images"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'project-images');

CREATE POLICY "Authenticated users can delete images"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'project-images');

-- ================================================
-- SAMPLE DATA (Optional – remove if not needed)
-- ================================================
INSERT INTO projects (
  title, short_description, description, project_type, status,
  address, suburb, state, year_completed, featured, bedrooms, bathrooms, area_sqm
) VALUES (
  'Modern 4-Bedroom Family Home',
  'A stunning custom new build featuring open-plan living and premium finishes throughout.',
  'This beautiful family home was designed and built from the ground up for a growing family in Parramatta. The project included full DA approval, site preparation, construction, and interior fit-out with premium fixtures. The open-plan kitchen and living area flows seamlessly to the alfresco entertainment space, perfect for the Australian lifestyle.',
  'new_build',
  'completed',
  '42 Sunset Drive',
  'Parramatta',
  'NSW',
  2024,
  true,
  4, 2, 285
),
(
  'Complete Home Renovation – Strathfield',
  'Full internal renovation of a 1960s home transformed into a contemporary family masterpiece.',
  'This ambitious renovation project took a tired 1960s home in Strathfield and transformed it into a modern, light-filled family home. The scope included complete internal demolition, new kitchen and bathrooms, structural changes to open up the floor plan, new flooring throughout, and a rear extension to create an additional living space.',
  'renovation',
  'completed',
  '15 Elm Street',
  'Strathfield',
  'NSW',
  2023,
  true,
  3, 2, 180
);
