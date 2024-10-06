
export async function getServerSideProps({ params }){
    const hotels = await import('src/app/hotel/hotels.json');
    // Находим отель по id
    const hotel = hotels.find(h => h.id === params.id);
    console.log(hotels);

    // Если отель не найден, возвращаем 404
    if (!hotel) {
        return { notFound: true };
    }

    return {
        props: {
            hotel,
        },
    };
}

export default function HotelPage({ hotel }) {
    return (
        <div>
            <h1>{hotel.name}</h1>
            <p>Country: {hotel.country}</p>
            <p>City: {hotel.city}</p>
            <p>Price: {hotel.price}</p>
        </div>
    );
}
