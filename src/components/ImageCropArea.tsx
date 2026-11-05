'use client';

import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import type { PointerEvent as ReactPointerEvent, WheelEvent as ReactWheelEvent } from 'react';

export type ImageCropAreaHandle = {
  /** Renders the visible region to a JPEG file at `outputWidth` pixels wide. */
  crop: () => Promise<File>;
};

type ImageCropAreaProps = {
  file: File;
  /** Width / height of the crop window (1 = square, 7 / 9 = passport). */
  aspect?: number;
  /** Circle guide for avatars; the exported image is still rectangular. */
  shape?: 'circle' | 'rect';
  outputWidth?: number;
  maxZoom?: number;
  onError?: (message: string) => void;
};

const VIEWPORT_WIDTH = 280;

type Offset = { x: number; y: number };

/**
 * Drag to position, zoom with the slider, mouse wheel or pinch. Self-contained
 * (inline styles). Keep in sync with portal-shell image-crop-area.tsx.
 */
export const ImageCropArea = forwardRef<ImageCropAreaHandle, ImageCropAreaProps>(
  function ImageCropArea(
    { file, aspect = 1, shape = 'circle', outputWidth = 600, maxZoom = 4, onError },
    ref,
  ) {
    const viewW = VIEWPORT_WIDTH;
    const viewH = Math.round(VIEWPORT_WIDTH / aspect);
    const [src, setSrc] = useState<string | null>(null);
    const [natural, setNatural] = useState<{ w: number; h: number } | null>(null);
    const [zoom, setZoom] = useState(1);
    const [offset, setOffset] = useState<Offset>({ x: 0, y: 0 });
    const imageRef = useRef<HTMLImageElement | null>(null);
    const pointers = useRef(new Map<number, { x: number; y: number }>());
    const gesture = useRef<{ offset: Offset; start: Offset; pinchDistance?: number; zoom: number } | null>(null);

    useEffect(() => {
      const url = URL.createObjectURL(file);
      setSrc(url);
      setNatural(null);
      setZoom(1);
      return () => URL.revokeObjectURL(url);
    }, [file]);

    const baseScale = natural ? Math.max(viewW / natural.w, viewH / natural.h) : 1;

    const clamp = useCallback(
      (next: Offset, nextZoom: number): Offset => {
        if (!natural) return next;
        const scale = baseScale * nextZoom;
        const minX = viewW - natural.w * scale;
        const minY = viewH - natural.h * scale;
        return {
          x: Math.min(0, Math.max(minX, next.x)),
          y: Math.min(0, Math.max(minY, next.y)),
        };
      },
      [baseScale, natural, viewH, viewW],
    );

    /** Zoom while keeping the point under (px, py) — viewport coords — fixed. */
    const zoomTo = useCallback(
      (nextZoom: number, px = viewW / 2, py = viewH / 2, from?: { offset: Offset; zoom: number }) => {
        const bounded = Math.min(maxZoom, Math.max(1, nextZoom));
        const startZoom = from?.zoom ?? zoom;
        const startOffset = from?.offset ?? offset;
        const ratio = bounded / startZoom;
        const next = {
          x: px - (px - startOffset.x) * ratio,
          y: py - (py - startOffset.y) * ratio,
        };
        setZoom(bounded);
        setOffset(clamp(next, bounded));
      },
      [clamp, maxZoom, offset, viewH, viewW, zoom],
    );

    function onImageLoad() {
      const image = imageRef.current;
      if (!image) return;
      const size = { w: image.naturalWidth, h: image.naturalHeight };
      setNatural(size);
      const scale = Math.max(viewW / size.w, viewH / size.h);
      setOffset({ x: (viewW - size.w * scale) / 2, y: (viewH - size.h * scale) / 2 });
    }

    function localPoint(event: ReactPointerEvent<HTMLDivElement>) {
      const rect = event.currentTarget.getBoundingClientRect();
      return { x: event.clientX - rect.left, y: event.clientY - rect.top };
    }

    function onPointerDown(event: ReactPointerEvent<HTMLDivElement>) {
      event.currentTarget.setPointerCapture(event.pointerId);
      pointers.current.set(event.pointerId, localPoint(event));
      const points = Array.from(pointers.current.values());
      gesture.current = {
        offset,
        zoom,
        start: points.length === 2 ? midpoint(points[0]!, points[1]!) : points[0]!,
        pinchDistance: points.length === 2 ? distance(points[0]!, points[1]!) : undefined,
      };
    }

    function onPointerMove(event: ReactPointerEvent<HTMLDivElement>) {
      if (!pointers.current.has(event.pointerId) || !gesture.current) return;
      pointers.current.set(event.pointerId, localPoint(event));
      const points = Array.from(pointers.current.values());
      const g = gesture.current;
      if (points.length === 2 && g.pinchDistance) {
        const center = midpoint(points[0]!, points[1]!);
        zoomTo((g.zoom * distance(points[0]!, points[1]!)) / g.pinchDistance, center.x, center.y, g);
        return;
      }
      const point = points[0]!;
      setOffset(clamp({ x: g.offset.x + point.x - g.start.x, y: g.offset.y + point.y - g.start.y }, zoom));
    }

    function onPointerUp(event: ReactPointerEvent<HTMLDivElement>) {
      pointers.current.delete(event.pointerId);
      const points = Array.from(pointers.current.values());
      gesture.current = points.length ? { offset, zoom, start: points[0]! } : null;
    }

    function onWheel(event: ReactWheelEvent<HTMLDivElement>) {
      const rect = event.currentTarget.getBoundingClientRect();
      zoomTo(zoom * (event.deltaY < 0 ? 1.08 : 1 / 1.08), event.clientX - rect.left, event.clientY - rect.top);
    }

    useImperativeHandle(
      ref,
      () => ({
        crop: async () => {
          const image = imageRef.current;
          if (!image || !natural) throw new Error('The image is still loading.');
          const scale = baseScale * zoom;
          const outW = Math.min(outputWidth, Math.round(viewW / scale));
          const outH = Math.round(outW / aspect);
          const canvas = document.createElement('canvas');
          canvas.width = outW;
          canvas.height = outH;
          const context = canvas.getContext('2d');
          if (!context) throw new Error('Your browser cannot crop images.');
          context.imageSmoothingQuality = 'high';
          context.drawImage(image, -offset.x / scale, -offset.y / scale, viewW / scale, viewH / scale, 0, 0, outW, outH);
          const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, 'image/jpeg', 0.92));
          if (!blob) throw new Error('Could not crop the image.');
          const base = file.name.replace(/\.[^.]+$/, '') || 'photo';
          return new File([blob], `${base}-cropped.jpg`, { type: 'image/jpeg' });
        },
      }),
      [aspect, baseScale, file.name, natural, offset, outputWidth, viewH, viewW, zoom],
    );

    const scale = baseScale * zoom;
    const radius = shape === 'circle' ? '50%' : '12px';

    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
        <div
          role="application"
          aria-label="Drag to position the photo, scroll or pinch to zoom"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          onWheel={onWheel}
          style={{
            position: 'relative',
            width: viewW,
            height: viewH,
            overflow: 'hidden',
            borderRadius: 12,
            background: '#0b0f14',
            cursor: 'grab',
            touchAction: 'none',
            userSelect: 'none',
          }}
        >
          {src ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              ref={imageRef}
              src={src}
              alt=""
              draggable={false}
              onLoad={onImageLoad}
              onError={() => onError?.('That file could not be opened as an image. Try a JPG or PNG.')}
              style={{
                position: 'absolute',
                left: 0,
                top: 0,
                maxWidth: 'none',
                width: natural ? natural.w * scale : 'auto',
                height: natural ? natural.h * scale : 'auto',
                transform: `translate(${offset.x}px, ${offset.y}px)`,
                visibility: natural ? 'visible' : 'hidden',
                pointerEvents: 'none',
              }}
            />
          ) : null}
          <div
            aria-hidden
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: radius,
              boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.55)',
              outline: '2px solid rgba(255, 255, 255, 0.85)',
              outlineOffset: -2,
              pointerEvents: 'none',
            }}
          />
        </div>
        <label style={{ display: 'flex', alignItems: 'center', gap: 10, width: viewW, fontSize: 13 }}>
          <span aria-hidden style={{ opacity: 0.7 }}>−</span>
          <input
            type="range"
            min={1}
            max={maxZoom}
            step={0.01}
            value={zoom}
            aria-label="Zoom"
            onChange={(event) => zoomTo(Number(event.target.value))}
            style={{ flex: 1, accentColor: 'currentColor' }}
          />
          <span aria-hidden style={{ opacity: 0.7 }}>+</span>
        </label>
      </div>
    );
  },
);

function midpoint(a: Offset, b: Offset): Offset {
  return { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
}

function distance(a: Offset, b: Offset) {
  return Math.hypot(a.x - b.x, a.y - b.y);
}
