import axios from "axios";
import React, { useEffect, useState } from "react";
import { PuffLoader} from "react-spinners";
import "./Home.css";

const Home = () => {
  const [images, SetImages] = useState([]);
  const [search, SetSearch] = useState("nature");
  const [page,SetPage]=useState(1);
  const [loading, setLoading] = useState(true);

  const API_KEY = "32RbjC9489RT7tkziFOgH7wbZStsOVRHrO5zPRQJIDuhrndl03Opu1DE";

  const fetchApiData = async () => {
    setLoading(true);
    const res = await axios.get(
      `https://api.pexels.com/v1/search?query=${search}&per_page=80 `,
      {
        headers: {
          Authorization: API_KEY,
        },
      }
    );
    SetImages(res.data.photos);   
    console.log(res.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchApiData();
  }, [search]);

  if (loading) {
    return <Loader />; // Show loader while data is being fetched
  }

  const filterby = (element) => {
    SetSearch(element);
  };


  const handleChange=(selectPage)=>{
    if ( selectPage>=1 &&  selectPage<=images.length/10 && selectPage!==page) 


  SetPage(selectPage)

  }
  

  
  return (
    <>
      <div className="nav">
        <button className="btn" onClick={() => filterby("nature")}>
          Nature{" "}
        </button>
        <button className="btn" onClick={() => filterby("animal")}>
          Animal
        </button>
        <button className="btn" onClick={() => filterby("city")}>
          Cities{" "}
        </button>
        <button className="btn" onClick={() => filterby("car")}>
          Cars
        </button>
        <button className="btn" onClick={() => filterby("fashion")}>
          Fashion{" "}
        </button>
        <input
          className="input"
          type="text"
          placeholder="Search"
          onChange={(e) => SetSearch(e.target.value)}
        />
        <div />
      </div>
      <div className="container ">
        {images.slice(page*6-6,page*6).map((item, i) => {
          return (
            <div className="item " key={i}>
              <img src={item.src.medium} alt="" />
            </div>
          );
        })}
      </div>
      { images.length>0 && <div className="pagination">
        <span  onClick={()=>handleChange(page-1)} >◀</span>
     {
       [...Array(images.length/10)].map((_,i)=>{
        return  <span className={page===i+1?"selectedindex":""} key={i} onClick={()=>handleChange(i+1)}>{i+1}</span>

       })



     }
        <span onClick={()=>handleChange(page+1)}>▶</span>






      </div>


      }

      


    </>
  );
};

const Loader = () => (
    <div className="loader">
      <PuffLoader/>
    </div>
  );

export default Home;
