/**
 * Returns the component for the Navigation Bar.
 * @constructor
 */
function Nav() {
    return (
       <nav className={"nav-bar"}>
           <ul className={"nav"}>
               <li className={"nav-link"}>
                   <a href="/">Home</a>
               </li>
               <li className={"nav-link"}>
                   <a href={"list"}>Your List</a>
               </li>
           </ul>
       </nav>
    );
}

export default Nav;