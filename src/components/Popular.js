import { useEffect, useState } from "react";
import styled from "styled-components";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";
import { Link } from "react-router-dom";


function Popular() {
  const [popular, setPopular] = useState([]);


  useEffect(() => {
    getPopular();
  },[]);
 
 const getPopular = async () => {
//if portion sets first listed "popular picks" in local storage so it doesn't do an API call each time you refresh
    const check = localStorage.getItem('popular');

    if(check){
      setPopular(JSON.parse(check));
    } else{
      const api = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=9`);
    const data = await api.json();
    
    localStorage.setItem('popular', JSON.stringify(data.recipes));
    setPopular(data.recipes)

    };
};

    return (
    <div>
     <Wrapper>
      <h3>Popular Recipes</h3>
      <Splide options={{
        perPage: 4,
        arrows: false,
        pagination: false,
        drag: 'free',
        gap: "5rem"
      }}
      >
      {popular.map((recipe) => {
        return(
          <SplideSlide key={recipe.id}>
          <Card>
            <Link to={'/recipe/' + recipe.id}>
            <p>{recipe.title}</p>
            <img src={recipe.image} alt={recipe.title} />
          {/* <Gradient /> */}
          </Link>
          </Card>
          </SplideSlide>
        );
      })}
      </Splide>
     </Wrapper>
    </div>
  );
};

const Wrapper = styled.div`
  margin: 4rem 0rem;
`;

const Card = styled.div`
  min-height: 25 rem;
  border-radius: 2 rem;
  overflow: hidden;
  position: relative;

  img{
    border-radius: 2rem;
    
  }

`;

// const Gradient = styled.div`
//   z-indez: 3;
//   position: absolute:
//   height: 100%;
//   width: 100%;
//   background: linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0.5));
// `

export default Popular
