export default function VideoBackground() {
    return (
        <div className="relative w-full h-screen overflow-hidden">
            <video
                className="absolute top-0 left-0 w-full h-full object-cover"
                autoPlay
                loop
                muted
                playsInline
            >
                <source src="/videoplayback.webm" type="video/webm"/>
            </video>
            <div
                className="absolute top-96 left-1/4 transform -translate-x-1/2 -translate-y-1/2 text-white text-7xl z-20">
                Touristique
            </div>
            <div
                className="absolute -top-98 left-100 transform -translate-x-1/2 -translate-y-1/2 text-white text-3xl z-20">
                Найкраще для Вас - це наш стандарт
            </div>
            <div
                className="absolute -top-100 left-99 transform -translate-x-1/2 -translate-y-1/2 text-white text-3xl z-20">
                Заплануйте Вашу подорож
            </div>
        </div>


    );
}