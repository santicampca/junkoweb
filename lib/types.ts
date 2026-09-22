import type { Database } from "@/lib/database.types";

export type { Database } from "@/lib/database.types";

export type ReservationStatus = "pending" | "confirmed" | "cancelled";

export type Reservation = Omit<
  Database["public"]["Tables"]["reservations"]["Row"],
  "status"
> & { status: ReservationStatus };

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

export type ContactMessage = Database["public"]["Tables"]["contact_messages"]["Row"];

export type Profile = Omit<Database["public"]["Tables"]["profiles"]["Row"], "role"> & {
  role: "admin" | "member";
};
