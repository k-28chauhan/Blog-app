import { Link } from "react-router-dom";

const Nav = ({ search, setSearch}) => {

    return(
        <nav className="Nav">
            <form className="searchForm" onSubmit={(e) => e.preventDefault()}>
                <input type="text" 
                placeholder="Search Blog"
                id="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}/>
            </form>
            <ul>
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/post'>Posts</Link></li>
                <li><Link to='/about'>About</Link></li>
            </ul>
        </nav>
    )
}

export default Nav;