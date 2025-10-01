import styles from "./productImage.module.css";

export default function ProductImage({img, title, link}) {
    return <article onClick={() => {
        link();
    }} className={styles.productImage}>
        <div className={styles.imgCon}>

            <img src={img} alt={title}/>
            <h2 className={styles.title}>{title}</h2>
        </div>
    </article>
}