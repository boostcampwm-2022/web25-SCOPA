import { COLORS } from 'styles/colors';

export function createLinearGradient(width: number) {
  const firstLinePosition = width / 3;
  const secondLinePosition = (width * 2) / 3;

  return (
    `linear-gradient(to right, ` +
    `${COLORS.SECONDARY_2} ${firstLinePosition - 1}px, ` +
    `${COLORS.PRIMARY_1} ${firstLinePosition - 1}px, ` +
    `${COLORS.PRIMARY_1} ${firstLinePosition + 1}px, ` +
    `${COLORS.SECONDARY_2} ${firstLinePosition + 1}px, ` +
    `${COLORS.SECONDARY_2} ${secondLinePosition - 1}px, ` +
    `${COLORS.PRIMARY_1} ${secondLinePosition - 1}px, ` +
    `${COLORS.PRIMARY_1} ${secondLinePosition + 1}px, ` +
    `${COLORS.SECONDARY_2} ${secondLinePosition + 1}px)`
  );
}
