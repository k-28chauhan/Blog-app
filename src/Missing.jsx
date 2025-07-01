import { Link } from "react-router-dom";

const Missing = () => {

    return(
        <main>
            <h2>Post not found.</h2>
            <Link to={'/'}>Visit homepage</Link>
        </main>
    )
}

export default Missing;