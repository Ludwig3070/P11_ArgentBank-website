import Nav from "../components/Nav";
import Banner from "../components/Banner";
import FeatureItem from "../components/FeatureItem";
import localImage1 from "../img/freecompress-icon-chat.webp";
import localImage2 from "../img/freecompress-icon-money.webp";
import localImage3 from "../img/freecompress-icon-security.webp";
import Footer from "../components/Footer";


function Home() {
  
  return (
    <>
      <Nav text={"Sign in"}/>
      <Banner />
      <section className="features">
        <h2 className="sr-only">Features</h2>
        {/* premier item */}
        <FeatureItem
          src={localImage1}
          alt="Chat Icon"
          h3="You are our #1 priority"
        >
          <>
            Need to talk to a representative? You can get in touch through our
            24/7 chat or <br /> through a phone call in less than 5 minutes.
          </>
        </FeatureItem>
        {/* deuxieme item */}
        <FeatureItem
          src={localImage2}
          alt="Chat Icon"
          h3="More savings means higher rates"
        >
          <>The more you save with us, the higher your interest rate will be!</>
        </FeatureItem>
        {/* troisieme item */}
        <FeatureItem
          src={localImage3}
          alt="Chat Icon"
          h3="Security you can trust"
        >
          <>
            We use top of the line encryption to make sure your data and money
            is always safe.
          </>
        </FeatureItem>
      </section>
      <Footer />
    </>
  );
}

export default Home;
