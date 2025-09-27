import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import '../styles/Navbar.css';

function Navbar() {
    return (
        <div className="navbar" >
        <ul>
            <li>BRONKS</li>
            <li><a href="">Home</a></li>
            <li><a href="">All Stocks</a></li>
        </ul>
        <div id="searchbar" >
            <input type="text" placeholder="Search..."/>
            <FontAwesomeIcon id='fontawesome' icon={faSearch}/>
        </div>
    </div>
    )
}

export default Navbar;