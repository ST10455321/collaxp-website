export type AppRole = "student" | "organiser" | "admin";

export type Profile = {
  id: string;
  student_number: string | null;
  email: string | null;
  full_name: string | null;
  username: string | null;
  institution: string | null;
  bio: string | null;
  avatar_url: string | null;
  course: string | null;
  graduation_date: string | null;
  xp: number;
  level: number;
};

export type PublicProfile = {
  id: string;
  username: string | null;
  full_name: string | null;
  avatar_url: string | null;
  institution: string | null;
};

export type EventFull = {
  id: string;
  organiser_id: string;
  title: string;
  description: string;
  institution: string;
  location: string;
  category: string;
  poster_url: string | null;
  event_date: string;
  start_time: string;
  price: number;
  age_restriction: string;
  xp_reward: number;
  capacity: number | null;
  is_published: boolean;
  event_type: string;
  speaker: string | null;
  agenda: string | null;
  created_at: string;
  updated_at: string;
};

export type EventPayload = Omit<EventFull, "id" | "created_at" | "updated_at" | "age_restriction"> & {
  age_restriction?: string;
};

export type RegistrationProfile = {
  student_number: string | null;
  username: string | null;
  full_name: string | null;
  institution: string | null;
};

export type RegistrationRow = {
  id: string;
  event_id: string;
  user_id: string;
  organiser_id: string;
  ticket_no: string;
  attended: boolean;
  scanned_at: string | null;
  created_at: string;
  profile: RegistrationProfile | null;
};

export type RegistrationWithEvent = RegistrationRow & { event: EventFull | null };

export type CartItemRow = {
  id: string;
  user_id: string;
  event_id: string;
  quantity: number;
  created_at: string;
  event: EventFull | null;
};

export type NotificationRow = {
  id: string;
  user_id: string;
  title: string;
  body: string;
  kind: string;
  event_id: string | null;
  is_read: boolean;
  created_at: string;
};

export type ReelBase = {
  id: string;
  organiser_id: string;
  event_id: string | null;
  title: string;
  caption: string;
  video_url: string; // Storage path, e.g. "<uid>/<uuid>.mp4"
  thumbnail_url: string | null;
  is_published: boolean;
  created_at: string;
};

export type ReelLike = { reel_id: string; user_id: string };

export type ReelCommentRow = {
  id: string;
  reel_id: string;
  user_id: string;
  body: string;
  created_at: string;
};
