import './footer.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaFacebookF } from "react-icons/fa";
import { AiOutlineTwitter, AiFillYoutube } from "react-icons/ai";
import { BiLogoPinterestAlt } from "react-icons/bi";
const Footer = () => {

    const iconsTab = [
        { icon: <FaFacebookF /> },
        { icon: <AiOutlineTwitter /> },
        { icon: <AiFillYoutube /> },
        { icon: <BiLogoPinterestAlt /> },
      ]; 

  return (
    <footer>
        <div className="footer_container">
            <div className="footer_icons">
            {iconsTab.map(({ icon }, index) => {
                  return (
                    <div key={index}>
                      {icon}
                    </div>
                  );
                })}

            </div>
            <div className="footer_bottom">
                <h4>© 2024 CopyRight: MyWebSite.com</h4>

            </div>
        </div>
    </footer>
  )
}

export default Footer