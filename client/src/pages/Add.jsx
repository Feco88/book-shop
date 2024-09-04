import { React, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

    const Add = () => {
        const [book,setBook] = useState({
            title:"",
            desc:"",
            price:null,
            cover:"",
        });

        const navigate = useNavigate()

        const handleChange = (e) =>{
            setBook(prev=>({ ...prev, [e.target.name]: e.target.value }));
        };
        const handleClick = async e => {
            e.preventDefault()
            try {
                await axios.post("http://localhost:8800/books",book);
                navigate("/")
            } catch(err){
                console.log(err);
            }
        }

    return (
        <div className="form">
            <h1>Új könyv hozzáadása</h1>
            <input
             type="text" 
             placeholder='cím' 
             onChange={handleChange} 
             name="title"
             />
            <input
             type="text" 
             placeholder='leírás' 
             onChange={handleChange} 
             name="desc"
             />
            <input
             type="number" 
             placeholder='ár' 
             onChange={handleChange} 
             name="price"
             />
            <input 
            type="text" 
            placeholder='borító' 
            onChange={handleChange} 
            name="cover"
            />
            <button className="formButton" onClick={handleClick}>Hozzáad</button>
        </div>
        );
    };

export default Add