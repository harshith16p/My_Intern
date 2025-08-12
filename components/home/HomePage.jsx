import dynamic from "next/dynamic";
import ThemeToggle from "../AddOn/ThemeToggle";
import Cards from "../Cards";

// Somewhere inside your Navbar JSX:


const MapButton = dynamic(() =>
  import("../MapButton/MapButton").catch((err) => console.error(err))
);

const HomePage = async () => {
  return (
    <>
      <div className="overflow-x-hidden fade-in">
        <ThemeToggle />
        {/* <Suspense fallback={<Splashscreen />}> */}
          <Cards />
        {/* </Suspense> */}
        <MapButton />
      </div>
    </>
  );
};

export default HomePage;
