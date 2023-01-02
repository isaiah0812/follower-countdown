import { useMantineTheme } from '@mantine/core';

export function getBaseColor (color: string) {
  const theme = useMantineTheme();

  return theme.colors[color][color === 'off-white' ? 0 : 4];
}

export const twitterColor = '#1DA1F2';
export const instagramColor = '#E1306C';
export const youtubeColor = '#FF0000';
export const twitchColor = '#9146FF';
export const tiktokColor = '#000000';