/*
# Create products table for Hpaper storefront

1. Purpose
- Hpaper is a paper-selling business website (French language).
- The storefront displays a catalog of paper products (A4/A3, couché, bristol, etc.).
- An admin panel allows managing (create, read, update, delete) the product catalog.
- This is a single-tenant app with no user sign-in; the admin uses a simple password gate on the frontend.

2. New Tables
- `products`
  - `id` (uuid, primary key, auto-generated)
  - `name` (text, not null) — product name
  - `category` (text, not null) — product category (e.g. "Papier A4 / A3")
  - `price` (text, nullable) — price or "Sur devis" indication
  - `description` (text, not null) — product description
  - `image` (text, nullable) — optional image URL
  - `created_at` (timestamptz, default now())

3. Security
- Enable RLS on `products`.
- Allow anon + authenticated full CRUD because this is a single-tenant app with no sign-in;
  the admin gate is enforced client-side (matching the original site's design).
- All data is intentionally shared/public.

4. Notes
- Uses `gen_random_uuid()` for id generation.
- Ordered by `created_at DESC` in queries (newest first).
*/

CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  category text NOT NULL,
  price text,
  description text NOT NULL,
  image text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_products" ON products;
CREATE POLICY "anon_select_products"
ON products FOR SELECT
TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_products" ON products;
CREATE POLICY "anon_insert_products"
ON products FOR INSERT
TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_products" ON products;
CREATE POLICY "anon_update_products"
ON products FOR UPDATE
TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_products" ON products;
CREATE POLICY "anon_delete_products"
ON products FOR DELETE
TO anon, authenticated USING (true);
