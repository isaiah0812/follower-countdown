import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'
import { useMantineTheme, RingProgress, Text } from '@mantine/core'
import { getBaseColor } from '../utils/helpers'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const theme = useMantineTheme();

  return (
    <>
      <Head>
        <title>Isaiah Bullard's Follower Count</title>
        <meta name="description" content="An app to track the follower count of Isaiah Bullard." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>
      <main style={{ backgroundColor: getBaseColor('navy-blue')}} className={styles.main}>
        <RingProgress 
          roundCaps
          thickness={20}
          size={400}
          label={
            <Text color={getBaseColor('off-white')} align='center' style={{ fontSize: '4em' }} weight={700}>
              420.69K
            </Text>
          }
          sections={[
            { value: 40, color: getBaseColor('light-blue'), tooltip: 'Social 1 - 100K' },
            { value: 20, color: getBaseColor('off-white'), tooltip: 'Social 2 - 160.3K'},
            { value: 20, color: getBaseColor('ruby'), tooltip: 'Social 3 - 160.3K' },
          ]}
        />
      </main>
    </>
  )
}
