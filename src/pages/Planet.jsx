import { useParams } from "react-router-dom";

export default function Planet() {
    const { id } = useParams();

    return (
        <div className="screen">
            <h1>Планета: {id}</h1>

            <div className="card">
                <p>Траты: 650 BYN</p>
                <p>Уровень: 7</p>
            </div>

            <div className="card">
                <p>Кэшбек: 3%</p>
            </div>
        </div>
    );
}