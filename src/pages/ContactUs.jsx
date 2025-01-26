import styles from './ContactUs.module.css';

export default function ContactUs() {
    return (
        <div className={`d-flex ${styles.container}`}>
            <div className={`bg-white shadow rounded ${styles.card}`}>
                <h1 className="text-center text-dark mb-3">
                    Contattaci
                </h1>
                <p className="text-center text-secondary mb-4">
                    Siamo qui per aiutarti! Contattaci attraverso uno dei seguenti metodi.
                </p>
                <div className="text-center">
                    {/* Email Section */}
                    <div className="mb-4">
                        <h2 className="h5 text-dark">Email</h2>
                        <p className="text-secondary">contattaci@example.com</p>
                    </div>

                    {/* Phone Section */}
                    <div className="mb-4">
                        <h2 className="h5 text-dark">Telefono</h2>
                        <p className="text-secondary">+39 329384958</p>
                    </div>

                    {/* Address Section */}
                    <div>
                        <h2 className="h5 text-dark">Indirizzo</h2>
                        <p className="text-secondary">
                            Milano <br />
                            Italia
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

