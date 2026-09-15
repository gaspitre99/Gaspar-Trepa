'use client';

import React, { useState } from 'react';

interface VideoPlayerFallbackProps {
  url: string;
  onEnded?: () => void;
}

export default function VideoPlayerFallback({ url, onEnded }: VideoPlayerFallbackProps) {
  const [error, setError] = useState(false);

  // Simple heuristic for Youtube Unlisted / public links
  const getYoutubeEmbedUrl = (rawUrl: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = rawUrl.match(regExp);
    return match && match[2].length === 11 ? `https://www.youtube.com/embed/${match[2]}?modestbranding=1&rel=0` : null;
  };

  const getVimeoEmbedUrl = (rawUrl: string) => {
    const regExp = /(?:www\.|player\.)?vimeo.com\/(?:channels\/(?:\w+\/)?|groups\/(?:[^\/]*)\/videos\/|album\/(?:\d+)\/video\/|video\/|)(\d+)(?:[a-zA-Z0-9_\-]+)?/i;
    const match = rawUrl.match(regExp);
    return match && match[1] ? `https://player.vimeo.com/video/${match[1]}` : null;
  };

  if (error || !url) {
    return (
      <div className="flex items-center justify-center bg-slate-800 text-slate-400 aspect-video rounded-md border border-slate-700">
        <p>No se pudo cargar el video.</p>
      </div>
    );
  }

  const ytEmbed = getYoutubeEmbedUrl(url);
  if (ytEmbed) {
    return (
      <div className="relative aspect-video w-full rounded-md overflow-hidden bg-black">
        <iframe
          src={ytEmbed}
          title="Reproductor de video"
          className="absolute top-0 left-0 w-full h-full"
          allowFullScreen
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          onLoad={() => {
             // Basic heuristic to mark end for iframe since YT iframe API requires complex setup without library
             // We can just render it. We trigger onEnded via a timeout heuristic or we just don't handle it for iframes if we don't have SDK.
             // For zero-cost MVP, this is sufficient.
          }}
        ></iframe>
      </div>
    );
  }

  const vimEmbed = getVimeoEmbedUrl(url);
  if (vimEmbed) {
    return (
      <div className="relative aspect-video w-full rounded-md overflow-hidden bg-black">
        <iframe
          src={vimEmbed}
          title="Reproductor de video"
          className="absolute top-0 left-0 w-full h-full"
          allowFullScreen
          allow="autoplay; fullscreen; picture-in-picture"
        ></iframe>
      </div>
    );
  }

  // Fallback to HTML5 direct MP4 or other supported types
  return (
    <div className="relative aspect-video w-full rounded-md overflow-hidden bg-black">
      <video
        controls
        className="w-full h-full"
        onEnded={onEnded}
        onError={() => setError(true)}
      >
        <source src={url} />
        Tu navegador no soporta el formato de video.
      </video>
    </div>
  );
}
