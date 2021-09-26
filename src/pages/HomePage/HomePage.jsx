import "./HomePage.scss";
import heroImage from "../../assets/images/hero.png";
import heroWomanImage from "../../assets/images/hero-woman-cropped.png";
import { JustForYouSection } from "../../components/JustForYouSection";
import { CategoriesSection } from "../../components/CategoriesSection";
import { SaleSection } from "../../components/SaleSection";

export const HomePage = (props) => {
  return (
    <div className="home-page">
      <div className="hero-container">
        <img className="hero-image" src={heroImage} alt="hero-image" />
        <img className="hero-woman-image" src={heroWomanImage} alt="" />
        <div className="content main-container">
          <h1 className="main-title">
            Let's find out which clothes are right for you!
          </h1>
          <h2 className="secondary-title">
            Press the button Enter your measurements And we will match you
            clothes.
          </h2>
          <button className="primary-button">LETS START</button>
        </div>
      </div>
      <JustForYouSection />
      <CategoriesSection />
      <SaleSection />
    </div>
  );
};
