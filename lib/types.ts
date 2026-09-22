import type { Database } from "@/lib/database.types";

export type { Database } from "@/lib/database.types";

export type ReservationStatus =
  | "pending"
  | "contacted"
  | "confirmed"
  | "rejected"
  | "cancelled"
  | "completed";

export type Reservation = Omit<
  Database["public"]["Tables"]["reservations"]["Row"],
  "status"
> & { status: ReservationStatus };

export type ContactStatus = "nuevo" | "contactado" | "en_seguimiento" | "convertido" | "cerrado";

export type TournamentStatus = "upcoming" | "past" | "cancelled";

export type Tournament = Omit<
  Database["public"]["Tables"]["tournaments"]["Row"],
  "status"
> & { status: TournamentStatus };

export type GalleryCategory =
  | "hero"
  | "gallery"
  | "club"
  | "tournaments"
  | "memberships"
  | "people"
  | "mountain"
  | "moments";

export type GalleryItem = Omit<
  Database["public"]["Tables"]["gallery"]["Row"],
  "category"
> & { category: GalleryCategory };

export type Membership = Database["public"]["Tables"]["memberships"]["Row"];

export type Page = Omit<Database["public"]["Tables"]["pages"]["Row"], "content"> & {
  content: Record<string, string>;
};

export type ContactMessage = Omit<
  Database["public"]["Tables"]["contact_messages"]["Row"],
  "status"
> & { status: ContactStatus };

export type ProfileRole = "admin" | "member" | "super_admin" | "recepcion";

export type Profile = Omit<Database["public"]["Tables"]["profiles"]["Row"], "role"> & {
  role: ProfileRole;
};
