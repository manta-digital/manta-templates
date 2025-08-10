import { ImageResponse } from 'next/og';
import { siteConfig } from '@/content/site.config';

export const runtime = 'edge';

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default function Image() {
  const { width, height } = size;
  const title = siteConfig.site.name || 'Website';
  const tagline = siteConfig.site.domain || siteConfig.site.url.replace(/^https?:\/\//, '');

  const nameFontSize = 112;
  const taglineFontSize = 40;
  const taglineLetterSpacing = 6;
  const thinLineWidth = width - 160; // padding 80px each side
  const oneRem = 16;
  const baseBelowSpacing = 12 + oneRem;
  const thinLineSpacing = baseBelowSpacing;

  return new ImageResponse(
    (
      <div
        style={{
          width: `${width}px`,
          height: `${height}px`,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '80px',
          backgroundImage: 'linear-gradient(135deg, #14b8a6 0%, #22c55e 100%)',
          position: 'relative',
          color: '#ffffff',
          fontFamily:
            'Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, system-ui, -apple-system, Helvetica Neue, Arial, sans-serif',
        }}
      >
        <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <div
            style={{
              fontSize: nameFontSize,
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: -2,
              textShadow: '0 1px 1px rgba(0,0,0,0.15)',
            }}
          >
            {title}
          </div>

          <div
            style={{
              marginTop: 20,
              fontSize: taglineFontSize,
              fontWeight: 700,
              letterSpacing: taglineLetterSpacing,
              opacity: 0.98,
              textTransform: 'uppercase',
            }}
          >
            {tagline}
          </div>

          {/* Thin line below */}
          <div
            style={{
              position: 'absolute',
              top: nameFontSize + 10 + 36 + taglineFontSize + thinLineSpacing,
              width: thinLineWidth,
              height: 1,
              background: 'rgba(255,255,255,0.85)',
            }}
          />

          {/* Thin line above */}
          <div
            style={{
              position: 'absolute',
              top: -(thinLineSpacing * 0.625),
              width: thinLineWidth,
              height: 1,
              background: 'rgba(255,255,255,0.85)',
            }}
          />
        </div>
      </div>
    ),
    { ...size },
  );
}


