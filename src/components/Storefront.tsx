import Header from './Header';
import Hero from './Hero';
import Stats from './Stats';
import Products from './Products';
import Services from './Services';
import About from './About';
import Contact from './Contact';
import Footer from './Footer';
import WhatsAppButton from './WhatsAppButton';

export default function Storefront() {
  return (
    <div className="min-h-screen bg-paper-50">
      <Header />
      <main>
        <Hero />
        <Stats />
        <Products />
        <Services />
        <About />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
