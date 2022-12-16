export const MEDIA_QUERY = {
  XS: 0,
  SM: 576,
  MD: 768,
  LG: 992,
};

// https://getbootstrap.com/docs/5.0/layout/breakpoints/
// 핸드폰 기준: 통상적으로 576px까지 (XS)
// 태블릿 기준: 통상적으로 768px까지 (SM ~ MD)
// 그 이상은 보통 PC 및 모니터로 취급 (LG)

export function getMediaQuery(minWidth: number, maxWidth?: number): string {
  const mediaOnly = '@media only screen ';
  const minWidthQuery = minWidth ? `and (min-width: ${minWidth}px)` : '';
  const maxWidthQuery = maxWidth ? `and (max-width: ${maxWidth}px)` : '';

  return mediaOnly + minWidthQuery + maxWidthQuery;
}
