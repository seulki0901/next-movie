import axios, { formToJSON } from 'axios'
import React, { useEffect, useState } from 'react'
import ms from '@/styles/Movie.module.css' 
import Link from 'next/link'
import {apiConfig,axiosRequest} from '../config'



const Movie = () => {
  const [data,setData] = useState();


  useEffect(()=>{
    axiosRequest.get('/movie/popular')
    .then(res=>{
      setData(res.data.results)
    })
  }, []);

  function searchFn(e){
    e.preventDefault();
    axiosRequest.get(`/search/movie?query=${e.target.txt.value}`)
    .then(res=>{
      setData(res.data.results)
    })
  }

  if(!data) return <>loading ....</> // data 값이 들어있지 않을때
  return (
    <div className={ms.list}>
       <h2>movie</h2>
       <div>
          <form onSubmit={searchFn}>
            <input type="text" name="txt"/>
            <input type="submit"/>
          </form>
       </div>
       <div>
          {
            data.map(obj =>(
              <figure key={obj.id}>
                <Link href={{pathname:'/detail', query:obj}}>
                  <img  src={apiConfig.originImg(obj.poster_path)} alt={obj.title}/>
                  <figure>{obj.title}</figure>
                </Link>
              </figure>
              
            ))
          }
       </div>
    </div>
  )
}

export default Movie