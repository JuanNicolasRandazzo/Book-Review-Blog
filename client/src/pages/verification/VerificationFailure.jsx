import { Link } from 'react-router-dom';
import './verification.css';

// Asegúrate de que Font Awesome esté importado en tu proyecto
// import '@fortawesome/fontawesome-free/css/all.min.css';

export const VerificationFailure = () => {
  return (
    <div className='verificationContainer'>
        {/* Añadimos la clase 'error' para aplicar los estilos específicos */}
        <div className='verificationCard error'>
            {/* Ícono de error con su clase específica */}
            <i className="fas fa-times-circle verificationIcon error"></i>

            {/* Título de error */}
            <h1 className='verificationTitle error'>Verification Failed</h1>
            <p className='verificationInfo'>
                The verification link is invalid or has expired. Please try registering again.
            </p>

            {/* Botón que lleva al registro, con un estilo diferente */}
            <Link to="/register" className='verificationLink retry'>
                Try to Register Again
            </Link>

            <p className='verificationFailMessage'>
                If the problem persists, please contact our support team.
            </p>
        </div>
    </div>
  );
};