import * as React from "react"
import whatsappLogo from '../images/whatsappLogo.png';
import { CiInstagram } from "react-icons/ci";
import '../styles/app.css';

class Footer extends React.Component {

   constructor(props) {
       super(props);
   }

   	render () {
    	return (
			<>
			<div className="footer">
					<div className="footer-content-container">
							<div className="footer-content-info-container">
								<h4>Redes Sociales</h4>
								<div className="footer-content-insta-icon-container">
									<a href="https://instagram.com/lacavaespecialidades" target="_blank">
										<CiInstagram className="footer-content-insta-icon" />
									</a>
								</div> 
							</div>
							<div className="footer-content-info-container">
								<h4>Ubicación</h4>
								<p>San Pedro Garza García, NL</p>
							</div>
							<div className="footer-content-info-container">
								<h4>Teléfonos</h4>
								<p><a href="tel:8150007579">8150007579 Ext 8961</a></p>
								<p><a href="tel:8150007581">8150007581 Ext 8960</a></p>
							</div>
					</div>
				</div>
				<div className="whatsapp-button-container">
					<a target="_blank" href="https://wa.me/5218119991129">
						<img src={whatsappLogo} />
					</a>
				</div>
			</>
		)
 	}
}

export default Footer