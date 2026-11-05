'use client';

import { useEffect, useRef, useState } from 'react';
import { ImageCropArea, type ImageCropAreaHandle } from './ImageCropArea';

/** Modal to zoom and frame a photo before upload. */
export function PhotoCropDialog({
  file,
  title = 'Adjust photo',
  aspect = 1,
  shape = 'circle',
  onCancel,
  onConfirm,
}: {
  file: File | null;
  title?: string;
  aspect?: number;
  shape?: 'circle' | 'rect';
  onCancel: () => void;
  onConfirm: (cropped: File) => void;
}) {
  const cropRef = useRef<ImageCropAreaHandle>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setError(null);
    if (!file) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onCancel();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [file, onCancel]);

  if (!file) return null;

  async function confirm() {
    if (!cropRef.current) return;
    setBusy(true);
    setError(null);
    try {
      onConfirm(await cropRef.current.crop());
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Could not crop the image.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-4 backdrop-blur-sm"
      onClick={(event) => {
        if (event.target === event.currentTarget) onCancel();
      }}
    >
      <div className="w-full max-w-sm rounded-2xl border border-line bg-surface p-5 text-foreground shadow-2xl">
        <h2 className="text-base font-semibold">{title}</h2>
        <p className="mt-1 text-xs text-muted">Drag to position. Use the slider, scroll or pinch to zoom.</p>
        <div className="mt-4">
          <ImageCropArea ref={cropRef} file={file} aspect={aspect} shape={shape} onError={setError} />
        </div>
        {error ? (
          <p className="mt-3 text-center text-xs font-medium text-red-500" role="alert">
            {error}
          </p>
        ) : null}
        <div className="mt-5 flex justify-end gap-2">
          <button type="button" className="btn-ghost text-sm" onClick={onCancel}>
            Cancel
          </button>
          <button type="button" className="btn-primary text-sm" disabled={busy} onClick={() => void confirm()}>
            {busy ? 'Please wait…' : 'Use photo'}
          </button>
        </div>
      </div>
    </div>
  );
}
