import styles from "./layout.module.css"

function Footer() {
    return (
        <footer className={styles.footer}>
            <span>Made by rryyii </span>
            <span>    -      </span>
            <span>
                Data from <a href={"https://www.igdb.com/"} target={"_blank"}>IGDB</a>
            </span>
        </footer>
    );
}

export default Footer;