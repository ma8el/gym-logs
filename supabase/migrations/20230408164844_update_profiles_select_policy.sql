alter policy "Public profiles are viewable by everyone." on profiles
  using (auth.uid() = id);