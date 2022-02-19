import './appHeader.scss';

const AppHeader = (props) => {
    return (
        <header className="app__header">
            <h1 className="app__title">
                <a href="#">
                    <span>Marvel</span> information portal
                </a>
            </h1>
            <nav className="app__menu">
                <ul>
                    <li onClick={()=>props.toSetPage(true)}><a href="#">Characters</a></li>
                    /
                    <li onClick={()=>props.toSetPage(false)}><a href="#">Comics</a></li>
                </ul>
            </nav>
        </header>
    )
}

export default AppHeader;