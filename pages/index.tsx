import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'
import { useMantineTheme, RingProgress, Text } from '@mantine/core'
import { getBaseColor, instagramColor, tiktokColor, twitchColor, twitterColor, youtubeColor } from '../utils/helpers'
import { getPercentage } from '../utils/calculators'

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
          // TODO REMOVE * 100 (only there for visibility)
          sections={[
            { value: getPercentage(510)* 100, color: instagramColor, tooltip: 'Instagram - 160.3K'},
            { value: getPercentage(168)* 100, color: twitterColor, tooltip: 'Twitter - 100K' },
            { value: getPercentage(72128), color: tiktokColor, tooltip: 'TikTok - 160.3K' },
            { value: getPercentage(85)* 100, color: youtubeColor, tooltip: 'YouTube - 160.3K' },
            { value: getPercentage(2)* 100, color: twitchColor, tooltip: 'Twitch - 160.3K' }
          ]}
        />
      </main>
    </>
  )
}
