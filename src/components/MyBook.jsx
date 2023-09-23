import React, {useEffect, useState} from 'react'
import './MyBook.css'

function MyBook() {
    const [data, setData] = useState([])
    const [filter, setFilter] = useState('')
    const [order, setOrder] = useState('asc')

    const fetchData = async () => {
        try {
            const response = await fetch(`https://mock4bookmanagementsym-production.up.railway.app?genre=${filter}&sortBy=price&order=${order}`)
            if(response.status === 201){
                const data = await response.json()
                // console.log(data)
                setData(data)
            }else{
                console.log('Failed to fetch data. Status: ',response.status)
            }
        } catch (error) {
            console.log('Error', error)
        }
    }

    useEffect(() => {
        fetchData()
    },[filter,order,fetchData])

    

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`https://mock4bookmanagementsym-production.up.railway.app/${id}`,{
                method:'DELETE',
                headers: {
                    'Content-Type':'application/json',
                }
            })
                if(response.status === 204){
                    console.log("Book deleted")
                    alert('Book deleted')
                    fetchData()
                }else{
                    console.log('Failed to delete data.')
                }
        } catch (error) {
            console.log('Error', error)
        }
    }

  return (
    <div className="mybook-data-container">
        <h2>My Books Are Here</h2>
        <div className="mybook-data-form">
        <label htmlFor="genre">Filter by Genre:</label>
            <select  value={filter} onChange={(e) => setFilter(e.target.value)}>
                <option value="Fiction">Fiction</option>
                <option value="Comic">Comic</option>
                <option value="Science">Science</option>
            </select>
            <label htmlFor="order">Sort by Price:</label>
            <select  value={order} onChange={(e) => setOrder(e.target.value)}>
                <option value="asc">Low to High</option>
                <option value="desc">High to Low</option>
            </select>
        </div>
        <div className="card-container">
            {data.map((item) => (
                <div className="data-card" key={item._id}>
                    <h3>Title: {item.title}</h3>
                    <p>Author: {item.author}</p>
                    <p>Genre: {item.genre}</p>
                    <p>Description: {item.description}</p>
                    <p>Price: {item.price}</p>
                    <button onClick={() => handleDelete(item._id)}>Delete</button>
                </div>
            ))}
        </div>
    </div>
  )
}

export default MyBook