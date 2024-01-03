import { useEffect, useState } from "react";
import styled from "styled-components";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";
import { Link } from "react-router-dom";

function Veggie() {
  const [veggie, setVeggie] = useState([]);


  useEffect(() => {
    getVeggie();
  },[]);
 
 const getVeggie = async () => {
//if portion sets first listed "popular picks" in local storage so it doesn't do an API call each time you refresh
    const check = localStorage.getItem('veggie');

    if(check){
      setVeggie(JSON.parse(check));
    } else{
      const api = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=9&tags=vegetarian`);
    const data = await api.json();
    
    localStorage.setItem('veggie', JSON.stringify(data.recipes));
    setVeggie(data.recipes)

    };
};

  return (
    <div>
     <Wrapper>
      <h3>Our Vegetarian Picks</h3>
      <Splide options={{
        perPage: 3,
        arrows: false,
        pagination: false,
        drag: 'free',
        gap: "5rem"
      }}
      >
      {veggie.map((recipe) => {
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
}

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

export default Veggie
