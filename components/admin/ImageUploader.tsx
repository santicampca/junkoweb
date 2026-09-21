"use client";

import { useRef, useState } from "react";
import { createClient } from "@/lib/supabase/client";

interface ImageUploaderProps {
  name: string;
  folder: string;
  defaultValue?: string | null;
  label?: string;
}

/**
 * Uploads a file straight to the public "media" Supabase Storage bucket
 * from the browser, then exposes the resulting public URL through a
 * hidden input so it submits alongside the surrounding server-action form.
 */
export function ImageUploader({
  name,
  folder,
  defaultValue,
  label = "Imagen",
}: ImageUploaderProps) {
  const [url, setUrl] = useState(defaultValue ?? "");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFile(file: File) {
    setUploading(true);
    setError(null);
    try {
      const supabase = createClient();
      const ext = file.name.split(".").pop();
      const path = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

      const { error: uploadError } = await supabase.storage
        .from("media")
        .upload(path, file, { cacheControl: "3600", upsert: false });

      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from("media").getPublicUrl(path);
      setUrl(data.publicUrl);
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo subir la imagen.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="flex flex-col gap-3">
      <span className="font-sans text-xs uppercase tracking-widest2 text-navy/50">
        {label}
      </span>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
        }}
        className="font-sans text-xs text-navy/70"
      />

      {uploading ? (
        <p className="font-sans text-xs text-navy/50">Subiendo imagen...</p>
      ) : null}
      {error ? <p className="font-sans text-xs text-red-700">{error}</p> : null}
      {url ? (
        <div className="flex items-center gap-3">
          <img src={url} alt="Vista previa" className="h-16 w-16 rounded-sm object-cover" />
          <span className="max-w-xs truncate font-sans text-xs text-navy/50">{url}</span>
        </div>
      ) : null}

      <input type="hidden" name={name} value={url} />
    </div>
  );
}
