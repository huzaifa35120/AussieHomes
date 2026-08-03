-- ================================================
-- SITE SETTINGS – EDITABLE FROM ADMIN PORTAL
-- Run this in Supabase SQL Editor after the main schema
-- ================================================

CREATE TABLE IF NOT EXISTS site_settings (
  id                     TEXT PRIMARY KEY DEFAULT 'main',
  company_name           TEXT NOT NULL DEFAULT 'Auzi Homes PTY LTD',
  tagline                TEXT NOT NULL DEFAULT 'Building homes just got better',
  director_name          TEXT NOT NULL DEFAULT 'Faizan Tayyab',
  director_title         TEXT NOT NULL DEFAULT 'Director & Licensed Builder',
  director_initials      TEXT NOT NULL DEFAULT 'FT',
  director_quote         TEXT NOT NULL DEFAULT 'At Auzi Homes, we believe every family deserves a home built with honesty, skill, and genuine care. That''s the standard we hold ourselves to on every single project.',
  licence_number         TEXT NOT NULL DEFAULT '466481',
  acn                    TEXT NOT NULL DEFAULT '673 861 893',
  phone_mobile           TEXT NOT NULL DEFAULT '0424 870 667',
  phone_office           TEXT NOT NULL DEFAULT '',
  email                  TEXT NOT NULL DEFAULT 'auzihomes@gmail.com',
  address_short          TEXT NOT NULL DEFAULT 'Sydney, NSW, Australia',
  address_service_area   TEXT NOT NULL DEFAULT 'Servicing all of Greater Sydney',
  business_hours_weekday TEXT NOT NULL DEFAULT 'Mon – Fri: 7am – 6pm',
  business_hours_weekend TEXT NOT NULL DEFAULT 'Sat: 8am – 2pm',
  updated_at             TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT site_settings_singleton CHECK (id = 'main')
);

-- Seed the singleton row with defaults (only if it doesn't exist yet)
INSERT INTO site_settings (id) VALUES ('main')
ON CONFLICT (id) DO NOTHING;

-- Reuse the update_updated_at() trigger function created in the main schema
DROP TRIGGER IF EXISTS site_settings_updated_at ON site_settings;
CREATE TRIGGER site_settings_updated_at
  BEFORE UPDATE ON site_settings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ================================================
-- ROW LEVEL SECURITY
-- ================================================
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can read site settings" ON site_settings;
CREATE POLICY "Public can read site settings"
  ON site_settings FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Authenticated users can update site settings" ON site_settings;
CREATE POLICY "Authenticated users can update site settings"
  ON site_settings FOR UPDATE
  TO authenticated
  USING (id = 'main') WITH CHECK (id = 'main');
