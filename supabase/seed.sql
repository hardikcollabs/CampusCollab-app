insert into public.skills (name) values
  ('React'), ('Next.js'), ('Figma'), ('Data Viz'), ('Product'), ('Research'),
  ('Node.js'), ('Writing'), ('Video'), ('Social Media')
on conflict (name) do nothing;
-- Create real profiles and projects through Supabase Auth in local development.
