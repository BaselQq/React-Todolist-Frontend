import React, { useState } from "react";
import {posts, authors} from './data';
import {Link} from 'react-router-dom';
import axios from "axios";

export default function () {

    const [error, setError] = useState(null);
    
    const getEmployees = async (e) => {
        e.preventDefault();   
        try {
        const employees = await axios.get('http://127.0.0.1:8000/api/employee/',{
            
        });
        } catch (err) {
          setError('Invailed employees data');
        }
    }

    return posts.map(post => {
        return (
            <li key={post.slug}>
               <Link to={`/blog/$post.slug`}>{post.title}</Link>
               <span style={{margin: '0 5px'}}>By</span>
               <Link to={`/user/${post.author}`}>
                    <small>
                        {authors.find(author => author.slug === post.author).name}
                    </small>
                </Link> 
            </li>
        )
    });
}