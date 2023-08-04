import React from "react";
import "../css/Home.css"
import Upload from "./Upload";
import Login from "./Login";
import "boxicons"
// custom function to read cookies
import getCookie from "../custom/getCookie";
export default function Home(props) {
    // state to handle adding new events on the home page
    const [newOpen, setNewOpen] = React.useState(false)
    // data recieved from the REST api
    const [data, setData] = React.useState([])
    // Liked(id) events by the user stored
    const [liked, setLiked] = React.useState([])
    // If global tab is opened or the user tab is opened
    const [globalOn, setGlobalOn] = React.useState(true)
    // login page opended or not
    const [loginOpen, setLoginOpen] = React.useState(false)
    // credentials of the login page handled in the upper DOM for future use 
    const [creds, setCreds] = React.useState({ uname: "", passwd: "", cpasswd: "" })
    // Id recieved to the user
    const [id, setID] = React.useState(0)
    // handle change in login form
    const handleChange = (event, where) => {
        if (where === "uname") {
            setCreds(prev => ({ ...prev, uname: event.target.value }))
        }
        else if (where === "passwd") {
            setCreds(prev => ({ ...prev, passwd: event.target.value }))
        }
        else {
            setCreds(prev => ({ ...prev, cpasswd: event.target.value }))

        }
    }
    // gandle go back from new event to home page
    const handleGoBack = () => {
        setNewOpen(false)
    }
    // run a function only one time on application load
    React.useEffect(() => {
        fetch("http://localhost:8000/get_data/")
            .then(res => res.json())
            .then(last => setData(last.data))
        fetch("http://localhost:8000/get_likes/", { credentials: "include", headers: { 'X-CSRFToken': getCookie("csrftoken") } })
            .then(res => res.json())
            .then(last => {
                setLiked(last.liked)
            })
        setID(getCookie("id"))
    }, [])
    // logout function to delete cookies
    const logout = () => {
        fetch("http://localhost:8000/logout/", { credentials: "include", headers: { 'X-CSRFToken': getCookie("csrftoken") } })
            .then(res => res.json())
            .then(last => window.location.reload())
    }
    // Toggle like and dislike
    const toggleLike = (id) => {
        // If the user is logged in
        if (props.verified) {
            // If the event is already liked, means the user want to unlike the event
            if (liked.includes(id.toString())) {
                let filteredArray = liked.filter(item => item !== id.toString())
                // Keep updating the database
                const requestOptions = {
                    method: "POST",
                    headers: { "Content-Type": "application/json", 'X-CSRFToken': getCookie("csrftoken") },
                    body: JSON.stringify({ liked: filteredArray }),
                    credentials: 'include',
                };
                fetch("http://localhost:8000/update_likes/", requestOptions)
                setLiked(filteredArray)
            }
                // User wants to like the event
            else {
                const requestOptions = {
                    method: "POST",
                    headers: { "Content-Type": "application/json", 'X-CSRFToken': getCookie("csrftoken") },
                    body: JSON.stringify({ liked: [...liked, id] }),
                    credentials: 'include',
                };
                fetch("http://localhost:8000/update_likes/", requestOptions)
                setLiked(prev => [...prev, id.toString()])
            }
        }
            // If the user is not logged in open log in page
        else {
            setLoginOpen(true)
        }
    }
    // cards component with events
    const cards = data.map((ele, index) => {
        // for global tab
        if (globalOn)
            return (
                <div key={ele.id} className="data--card">
                    <img src={"http://localhost:8000/images/" + ele.image}></img>
                    <div>
                        <h4>{ele.event_name}</h4>
                        <box-icon name='heart' type={liked.includes((ele.id).toString()) ? 'solid' : 'regular'} color='#cf4d72' onClick={() => toggleLike(ele.id)}></box-icon>
                    </div>
                    <font>{ele.time}</font><br />
                    <font>{ele.location}</font>
                </div>
            )
            // for user tab
        else if (id === ele.user_id) {
            console.log("sd")
            return (
                <div key={ele.id} className="data--card">
                    <img src={"http://localhost:8000/images/" + ele.image}></img>
                    <div>
                        <h4>{ele.event_name}</h4>
                        <box-icon name='heart' type={liked.includes((ele.id).toString()) ? 'solid' : 'regular'} color='#cf4d72' onClick={() => toggleLike(ele.id)}></box-icon>
                    </div>
                    <font>{ele.time}</font><br />
                    <font>{ele.location}</font>
                </div>
            )
        }
    })
    // If login page is closed
    if (!loginOpen) {
        return (

            <div>
                {newOpen ?
                    <Upload handleGoBack={handleGoBack} />
                    :
                    <div>
                        <nav>
                            <h1>eventDark</h1>
                            <div style={{ display: "flex" }}>
                                <h4 onClick={() => setNewOpen(true)}>Create Event</h4>
                                {!props.verified ? <h4 onClick={() => setLoginOpen(true)}> Login</h4> : <h4 onClick={logout}> Logout</h4>}
                            </div>

                        </nav>
                       {props.verified &&  <div className="nav-mini">
                            <h2 className={globalOn ? "tab-open" : ""} onClick={() => setGlobalOn(true)}>
                                Global
                            </h2>
                            <h2 className={globalOn ? "" : "tab-open"} onClick={() => setGlobalOn(false)}>
                                User
                            </h2>
                        </div>}
                        <div style={{ margin: "5rem 0 2rem 0", display: "grid", gridTemplateColumns: "auto auto auto", justifyContent: "space-evenly", rowGap: "2rem" }}>
                            {cards}
                        </div>
                    </div>
                }

            </div>


        )
    }
    else {
        return (
            <Login creds={creds} handleChange={handleChange} />
        )
    }
}
