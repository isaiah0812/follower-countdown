import { useMantineTheme } from '@mantine/core';

export function getBaseColor (color: string) {
  const theme = useMantineTheme();

  return theme.colors[color][color === 'off-white' ? 0 : 4];
}