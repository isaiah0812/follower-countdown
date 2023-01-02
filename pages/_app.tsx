import { MantineProvider } from '@mantine/core'
import '../styles/globals.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider
      theme={{
        colors: {
          'off-white': [
            '#F5F5F5',
            '#C4C4C4',
            '#9D9D9D',
            '#7D7D7D',
            '#646464',
            '#505050',
            '#404040',
            '#333333',
            '#292929',
            '#212121'
          ],
          'ruby': [
            '#FFFDFD',
            '#FDAAB4',
            '#EF7281',
            '#DA4C5D',
            '#BE3747',
            '#A32131',
            '#8D101F',
            '#7A0311',
            '#6C0006',
            '#580003'
          ],
          'gray': [
            '#E8E8E8',
            '#C2C2C2',
            '#A1A1A1',
            '#868686',
            '#707070',
            '#5A5A5A',
            '#484848',
            '#393939',
            '#2E2E2E',
            '#252525',
          ],
          'light-blue': [
            '#E6F9FF',
            '#8DE3FF',
            '#4FCCFF',
            '#29B3F1',
            '#009EE8',
            '#0083C7',
            '#00699F',
            '#00547F',
            '#004366',
            '#003651'
          ],
          'navy-blue': [
            '#000B9C',
            '#000982',
            '#000F62',
            '#07114B',
            '#000A41',
            '#00043A',
            '#00032E',
            '#000325',
            '#00021E',
            '#000218'
          ],
          'space-black': [
            '#000432',
            '#00032A',
            '#000323',
            '#00031C',
            '#010415',
            '#000212',
            '#00010F',
            '#00010C',
            '#00010A',
            '#000108',
          ]
        },
        primaryColor: 'light-blue'
      }}
    >
      <Component {...pageProps} />
    </MantineProvider>
  );
}
