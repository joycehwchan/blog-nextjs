import Link from 'next/link'
import styles from '../styles/BlogCard.module.css'
import moment from "moment";

export default function BlogCard({title, author, coverPhoto, datePublished, slug}) {
    return(
        <div className={styles.card}>
            <Link href={"/posts/" + slug}>
                <div className={styles.imgContainer}>
                    <img src={coverPhoto.url} alt={title} />
                </div>
            </Link>
            <div className={styles.cardBody}>
                <h2>{title}</h2>

                <div className={styles.details}>
                    <div className={styles.author}>
                        <img src={author.avatar.url} alt={author.name}/>
                        <div>
                          <h3>{author.name}</h3>
                          <h3>Published on: {moment(datePublished).format("MMMM D, YYYY")}</h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
