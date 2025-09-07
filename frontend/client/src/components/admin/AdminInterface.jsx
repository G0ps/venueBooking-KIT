import styles from "./AdminInterface.module.css"
function AdminInterface(){
    return(
        <>
        <div className={styles.adminBackground}>ADMIN</div>
        <div className={styles.parent}>
            <div>
                <div className={styles.dropDownButton}>DEFAULT</div>
                <div className={styles.dropDownContent}>
                    <div>USER</div>
                    <div>VENUE</div>
                    <div>AMENITY</div>
                </div>
            </div>
        </div>
        </>
    );
}

export default AdminInterface


