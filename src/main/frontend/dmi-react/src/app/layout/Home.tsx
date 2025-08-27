import {Link} from "react-router";

/**
 * Returns a component that currently display's all Games in the Database
 * with the ability to DELETE and ADD new Games.
 * @constructor
 */
function Home() {
    return (
        <div className={"container d-flex justify-content-center flex-grow-1 flex-column gap-5 p-3"}>
            <div className={"row"}>
                <h1>What is DIMI?</h1>
                <p>
                    DIMI lets you keep track of any video games that you want to keep track of, whether its something
                    you own, want to own, have played, or want to play.
                </p>
            </div>
            <div className={"row"}>
                <div className={"col d-flex flex-column"}>
                    <h4>Features</h4>
                    <p>
                        <ul className={"home-list"}>
                            <li>Keep track of your games</li>
                            <li>Keep track of the hours you have played each game</li>
                            <li>Keep track of the status of the game (whether you have finished it, are currently playing, or want to play)</li>
                        </ul>
                    </p>
                </div>
                <div className={"col d-flex flex-column"}>
                    <h4>Plans</h4>
                    <p>
                        <ul className={"home-list"}>
                            <li>Add a search bar</li>
                            <li>Add the ability to filter by different categories</li>
                            <li>Visit other user's profiles easily to see their bio/favorite games</li>
                        </ul>
                    </p>
                </div>
            </div>
            <div className={"row"}>
                <div className={"d-flex justify-content-evenly align-items-center"}>
                    <p>
                        <em>Get started by creating an account by <Link to={"/register"}>registering</Link></em>
                    </p>
                    <p>
                       <em>Or get back to
                        your gaming log by <Link to={"/login"}>logging in</Link>
                       </em>
                    </p>
                </div>
            </div>

        </div>
    )
        ;
}

export default Home;