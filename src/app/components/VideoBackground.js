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
                <source src="/videoplayback1.mp4" type="video/mp4"/>
            </video>
            <div className="absolute inset-0 bg-black opacity-30"></div>
            <div
                className="absolute top-96 left-100 transform -translate-x-1/2 -translate-y-1/2 text-white text-7xl z-20 dela-gothic-one-regular ">
                Touristique
            </div>
            <div
                className="absolute -top-98 left-100 transform -translate-x-1/2 -translate-y-1/2 text-white text-3xl z-20 geologica-300">
                Найкраще для Вас - це наш стандарт
            </div>
        </div>
    );
}