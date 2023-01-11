import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useMantineTheme, RingProgress, Text } from '@mantine/core'
import { getBaseColor, instagramColor, tiktokColor, twitchColor, twitterColor, youtubeColor } from '../utils/helpers'
import { getPercentage } from '../utils/calculators'
import { twitterClient } from '../config/twitter'
import { GetStaticProps } from 'next'
import { youtube_v3 } from '@googleapis/youtube'

type Stats = {
  instagram: number,
  twitter: number,
  tiktok: number,
  youtube: number,
  twitch: number
}

export default function Home({ stats }: StaticProps) {
  const theme = useMantineTheme();
  const { instagram, twitter, tiktok, twitch, youtube } = stats;

  return (
    <>
      <Head>
        <title>Isaiah Bullard's Follower Count</title>
        <meta name="description" content="An app to track the follower count of Isaiah Bullard." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main style={{ backgroundColor: getBaseColor('navy-blue') }} className={styles.main}>
        <RingProgress
          roundCaps
          thickness={20}
          size={400}
          label={
            <Text color={getBaseColor('off-white')} align='center' style={{ fontSize: '4em' }} weight={700}>
              {instagram + twitter + tiktok + youtube + twitch}
            </Text>
          }

          // TODO REMOVE multipliers (only there for visibility)
          sections={[
            { value: getPercentage(instagram) + 10, color: instagramColor, tooltip: `Instagram - ${instagram}` },
            { value: getPercentage(twitter) * 500, color: twitterColor, tooltip: `Twitter - ${twitter}` },
            { value: getPercentage(tiktok) + 10, color: tiktokColor, tooltip: `TikTok - ${tiktok}` },
            { value: getPercentage(youtube) * 500, color: youtubeColor, tooltip: `YouTube - ${youtube}` },
            { value: getPercentage(twitch * 100) * 500, color: twitchColor, tooltip: `Twitch - ${twitch}` }
          ]}
        />
      </main>
    </>
  )
}

type StaticProps = {
  stats: Stats
}

// TODO extract each retireval, make it async
export const getStaticProps: GetStaticProps<StaticProps> = async (context) => {
  try {
    let stats: Stats = {
      instagram: 0,
      twitter: 0,
      tiktok: 0,
      youtube: 0,
      twitch: 0
    };

    // TWITTER
    const twitterRes = await twitterClient.users.findUserByUsername('zaemadethis', {
      'user.fields': ['public_metrics']
    });

    stats.twitter = twitterRes.data?.public_metrics?.followers_count!;

    // TODO complete TikTok implementation (redirect_uri issue, MUST log in to TikTok, NEED TikTok support)
    // TIKTOK

    // TODO complete Instagram implementation (verify buisness account, get app access token)
    // INSTAGRAM

    // YOUTUBE
    const youtubeClient = new youtube_v3.Youtube({
      auth: process.env.YOUTUBE_API_KEY!,
    });

    const youtubeRes = await youtubeClient.channels.list({ id: ['UCMMDfi3G5xXLj7vVqq9yr9w'], part: ['statistics'] });
    stats.youtube = parseInt(youtubeRes.data.items![0].statistics?.subscriberCount as string);

    // TWITCH
    const twitchAuthHeaders = new Headers();
    twitchAuthHeaders.append('Content-Type', 'application/x-www-form-urlencoded');

    const twitchAuthBody = new URLSearchParams();
    twitchAuthBody.append('client_id', process.env.TWITCH_CLIENT_ID!);
    twitchAuthBody.append('client_secret', process.env.TWITCH_CLIENT_SECRET!);
    twitchAuthBody.append('grant_type', 'client_credentials');

    const twitchToken = await fetch('https://id.twitch.tv/oauth2/token', {
      headers: twitchAuthHeaders,
      body: twitchAuthBody,
      method: 'POST'
    });

    const twitchHeaders = new Headers();
    twitchHeaders.append('Authorization', `Bearer ${(await twitchToken.json()).access_token}`)
    twitchHeaders.append('Client-Id', process.env.TWITCH_CLIENT_ID!)

    const twitchRes = await (await fetch('https://api.twitch.tv/helix/users/follows?to_id=522494547&first=1', {
      headers: twitchHeaders
    })).json();
    stats.twitch = twitchRes.total;

    return {
      props: {
        stats: stats
      },
      revalidate: 10
    }
  } catch (error: any) {
    console.error(error);
    throw error;
  }
}
