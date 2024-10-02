import React from 'react';

const MapComponent = () => {
    return (
        <div className="flex justify-center items-center mt-8">
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d4199.89754297113!2d32.09625117085022!3d46.95585941877022!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1suk!2sua!4v1727869120305!5m2!1suk!2sua"
                width="685"
                height="459"
                style={{border: 0}}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-lg" // Добавляем стиль, если нужно
            ></iframe>
        </div>
    );
};

export default MapComponent;
