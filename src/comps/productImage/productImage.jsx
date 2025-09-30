import styles from "./productImage.module.css";

export default function ProductImage({img, title, link}) {
    return <article className={styles.productImage}>
        <img src={img} alt={title}/>
        <h2 className={styles.title}>{title}</h2>
    </article>
}