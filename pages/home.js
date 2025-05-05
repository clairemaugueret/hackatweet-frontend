import Home from '../components/Home';

//pour éviter que fortawesome appelle son CSS avant le notre (souci affichage icône)
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

function HomePage() {
  return <Home />;
}

export default HomePage;
