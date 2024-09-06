import { useSearchParams } from "react-router-dom";

const Home = () => {
  const [params, setParams] = useSearchParams();
  console.log(params.get("name"));

  return <div>Home</div>;
};

export default Home;
