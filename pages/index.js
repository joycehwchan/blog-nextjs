import Head from 'next/head'
import styles from '../styles/BlogCard.module.css'
import { GraphQLClient, gql } from 'graphql-request'
import Link from 'next/link'

// components
import BlogCard from '../components/BlogCard'

const graphcms = new GraphQLClient('https://api-ap-northeast-1.hygraph.com/v2/clbhj6udh13cl01ur67pibwce/master')

const QUERY = gql`
  {
    posts {
      id,
      title,
      datePublished,
      slug,
      content {
        html
      },
      author {
        name,
        avatar {
          url
        }
      },
      coverPhoto {
        url
      }
    }
  }
`

export async function getStaticProps() {
  const {posts} = await graphcms.request(QUERY)
  return {
    props: {
      posts,
    },
    revalidate: 30, // update page every 30s if there are new posts
  }
}

export default function Home({posts}) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Slice of Japan - Blog about your life in Japan</title>
        <meta name="description" content="A place to blog about your life" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        {posts.map((post) => (
          <BlogCard 
            key={post.id} 
            title={post.title} 
            author={post.author} 
            coverPhoto={post.coverPhoto} 
            datePublished={post.datePublished} 
            slug={post.slug}
          />
        ))}
      </main>

    </div>
  )
}
