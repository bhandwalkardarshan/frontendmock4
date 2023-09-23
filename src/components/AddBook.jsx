import React, {useState} from 'react'
import './AddBook.css'

function AddBook({ onAddBook }) {
    const [formData, setFormData] = useState({
        title:'',
        author:'',
        genre:'',
        description:'',
        price:0,
    })

    const handleChange = (e) => {
        const {name,value} = e.target;
        setFormData({...formData,[name]: value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch('https://mock4bookmanagementsym-production.up.railway.app/',{
                method:'POST',
                headers: {
                    'Content-Type':'application/json',
                },
                body:JSON.stringify(formData),
            })

            if(response.status===201){
                const newBook = await response.json()
                console.log("Data Posted Successfully",newBook)
                setFormData({
                    title:'',
                    author:'',
                    genre:'',
                    description:'',
                    price:0,
                })
                alert("Data Posted Successfully")

                onAddBook(newBook)
                // window.location.reload()
            }
            
        } catch (error) {
            console.log("Error", error)
        }
    }

  return (
    <div>
        
        <div className="post-book-container">
        <h2>Add Books Here</h2>
            <form className="post-book-form" onSubmit={handleSubmit}>
                <input type="text" name="title" placeholder='Title' value={formData.title} onChange={handleChange}/>
                <input type="text" name="author" placeholder='Author Name' value={formData.author} onChange={handleChange}/>
                <select name="genre" id="genre" value={formData.genre} onChange={handleChange}>
                    <option value="Fiction">Fiction</option>
                    <option value="Comic">Comic</option>
                    <option value="Science">Science</option>
                </select>
                <input type="text" name="description" placeholder='Description' value={formData.description} onChange={handleChange}/>
                <input type="number" name="price" placeholder='Price' value={formData.price} onChange={handleChange}/>
                <button type="submit">Submit</button>
            </form>
        </div>
    </div>
  )
}

export default AddBook