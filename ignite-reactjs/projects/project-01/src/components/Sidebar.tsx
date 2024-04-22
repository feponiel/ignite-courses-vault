import { PencilLine } from 'phosphor-react'
import { Avatar } from './Avatar'

import styles from './Sidebar.module.css'

export function Sidebar() {
    return (
        <aside className={ styles.sidebar }>
            <img className={ styles.banner } src="https://sm.ign.com/ign_br/screenshot/default/blob_ut5r.jpg" />

            <div className={ styles.profile }>
                <Avatar src="https://github.com/feponiel.png" />
                <strong>Felipe Elias</strong>
                <span>Web Developer</span>
            </div>

            <footer>
                <a href="#">
                    <PencilLine size={ 20 } />
                    Edit profile
                </a>
            </footer>
        </aside>
    )
}