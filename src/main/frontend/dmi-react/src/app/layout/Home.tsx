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
                        <ul className={"home-list"}>
                            <li>Keep track of your games</li>
                            <li>Keep track of the hours you have played each game</li>
                            <li>Keep track of the status of the game (whether you have finished it, are currently playing, or want to play)</li>
                        </ul>
                </div>
                <div className={"col d-flex flex-column"}>
                    <h4>Plans</h4>

                        <ul className={"home-list"}>
                            <li>Add a search bar</li>
                            <li>Add the ability to filter by different categories</li>
                            <li>Visit other user's profiles easily to see their bio/favorite games</li>
                        </ul>
                </div>
            </div>
            <div className={"row"}>
                <div className={"d-flex justify-content-evenly align-items-center"}>
                    <div className="d-flex flex-column justify-content-center align-items-center">
                        <h4>
                            <em>Get started by creating an account</em>
                        </h4>
                        <Link to={"/register"} className="btn btn-outline-custom">
                            register
                        </Link>
                    </div>
                    <div className="d-flex flex-column align-items-center">
                        <h4>
                           <em>Or get back to
                            your gaming log
                           </em>
                        </h4>
                        <Link to={"/login"} className="btn btn-outline-custom">
                            login
                        </Link>
                    </div>
                </div>
            </div>

        </div>
    )
        ;
}

export default Home;