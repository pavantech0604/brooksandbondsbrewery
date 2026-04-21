import Layout from '../components/Layout';
import Navigation from '../components/Navigation';
import Hero from '../components/Hero';
import SignatureAlchemy from '../components/SignatureAlchemy';
import HeritageSection from '../components/HeritageSection';
import RooftopExperience from '../components/RooftopExperience';
import ReservationRitual from '../components/ReservationRitual';
import Gallery from '../components/Gallery';
import Footer from '../components/Footer';

function Home() {
  return (
    <Layout>
      <Navigation />
      
      <Hero />
      <HeritageSection />
      <SignatureAlchemy />
      <Gallery />
      <RooftopExperience />
      <ReservationRitual />
      <Footer />
    </Layout>
  );
}

export default Home;
