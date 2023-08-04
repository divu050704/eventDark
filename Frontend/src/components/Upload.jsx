import React from "react";
import axios from "axios"
import getCookie from "../custom/getCookie";
export default function Upload(props) {
    axios.defaults.headers.common['X-CSRFTOKEN'] = getCookie("csrftoken");
    const [file, setFile] = React.useState("")
    const [data, setData] = React.useState({ event_name: "", data: "", event_time: "", location: "" })
    const submit = () => {
        if (data.data === "" || data.event_name === "" || data.location === "" || data.event_time === ""){
            alert("All fields are required")
        }
        else{
            const url = 'http://localhost:8000/upload_image/';
            const formData = new FormData();
            formData.append('file', file);
            formData.append('fileName', file.name);
            const config = {

                headers: {
                    'content-type': 'multipart/form-data',

                },
                withCredentials: true
            };
            let new_data;

            axios.post(url, formData, config).then((response) => {
                new_data = {...data, id:  response.data.id}
                const requestOptions = {
                    method: "POST",
                    headers: { "Content-Type": "application/json", 'X-CSRFToken': getCookie("csrftoken")},
                    body: JSON.stringify(new_data),
                    credentials: 'include',
                    
                  }; 
                fetch("http://localhost:8000/save_data/",requestOptions)
                  .then(res => res.status === 200 || res.status === 201 ? alert("File Uploaded") : alert("An error occured"))
            });
            
            
        }
    }
    return (
        <div style={{ height: "60vh" }}>
            <nav>
                <h1>eventDark</h1>
                <div>
                    <h4 onClick={props.handleGoBack}>
                        Home
                    </h4>
                </div>
            </nav>
            <div className="card">
                <span>Event Name</span>
                <input className="Login--inputs" value={data.event_name} onChange={(event) => setData((prev) => ({...prev, event_name: event.target.value}))}/>
                <span>Data</span>
                <textarea className="Login--inputs" value={data.data} onChange={(event) => setData((prev) => ({...prev, data: event.target.value}))}/>
                <span>event_time</span>
                <input className="Login--inputs" type="date" value={data.event_time} onChange={(event) => setData((prev) => ({...prev, event_time: event.target.value}))}/>
                <span>Location</span>
                <input className="Login--inputs" value={data.location} onChange={(event) => setData((prev) => ({...prev, location: event.target.value}))}/><br /><br />
                <input type="file" onChange={(event) => setFile(event.target.files[0])} /><br /><br />
                <button onClick={submit} >Submit</button>
            </div>
        </div>
    )

}