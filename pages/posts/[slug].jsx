import { GraphQLClient, gql } from "graphql-request";
import Head from 'next/head'
import styles from "../../styles/Slug.module.css";
import Link from 'next/link'

const graphcms = new GraphQLClient('https://api-ap-northeast-1.hygraph.com/v2/clbhj6udh13cl01ur67pibwce/master')

const QUERY = gql`
  query Post($slug: String!) {
    post(where: { slug: $slug }) {
      id
      title
      slug
      datePublished
      author {
        id
        name
        avatar {
          url
        }
      }
      content {
        html
      }
      coverPhoto {
        id
        url
      }
    }
  }
`;
const SLUGLIST = gql`
  {
    posts {
      slug
    }
  }
`;

export async function getStaticPaths() {
  const { posts } = await graphcms.request(SLUGLIST);
  return {
    paths: posts.map((post) => ({ params: { slug: post.slug } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const slug = params.slug;
  const data = await graphcms.request(QUERY, { slug });
  const post = data.post;
  return {
    props: {
      post,
    },
    revalidate: 30,
  };
}

export default function BlogPost({ post }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>{post.title} | Slice of Japan</title>
        <meta name="description" content="A place to blog about your life" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Link href={"/"} className={styles.back}>
          Back to all posts
      </Link>

      <main className={styles.blog}>
        <div className={styles.coverPhoto}>
          <img
            className={styles.cover}
            src={post.coverPhoto.url}
            alt={post.title}
          />
        </div>

        <div className={styles.postBody}>
          <div className={styles.title}>
            <h2>{post.title}</h2>
          </div>

          <div className={styles.authdetails}>
            <img src={post.author.avatar.url} alt={post.author.name} />
            <div className={styles.authtext}>
              <h6>By {post.author.name} </h6>
              <h6 className={styles.date}>
                Published on: {post.datePublished}
              </h6>
            </div>
          </div>

          <div
            className={styles.content}
            dangerouslySetInnerHTML={{ __html: post.content.html }}
          ></div>
        </div>

      </main>
    </div>
  );
}
