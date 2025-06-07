import { Link } from 'react-router-dom';
import './verification.css';

// Asegúrate de que Font Awesome está importado en tu proyecto,
// si no, puedes eliminar la línea del ícono.
// import '@fortawesome/fontawesome-free/css/all.min.css';

export const VerificationSuccess = () => {
  return (
    // Contenedor principal para centrar
    <div className='verificationContainer'>
        {/* Tarjeta de contenido */}
        <div className='verificationCard'>
            {/* Ícono (opcional, pero muy efectivo) */}
            <i className="fas fa-check-circle verificationIcon"></i>

            <h1 className='verificationTitle'>Verification Successful!</h1>
            <p className='verificationInfo'>
                Your account has been activated. Welcome to the community!
            </p>

            {/* Usamos una clase para estilizar el Link como un botón */}
            <Link to="/login" className='verificationLink'>Go to Login</Link>

            <p className='verificationFailMessage'>
                If you encounter any issues, feel free to contact our support.
            </p>
        </div>
    </div>
  );
};